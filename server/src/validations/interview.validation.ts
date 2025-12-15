import { z } from 'zod';

export const createInterviewSchema = z.object({
  body: z.object({
    jobId: z.string(),
    title: z.string().min(1, 'Title is required'),
    type: z.enum(['PHONE', 'VIDEO', 'ONSITE', 'TECHNICAL', 'BEHAVIORAL', 'HR', 'FINAL']),
    status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED']).default('SCHEDULED'),
    scheduledAt: z.string().datetime(),
    duration: z.number().positive().optional(),
    location: z.string().optional(),
    meetingLink: z.string().url().optional(),
    interviewers: z.string().optional(),
    notes: z.string().optional(),
  }),
});

export const updateInterviewSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    title: z.string().optional(),
    type: z.enum(['PHONE', 'VIDEO', 'ONSITE', 'TECHNICAL', 'BEHAVIORAL', 'HR', 'FINAL']).optional(),
    status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED']).optional(),
    scheduledAt: z.string().datetime().optional(),
    duration: z.number().positive().optional(),
    location: z.string().optional(),
    meetingLink: z.string().url().optional(),
    interviewers: z.string().optional(),
    notes: z.string().optional(),
    feedback: z.string().optional(),
  }),
});
