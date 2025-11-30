import type { BaseEntity } from './common';
import type { Product } from './product';

// Cart item entity
export interface CartItem extends BaseEntity {
  cartId: string;
  productId: string;
  product?: Product;
  quantity: number;
}

// Cart entity
export interface Cart extends BaseEntity {
  userId: string;
  items: CartItem[];
}

// Add to cart DTO
export interface AddToCartDto {
  productId: string;
  quantity: number;
}

// Update cart item DTO
export interface UpdateCartItemDto {
  quantity: number;
}

// Cart state for store (local cart for non-authenticated users)
export interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

// Cart item for local storage (simplified)
export interface LocalCartItem {
  productId: string;
  product: Product;
  quantity: number;
}
