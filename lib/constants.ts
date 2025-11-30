// API Configuration
// Hardcoded for development - the env variable is optional
const getApiBaseUrl = (): string => {
  // Check if we have an environment variable set
  const envUrl = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_API_URL : undefined;
  
  // Return env URL if it exists and is not empty, otherwise use default
  if (envUrl && envUrl.trim() !== '') {
    return envUrl;
  }
  
  // Default to localhost backend
  return 'http://localhost:3001/api/v1';
};

export const API_BASE_URL = getApiBaseUrl();

// Strapi CMS Configuration
const getStrapiUrl = (): string => {
  const envUrl = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_STRAPI_URL : undefined;
  
  if (envUrl && envUrl.trim() !== '') {
    return envUrl;
  }
  
  return 'http://localhost:1337';
};

export const STRAPI_URL = getStrapiUrl();
export const STRAPI_API_URL = `${STRAPI_URL}/api`;

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
  },
  // Users
  USERS: {
    BASE: '/users',
    ME: '/users/me',
  },
  // Products
  PRODUCTS: {
    BASE: '/products',
    BY_SLUG: (slug: string) => `/products/${slug}`,
    BY_CATEGORY: (categoryId: string) => `/products?categoryId=${categoryId}`,
  },
  // Categories
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id: string) => `/categories/${id}`,
  },
  // Cart
  CART: {
    BASE: '/cart',
    ITEMS: '/cart/items',
    ITEM: (itemId: string) => `/cart/items/${itemId}`,
  },
  // Orders
  ORDERS: {
    BASE: '/orders',
    BY_ID: (id: string) => `/orders/${id}`,
  },
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'gys_access_token',
  REFRESH_TOKEN: 'gys_refresh_token',
  USER: 'gys_user',
  CART: 'gys_cart',
} as const;

// Product Categories (para filtros locales hasta que se carguen del backend)
export const DEFAULT_CATEGORIES = [
  { id: 'all', name: 'Todos', slug: 'todos' },
  { id: 'vasos', name: 'Vasos', slug: 'vasos' },
  { id: 'platos', name: 'Platos', slug: 'platos' },
  { id: 'cubiertos', name: 'Cubiertos', slug: 'cubiertos' },
  { id: 'bolsas', name: 'Bolsas', slug: 'bolsas' },
  { id: 'empaques', name: 'Empaques', slug: 'empaques' },
] as const;

// UI Constants
export const UI = {
  TOAST_DURATION: 3000,
  DEBOUNCE_DELAY: 300,
} as const;
