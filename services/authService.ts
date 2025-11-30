import { api, setTokens, clearTokens } from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '@/lib/constants';
import type { User, LoginCredentials, RegisterCredentials, TokenResponse } from '@/types';

export interface AuthResponse {
  user: User;
  tokens: TokenResponse;
}

class AuthService {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<TokenResponse> {
    const tokens = await api.post<TokenResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
      { skipAuth: true }
    );

    // Store tokens
    setTokens(tokens.accessToken, tokens.refreshToken);

    return tokens;
  }

  /**
   * Register a new user
   */
  async register(credentials: RegisterCredentials): Promise<User> {
    const user = await api.post<User>(
      API_ENDPOINTS.AUTH.REGISTER,
      credentials,
      { skipAuth: true }
    );

    return user;
  }

  /**
   * Logout - clear tokens
   */
  logout(): void {
    clearTokens();
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    return api.get<User>(API_ENDPOINTS.USERS.ME);
  }

  /**
   * Check if user is authenticated (has valid tokens stored)
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Get stored user from localStorage
   */
  getStoredUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }

  /**
   * Store user in localStorage
   */
  setStoredUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  /**
   * Clear stored user
   */
  clearStoredUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
}

export const authService = new AuthService();
export default authService;
