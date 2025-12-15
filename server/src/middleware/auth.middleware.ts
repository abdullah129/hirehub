import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: Implement Better-Auth session validation
    // For now, we'll use a simple token check
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('No token provided');
    }

    // Extract token
    const token = authHeader.substring(7);
    
    // TODO: Verify token with Better-Auth
    // For demo purposes, we'll accept any token
    // In production, validate against Better-Auth session
    
    // Mock user data - replace with actual token verification
    req.user = {
      id: 'mock-user-id',
      email: 'abdullah.demo@gmail.com',
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
