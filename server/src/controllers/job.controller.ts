import { Request, Response } from 'express';
import { PrismaClient, ActivityType } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';

const prisma = new PrismaClient();

export const getJobs = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { status, jobType, locationType, priority, company, search } = req.query;

  const where: any = { userId };

  if (status) where.status = status;
  if (jobType) where.jobType = jobType;
  if (locationType) where.locationType = locationType;
  if (priority) where.priority = priority;
  if (company) where.company = { contains: company as string, mode: 'insensitive' };
  if (search) {
    where.OR = [
      { company: { contains: search as string, mode: 'insensitive' } },
      { position: { contains: search as string, mode: 'insensitive' } },
    ];
  }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  res.json(ApiResponse.success(jobs));
});

export const getJob = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;

  const job = await prisma.job.findFirst({
    where: { id, userId },
    include: {
      contacts: true,
      interviews: true,
      jobNotes: true,
      documents: true,
      activities: { orderBy: { createdAt: 'desc' }, take: 20 },
    },
  });

  if (!job) {
    throw ApiError.notFound('Job not found');
  }

  res.json(ApiResponse.success(job));
});

export const createJob = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const data = req.body;

  const job = await prisma.job.create({
    data: {
      ...data,
      userId,
      appliedAt: data.status !== 'WISHLIST' ? new Date() : undefined,
    },
  });

  // Create activity
  await prisma.activity.create({
    data: {
      jobId: job.id,
      type: ActivityType.APPLICATION_SUBMITTED,
      description: `Added ${job.position} at ${job.company}`,
    },
  });

  res.status(201).json(ApiResponse.success(job, 'Job created successfully'));
});

export const updateJob = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const data = req.body;

  const existingJob = await prisma.job.findFirst({
    where: { id, userId },
  });

  if (!existingJob) {
    throw ApiError.notFound('Job not found');
  }

  const job = await prisma.job.update({
    where: { id },
    data,
  });

  res.json(ApiResponse.success(job, 'Job updated successfully'));
});

export const deleteJob = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;

  const job = await prisma.job.findFirst({
    where: { id, userId },
  });

  if (!job) {
    throw ApiError.notFound('Job not found');
  }

  await prisma.job.delete({ where: { id } });

  res.json(ApiResponse.success(null, 'Job deleted successfully'));
});

export const updateJobStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const userId = req.user?.id;

  const existingJob = await prisma.job.findFirst({
    where: { id, userId },
  });

  if (!existingJob) {
    throw ApiError.notFound('Job not found');
  }

  const job = await prisma.job.update({
    where: { id },
    data: { 
      status,
      appliedAt: status !== 'WISHLIST' && !existingJob.appliedAt ? new Date() : existingJob.appliedAt,
    },
  });

  // Create activity
  await prisma.activity.create({
    data: {
      jobId: job.id,
      type: ActivityType.STATUS_CHANGED,
      description: `Status changed to ${status}`,
      metadata: { oldStatus: existingJob.status, newStatus: status },
    },
  });

  res.json(ApiResponse.success(job, 'Job status updated successfully'));
});

// Contact controllers
export const getContacts = asyncHandler(async (req: Request, res: Response) => {
  const { jobId } = req.params;

  const contacts = await prisma.contact.findMany({
    where: { jobId },
  });

  res.json(ApiResponse.success(contacts));
});

export const createContact = asyncHandler(async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const data = req.body;

  const contact = await prisma.contact.create({
    data: { ...data, jobId },
  });

  await prisma.activity.create({
    data: {
      jobId,
      type: ActivityType.CONTACT_ADDED,
      description: `Added contact: ${contact.name}`,
    },
  });

  res.status(201).json(ApiResponse.success(contact, 'Contact created successfully'));
});

// Note controllers
export const getNotes = asyncHandler(async (req: Request, res: Response) => {
  const { jobId } = req.params;

  const notes = await prisma.note.findMany({
    where: { jobId },
    orderBy: { createdAt: 'desc' },
  });

  res.json(ApiResponse.success(notes));
});

export const createNote = asyncHandler(async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const { content } = req.body;

  const note = await prisma.note.create({
    data: { jobId, content },
  });

  await prisma.activity.create({
    data: {
      jobId,
      type: ActivityType.NOTE_ADDED,
      description: 'Added a note',
    },
  });

  res.status(201).json(ApiResponse.success(note, 'Note created successfully'));
});

export const getActivities = asyncHandler(async (req: Request, res: Response) => {
  const { jobId } = req.params;

  const activities = await prisma.activity.findMany({
    where: { jobId },
    orderBy: { createdAt: 'desc' },
  });

  res.json(ApiResponse.success(activities));
});
