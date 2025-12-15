import React from 'react';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { JobTable } from '../components/jobs/JobTable';
import { KanbanBoard } from '../components/jobs/KanbanBoard';
import { JobModal } from '../components/jobs/JobModal';
import { useJobs, useUpdateJobStatus } from '../hooks/useJobs';
import { useUIStore } from '../store/uiStore';
import { JobStatus } from '../types/job.types';

export const Jobs: React.FC = () => {
  const { data: jobs = [], isLoading } = useJobs();
  const { mutate: updateStatus } = useUpdateJobStatus();
  const { viewMode, setViewMode, isJobModalOpen, selectedJobId, openJobModal, closeJobModal } =
    useUIStore();

  const handleJobClick = (job: any) => {
    openJobModal(job.id);
  };

  const handleStatusChange = (jobId: string, newStatus: JobStatus) => {
    updateStatus({ id: jobId, status: newStatus });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
        <div className="flex items-center space-x-3">
          {/* View Toggle */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded ${
                viewMode === 'table' ? 'bg-white shadow' : 'text-gray-600'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 rounded ${
                viewMode === 'kanban' ? 'bg-white shadow' : 'text-gray-600'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
          <Button variant="primary" size="md">
            <Plus className="h-4 w-4 mr-2" />
            Add Job
          </Button>
        </div>
      </div>

      {/* View Content */}
      {viewMode === 'table' ? (
        <JobTable jobs={jobs} isLoading={isLoading} onJobClick={handleJobClick} />
      ) : (
        <KanbanBoard
          jobs={jobs}
          onJobClick={handleJobClick}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* Job Modal */}
      {selectedJobId && (
        <JobModal isOpen={isJobModalOpen} onClose={closeJobModal} jobId={selectedJobId} />
      )}
    </div>
  );
};
