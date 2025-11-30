import { create } from 'zustand';
import { authService } from '@/services/authService';
import type { User, LoginCredentials, RegisterCredentials, TokenResponse } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginCredentials) => Promise<TokenResponse>;
  register: (credentials: RegisterCredentials) => Promise<User>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const tokens = await authService.login(credentials);
      
      // Intentar obtener el perfil del usuario después del login
      try {
        const user = await authService.getCurrentUser();
        authService.setStoredUser(user);
        set({ user, isAuthenticated: true, isLoading: false });
      } catch {
        // Si no podemos obtener el perfil, al menos estamos autenticados
        set({ isAuthenticated: true, isLoading: false });
      }
      
      return tokens;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al iniciar sesión';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  register: async (credentials: RegisterCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authService.register(credentials);
      set({ isLoading: false });
      return user;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al registrarse';
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    authService.logout();
    authService.clearStoredUser();
    set({ user: null, isAuthenticated: false, error: null });
  },

  setUser: (user: User | null) => {
    if (user) {
      authService.setStoredUser(user);
    } else {
      authService.clearStoredUser();
    }
    set({ user, isAuthenticated: !!user });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  checkAuth: () => {
    const isAuth = authService.isAuthenticated();
    const storedUser = authService.getStoredUser();
    
    set({ 
      isAuthenticated: isAuth, 
      user: storedUser 
    });
  },
}));

export default useAuthStore;
