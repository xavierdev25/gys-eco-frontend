import { STRAPI_URL, STRAPI_API_URL } from '@/lib/constants';
import type { Product, Category } from '@/types';

// Strapi response types
interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface StrapiProduct {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  sku?: string;
  material?: string;
  isCertified?: boolean;
  createdAt: string;
  updatedAt: string;
  category?: StrapiCategory;
  image?: StrapiImage;
  gallery?: StrapiImage[];
  details?: {
    material?: string;
    dimensions?: string;
    thickness?: string;
    color?: string;
    units?: string;
    use?: string;
  };
}

// Default images by product slug (using Google's reliable images)
const PRODUCT_IMAGES: Record<string, string> = {
  // Vasos - all use the same base image with slight variations implied
  'vaso-biodegradable-12oz': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKXaWMyROXP70J9u2FKdAdEfoMmK9XG-41GDBfLIngKsAfJwVqJ5GzxhZnCbN2pKwwWQulABxjMikix0iM5z5Cg075K2vlxAPVj2_vKsBBxnNkDzz_TFGGAlaj1Pp6RQIBJuNkMylPS3dYClCmMxMYRIo-RySau4OPvga5LHtPuZxkqEhjcDRD38-jIPk0VDeIw_MhSoAgML813ASM9-_6KoCk_--1ZgbkGRq5B5uInCl1FmE8UbnNYafZoDNKRDmNJzKBSkhlV2M',
  'vaso-biodegradable-16oz': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKXaWMyROXP70J9u2FKdAdEfoMmK9XG-41GDBfLIngKsAfJwVqJ5GzxhZnCbN2pKwwWQulABxjMikix0iM5z5Cg075K2vlxAPVj2_vKsBBxnNkDzz_TFGGAlaj1Pp6RQIBJuNkMylPS3dYClCmMxMYRIo-RySau4OPvga5LHtPuZxkqEhjcDRD38-jIPk0VDeIw_MhSoAgML813ASM9-_6KoCk_--1ZgbkGRq5B5uInCl1FmE8UbnNYafZoDNKRDmNJzKBSkhlV2M',
  'vaso-cafe-8oz': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKXaWMyROXP70J9u2FKdAdEfoMmK9XG-41GDBfLIngKsAfJwVqJ5GzxhZnCbN2pKwwWQulABxjMikix0iM5z5Cg075K2vlxAPVj2_vKsBBxnNkDzz_TFGGAlaj1Pp6RQIBJuNkMylPS3dYClCmMxMYRIo-RySau4OPvga5LHtPuZxkqEhjcDRD38-jIPk0VDeIw_MhSoAgML813ASM9-_6KoCk_--1ZgbkGRq5B5uInCl1FmE8UbnNYafZoDNKRDmNJzKBSkhlV2M',
  // Platos
  'plato-hondo-ecologico': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRuhHLA_7ivIHFsZ-O5TLah5cQsCYavhlAo6V4hL3pmjfO-KDigC0HUD2WzTV1524grWqbiLW8vD8XSTgArsMNDRV6i1QzOM_mkN8zV7cxlr94_BFA5aW-4EY6Jm4sjK5XSbnhMWI2aVlyKRhLi5-5Gm-fvXREoN6QFoZ7p3MXSSEzwGUfPkzOKHVW_AStEDhxaaLu7PehwTg8Jy9wuZiY3ZuDKsUUeF4BQctE8bSWxlxG_wn7Wg4yc3nIrztLnyewHq-DbzRVRxI',
  'plato-plano-23cm': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRuhHLA_7ivIHFsZ-O5TLah5cQsCYavhlAo6V4hL3pmjfO-KDigC0HUD2WzTV1524grWqbiLW8vD8XSTgArsMNDRV6i1QzOM_mkN8zV7cxlr94_BFA5aW-4EY6Jm4sjK5XSbnhMWI2aVlyKRhLi5-5Gm-fvXREoN6QFoZ7p3MXSSEzwGUfPkzOKHVW_AStEDhxaaLu7PehwTg8Jy9wuZiY3ZuDKsUUeF4BQctE8bSWxlxG_wn7Wg4yc3nIrztLnyewHq-DbzRVRxI',
  'plato-cuadrado-20cm': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRuhHLA_7ivIHFsZ-O5TLah5cQsCYavhlAo6V4hL3pmjfO-KDigC0HUD2WzTV1524grWqbiLW8vD8XSTgArsMNDRV6i1QzOM_mkN8zV7cxlr94_BFA5aW-4EY6Jm4sjK5XSbnhMWI2aVlyKRhLi5-5Gm-fvXREoN6QFoZ7p3MXSSEzwGUfPkzOKHVW_AStEDhxaaLu7PehwTg8Jy9wuZiY3ZuDKsUUeF4BQctE8bSWxlxG_wn7Wg4yc3nIrztLnyewHq-DbzRVRxI',
  // Cubiertos
  'set-cubiertos-pla': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn1xGiEzAyhjqVjN5ISdR22Z0njPyykUKPPUxOuASq88YyXQaZgt7vZC8vFMbHdZ9DMc0dXEiF71I9KdQAFT-qkd2Dh7fLbMgdbuZavbq2s1ModLXUq1QV9Y96zQhR9KtIlb-8sk3VckJVq3Il7cku5qZYOgU6kw5rJos0i3cKoLlNfp0CF3W2V7JXzZQGDvw6RLeWDJRmLCiToJMKDl1eCG9JaNc_UOLet7lF8EYdv5WcbDNItZFxpg8MRVW9Kfz-FreNWBJphCk',
  'tenedor-biodegradable': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn1xGiEzAyhjqVjN5ISdR22Z0njPyykUKPPUxOuASq88YyXQaZgt7vZC8vFMbHdZ9DMc0dXEiF71I9KdQAFT-qkd2Dh7fLbMgdbuZavbq2s1ModLXUq1QV9Y96zQhR9KtIlb-8sk3VckJVq3Il7cku5qZYOgU6kw5rJos0i3cKoLlNfp0CF3W2V7JXzZQGDvw6RLeWDJRmLCiToJMKDl1eCG9JaNc_UOLet7lF8EYdv5WcbDNItZFxpg8MRVW9Kfz-FreNWBJphCk',
  'cuchillo-biodegradable': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn1xGiEzAyhjqVjN5ISdR22Z0njPyykUKPPUxOuASq88YyXQaZgt7vZC8vFMbHdZ9DMc0dXEiF71I9KdQAFT-qkd2Dh7fLbMgdbuZavbq2s1ModLXUq1QV9Y96zQhR9KtIlb-8sk3VckJVq3Il7cku5qZYOgU6kw5rJos0i3cKoLlNfp0CF3W2V7JXzZQGDvw6RLeWDJRmLCiToJMKDl1eCG9JaNc_UOLet7lF8EYdv5WcbDNItZFxpg8MRVW9Kfz-FreNWBJphCk',
  'cuchara-biodegradable': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn1xGiEzAyhjqVjN5ISdR22Z0njPyykUKPPUxOuASq88YyXQaZgt7vZC8vFMbHdZ9DMc0dXEiF71I9KdQAFT-qkd2Dh7fLbMgdbuZavbq2s1ModLXUq1QV9Y96zQhR9KtIlb-8sk3VckJVq3Il7cku5qZYOgU6kw5rJos0i3cKoLlNfp0CF3W2V7JXzZQGDvw6RLeWDJRmLCiToJMKDl1eCG9JaNc_UOLet7lF8EYdv5WcbDNItZFxpg8MRVW9Kfz-FreNWBJphCk',
  'cuchara-sopera-grande': 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn1xGiEzAyhjqVjN5ISdR22Z0njPyykUKPPUxOuASq88YyXQaZgt7vZC8vFMbHdZ9DMc0dXEiF71I9KdQAFT-qkd2Dh7fLbMgdbuZavbq2s1ModLXUq1QV9Y96zQhR9KtIlb-8sk3VckJVq3Il7cku5qZYOgU6kw5rJos0i3cKoLlNfp0CF3W2V7JXzZQGDvw6RLeWDJRmLCiToJMKDl1eCG9JaNc_UOLet7lF8EYdv5WcbDNItZFxpg8MRVW9Kfz-FreNWBJphCk',
  // Bolsas
  'bolsas-compostables-rollo': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9_448kUqn3EMHa32jmVnWHVxM_tcVsOOvgyekbqCBzqOoODC0AffhrCZBcFolJxaHLR45eoVkrh8LbBYYRLX7SHNHTz6ClwZ8AOFK1egAwtaXMMgM4_Wd20WfDVo9dEN_rtKtVNu0JVOHg_oIpVVV9YgYQLbblvKRw9eNtEQvWBkTfZ764zQBnEZWen7MUJJNtnI167FShUxloGYf-LsIHh2PA_jC2vVp86hg4f2cHW9cFumlp3Egcn8ZImflOL3O4kvC4TXwd3k',
  'bolsa-kraft-asa': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9_448kUqn3EMHa32jmVnWHVxM_tcVsOOvgyekbqCBzqOoODC0AffhrCZBcFolJxaHLR45eoVkrh8LbBYYRLX7SHNHTz6ClwZ8AOFK1egAwtaXMMgM4_Wd20WfDVo9dEN_rtKtVNu0JVOHg_oIpVVV9YgYQLbblvKRw9eNtEQvWBkTfZ764zQBnEZWen7MUJJNtnI167FShUxloGYf-LsIHh2PA_jC2vVp86hg4f2cHW9cFumlp3Egcn8ZImflOL3O4kvC4TXwd3k',
  'bolsa-biodegradable-grande': 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9_448kUqn3EMHa32jmVnWHVxM_tcVsOOvgyekbqCBzqOoODC0AffhrCZBcFolJxaHLR45eoVkrh8LbBYYRLX7SHNHTz6ClwZ8AOFK1egAwtaXMMgM4_Wd20WfDVo9dEN_rtKtVNu0JVOHg_oIpVVV9YgYQLbblvKRw9eNtEQvWBkTfZ764zQBnEZWen7MUJJNtnI167FShUxloGYf-LsIHh2PA_jC2vVp86hg4f2cHW9cFumlp3Egcn8ZImflOL3O4kvC4TXwd3k',
  // Empaques
  'empaque-alimentos-500ml': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn1-GGuSlo4iuqie-J4WHa51FW0o4wNe6xq10yaT_CFj7Ae5gOzyQW7aOkNeXg6riCMTBLIUZxiF3mjZ0gqpMjUzyQNqRbaSkg32elSiN6MnJZ87NGxZj_cpzxsdIRlDNRj4wg6OpjM0Mqu_tX9ITIm4tl8o2k_YqaJCYR4Znk5uiMy0uRSv5GIocSyPPk3QKCv8_K311lhZCYqxBarE051IMCBFeQf2cl3suS_wS_Do6YEAl2kE_IT77hQI7AJ5ikYxDajkzMDKw',
  'empaque-alimentos-750ml': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn1-GGuSlo4iuqie-J4WHa51FW0o4wNe6xq10yaT_CFj7Ae5gOzyQW7aOkNeXg6riCMTBLIUZxiF3mjZ0gqpMjUzyQNqRbaSkg32elSiN6MnJZ87NGxZj_cpzxsdIRlDNRj4wg6OpjM0Mqu_tX9ITIm4tl8o2k_YqaJCYR4Znk5uiMy0uRSv5GIocSyPPk3QKCv8_K311lhZCYqxBarE051IMCBFeQf2cl3suS_wS_Do6YEAl2kE_IT77hQI7AJ5ikYxDajkzMDKw',
  'contenedor-hamburguesa': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn1-GGuSlo4iuqie-J4WHa51FW0o4wNe6xq10yaT_CFj7Ae5gOzyQW7aOkNeXg6riCMTBLIUZxiF3mjZ0gqpMjUzyQNqRbaSkg32elSiN6MnJZ87NGxZj_cpzxsdIRlDNRj4wg6OpjM0Mqu_tX9ITIm4tl8o2k_YqaJCYR4Znk5uiMy0uRSv5GIocSyPPk3QKCv8_K311lhZCYqxBarE051IMCBFeQf2cl3suS_wS_Do6YEAl2kE_IT77hQI7AJ5ikYxDajkzMDKw',
  'contenedor-3-divisiones': 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn1-GGuSlo4iuqie-J4WHa51FW0o4wNe6xq10yaT_CFj7Ae5gOzyQW7aOkNeXg6riCMTBLIUZxiF3mjZ0gqpMjUzyQNqRbaSkg32elSiN6MnJZ87NGxZj_cpzxsdIRlDNRj4wg6OpjM0Mqu_tX9ITIm4tl8o2k_YqaJCYR4Znk5uiMy0uRSv5GIocSyPPk3QKCv8_K311lhZCYqxBarE051IMCBFeQf2cl3suS_wS_Do6YEAl2kE_IT77hQI7AJ5ikYxDajkzMDKw',
};

// Default image by category as fallback
const CATEGORY_IMAGES: Record<string, string> = {
  vasos: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKXaWMyROXP70J9u2FKdAdEfoMmK9XG-41GDBfLIngKsAfJwVqJ5GzxhZnCbN2pKwwWQulABxjMikix0iM5z5Cg075K2vlxAPVj2_vKsBBxnNkDzz_TFGGAlaj1Pp6RQIBJuNkMylPS3dYClCmMxMYRIo-RySau4OPvga5LHtPuZxkqEhjcDRD38-jIPk0VDeIw_MhSoAgML813ASM9-_6KoCk_--1ZgbkGRq5B5uInCl1FmE8UbnNYafZoDNKRDmNJzKBSkhlV2M',
  platos: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRuhHLA_7ivIHFsZ-O5TLah5cQsCYavhlAo6V4hL3pmjfO-KDigC0HUD2WzTV1524grWqbiLW8vD8XSTgArsMNDRV6i1QzOM_mkN8zV7cxlr94_BFA5aW-4EY6Jm4sjK5XSbnhMWI2aVlyKRhLi5-5Gm-fvXREoN6QFoZ7p3MXSSEzwGUfPkzOKHVW_AStEDhxaaLu7PehwTg8Jy9wuZiY3ZuDKsUUeF4BQctE8bSWxlxG_wn7Wg4yc3nIrztLnyewHq-DbzRVRxI',
  cubiertos: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn1xGiEzAyhjqVjN5ISdR22Z0njPyykUKPPUxOuASq88YyXQaZgt7vZC8vFMbHdZ9DMc0dXEiF71I9KdQAFT-qkd2Dh7fLbMgdbuZavbq2s1ModLXUq1QV9Y96zQhR9KtIlb-8sk3VckJVq3Il7cku5qZYOgU6kw5rJos0i3cKoLlNfp0CF3W2V7JXzZQGDvw6RLeWDJRmLCiToJMKDl1eCG9JaNc_UOLet7lF8EYdv5WcbDNItZFxpg8MRVW9Kfz-FreNWBJphCk',
  bolsas: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9_448kUqn3EMHa32jmVnWHVxM_tcVsOOvgyekbqCBzqOoODC0AffhrCZBcFolJxaHLR45eoVkrh8LbBYYRLX7SHNHTz6ClwZ8AOFK1egAwtaXMMgM4_Wd20WfDVo9dEN_rtKtVNu0JVOHg_oIpVVV9YgYQLbblvKRw9eNtEQvWBkTfZ764zQBnEZWen7MUJJNtnI167FShUxloGYf-LsIHh2PA_jC2vVp86hg4f2cHW9cFumlp3Egcn8ZImflOL3O4kvC4TXwd3k',
  empaques: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCn1-GGuSlo4iuqie-J4WHa51FW0o4wNe6xq10yaT_CFj7Ae5gOzyQW7aOkNeXg6riCMTBLIUZxiF3mjZ0gqpMjUzyQNqRbaSkg32elSiN6MnJZ87NGxZj_cpzxsdIRlDNRj4wg6OpjM0Mqu_tX9ITIm4tl8o2k_YqaJCYR4Znk5uiMy0uRSv5GIocSyPPk3QKCv8_K311lhZCYqxBarE051IMCBFeQf2cl3suS_wS_Do6YEAl2kE_IT77hQI7AJ5ikYxDajkzMDKw',
};

const DEFAULT_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKXaWMyROXP70J9u2FKdAdEfoMmK9XG-41GDBfLIngKsAfJwVqJ5GzxhZnCbN2pKwwWQulABxjMikix0iM5z5Cg075K2vlxAPVj2_vKsBBxnNkDzz_TFGGAlaj1Pp6RQIBJuNkMylPS3dYClCmMxMYRIo-RySau4OPvga5LHtPuZxkqEhjcDRD38-jIPk0VDeIw_MhSoAgML813ASM9-_6KoCk_--1ZgbkGRq5B5uInCl1FmE8UbnNYafZoDNKRDmNJzKBSkhlV2M';

// Helper to get full image URL
const getImageUrl = (image: StrapiImage | undefined, productSlug?: string, categorySlug?: string): string => {
  // If product has an image in Strapi, use it
  if (image?.url) {
    if (image.url.startsWith('/')) {
      return `${STRAPI_URL}${image.url}`;
    }
    return image.url;
  }
  
  // Try product-specific image
  if (productSlug && PRODUCT_IMAGES[productSlug]) {
    return PRODUCT_IMAGES[productSlug];
  }
  
  // Try category-specific image
  if (categorySlug && CATEGORY_IMAGES[categorySlug]) {
    return CATEGORY_IMAGES[categorySlug];
  }
  
  // Return default
  return DEFAULT_IMAGE;
};

// Transform Strapi product to frontend Product type
const transformProduct = (strapiProduct: StrapiProduct): Product & { 
  sku?: string; 
  gallery: string[];
  details: {
    material: string;
    dimensions: string;
    thickness: string;
    color: string;
    units: string;
    use: string;
  };
} => {
  const productSlug = strapiProduct.slug || '';
  const categorySlug = strapiProduct.category?.slug || '';
  
  return {
    id: strapiProduct.documentId,
    name: strapiProduct.name,
    slug: strapiProduct.slug,
    description: strapiProduct.description || null,
    price: strapiProduct.price,
    stock: strapiProduct.stock,
    categoryId: strapiProduct.category?.documentId || '',
    category: strapiProduct.category ? {
      id: strapiProduct.category.documentId,
      name: strapiProduct.category.name,
      slug: strapiProduct.category.slug,
      createdAt: strapiProduct.category.createdAt,
      updatedAt: strapiProduct.category.updatedAt,
    } : undefined,
    material: strapiProduct.material,
    imageUrl: getImageUrl(strapiProduct.image, productSlug, categorySlug),
    isCertified: strapiProduct.isCertified ?? true,
    sku: strapiProduct.sku,
    gallery: strapiProduct.gallery?.map(img => getImageUrl(img, productSlug, categorySlug)) || [getImageUrl(strapiProduct.image, productSlug, categorySlug)],
    details: {
      material: strapiProduct.details?.material || strapiProduct.material || 'Material ecológico',
      dimensions: strapiProduct.details?.dimensions || 'Consultar',
      thickness: strapiProduct.details?.thickness || 'Estándar',
      color: strapiProduct.details?.color || 'Natural',
      units: strapiProduct.details?.units || 'Consultar disponibilidad',
      use: strapiProduct.details?.use || strapiProduct.description || 'Uso general',
    },
    createdAt: strapiProduct.createdAt,
    updatedAt: strapiProduct.updatedAt,
  };
};

// Transform Strapi category to frontend Category type
const transformCategory = (strapiCategory: StrapiCategory): Category => {
  return {
    id: strapiCategory.documentId,
    name: strapiCategory.name,
    slug: strapiCategory.slug,
    createdAt: strapiCategory.createdAt,
    updatedAt: strapiCategory.updatedAt,
  };
};

class StrapiService {
  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${STRAPI_API_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all products from Strapi
   */
  async getProducts(params?: { 
    categorySlug?: string;
    populate?: string;
  }): Promise<Product[]> {
    let endpoint = '/products?populate=*';
    
    if (params?.categorySlug && params.categorySlug !== 'all') {
      endpoint += `&filters[category][slug][$eq]=${params.categorySlug}`;
    }

    try {
      const response = await this.fetch<StrapiResponse<StrapiProduct[]>>(endpoint);
      return response.data.map(transformProduct);
    } catch (error) {
      console.error('Error fetching products from Strapi:', error);
      throw error;
    }
  }

  /**
   * Get a single product by slug or documentId
   */
  async getProduct(slugOrId: string): Promise<Product | null> {
    try {
      // First try to find by slug
      const bySlugEndpoint = `/products?filters[slug][$eq]=${slugOrId}&populate=*`;
      const slugResponse = await this.fetch<StrapiResponse<StrapiProduct[]>>(bySlugEndpoint);
      
      if (slugResponse.data.length > 0) {
        return transformProduct(slugResponse.data[0]);
      }

      // If not found by slug, try by documentId
      const byIdEndpoint = `/products/${slugOrId}?populate=*`;
      try {
        const idResponse = await this.fetch<StrapiResponse<StrapiProduct>>(byIdEndpoint);
        if (idResponse.data) {
          return transformProduct(idResponse.data);
        }
      } catch {
        // Product not found by ID either
      }

      return null;
    } catch (error) {
      console.error('Error fetching product from Strapi:', error);
      throw error;
    }
  }

  /**
   * Get all categories from Strapi
   */
  async getCategories(): Promise<Category[]> {
    try {
      const response = await this.fetch<StrapiResponse<StrapiCategory[]>>('/categories');
      return response.data.map(transformCategory);
    } catch (error) {
      console.error('Error fetching categories from Strapi:', error);
      throw error;
    }
  }

  /**
   * Get a single category by slug
   */
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      const endpoint = `/categories?filters[slug][$eq]=${slug}`;
      const response = await this.fetch<StrapiResponse<StrapiCategory[]>>(endpoint);
      
      if (response.data.length > 0) {
        return transformCategory(response.data[0]);
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching category from Strapi:', error);
      throw error;
    }
  }

  /**
   * Check if Strapi is available
   */
  async isAvailable(): Promise<boolean> {
    try {
      await fetch(`${STRAPI_URL}/api/products?pagination[limit]=1`, {
        method: 'HEAD',
      });
      return true;
    } catch {
      return false;
    }
  }
}

export const strapiService = new StrapiService();
export default strapiService;


