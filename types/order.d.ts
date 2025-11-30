import type { BaseEntity } from './common';
import type { Product } from './product';

// Order status
export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

// Order item entity
export interface OrderItem extends BaseEntity {
    orderId: string;
    productId: string;
    product?: Product;
    quantity: number;
    price: number;
}

// Order entity
export interface Order extends BaseEntity {
    userId: string;
    total: number;
    status: OrderStatus;
    items: OrderItem[];
}

// Create order DTO
export interface CreateOrderDto {
    items: {
        productId: string;
        quantity: number;
    }[];
}

// Order state for store
export interface OrderState {
    orders: Order[];
    currentOrder: Order | null;
    isLoading: boolean;
    error: string | null;
}
