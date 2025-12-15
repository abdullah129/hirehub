import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsService } from '../services/jobs.service';
import {
  Job,
  CreateJobInput,
  UpdateJobInput,
  JobFilters,
  Contact,
  Interview,
  Note,
} from '../types/job.types';

// Query keys
export const jobKeys = {
  all: ['jobs'] as const,
  lists: () => [...jobKeys.all, 'list'] as const,
  list: (filters?: JobFilters) => [...jobKeys.lists(), filters] as const,
  details: () => [...jobKeys.all, 'detail'] as const,
  detail: (id: string) => [...jobKeys.details(), id] as const,
  contacts: (jobId: string) => [...jobKeys.detail(jobId), 'contacts'] as const,
  interviews: (jobId: string) => [...jobKeys.detail(jobId), 'interviews'] as const,
  notes: (jobId: string) => [...jobKeys.detail(jobId), 'notes'] as const,
  activities: (jobId: string) => [...jobKeys.detail(jobId), 'activities'] as const,
};

// Hooks for jobs
export function useJobs(filters?: JobFilters) {
  return useQuery({
    queryKey: jobKeys.list(filters),
    queryFn: () => jobsService.getJobs(filters),
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: () => jobsService.getJob(id),
    enabled: !!id,
  });
}

export function useCreateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateJobInput) => jobsService.createJob(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
    },
  });
}

export function useUpdateJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<UpdateJobInput> }) =>
      jobsService.updateJob(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
    },
  });
}

export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => jobsService.deleteJob(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
    },
  });
}

export function useUpdateJobStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      jobsService.updateJobStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: jobKeys.lists() });
    },
  });
}

// Hooks for contacts
export function useContacts(jobId: string) {
  return useQuery({
    queryKey: jobKeys.contacts(jobId),
    queryFn: () => jobsService.getContacts(jobId),
    enabled: !!jobId,
  });
}

export function useCreateContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ jobId, data }: { jobId: string; data: Partial<Contact> }) =>
      jobsService.createContact(jobId, data),
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.contacts(jobId) });
    },
  });
}

// Hooks for interviews
export function useInterviews(jobId: string) {
  return useQuery({
    queryKey: jobKeys.interviews(jobId),
    queryFn: () => jobsService.getInterviews(jobId),
    enabled: !!jobId,
  });
}

export function useCreateInterview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ jobId, data }: { jobId: string; data: Partial<Interview> }) =>
      jobsService.createInterview(jobId, data),
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.interviews(jobId) });
    },
  });
}

// Hooks for notes
export function useNotes(jobId: string) {
  return useQuery({
    queryKey: jobKeys.notes(jobId),
    queryFn: () => jobsService.getNotes(jobId),
    enabled: !!jobId,
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ jobId, content }: { jobId: string; content: string }) =>
      jobsService.createNote(jobId, content),
    onSuccess: (_, { jobId }) => {
      queryClient.invalidateQueries({ queryKey: jobKeys.notes(jobId) });
    },
  });
}

// Hooks for activities
export function useActivities(jobId: string) {
  return useQuery({
    queryKey: jobKeys.activities(jobId),
    queryFn: () => jobsService.getActivities(jobId),
    enabled: !!jobId,
  });
}
