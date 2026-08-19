'use client';

import { useHealthCheck } from '@/features/orders/hooks/useHealthCheck';
import { Activity, LayoutGrid, Server } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  const { data: health } = useHealthCheck();

  const isHealthy = health?.status === 'ok';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 block border-t border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-lg sm:hidden">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        {/* Tab 1: Kasir POS */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 transition-all ${
            pathname === '/'
              ? 'text-orange-600 font-bold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div
            className={`rounded-full p-1.5 ${
              pathname === '/' ? 'bg-orange-50 text-orange-600' : 'bg-transparent'
            }`}
          >
            <LayoutGrid className="h-5 w-5" />
          </div>
          <span className="text-[10px]">Kasir POS</span>
        </Link>

        {/* Tab 2: Live Tracker (White & Emerald Theme) */}
        <Link
          href="/orders"
          className={`flex flex-col items-center gap-1 transition-all ${
            pathname === '/orders'
              ? 'text-emerald-600 font-bold scale-105'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div
            className={`rounded-full p-1.5 ${
              pathname === '/orders' ? 'bg-emerald-50 text-emerald-600' : 'bg-transparent'
            }`}
          >
            <Activity className="h-5 w-5" />
          </div>
          <span className="text-[10px]">Live Tracker</span>
        </Link>

        {/* Tab 3: Health Status */}
        <div className="flex flex-col items-center gap-1 text-slate-500">
          <div className="relative rounded-full p-1.5 bg-slate-100">
            <Server className="h-5 w-5 text-slate-600" />
            <span
              className={`absolute top-1 right-1 h-2 w-2 rounded-full ${
                isHealthy ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
              }`}
            />
          </div>
          <span className="text-[10px] font-mono">{isHealthy ? 'Live BE' : 'Offline'}</span>
        </div>
      </div>
    </div>
  );
}
