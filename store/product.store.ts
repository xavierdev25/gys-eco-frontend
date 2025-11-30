import { create } from 'zustand';
import { strapiService } from '@/services/strapiService';
import { productService } from '@/services/productService';
import { categoryService } from '@/services/categoryService';
import type { Product, Category, ProductFilters } from '@/types';

// Datos de fallback cuando ni Strapi ni el backend están disponibles
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Vaso Biodegradable 12oz',
    slug: 'vaso-biodegradable-12oz',
    description: 'Vaso biodegradable de 12oz hecho de PLA',
    price: 15.5,
    stock: 100,
    categoryId: 'vasos',
    material: 'PLA',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKXaWMyROXP70J9u2FKdAdEfoMmK9XG-41GDBfLIngKsAfJwVqJ5GzxhZnCbN2pKwwWQulABxjMikix0iM5z5Cg075K2vlxAPVj2_vKsBBxnNkDzz_TFGGAlaj1Pp6RQIBJuNkMylPS3dYClCmMxMYRIo-RySau4OPvga5LHtPuZxkqEhjcDRD38-jIPk0VDeIw_MhSoAgML813ASM9-_6KoCk_--1ZgbkGRq5B5uInCl1FmE8UbnNYafZoDNKRDmNJzKBSkhlV2M',
    isCertified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Plato Hondo Ecológico',
    slug: 'plato-hondo-ecologico',
    description: 'Plato hondo ecológico de bagazo de caña',
    price: 22.0,
    stock: 50,
    categoryId: 'platos',
    material: 'Bagazo de Caña',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRuhHLA_7ivIHFsZ-O5TLah5cQsCYavhlAo6V4hL3pmjfO-KDigC0HUD2WzTV1524grWqbiLW8vD8XSTgArsMNDRV6i1QzOM_mkN8zV7cxlr94_BFA5aW-4EY6Jm4sjK5XSbnhMWI2aVlyKRhLi5-5Gm-fvXREoN6QFoZ7p3MXSSEzwGUfPkzOKHVW_AStEDhxaaLu7PehwTg8Jy9wuZiY3ZuDKsUUeF4BQctE8bSWxlxG_wn7Wg4yc3nIrztLnyewHq-DbzRVRxI',
    isCertified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Set de Cubiertos PLA',
    slug: 'set-cubiertos-pla',
    description: 'Set completo de cubiertos biodegradables',
    price: 18.9,
    stock: 200,
    categoryId: 'cubiertos',
    material: 'PLA',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn1xGiEzAyhjqVjN5ISdR22Z0njPyykUKPPUxOuASq88YyXQaZgt7vZC8vFMbHdZ9DMc0dXEiF71I9KdQAFT-qkd2Dh7fLbMgdbuZavbq2s1ModLXUq1QV9Y96zQhR9KtIlb-8sk3VckJVq3Il7cku5qZYOgU6kw5rJos0i3cKoLlNfp0CF3W2V7JXzZQGDvw6RLeWDJRmLCiToJMKDl1eCG9JaNc_UOLet7lF8EYdv5WcbDNItZFxpg8MRVW9Kfz-FreNWBJphCk',
    isCertified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Bolsas Compostables (Rollo)',
    slug: 'bolsas-compostables-rollo',
    description: 'Rollo de bolsas 100% compostables',
    price: 35.0,
    stock: 75,
    categoryId: 'bolsas',
    material: 'Almidón de Maíz',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9_448kUqn3EMHa32jmVnWHVxM_tcVsOOvgyekbqCBzqOoODC0AffhrCZBcFolJxaHLR45eoVkrh8LbBYYRLX7SHNHTz6ClwZ8AOFK1egAwtaXMMgM4_Wd20WfDVo9dEN_rtKtVNu0JVOHg_oIpVVV9YgYQLbblvKRw9eNtEQvWBkTfZ764zQBnEZWen7MUJJNtnI167FShUxloGYf-LsIHh2PA_jC2vVp86hg4f2cHW9cFumlp3Egcn8ZImflOL3O4kvC4TXwd3k',
    isCertified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Empaque para Alimentos',
    slug: 'empaque-alimentos',
    description: 'Empaque biodegradable para alimentos',
    price: 28.5,
    stock: 120,
    categoryId: 'empaques',
    material: 'PLA',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn1-GGuSlo4iuqie-J4WHa51FW0o4wNe6xq10yaT_CFj7Ae5gOzyQW7aOkNeXg6riCMTBLIUZxiF3mjZ0gqpMjUzyQNqRbaSkg32elSiN6MnJZ87NGxZj_cpzxsdIRlDNRj4wg6OpjM0Mqu_tX9ITIm4tl8o2k_YqaJCYR4Znk5uiMy0uRSv5GIocSyPPk3QKCv8_K311lhZCYqxBarE051IMCBFeQf2cl3suS_wS_Do6YEAl2kE_IT77hQI7AJ5ikYxDajkzMDKw',
    isCertified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const FALLBACK_CATEGORIES: Category[] = [
  { id: 'vasos', name: 'Vasos', slug: 'vasos', createdAt: '', updatedAt: '' },
  { id: 'platos', name: 'Platos', slug: 'platos', createdAt: '', updatedAt: '' },
  { id: 'cubiertos', name: 'Cubiertos', slug: 'cubiertos', createdAt: '', updatedAt: '' },
  { id: 'bolsas', name: 'Bolsas', slug: 'bolsas', createdAt: '', updatedAt: '' },
  { id: 'empaques', name: 'Empaques', slug: 'empaques', createdAt: '', updatedAt: '' },
];

type DataSource = 'strapi' | 'backend' | 'fallback';

interface ProductState {
  products: Product[];
  categories: Category[];
  selectedProduct: Product | null;
  filters: ProductFilters;
  isLoading: boolean;
  error: string | null;
  dataSource: DataSource;
  isUsingFallback: boolean;

  // Actions
  fetchProducts: (filters?: ProductFilters) => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchProductBySlug: (slug: string) => Promise<Product | null>;
  setFilters: (filters: ProductFilters) => void;
  clearFilters: () => void;
  setSelectedProduct: (product: Product | null) => void;
  getFilteredProducts: () => Product[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  categories: [],
  selectedProduct: null,
  filters: {},
  isLoading: false,
  error: null,
  dataSource: 'fallback',
  isUsingFallback: true,

  fetchProducts: async (filters?: ProductFilters) => {
    set({ isLoading: true, error: null });
    
    // Try Strapi first
    try {
      console.log('[ProductStore] Trying to fetch from Strapi...');
      const products = await strapiService.getProducts({
        categorySlug: filters?.categoryId,
      });
      console.log('[ProductStore] Strapi products loaded:', products.length);
      set({ products, isLoading: false, dataSource: 'strapi', isUsingFallback: false });
      return;
    } catch (strapiError) {
      console.warn('[ProductStore] Strapi not available, trying backend...', strapiError);
    }

    // Try NestJS backend as fallback
    try {
      console.log('[ProductStore] Trying to fetch from backend...');
      const products = await productService.getAll(filters);
      console.log('[ProductStore] Backend products loaded:', products.length);
      set({ products, isLoading: false, dataSource: 'backend', isUsingFallback: false });
      return;
    } catch (backendError) {
      console.warn('[ProductStore] Backend not available, using fallback data...', backendError);
    }

    // Use fallback data
    console.log('[ProductStore] Using fallback products');
    set({ 
      products: FALLBACK_PRODUCTS, 
      isLoading: false, 
      dataSource: 'fallback',
      isUsingFallback: true,
      error: null 
    });
  },

  fetchCategories: async () => {
    // Try Strapi first
    try {
      const categories = await strapiService.getCategories();
      set({ categories });
      return;
    } catch (strapiError) {
      console.warn('[ProductStore] Strapi categories not available:', strapiError);
    }

    // Try backend
    try {
      const categories = await categoryService.getAll();
      set({ categories });
      return;
    } catch (backendError) {
      console.warn('[ProductStore] Backend categories not available:', backendError);
    }

    // Use fallback
    set({ categories: FALLBACK_CATEGORIES });
  },

  fetchProductBySlug: async (slug: string): Promise<Product | null> => {
    set({ isLoading: true, error: null });
    
    // Try Strapi first
    try {
      const product = await strapiService.getProduct(slug);
      if (product) {
        set({ selectedProduct: product, isLoading: false });
        return product;
      }
    } catch (strapiError) {
      console.warn('[ProductStore] Strapi product fetch failed:', strapiError);
    }

    // Try backend
    try {
      const product = await productService.getBySlug(slug);
      set({ selectedProduct: product, isLoading: false });
      return product;
    } catch (backendError) {
      console.warn('[ProductStore] Backend product fetch failed:', backendError);
    }

    // Search in fallback data
    const fallbackProduct = FALLBACK_PRODUCTS.find(
      p => p.slug === slug || p.id === slug
    );
    
    if (fallbackProduct) {
      set({ selectedProduct: fallbackProduct, isLoading: false });
      return fallbackProduct;
    }

    set({ error: 'Producto no encontrado', isLoading: false });
    return null;
  },

  setFilters: (filters: ProductFilters) => {
    set({ filters });
  },

  clearFilters: () => {
    set({ filters: {} });
  },

  setSelectedProduct: (product: Product | null) => {
    set({ selectedProduct: product });
  },

  getFilteredProducts: () => {
    const { products, filters } = get();
    let filtered = [...products];

    if (filters.categoryId && filters.categoryId !== 'all') {
      filtered = filtered.filter(p => 
        p.categoryId === filters.categoryId || 
        p.category?.slug === filters.categoryId
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    return filtered;
  },
}));

export default useProductStore;
