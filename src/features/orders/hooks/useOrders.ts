'use client';

import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export function useOrders(refetchInterval = 4000) {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await api.getOrders();
      return res.data || [];
    },
    refetchInterval,
    staleTime: 2000,
  });
}
