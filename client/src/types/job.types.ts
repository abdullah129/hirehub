// Job Status Enums
export enum JobStatus {
  WISHLIST = 'WISHLIST',
  APPLIED = 'APPLIED',
  SCREENING = 'SCREENING',
  INTERVIEW = 'INTERVIEW',
  OFFER = 'OFFER',
  REJECTED = 'REJECTED'
}

export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
  FREELANCE = 'FREELANCE'
}

export enum LocationType {
  ONSITE = 'ONSITE',
  REMOTE = 'REMOTE',
  HYBRID = 'HYBRID'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

// Main Job Interface
export interface Job {
  id: string;
  userId: string;
  company: string;
  companyLogo?: string;
  position: string;
  description?: string;
  status: JobStatus;
  jobType: JobType;
  locationType: LocationType;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  applicationUrl?: string;
  applicationDeadline?: Date;
  priority: Priority;
  tags: string[];
  skills: string[];
  notes?: string;
  appliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  contacts?: Contact[];
  interviews?: Interview[];
  jobNotes?: Note[];
  documents?: Document[];
  activities?: Activity[];
}

// Supporting Interfaces
export interface Contact {
  id: string;
  jobId: string;
  name: string;
  email?: string;
  phone?: string;
  role?: string;
  linkedIn?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum InterviewType {
  PHONE = 'PHONE',
  VIDEO = 'VIDEO',
  ONSITE = 'ONSITE',
  TECHNICAL = 'TECHNICAL',
  BEHAVIORAL = 'BEHAVIORAL',
  HR = 'HR',
  FINAL = 'FINAL'
}

export enum InterviewStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  RESCHEDULED = 'RESCHEDULED'
}

export interface Interview {
  id: string;
  jobId: string;
  title: string;
  type: InterviewType;
  status: InterviewStatus;
  scheduledAt: Date;
  duration?: number;
  location?: string;
  meetingLink?: string;
  interviewers?: string;
  notes?: string;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  jobId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum DocumentType {
  RESUME = 'RESUME',
  COVER_LETTER = 'COVER_LETTER',
  PORTFOLIO = 'PORTFOLIO',
  CERTIFICATE = 'CERTIFICATE',
  OTHER = 'OTHER'
}

export interface Document {
  id: string;
  jobId: string;
  type: DocumentType;
  name: string;
  url: string;
  size?: number;
  uploadedAt: Date;
}

export enum ActivityType {
  APPLICATION_SUBMITTED = 'APPLICATION_SUBMITTED',
  STATUS_CHANGED = 'STATUS_CHANGED',
  INTERVIEW_SCHEDULED = 'INTERVIEW_SCHEDULED',
  INTERVIEW_COMPLETED = 'INTERVIEW_COMPLETED',
  NOTE_ADDED = 'NOTE_ADDED',
  CONTACT_ADDED = 'CONTACT_ADDED',
  DOCUMENT_UPLOADED = 'DOCUMENT_UPLOADED',
  REMINDER_SET = 'REMINDER_SET',
  OFFER_RECEIVED = 'OFFER_RECEIVED',
  APPLICATION_REJECTED = 'APPLICATION_REJECTED'
}

export interface Activity {
  id: string;
  jobId: string;
  type: ActivityType;
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

// Form Types
export interface CreateJobInput {
  company: string;
  companyLogo?: string;
  position: string;
  description?: string;
  jobType: JobType;
  locationType: LocationType;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  applicationUrl?: string;
  applicationDeadline?: Date;
  priority?: Priority;
  tags?: string[];
  skills?: string[];
  notes?: string;
  status?: JobStatus;
}

export interface UpdateJobInput extends Partial<CreateJobInput> {
  id: string;
}

export interface JobFilters {
  status?: JobStatus;
  jobType?: JobType;
  locationType?: LocationType;
  priority?: Priority;
  company?: string;
  search?: string;
  tags?: string[];
}
