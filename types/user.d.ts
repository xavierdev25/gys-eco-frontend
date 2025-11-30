import type { BaseEntity } from './common';

// User roles
export type UserRole = 'USER' | 'ADMIN';

// User entity
export interface User extends BaseEntity {
    email: string;
    name: string | null;
    role: UserRole;
}

// Auth DTOs
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    name?: string;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}
