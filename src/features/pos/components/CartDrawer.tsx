'use client';

import { formatCurrency } from '@/lib/utils';
import { CartItem } from '@/types/order';
import { Minus, Plus, ShoppingBag, Trash2, User } from 'lucide-react';
import { useState } from 'react';

interface CartDrawerProps {
  cart: CartItem[];
  onUpdateQuantity: (menuItemId: string, delta: number) => void;
  onClearCart: () => void;
  onCheckout: (customerName: string, formattedItemsSummary: string, totalAmount: number) => void;
  isSubmitting: boolean;
}

export default function CartDrawer({
  cart,
  onUpdateQuantity,
  onClearCart,
  onCheckout,
  isSubmitting,
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const totalAmount = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Nama pelanggan wajib diisi!');
      return;
    }
    if (cart.length === 0) {
      setErrorMsg('Keranjang masih kosong!');
      return;
    }
    setErrorMsg('');

    const itemsSummary = cart
      .map((item) => `${item.quantity}x ${item.menuItem.name}`)
      .join(', ');

    onCheckout(customerName.trim(), itemsSummary, totalAmount);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-200/90 bg-white p-5 shadow-lg shadow-orange-500/5">
      {/* Drawer Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600 border border-orange-200">
            <ShoppingBag className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Keranjang Kasir</h2>
            <p className="text-[11px] text-slate-500 font-mono">
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} dipilih
            </p>
          </div>
        </div>

        {cart.length > 0 && (
          <button
            onClick={onClearCart}
            className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 transition-colors p-1.5 rounded-lg hover:bg-rose-50"
            title="Kosongkan Keranjang"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Form Input Pelanggan */}
      <div className="my-4">
        <label className="block text-xs font-bold text-slate-700 mb-1.5">
          Nama Pelanggan <span className="text-orange-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={customerName}
            onChange={(e) => {
              setCustomerName(e.target.value);
              if (errorMsg) setErrorMsg('');
            }}
            placeholder="Contoh: Budi Santoso"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition"
          />
        </div>
        {errorMsg && <p className="mt-1 text-[11px] text-rose-500 font-medium">{errorMsg}</p>}
      </div>

      {/* Cart Item List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 my-2 min-h-[180px] max-h-[340px]">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-10 text-center text-slate-400">
            <ShoppingBag className="h-10 w-10 text-slate-300 mb-2 stroke-1" />
            <p className="text-xs font-semibold text-slate-600">Keranjang masih kosong</p>
            <p className="text-[11px] text-slate-400 mt-1">Pilih menu dari katalog di sebelah kiri</p>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.menuItem.id}
              className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 p-3 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{item.menuItem.image}</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.menuItem.name}</h4>
                  <span className="text-[11px] font-mono font-bold text-orange-600">
                    {formatCurrency(item.menuItem.price)}
                  </span>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 p-1 shadow-2xs">
                <button
                  onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                  className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-5 text-center text-xs font-mono font-bold text-slate-900">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                  className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Footer */}
      <div className="border-t border-slate-100 pt-4 mt-auto space-y-3">
        <div className="flex justify-between items-center text-xs text-slate-600">
          <span>Subtotal Tagihan</span>
          <span className="font-mono font-extrabold text-slate-900 text-base">
            {formatCurrency(totalAmount)}
          </span>
        </div>

        <button
          onClick={handleCheckoutSubmit}
          disabled={cart.length === 0 || isSubmitting}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-3 text-xs font-extrabold text-white shadow-lg shadow-orange-500/25 hover:opacity-95 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Memproses Checkout...
            </span>
          ) : (
            <>
              <span>Proses Checkout Pesanan</span>
              <span className="font-mono">({formatCurrency(totalAmount)})</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
