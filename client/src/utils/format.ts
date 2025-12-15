import { format, formatDistance, formatRelative } from 'date-fns';

/**
 * Format currency in PKR
 */
export function formatCurrency(amount: number, currency = 'PKR'): string {
  if (currency === 'PKR') {
    return `Rs. ${amount.toLocaleString('en-PK')}`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string, formatStr = 'MMM dd, yyyy'): string {
  return format(new Date(date), formatStr);
}

/**
 * Format date to relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date | string): string {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
}

/**
 * Format date relative to now (e.g., "Today at 2:30 PM")
 */
export function formatRelativeDate(date: Date | string): string {
  return formatRelative(new Date(date), new Date());
}

/**
 * Get days since a date
 */
export function getDaysSince(date: Date | string): number {
  const now = new Date();
  const then = new Date(date);
  const diffTime = Math.abs(now.getTime() - then.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
