import type { BaseEntity } from './common';

// Category entity
export interface Category extends BaseEntity {
    name: string;
    slug: string;
}

// Create category DTO
export interface CreateCategoryDto {
    name: string;
    slug: string;
}

// Update category DTO
export interface UpdateCategoryDto {
    name?: string;
    slug?: string;
}


