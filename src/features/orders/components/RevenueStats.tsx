'use client';

import { formatCurrency } from '@/lib/utils';
import { Order } from '@/types/order';
import { CheckCircle2, Clock, DollarSign, ShoppingBag } from 'lucide-react';

interface RevenueStatsProps {
  orders: Order[];
}

export default function RevenueStats({ orders }: RevenueStatsProps) {
  const paidOrders = orders.filter((o) => o.status === 'paid');
  const pendingOrders = orders.filter((o) => o.status === 'pending');

  const totalRevenue = paidOrders.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Omset */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Omset Sukses</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 border border-emerald-200">
            <DollarSign className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-2xl font-extrabold font-mono text-emerald-600">
            {formatCurrency(totalRevenue)}
          </span>
          <p className="mt-1 text-[11px] text-slate-500">Dari transaksi berstatus PAID</p>
        </div>
      </div>

      {/* Total Transaksi */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Transaksi</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-orange-600 border border-orange-200">
            <ShoppingBag className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-2xl font-extrabold font-mono text-slate-900">{orders.length}</span>
          <p className="mt-1 text-[11px] text-slate-500">Keseluruhan pesanan terdaftar</p>
        </div>
      </div>

      {/* Paid Count */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pesanan Paid</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 border border-emerald-200">
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-2xl font-extrabold font-mono text-emerald-600">{paidOrders.length}</span>
          <p className="mt-1 text-[11px] text-slate-500">Pembayaran tuntas & lunas</p>
        </div>
      </div>

      {/* Pending Count */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pesanan Pending</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-600 border border-amber-200">
            <Clock className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-2xl font-extrabold font-mono text-amber-600">{pendingOrders.length}</span>
          <p className="mt-1 text-[11px] text-slate-500">Menunggu simulasi bayar</p>
        </div>
      </div>
    </div>
  );
}
