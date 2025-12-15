class ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;

  constructor(success: boolean, data?: T, message?: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }

  static success<T>(data: T, message?: string) {
    return new ApiResponse<T>(true, data, message);
  }

  static error(message: string) {
    const response = new ApiResponse(false);
    response.error = message;
    return response;
  }
}

export default ApiResponse;
