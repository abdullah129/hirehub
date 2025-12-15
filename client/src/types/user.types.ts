export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  emailNotifications?: boolean;
  defaultCurrency?: string;
  defaultView?: 'table' | 'kanban';
  reminderLeadTime?: number;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  name?: string;
}

export interface UpdateProfileInput {
  name?: string;
  image?: string;
  preferences?: Partial<UserPreferences>;
}
