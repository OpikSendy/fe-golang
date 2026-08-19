'use client';

import { usePaymentWebhook } from '@/features/orders/hooks/usePaymentWebhook';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Order } from '@/types/order';
import confetti from 'canvas-confetti';
import { CheckCircle2, Clock, Printer, QrCode, Sparkles, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

interface PaymentModalProps {
  order: Order | null;
  onClose: () => void;
}

export default function PaymentModal({ order, onClose }: PaymentModalProps) {
  const { mutate: triggerWebhook, isPending } = usePaymentWebhook();
  const [isPaidSuccess, setIsPaidSuccess] = useState(order?.status === 'paid');
  const [transactionId, setTransactionId] = useState<string | null>(null);

  if (!order) return null;

  const handleSimulatePayment = () => {
    triggerWebhook(
      {
        order_id: order.id,
        payment_status: 'paid',
        transaction_id: `TRX-QRIS-${Date.now()}`,
      },
      {
        onSuccess: (res) => {
          setIsPaidSuccess(true);
          setTransactionId(res.transaction_id || `TRX-WEB-${order.id}`);

          // Trigger Confetti Celebration!
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#f97316', '#10b981', '#fbbf24'],
          });
        },
      }
    );
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const qrisPayload = `00020101021226680014ID.GO.ORDERPULSE.WWW01189360091100000000015204581253033605802ID5914OrderPulse POS6007JAKARTA6304${order.id}${order.amount}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-orange-600" />
            <h3 className="text-base font-bold text-slate-900">Instruksi & Simulasi Pembayaran</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Order Summary Box */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>ID Pesanan</span>
              <span className="font-mono font-bold text-orange-600">#ORD-{order.id}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Pelanggan</span>
              <span className="font-semibold text-slate-900">{order.customer_name}</span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Item Pesanan</span>
              <span className="font-medium text-slate-700 text-right max-w-[220px] truncate">
                {order.item_name}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Waktu Transaksi</span>
              <span className="font-mono text-[11px] text-slate-400">{formatDate(order.created_at)}</span>
            </div>
            <div className="flex justify-between items-center border-t border-slate-200/80 pt-2 text-sm font-bold">
              <span className="text-slate-700">Total Tagihan</span>
              <span className="font-mono text-emerald-600 font-extrabold text-base">{formatCurrency(order.amount)}</span>
            </div>
          </div>

          {/* Status Box & QRIS View */}
          {!isPaidSuccess ? (
            <div className="flex flex-col items-center space-y-4 rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-xs">
              {/* Dynamic QRIS Code */}
              <div className="rounded-2xl bg-white p-3 shadow-md border border-slate-100">
                <QRCodeSVG value={qrisPayload} size={150} level="M" includeMargin={false} />
              </div>
              <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
                Scan QRIS di atas menggunakan e-Wallet (Gopay, OVO, ShopeePay) atau M-Banking.
              </p>

              <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
                <Clock className="h-3.5 w-3.5 animate-spin" />
                <span>Menunggu Pembayaran (Pending)...</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center animate-scale-up shadow-sm">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="h-10 w-10 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-emerald-700">Pembayaran Berhasil!</h4>
                <p className="text-xs text-emerald-600 mt-0.5">Status pesanan telah diperbarui menjadi PAID</p>
                {transactionId && (
                  <p className="text-[11px] font-mono text-emerald-600/80 mt-1">Ref ID: {transactionId}</p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            {!isPaidSuccess ? (
              <button
                onClick={handleSimulatePayment}
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 py-3 text-xs font-extrabold text-white shadow-lg shadow-emerald-500/20 hover:opacity-95 active:scale-[0.99] transition disabled:opacity-50"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Mengirim Webhook...
                  </span>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 fill-white" />
                    <span>⚡ Simulasikan Pembayaran Berhasil</span>
                  </>
                )}
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handlePrintReceipt}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-200 transition"
                >
                  <Printer className="h-4 w-4" />
                  <span>Cetak Struk</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:opacity-95 transition"
                >
                  <span>Selesai</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
