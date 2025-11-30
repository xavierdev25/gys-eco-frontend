import type { BaseEntity, Nullable } from './common';
import type { Category } from './category';

// Product entity
export interface Product extends BaseEntity {
    name: string;
    slug: string;
    description: Nullable<string>;
    price: number;
    stock: number;
    categoryId: string;
    category?: Category;
    // Frontend specific fields (from mock data)
    material?: string;
    imageUrl?: string;
    isCertified?: boolean;
}

// Create product DTO
export interface CreateProductDto {
    name: string;
    slug: string;
    description?: string;
    price: number;
    stock: number;
    categoryId: string;
}

// Update product DTO
export interface UpdateProductDto {
    name?: string;
    slug?: string;
    description?: string;
    price?: number;
    stock?: number;
    categoryId?: string;
}

// Product filter options
export interface ProductFilters {
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    inStock?: boolean;
}

// Product state for store
export interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    categories: Category[];
    filters: ProductFilters;
    isLoading: boolean;
    error: string | null;
}
