import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import {
  type User,
  type LoginRequest,
  type RegisterRequest,
  type AuthResponse,
  type Prospect,
  type CreateProspectRequest,
  type ProspectListResponse,
  type Property,
  type CreatePropertyRequest,
  type PropertyListResponse,
  type StatsResponse,
} from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle token expiration
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/login', credentials);
    return response.data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/register', userData);
    return response.data;
  }

  async getProfile(): Promise<{ user: User }> {
    const response: AxiosResponse<{ user: User }> = await this.api.get('/auth/profile');
    return response.data;
  }

  // Prospect endpoints
  async getProspects(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }): Promise<ProspectListResponse> {
    const response: AxiosResponse<ProspectListResponse> = await this.api.get('/prospects', { params });
    return response.data;
  }

  async getProspect(id: string): Promise<{ prospect: Prospect }> {
    const response: AxiosResponse<{ prospect: Prospect }> = await this.api.get(`/prospects/${id}`);
    return response.data;
  }

  async createProspect(data: CreateProspectRequest): Promise<{ message: string; prospect: Prospect }> {
    const response: AxiosResponse<{ message: string; prospect: Prospect }> = await this.api.post('/prospects', data);
    return response.data;
  }

  async updateProspect(id: string, data: Partial<CreateProspectRequest>): Promise<{ message: string; prospect: Prospect }> {
    const response: AxiosResponse<{ message: string; prospect: Prospect }> = await this.api.put(`/prospects/${id}`, data);
    return response.data;
  }

  async deleteProspect(id: string): Promise<{ message: string }> {
    const response: AxiosResponse<{ message: string }> = await this.api.delete(`/prospects/${id}`);
    return response.data;
  }

  async getProspectStats(): Promise<StatsResponse> {
    const response: AxiosResponse<StatsResponse> = await this.api.get('/prospects/stats');
    return response.data;
  }

  // Property endpoints
  async getProperties(params?: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
    transactionType?: string;
    minPrice?: number;
    maxPrice?: number;
    minSurface?: number;
    maxSurface?: number;
    city?: string;
    search?: string;
  }): Promise<PropertyListResponse> {
    const response: AxiosResponse<PropertyListResponse> = await this.api.get('/properties', { params });
    return response.data;
  }

  async getProperty(id: string): Promise<{ property: Property }> {
    const response: AxiosResponse<{ property: Property }> = await this.api.get(`/properties/${id}`);
    return response.data;
  }

  async createProperty(data: CreatePropertyRequest): Promise<{ message: string; property: Property }> {
    const response: AxiosResponse<{ message: string; property: Property }> = await this.api.post('/properties', data);
    return response.data;
  }

  async updateProperty(id: string, data: Partial<CreatePropertyRequest>): Promise<{ message: string; property: Property }> {
    const response: AxiosResponse<{ message: string; property: Property }> = await this.api.put(`/properties/${id}`, data);
    return response.data;
  }

  async deleteProperty(id: string): Promise<{ message: string }> {
    const response: AxiosResponse<{ message: string }> = await this.api.delete(`/properties/${id}`);
    return response.data;
  }

  async getPropertyStats(): Promise<StatsResponse> {
    const response: AxiosResponse<StatsResponse> = await this.api.get('/properties/stats');
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; message: string; timestamp: string }> {
    const response = await this.api.get('/health');
    return response.data;
  }
}

export default new ApiService();