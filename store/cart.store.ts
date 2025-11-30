import { create } from 'zustand';
import { cartService } from '@/services/cartService';
import { useAuthStore } from './auth.store';
import type { LocalCartItem, Product } from '@/types';

interface CartState {
  items: LocalCartItem[];
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;

  // Computed
  itemCount: number;
  total: number;

  // Actions
  loadCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,
  isOpen: false,
  itemCount: 0,
  total: 0,

  loadCart: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    
    if (isAuthenticated) {
      // TODO: Implementar carga de carrito desde el backend cuando esté listo
      // Por ahora, usar carrito local
    }
    
    const items = cartService.getLocalCart();
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    set({ items, itemCount, total });
  },

  addItem: (product: Product, quantity = 1) => {
    set({ isLoading: true });
    
    try {
      const items = cartService.addToLocalCart(product, quantity);
      const itemCount = items.reduce((count, item) => count + item.quantity, 0);
      const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      set({ items, itemCount, total, isLoading: false, error: null });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al agregar al carrito';
      set({ error: message, isLoading: false });
    }
  },

  updateQuantity: (productId: string, quantity: number) => {
    set({ isLoading: true });
    
    try {
      const items = cartService.updateLocalCartItem(productId, quantity);
      const itemCount = items.reduce((count, item) => count + item.quantity, 0);
      const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      set({ items, itemCount, total, isLoading: false, error: null });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al actualizar cantidad';
      set({ error: message, isLoading: false });
    }
  },

  removeItem: (productId: string) => {
    set({ isLoading: true });
    
    try {
      const items = cartService.removeFromLocalCart(productId);
      const itemCount = items.reduce((count, item) => count + item.quantity, 0);
      const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      
      set({ items, itemCount, total, isLoading: false, error: null });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al eliminar del carrito';
      set({ error: message, isLoading: false });
    }
  },

  clearCart: () => {
    cartService.clearLocalCart();
    set({ items: [], itemCount: 0, total: 0, error: null });
  },

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useCartStore;
