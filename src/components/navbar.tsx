'use client';

import { useHealthCheck } from '@/features/orders/hooks/useHealthCheck';
import { Activity, LayoutGrid, Receipt, Server } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const { data: health, isLoading } = useHealthCheck();

  const isHealthy = health?.status === 'ok';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
            <Receipt className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
              OrderPulse <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-mono border border-orange-200">POS</span>
            </span>
            <p className="text-[10px] text-slate-500 font-mono">Live Golang Architecture</p>
          </div>
        </Link>

        {/* Navigation Links (Desktop/Tablet) */}
        <nav className="hidden sm:flex items-center gap-1 rounded-full bg-slate-100 p-1 border border-slate-200 shadow-inner">
          <Link
            href="/"
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              pathname === '/'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Kasir POS
          </Link>
          <Link
            href="/orders"
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              pathname === '/orders'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            Live Tracker
          </Link>
        </nav>

        {/* Live Backend Status Indicator */}
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700">
          <Server className="h-3.5 w-3.5 text-slate-500" />
          <span className="font-mono text-[11px] text-slate-500 hidden sm:inline">Railway BE:</span>
          {isLoading ? (
            <span className="flex items-center gap-1 text-amber-600 font-medium">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
              Checking...
            </span>
          ) : isHealthy ? (
            <span className="flex items-center gap-1.5 font-semibold text-emerald-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Connected
            </span>
          ) : (
            <span className="flex items-center gap-1 font-semibold text-rose-600">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Offline
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
