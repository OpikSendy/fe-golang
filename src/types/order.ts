export type OrderStatus = 'pending' | 'paid' | 'cancelled';

export interface Order {
  id: number;
  customer_name: string;
  item_name: string;
  amount: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderInput {
  customer_name: string;
  item_name: string;
  amount: number;
}

export interface PaymentWebhookInput {
  order_id: number;
  payment_status: OrderStatus;
  transaction_id?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  total?: number;
  transaction_id?: string;
}

export type MenuCategory = 'all' | 'coffee' | 'food' | 'beverage';

export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'food' | 'beverage';
  price: number;
  description: string;
  image: string;
  badge?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
