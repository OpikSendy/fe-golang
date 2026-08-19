'use client';

import { MenuCategory, MenuItem } from '@/types/order';
import { Coffee, CupSoda, Utensils } from 'lucide-react';

interface MenuGridProps {
  items: MenuItem[];
  selectedCategory: MenuCategory;
  onSelectCategory: (category: MenuCategory) => void;
  onAddToCart: (item: MenuItem) => void;
  cartItemCounts: Record<string, number>;
  children: (item: MenuItem) => React.ReactNode;
}

export default function MenuGrid({
  items,
  selectedCategory,
  onSelectCategory,
  children,
}: MenuGridProps) {
  const categories: { id: MenuCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Semua Menu', icon: null },
    { id: 'coffee', label: 'Kopi', icon: <Coffee className="h-3.5 w-3.5" /> },
    { id: 'beverage', label: 'Non-Kopi', icon: <CupSoda className="h-3.5 w-3.5" /> },
    { id: 'food', label: 'Makanan', icon: <Utensils className="h-3.5 w-3.5" /> },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900 shadow-xs'
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => children(item))}
      </div>
    </div>
  );
}
