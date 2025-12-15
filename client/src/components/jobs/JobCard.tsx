import React from 'react';
import { MapPin, DollarSign } from 'lucide-react';
import { Job } from '../../types/job.types';
import { Avatar } from '../ui/Avatar';
import { PriorityDot } from '../ui/Badge';
import { formatCurrency, getDaysSince } from '../../utils/format';
import { cn } from '../../utils/cn';

interface JobCardProps {
  job: Job;
  onClick?: (job: Job) => void;
  isDragging?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick, isDragging }) => {
  const daysSinceApplied = job.appliedAt ? getDaysSince(job.appliedAt) : null;

  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200 p-4 cursor-pointer',
        'hover:shadow-md transition-shadow',
        isDragging && 'opacity-50'
      )}
      onClick={() => onClick?.(job)}
    >
      {/* Header with company logo and priority */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Avatar
            src={job.companyLogo}
            fallback={job.company}
            size="md"
            className="flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{job.position}</h3>
            <p className="text-xs text-gray-600 truncate">{job.company}</p>
          </div>
        </div>
        <PriorityDot priority={job.priority} />
      </div>

      {/* Salary */}
      {(job.salaryMin || job.salaryMax) && (
        <div className="flex items-center text-xs text-gray-700 mb-2">
          <DollarSign className="h-3 w-3 mr-1" />
          {job.salaryMin && job.salaryMax ? (
            <span>
              {formatCurrency(job.salaryMin)} - {formatCurrency(job.salaryMax)}
            </span>
          ) : job.salaryMin ? (
            <span>{formatCurrency(job.salaryMin)}+</span>
          ) : (
            <span>Up to {formatCurrency(job.salaryMax!)}</span>
          )}
        </div>
      )}

      {/* Location */}
      <div className="flex items-center text-xs text-gray-600 mb-3">
        <MapPin className="h-3 w-3 mr-1" />
        <span className="truncate">{job.location}</span>
        <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded text-xs">
          {job.locationType}
        </span>
      </div>

      {/* Days since applied */}
      {daysSinceApplied !== null && (
        <div className="text-xs text-gray-500 border-t border-gray-100 pt-2">
          Applied {daysSinceApplied} {daysSinceApplied === 1 ? 'day' : 'days'} ago
        </div>
      )}
    </div>
  );
};
