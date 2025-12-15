import React, { useState } from 'react';
import { MoreVertical } from 'lucide-react';
import { Job, JobStatus } from '../../types/job.types';
import { Table } from '../ui/Table';
import { Avatar } from '../ui/Avatar';
import { StatusBadge, PriorityDot } from '../ui/Badge';
import { formatCurrency, formatDate } from '../../utils/format';

interface JobTableProps {
  jobs: Job[];
  isLoading?: boolean;
  onJobClick?: (job: Job) => void;
}

export const JobTable: React.FC<JobTableProps> = ({ jobs, isLoading, onJobClick }) => {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedJobs = React.useMemo(() => {
    if (!sortColumn) return jobs;

    return [...jobs].sort((a, b) => {
      const aVal = (a as any)[sortColumn];
      const bVal = (b as any)[sortColumn];

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [jobs, sortColumn, sortDirection]);

  const columns = [
    {
      key: 'company',
      header: 'Company',
      sortable: true,
      render: (job: Job) => (
        <div className="flex items-center space-x-3">
          <Avatar src={job.companyLogo} fallback={job.company} size="sm" />
          <span className="font-medium">{job.company}</span>
        </div>
      ),
    },
    {
      key: 'position',
      header: 'Position',
      sortable: true,
      render: (job: Job) => <span className="font-medium">{job.position}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (job: Job) => <StatusBadge status={job.status} />,
    },
    {
      key: 'salary',
      header: 'Salary',
      render: (job: Job) => {
        if (!job.salaryMin && !job.salaryMax) return '-';
        if (job.salaryMin && job.salaryMax) {
          return `${formatCurrency(job.salaryMin)} - ${formatCurrency(job.salaryMax)}`;
        }
        return job.salaryMin
          ? `${formatCurrency(job.salaryMin)}+`
          : `Up to ${formatCurrency(job.salaryMax!)}`;
      },
    },
    {
      key: 'location',
      header: 'Location',
      sortable: true,
      render: (job: Job) => (
        <div>
          <div>{job.location}</div>
          <div className="text-xs text-gray-500">{job.locationType}</div>
        </div>
      ),
    },
    {
      key: 'appliedAt',
      header: 'Applied Date',
      sortable: true,
      render: (job: Job) => (job.appliedAt ? formatDate(job.appliedAt) : '-'),
    },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      render: (job: Job) => (
        <div className="flex items-center space-x-2">
          <PriorityDot priority={job.priority} />
          <span className="text-sm">{job.priority}</span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (job: Job) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle actions menu
          }}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <MoreVertical className="h-4 w-4 text-gray-500" />
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <Table
        data={sortedJobs}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No jobs found. Create your first job application!"
        onRowClick={onJobClick}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </div>
  );
};
