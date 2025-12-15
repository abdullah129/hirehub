import { z } from 'zod';

export const createJobSchema = z.object({
  body: z.object({
    company: z.string().min(1, 'Company name is required'),
    companyLogo: z.string().url().optional(),
    position: z.string().min(1, 'Position is required'),
    description: z.string().optional(),
    jobType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE']),
    locationType: z.enum(['ONSITE', 'REMOTE', 'HYBRID']),
    location: z.string().min(1, 'Location is required'),
    salaryMin: z.number().positive().optional(),
    salaryMax: z.number().positive().optional(),
    currency: z.string().default('PKR'),
    applicationUrl: z.string().url().optional(),
    applicationDeadline: z.coerce.date().optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
    tags: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    notes: z.string().optional(),
    status: z.enum(['WISHLIST', 'APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED']).default('WISHLIST'),
  }),
});

export const updateJobSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    company: z.string().min(1).optional(),
    companyLogo: z.string().url().optional(),
    position: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(['WISHLIST', 'APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED']).optional(),
    jobType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE']).optional(),
    locationType: z.enum(['ONSITE', 'REMOTE', 'HYBRID']).optional(),
    location: z.string().optional(),
    salaryMin: z.number().positive().optional(),
    salaryMax: z.number().positive().optional(),
    currency: z.string().optional(),
    applicationUrl: z.string().url().optional(),
    applicationDeadline: z.coerce.date().optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    tags: z.array(z.string()).optional(),
    skills: z.array(z.string()).optional(),
    notes: z.string().optional(),
  }),
});

export const updateJobStatusSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    status: z.enum(['WISHLIST', 'APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED']),
  }),
});

export const jobQuerySchema = z.object({
  query: z.object({
    status: z.enum(['WISHLIST', 'APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'REJECTED']).optional(),
    jobType: z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE']).optional(),
    locationType: z.enum(['ONSITE', 'REMOTE', 'HYBRID']).optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    company: z.string().optional(),
    search: z.string().optional(),
  }),
});
