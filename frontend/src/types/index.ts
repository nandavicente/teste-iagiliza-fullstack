// User types
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Message types
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  chatId: string;
  createdAt: string;
}

// Chat types
export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages?: Array<{
    content: string;
    role: string;
  }>;
}

// API Response types
export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface ApiError {
  error: string;
  message: string;
}
