'use client';

import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => api.getHealth(),
    refetchInterval: 15000, // check health every 15s
    retry: 1,
  });
}
