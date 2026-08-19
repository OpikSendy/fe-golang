'use client';

import StatusBadge from '@/features/orders/components/StatusBadge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Order, OrderStatus } from '@/types/order';
import { CreditCard, Search } from 'lucide-react';
import { useState } from 'react';

interface OrderTableProps {
  orders: Order[];
  onOpenPaymentModal: (order: Order) => void;
}

export default function OrderTable({ orders, onOpenPaymentModal }: OrderTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-sm">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-b border-slate-100 bg-slate-50/50">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari ID, Pelanggan, atau Item..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {(['all', 'pending', 'paid'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition ${
                statusFilter === st
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {st === 'all' ? 'Semua Status' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 font-mono">
            <tr>
              <th className="px-4 py-3.5 font-bold uppercase tracking-wider">ID Order</th>
              <th className="px-4 py-3.5 font-bold uppercase tracking-wider">Pelanggan</th>
              <th className="px-4 py-3.5 font-bold uppercase tracking-wider">Item Pesanan</th>
              <th className="px-4 py-3.5 font-bold uppercase tracking-wider">Total Tagihan</th>
              <th className="px-4 py-3.5 font-bold uppercase tracking-wider">Status</th>
              <th className="px-4 py-3.5 font-bold uppercase tracking-wider">Waktu</th>
              <th className="px-4 py-3.5 font-bold uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                  Tidak ada pesanan yang cocok dengan kriteria pencarian/filter.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-4 py-3 font-mono font-extrabold text-orange-600">
                    #ORD-{order.id}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-900">{order.customer_name}</td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{order.item_name}</td>
                  <td className="px-4 py-3 font-mono font-extrabold text-emerald-600">
                    {formatCurrency(order.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-slate-500">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {order.status === 'pending' ? (
                      <button
                        onClick={() => onOpenPaymentModal(order)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-extrabold text-white shadow-xs hover:bg-emerald-600 transition active:scale-95"
                      >
                        <CreditCard className="h-3.5 w-3.5" />
                        <span>Simulasi Bayar</span>
                      </button>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-400 italic">Selesai</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
