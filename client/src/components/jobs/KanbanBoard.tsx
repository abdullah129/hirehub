import React from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { Job, JobStatus } from '../../types/job.types';
import { KanbanColumn } from './KanbanColumn';
import { JobCard } from './JobCard';

interface KanbanBoardProps {
  jobs: Job[];
  onJobClick?: (job: Job) => void;
  onStatusChange?: (jobId: string, newStatus: JobStatus) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  jobs,
  onJobClick,
  onStatusChange,
}) => {
  const [activeJob, setActiveJob] = React.useState<Job | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const job = jobs.find((j) => j.id === event.active.id);
    setActiveJob(job || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const newStatus = over.id as JobStatus;
      onStatusChange?.(active.id as string, newStatus);
    }

    setActiveJob(null);
  };

  // Group jobs by status
  const jobsByStatus = React.useMemo(() => {
    return Object.values(JobStatus).reduce((acc, status) => {
      acc[status] = jobs.filter((job) => job.status === status);
      return acc;
    }, {} as Record<JobStatus, Job[]>);
  }, [jobs]);

  const visibleStatuses = [
    JobStatus.WISHLIST,
    JobStatus.APPLIED,
    JobStatus.SCREENING,
    JobStatus.INTERVIEW,
    JobStatus.OFFER,
  ];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 h-full">
        {visibleStatuses.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            jobs={jobsByStatus[status] || []}
            onJobClick={onJobClick}
          />
        ))}
      </div>

      <DragOverlay>
        {activeJob ? <JobCard job={activeJob} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
};
