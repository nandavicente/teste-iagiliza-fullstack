import axios from 'axios';
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
  Message,
  Chat,
  ApiResponse,
} from '../types';

// Base URL da API
const API_URL = 'http://localhost:3333';

// Criar instância do axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authService = {
  register: async (data: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/register', data);
    return response.data.data;
  },

  login: async (data: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/login', data);
    return response.data.data;
  },
};

// User endpoints
export const userService = {
  getProfile: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/me');
    return response.data.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await api.patch<ApiResponse<User>>('/me', data);
    return response.data.data;
  },
};

// Message endpoints
export const messageService = {
  sendMessage: async (content: string, chatId?: string) => {
    const response = await api.post<ApiResponse<{
      chatId: string;
      userMessage: Message;
      aiMessage: Message;
    }>>('/message', { content, chatId });
    return response.data.data;
  },

  getMessages: async (chatId?: string): Promise<Message[]> => {
    const response = await api.get<ApiResponse<Message[]>>('/messages', {
      params: chatId ? { chatId } : {},
    });
    return response.data.data;
  },
};

// Chat endpoints
export const chatService = {
  getChats: async (): Promise<Chat[]> => {
    const response = await api.get<ApiResponse<Chat[]>>('/chats');
    return response.data.data;
  },
};

export default api;
