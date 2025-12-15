import React from 'react';
import { cn } from '../../utils/cn';
import { JobStatus, Priority } from '../../types/job.types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

interface StatusBadgeProps {
  status: JobStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig: Record<JobStatus, { variant: BadgeProps['variant']; label: string }> = {
    [JobStatus.WISHLIST]: { variant: 'default', label: 'Wishlist' },
    [JobStatus.APPLIED]: { variant: 'info', label: 'Applied' },
    [JobStatus.SCREENING]: { variant: 'warning', label: 'Screening' },
    [JobStatus.INTERVIEW]: { variant: 'info', label: 'Interview' },
    [JobStatus.OFFER]: { variant: 'success', label: 'Offer' },
    [JobStatus.REJECTED]: { variant: 'danger', label: 'Rejected' },
  };

  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

interface PriorityDotProps {
  priority: Priority;
}

export const PriorityDot: React.FC<PriorityDotProps> = ({ priority }) => {
  const colors = {
    [Priority.LOW]: 'bg-gray-400',
    [Priority.MEDIUM]: 'bg-yellow-400',
    [Priority.HIGH]: 'bg-red-500',
  };

  return (
    <span
      className={cn('inline-block w-2 h-2 rounded-full', colors[priority])}
      title={priority}
    />
  );
};
