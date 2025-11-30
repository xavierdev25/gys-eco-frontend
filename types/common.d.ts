// API Response types
export interface ApiResponse<T> {
    data: T;
    message?: string;
    statusCode?: number;
}

export interface ApiError {
    message: string | string[];
    error?: string;
    statusCode: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Generic utility types
export type Nullable<T> = T | null;

export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
}
