import { api } from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '@/lib/constants';
import type { Cart, CartItem, AddToCartDto, UpdateCartItemDto, LocalCartItem, Product } from '@/types';

class CartService {
  /**
   * Get cart (for authenticated users)
   */
  async getCart(): Promise<Cart> {
    return api.get<Cart>(API_ENDPOINTS.CART.BASE);
  }

  /**
   * Add item to cart (for authenticated users)
   */
  async addItem(data: AddToCartDto): Promise<CartItem> {
    return api.post<CartItem>(API_ENDPOINTS.CART.ITEMS, data);
  }

  /**
   * Update cart item quantity
   */
  async updateItem(itemId: string, data: UpdateCartItemDto): Promise<CartItem> {
    return api.patch<CartItem>(API_ENDPOINTS.CART.ITEM(itemId), data);
  }

  /**
   * Remove item from cart
   */
  async removeItem(itemId: string): Promise<void> {
    return api.delete(API_ENDPOINTS.CART.ITEM(itemId));
  }

  /**
   * Clear entire cart
   */
  async clearCart(): Promise<void> {
    return api.delete(API_ENDPOINTS.CART.BASE);
  }

  // ==================== LOCAL CART METHODS ====================
  // For non-authenticated users, we store cart in localStorage

  /**
   * Get local cart from localStorage
   */
  getLocalCart(): LocalCartItem[] {
    if (typeof window === 'undefined') return [];
    const cartJson = localStorage.getItem(STORAGE_KEYS.CART);
    if (!cartJson) return [];
    try {
      return JSON.parse(cartJson);
    } catch {
      return [];
    }
  }

  /**
   * Save local cart to localStorage
   */
  private saveLocalCart(items: LocalCartItem[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
  }

  /**
   * Add item to local cart
   */
  addToLocalCart(product: Product, quantity: number = 1): LocalCartItem[] {
    const cart = this.getLocalCart();
    const existingIndex = cart.findIndex(item => item.productId === product.id);

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        product,
        quantity,
      });
    }

    this.saveLocalCart(cart);
    return cart;
  }

  /**
   * Update item quantity in local cart
   */
  updateLocalCartItem(productId: string, quantity: number): LocalCartItem[] {
    const cart = this.getLocalCart();
    const index = cart.findIndex(item => item.productId === productId);

    if (index >= 0) {
      if (quantity <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = quantity;
      }
    }

    this.saveLocalCart(cart);
    return cart;
  }

  /**
   * Remove item from local cart
   */
  removeFromLocalCart(productId: string): LocalCartItem[] {
    const cart = this.getLocalCart().filter(item => item.productId !== productId);
    this.saveLocalCart(cart);
    return cart;
  }

  /**
   * Clear local cart
   */
  clearLocalCart(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.CART);
  }

  /**
   * Get local cart total
   */
  getLocalCartTotal(): number {
    const cart = this.getLocalCart();
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  /**
   * Get local cart item count
   */
  getLocalCartCount(): number {
    const cart = this.getLocalCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
}

export const cartService = new CartService();
export default cartService;
