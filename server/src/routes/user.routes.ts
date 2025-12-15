import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import asyncHandler from '../utils/asyncHandler';
import ApiResponse from '../utils/ApiResponse';
import authMiddleware from '../middleware/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

// All routes require authentication
router.use(authMiddleware);

// Get user profile
router.get('/profile', asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      preferences: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.json(ApiResponse.success(user));
}));

// Get user stats
router.get('/stats', asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  const [total, active, interviews, offers, rejected] = await Promise.all([
    prisma.job.count({ where: { userId } }),
    prisma.job.count({ where: { userId, status: { in: ['APPLIED', 'SCREENING', 'INTERVIEW'] } } }),
    prisma.interview.count({ where: { job: { userId }, status: 'SCHEDULED' } }),
    prisma.job.count({ where: { userId, status: 'OFFER' } }),
    prisma.job.count({ where: { userId, status: 'REJECTED' } }),
  ]);

  const stats = {
    totalApplications: total,
    activeApplications: active,
    upcomingInterviews: interviews,
    offers,
    rejections: rejected,
  };

  res.json(ApiResponse.success(stats));
}));

export default router;
