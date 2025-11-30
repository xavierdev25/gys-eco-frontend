import { API_BASE_URL, STORAGE_KEYS } from '@/lib/constants';
import type { ApiError } from '@/types';

// Token management utilities
const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

export const setTokens = (accessToken: string, refreshToken: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

export const clearTokens = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// Custom error class for API errors
export class ApiRequestError extends Error {
  statusCode: number;
  details?: string[];

  constructor(message: string, statusCode: number, details?: string[]) {
    super(message);
    this.name = 'ApiRequestError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Request configuration types
interface RequestConfig extends RequestInit {
  skipAuth?: boolean;
}

// API client class
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        message: 'Error de conexión con el servidor',
        statusCode: response.status,
      }));

      const message = Array.isArray(errorData.message)
        ? errorData.message[0]
        : errorData.message;

      throw new ApiRequestError(
        message,
        errorData.statusCode || response.status,
        Array.isArray(errorData.message) ? errorData.message : undefined
      );
    }

    // Handle empty responses
    const text = await response.text();
    if (!text) return {} as T;

    return JSON.parse(text);
  }

  private getHeaders(skipAuth: boolean = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (!skipAuth) {
      const token = getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async get<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { skipAuth = false, ...fetchConfig } = config;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(skipAuth),
      ...fetchConfig,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: unknown, config: RequestConfig = {}): Promise<T> {
    const { skipAuth = false, ...fetchConfig } = config;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(skipAuth),
      body: data ? JSON.stringify(data) : undefined,
      ...fetchConfig,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: unknown, config: RequestConfig = {}): Promise<T> {
    const { skipAuth = false, ...fetchConfig } = config;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(skipAuth),
      body: data ? JSON.stringify(data) : undefined,
      ...fetchConfig,
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, data?: unknown, config: RequestConfig = {}): Promise<T> {
    const { skipAuth = false, ...fetchConfig } = config;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(skipAuth),
      body: data ? JSON.stringify(data) : undefined,
      ...fetchConfig,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { skipAuth = false, ...fetchConfig } = config;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(skipAuth),
      ...fetchConfig,
    });

    return this.handleResponse<T>(response);
  }
}

// Export singleton instance
console.log('[API] Base URL:', API_BASE_URL);
export const api = new ApiClient(API_BASE_URL);

export default api;
