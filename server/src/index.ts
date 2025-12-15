import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import jobRoutes from './routes/job.routes';
import userRoutes from './routes/user.routes';
import errorMiddleware from './middleware/error.middleware';
import ApiResponse from './utils/ApiResponse';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req: Request, res: Response) => {
  res.json(ApiResponse.success({ status: 'ok', timestamp: new Date().toISOString() }));
});

// API routes
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json(ApiResponse.error('Route not found'));
});

// Error handler (must be last)
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
});

export default app;
