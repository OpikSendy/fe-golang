'use client';

import { OrderStatus } from '@/types/order';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: OrderStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'paid') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200 shadow-2xs">
        <CheckCircle2 className="h-3.5 w-3.5" />
        PAID
      </span>
    );
  }

  if (status === 'cancelled') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-700 border border-rose-200">
        <XCircle className="h-3.5 w-3.5" />
        CANCELLED
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700 border border-amber-200 animate-pulse">
      <Clock className="h-3.5 w-3.5" />
      PENDING
    </span>
  );
}
