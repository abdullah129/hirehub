import { apiService } from './api';
import {
  Job,
  CreateJobInput,
  UpdateJobInput,
  JobFilters,
  Contact,
  Interview,
  Note,
  Document,
  Activity,
} from '../types/job.types';
import { PaginatedResponse } from '../types/api.types';

class JobsService {
  private basePath = '/jobs';

  // Job CRUD operations
  async getJobs(filters?: JobFilters): Promise<Job[]> {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value));
        }
      });
    }
    return apiService.get<Job[]>(`${this.basePath}?${params.toString()}`);
  }

  async getJob(id: string): Promise<Job> {
    return apiService.get<Job>(`${this.basePath}/${id}`);
  }

  async createJob(data: CreateJobInput): Promise<Job> {
    return apiService.post<Job>(this.basePath, data);
  }

  async updateJob(id: string, data: Partial<UpdateJobInput>): Promise<Job> {
    return apiService.patch<Job>(`${this.basePath}/${id}`, data);
  }

  async deleteJob(id: string): Promise<void> {
    return apiService.delete(`${this.basePath}/${id}`);
  }

  async updateJobStatus(id: string, status: string): Promise<Job> {
    return apiService.patch<Job>(`${this.basePath}/${id}/status`, { status });
  }

  // Contacts
  async getContacts(jobId: string): Promise<Contact[]> {
    return apiService.get<Contact[]>(`${this.basePath}/${jobId}/contacts`);
  }

  async createContact(jobId: string, data: Partial<Contact>): Promise<Contact> {
    return apiService.post<Contact>(`${this.basePath}/${jobId}/contacts`, data);
  }

  async deleteContact(jobId: string, contactId: string): Promise<void> {
    return apiService.delete(`${this.basePath}/${jobId}/contacts/${contactId}`);
  }

  // Interviews
  async getInterviews(jobId: string): Promise<Interview[]> {
    return apiService.get<Interview[]>(`${this.basePath}/${jobId}/interviews`);
  }

  async createInterview(jobId: string, data: Partial<Interview>): Promise<Interview> {
    return apiService.post<Interview>(`${this.basePath}/${jobId}/interviews`, data);
  }

  async deleteInterview(jobId: string, interviewId: string): Promise<void> {
    return apiService.delete(`${this.basePath}/${jobId}/interviews/${interviewId}`);
  }

  // Notes
  async getNotes(jobId: string): Promise<Note[]> {
    return apiService.get<Note[]>(`${this.basePath}/${jobId}/notes`);
  }

  async createNote(jobId: string, content: string): Promise<Note> {
    return apiService.post<Note>(`${this.basePath}/${jobId}/notes`, { content });
  }

  async deleteNote(jobId: string, noteId: string): Promise<void> {
    return apiService.delete(`${this.basePath}/${jobId}/notes/${noteId}`);
  }

  // Documents
  async getDocuments(jobId: string): Promise<Document[]> {
    return apiService.get<Document[]>(`${this.basePath}/${jobId}/documents`);
  }

  async uploadDocument(jobId: string, file: File, type: string): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return apiService.post<Document>(`${this.basePath}/${jobId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async deleteDocument(jobId: string, documentId: string): Promise<void> {
    return apiService.delete(`${this.basePath}/${jobId}/documents/${documentId}`);
  }

  // Activities
  async getActivities(jobId: string): Promise<Activity[]> {
    return apiService.get<Activity[]>(`${this.basePath}/${jobId}/activities`);
  }
}

export const jobsService = new JobsService();
export default jobsService;
