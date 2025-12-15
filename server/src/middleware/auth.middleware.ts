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
    // ⚠️ SECURITY WARNING: This is a placeholder implementation for development
    // TODO: Implement Better-Auth session validation before production deployment
    // Current implementation bypasses all authentication checks
    
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('No token provided');
    }

    // Extract token
    const token = authHeader.substring(7);
    
    // TODO: Verify token with Better-Auth
    // Example: const session = await betterAuth.validateSession(token);
    // if (!session) throw ApiError.unauthorized('Invalid session');
    
    // ⚠️ PLACEHOLDER: Replace with actual Better-Auth token verification
    // This mock implementation accepts ANY token - DO NOT USE IN PRODUCTION
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
