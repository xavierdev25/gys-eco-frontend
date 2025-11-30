import { api } from './api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { Product, CreateProductDto, ProductFilters } from '@/types';

class ProductService {
  /**
   * Get all products with optional filters
   */
  async getAll(filters?: ProductFilters): Promise<Product[]> {
    let endpoint: string = API_ENDPOINTS.PRODUCTS.BASE;

    if (filters?.categoryId && filters.categoryId !== 'all') {
      endpoint = API_ENDPOINTS.PRODUCTS.BY_CATEGORY(filters.categoryId);
    }

    return api.get<Product[]>(endpoint, { skipAuth: true });
  }

  /**
   * Get product by slug
   */
  async getBySlug(slug: string): Promise<Product> {
    return api.get<Product>(API_ENDPOINTS.PRODUCTS.BY_SLUG(slug), { skipAuth: true });
  }

  /**
   * Get product by ID
   */
  async getById(id: string): Promise<Product> {
    return api.get<Product>(`${API_ENDPOINTS.PRODUCTS.BASE}/${id}`, { skipAuth: true });
  }

  /**
   * Create a new product (admin only)
   */
  async create(data: CreateProductDto): Promise<Product> {
    return api.post<Product>(API_ENDPOINTS.PRODUCTS.BASE, data);
  }

  /**
   * Update a product (admin only)
   */
  async update(id: string, data: Partial<CreateProductDto>): Promise<Product> {
    return api.patch<Product>(`${API_ENDPOINTS.PRODUCTS.BASE}/${id}`, data);
  }

  /**
   * Delete a product (admin only)
   */
  async delete(id: string): Promise<void> {
    return api.delete(`${API_ENDPOINTS.PRODUCTS.BASE}/${id}`);
  }

  /**
   * Get products by category ID
   */
  async getByCategory(categoryId: string): Promise<Product[]> {
    return api.get<Product[]>(API_ENDPOINTS.PRODUCTS.BY_CATEGORY(categoryId), { skipAuth: true });
  }
}

export const productService = new ProductService();
export default productService;
