import { ApiResponse, CreateOrderInput, Order, PaymentWebhookInput } from '@/types/order';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://golangpr.up.railway.app';

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || `API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  async getHealth(): Promise<{ status: string; message: string }> {
    return fetcher<{ status: string; message: string }>('/health', { cache: 'no-store' });
  },

  async getOrders(): Promise<ApiResponse<Order[]>> {
    return fetcher<ApiResponse<Order[]>>('/api/v1/orders', { cache: 'no-store' });
  },

  async getOrderById(id: number): Promise<ApiResponse<Order>> {
    return fetcher<ApiResponse<Order>>(`/api/v1/orders/${id}`, { cache: 'no-store' });
  },

  async createOrder(payload: CreateOrderInput): Promise<ApiResponse<Order>> {
    return fetcher<ApiResponse<Order>>('/api/v1/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  async triggerPaymentWebhook(payload: PaymentWebhookInput): Promise<ApiResponse<Order>> {
    return fetcher<ApiResponse<Order>>('/api/v1/webhooks/payment', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
