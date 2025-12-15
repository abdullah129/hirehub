import { Router } from 'express';
import * as jobController from '../controllers/job.controller';
import authMiddleware from '../middleware/auth.middleware';
import validate from '../middleware/validation.middleware';
import { createJobSchema, updateJobSchema, updateJobStatusSchema, jobQuerySchema } from '../validations/job.validation';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Job routes
router.get('/', validate(jobQuerySchema), jobController.getJobs);
router.get('/:id', jobController.getJob);
router.post('/', validate(createJobSchema), jobController.createJob);
router.patch('/:id', validate(updateJobSchema), jobController.updateJob);
router.delete('/:id', jobController.deleteJob);
router.patch('/:id/status', validate(updateJobStatusSchema), jobController.updateJobStatus);

// Contact routes
router.get('/:jobId/contacts', jobController.getContacts);
router.post('/:jobId/contacts', jobController.createContact);

// Note routes
router.get('/:jobId/notes', jobController.getNotes);
router.post('/:jobId/notes', jobController.createNote);

// Activity routes
router.get('/:jobId/activities', jobController.getActivities);

export default router;
