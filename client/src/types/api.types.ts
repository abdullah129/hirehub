export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface DashboardStats {
  totalApplications: number;
  activeApplications: number;
  upcomingInterviews: number;
  offers: number;
  rejections: number;
  responseRate: number;
  averageResponseTime: number;
  statusBreakdown: Record<string, number>;
}
