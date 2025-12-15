import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().url().optional(),
    preferences: z.object({
      theme: z.enum(['light', 'dark', 'system']).optional(),
      emailNotifications: z.boolean().optional(),
      defaultCurrency: z.string().optional(),
      defaultView: z.enum(['table', 'kanban']).optional(),
      reminderLeadTime: z.number().positive().optional(),
    }).optional(),
  }),
});

export const onboardingSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    preferences: z.object({
      theme: z.enum(['light', 'dark', 'system']).default('system'),
      defaultCurrency: z.string().default('PKR'),
      defaultView: z.enum(['table', 'kanban']).default('table'),
    }).optional(),
  }),
});
