'use client';

import { formatCurrency } from '@/lib/utils';
import { MenuItem } from '@/types/order';
import { Plus } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  countInCart: number;
}

export default function MenuItemCard({ item, onAddToCart, countInCart }: MenuItemCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-sm transition-all hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/10">
      <div>
        {/* Header Icon / Image + Badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50/80 text-3xl shadow-xs group-hover:scale-105 transition-transform">
            {item.image}
          </div>
          {item.badge && (
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-semibold text-orange-700 border border-orange-200">
              {item.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
          {item.name}
        </h3>
        <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Footer Price & Add Button */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <div>
          <span className="text-[10px] text-slate-400 block font-mono uppercase tracking-wider">Harga</span>
          <span className="text-sm font-extrabold text-slate-900">{formatCurrency(item.price)}</span>
        </div>

        <button
          onClick={() => onAddToCart(item)}
          className={`relative flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all active:scale-95 shadow-sm ${
            countInCart > 0
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25'
              : 'bg-slate-100 text-slate-800 hover:bg-orange-500 hover:text-white'
          }`}
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>{countInCart > 0 ? `Tambah (${countInCart})` : 'Tambah'}</span>
        </button>
      </div>
    </div>
  );
}
