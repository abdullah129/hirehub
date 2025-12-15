import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { JobStatus, Job } from '../../types/job.types';
import { JobCard } from './JobCard';
import { cn } from '../../utils/cn';

interface KanbanColumnProps {
  status: JobStatus;
  jobs: Job[];
  onJobClick?: (job: Job) => void;
}

const statusConfig: Record<JobStatus, { label: string; color: string }> = {
  [JobStatus.WISHLIST]: { label: 'Wishlist', color: 'bg-gray-100' },
  [JobStatus.APPLIED]: { label: 'Applied', color: 'bg-blue-100' },
  [JobStatus.SCREENING]: { label: 'Screening', color: 'bg-yellow-100' },
  [JobStatus.INTERVIEW]: { label: 'Interview', color: 'bg-purple-100' },
  [JobStatus.OFFER]: { label: 'Offer', color: 'bg-green-100' },
  [JobStatus.REJECTED]: { label: 'Rejected', color: 'bg-red-100' },
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, jobs, onJobClick }) => {
  const { setNodeRef } = useDroppable({ id: status });
  const config = statusConfig[status];

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg">
      {/* Column Header */}
      <div className={cn('px-4 py-3 rounded-t-lg', config.color)}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{config.label}</h3>
          <span className="px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-700">
            {jobs.length}
          </span>
        </div>
      </div>

      {/* Droppable Area */}
      <div
        ref={setNodeRef}
        className="flex-1 p-3 space-y-3 overflow-y-auto min-h-[200px]"
      >
        <SortableContext items={jobs.map((j) => j.id)} strategy={verticalListSortingStrategy}>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={onJobClick} />
          ))}
        </SortableContext>

        {jobs.length === 0 && (
          <div className="text-center text-sm text-gray-400 py-8">
            Drop jobs here
          </div>
        )}
      </div>
    </div>
  );
};
