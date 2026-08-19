'use client';

import { api } from '@/lib/api';
import { PaymentWebhookInput } from '@/types/order';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function usePaymentWebhook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PaymentWebhookInput) => api.triggerPaymentWebhook(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      if (data?.data?.id) {
        queryClient.invalidateQueries({ queryKey: ['orders', data.data.id] });
      }
    },
  });
}
