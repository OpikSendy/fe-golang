'use client';

import OrderTable from '@/features/orders/components/OrderTable';
import RevenueStats from '@/features/orders/components/RevenueStats';
import { useOrders } from '@/features/orders/hooks/useOrders';
import PaymentModal from '@/features/payment/components/PaymentModal';
import { Order } from '@/types/order';
import { Activity, RefreshCw, Server } from 'lucide-react';
import { useState } from 'react';

export default function OrderTrackerDashboardPage() {
  const { data: orders = [], isLoading, isRefetching, refetch } = useOrders(4000);
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState<Order | null>(null);

  return (
    <div className="space-y-6">
      {/* Page Header Banner - Clean White & Emerald Theme */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-200/80 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-6 sm:p-8 text-white shadow-xl shadow-emerald-500/15">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-100 bg-white/15 px-3 py-1 rounded-full w-fit mb-2 backdrop-blur-xs">
              <Activity className="h-3.5 w-3.5" />
              <span>Real-time TanStack Query Polling (Every 4s)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Live Order Tracker & Revenue Dashboard
            </h1>
            <p className="text-xs text-emerald-100 mt-1 max-w-xl leading-relaxed">
              Memantau antrean status pesanan yang masuk dan statistik omset toko secara instan dari database PostgreSQL Railway.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              disabled={isRefetching}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-emerald-700 shadow-md hover:bg-emerald-50 transition active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefetching ? 'animate-spin text-emerald-600' : ''}`} />
              <span>{isRefetching ? 'Refetching...' : 'Manual Refetch'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-xs">
          <Server className="h-10 w-10 text-emerald-500 animate-bounce mb-3" />
          <p className="text-sm font-bold text-slate-800">Mengambil data dari Railway Backend...</p>
          <p className="text-xs text-slate-500 mt-1">Harap tunggu sebentar</p>
        </div>
      ) : (
        <>
          {/* Revenue & Transaction Statistics Cards */}
          <RevenueStats orders={orders} />

          {/* Real-time Order Table */}
          <OrderTable
            orders={orders}
            onOpenPaymentModal={(order) => setSelectedOrderForPayment(order)}
          />
        </>
      )}

      {/* Payment Modal for Dashboard trigger */}
      {selectedOrderForPayment && (
        <PaymentModal
          order={selectedOrderForPayment}
          onClose={() => setSelectedOrderForPayment(null)}
        />
      )}
    </div>
  );
}
