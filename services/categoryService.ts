import { api } from './api';
import { API_ENDPOINTS } from '@/lib/constants';
import type { Category, CreateCategoryDto } from '@/types';

class CategoryService {
  /**
   * Get all categories
   */
  async getAll(): Promise<Category[]> {
    return api.get<Category[]>(API_ENDPOINTS.CATEGORIES.BASE, { skipAuth: true });
  }

  /**
   * Get category by ID
   */
  async getById(id: string): Promise<Category> {
    return api.get<Category>(API_ENDPOINTS.CATEGORIES.BY_ID(id), { skipAuth: true });
  }

  /**
   * Create a new category (admin only)
   */
  async create(data: CreateCategoryDto): Promise<Category> {
    return api.post<Category>(API_ENDPOINTS.CATEGORIES.BASE, data);
  }

  /**
   * Update a category (admin only)
   */
  async update(id: string, data: Partial<CreateCategoryDto>): Promise<Category> {
    return api.patch<Category>(API_ENDPOINTS.CATEGORIES.BY_ID(id), data);
  }

  /**
   * Delete a category (admin only)
   */
  async delete(id: string): Promise<void> {
    return api.delete(API_ENDPOINTS.CATEGORIES.BY_ID(id));
  }
}

export const categoryService = new CategoryService();
export default categoryService;


