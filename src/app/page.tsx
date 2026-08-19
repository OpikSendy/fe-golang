'use client';

import { useCreateOrder } from '@/features/orders/hooks/useCreateOrder';
import PaymentModal from '@/features/payment/components/PaymentModal';
import CartDrawer from '@/features/pos/components/CartDrawer';
import MenuGrid from '@/features/pos/components/MenuGrid';
import MenuItemCard from '@/features/pos/components/MenuItemCard';
import { STATIC_MENU_ITEMS } from '@/features/pos/data/staticMenuItems';
import { CartItem, MenuCategory, MenuItem, Order } from '@/types/order';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function CashierPOSPage() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activePaymentOrder, setActivePaymentOrder] = useState<Order | null>(null);

  const { mutate: createOrder, isPending: isSubmittingOrder } = useCreateOrder();

  const cartCounts: Record<string, number> = cart.reduce((acc, item) => {
    acc[item.menuItem.id] = item.quantity;
    return acc;
  }, {} as Record<string, number>);

  const handleAddToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((c) => c.menuItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prevCart, { menuItem: item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (menuItemId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.menuItem.id === menuItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleCheckout = (
    customerName: string,
    formattedItemsSummary: string,
    totalAmount: number
  ) => {
    createOrder(
      {
        customer_name: customerName,
        item_name: formattedItemsSummary,
        amount: totalAmount,
      },
      {
        onSuccess: (res) => {
          setCart([]);
          if (res.data) {
            setActivePaymentOrder(res.data);
          }
        },
        onError: (err) => {
          alert(`Gagal membuat order: ${err.message}`);
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-orange-200/80 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 p-6 sm:p-8 text-white shadow-xl shadow-orange-500/15">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-100 bg-white/15 px-3 py-1 rounded-full w-fit mb-2 backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5" />
              <span>OrderPulse POS PWA App</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Katalog Menu & Checkout Order
            </h1>
            <p className="text-xs text-orange-100 mt-1 max-w-xl leading-relaxed">
              Pilih menu pesanan kasir, isi nama pelanggan, dan buat checkout order yang terhubung langsung ke live backend Railway Golang.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-3 rounded-2xl bg-white/15 p-3.5 backdrop-blur-md border border-white/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-600 shadow-md">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white">Fullstack Integration</span>
              <p className="text-[10px] text-orange-100 font-mono">POST /api/v1/orders</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <MenuGrid
            items={STATIC_MENU_ITEMS}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            cartItemCounts={cartCounts}
          >
            {(item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
                countInCart={cartCounts[item.id] || 0}
              />
            )}
          </MenuGrid>
        </div>

        <div className="lg:col-span-1 lg:sticky lg:top-20">
          <CartDrawer
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onClearCart={handleClearCart}
            onCheckout={handleCheckout}
            isSubmitting={isSubmittingOrder}
          />
        </div>
      </div>

      {/* Interactive Payment Modal */}
      {activePaymentOrder && (
        <PaymentModal
          order={activePaymentOrder}
          onClose={() => setActivePaymentOrder(null)}
        />
      )}
    </div>
  );
}
