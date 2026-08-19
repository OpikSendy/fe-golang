# 📱 OrderPulse POS & Live Payment Simulator (Next.js 16 + Bun + PWA)

Aplikasi **OrderPulse POS** (Point of Sale Kasir Modern & Live Payment Webhook Simulator) berbasis **Next.js 16 (App Router)**, **TypeScript**, **Bun**, **TanStack React Query v5**, dan **Progressive Web App (PWA)**.

Aplikasi ini terhubung secara *full-stack* secara langsung ke **Golang Clean Architecture Backend** yang sudah ter-deploy live di Railway:
👉 **Live Backend Base URL**: `https://golangpr.up.railway.app`

---

## 🌟 Fitur Utama & Highlight Architecture

1. **Kasir POS & Katalog Menu (`/`)**:
   - Filter katalog menu interaktif (Kopi, Non-Kopi, Makanan).
   - Drawer Keranjang Belanja (*Cart*) dengan kalkulasi otomatis subtotal IDR & form nama pelanggan.
   - PWA Mobile Bottom Navigation Bar.
   - Tema visual **Clean White & Vibrant Orange**.

2. **Interactive QRIS Payment Modal & Webhook Simulator**:
   - Modal QRIS dinamis (`qrcode.react`).
   - Tombol **"⚡ Simulasikan Pembayaran Berhasil"** yang memicu `POST /api/v1/webhooks/payment` di Railway backend.
   - Efek perayaan *confetti* (`canvas-confetti`) & animasi status instant `PENDING` $\rightarrow$ `PAID`.
   - Cetak Struk Ringkas (*Receipt Preview*).

3. **Live Order Tracker & Revenue Dashboard (`/orders`)**:
   - **TanStack Query Auto-Polling** (tiap 4 detik) + manual refetch.
   - Widget Statistik Omset (Total Revenue Sukses IDR, Total Transaksi, Pending vs Paid count).
   - Tabel Antrean Pesanan dengan pencarian nama & filter status.
   - Tema visual khusus **Clean White & Emerald Green**.

4. **Progressive Web App (PWA)**:
   - Web App Manifest (`manifest.webmanifest`) dengan mode `standalone`.
   - Service Worker (`public/sw.js`) untuk offline caching.
   - Siap di-install ke layar HP (*Add to Home Screen*).

---

## 📡 Live Backend API Specifications

Aplikasi ini terintegrasi dengan REST API Golang Railway:

| Endpoint | Method | Fungsi |
| :--- | :--- | :--- |
| `/health` | `GET` | Server Health Status Check (`status: "ok"`) |
| `/api/v1/orders` | `GET` | Mengambil seluruh daftar pesanan |
| `/api/v1/orders/:id` | `GET` | Mengambil detail pesanan berdasarkan ID |
| `/api/v1/orders` | `POST` | Checkout / membuat pesanan baru (`pending`) |
| `/api/v1/webhooks/payment` | `POST` | Simulasi webhook status bayar (`paid`) |

---

## 🚀 Panduan Deployment ke Vercel

Untuk me-deploy proyek frontend ini ke **Vercel**:

### 1. Environment Variable Setup di Vercel Dashboard
Tambahkan variabel lingkungan (*Environment Variable*) di Vercel:

```env
NEXT_PUBLIC_API_URL=https://golangpr.up.railway.app
```

### 2. Langkah Import & Deploy
1. Push repositori ke GitHub: `https://github.com/OpikSendy/fe-golang.git`.
2. Buka [Vercel Dashboard](https://vercel.com/new).
3. Import repositori **`fe-golang`**.
4. Di bagian **Build and Output Settings**:
   - Framework Preset: **Next.js**
   - Build Command: `bun run build` (atau `next build`)
   - Install Command: `bun install`
5. Masukkan **Environment Variable** `NEXT_PUBLIC_API_URL`.
6. Klik **Deploy**! 🚀

---

## 💻 Cara Menjalankan di Lokal (Local Development)

### Prerequisites
- Install **Bun** (v1.3+): `powershell -c "irm bun.sh/install.ps1 | iex"`

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/OpikSendy/fe-golang.git
cd fe-golang
bun install
```

### 2. Setup Environment Variables
Buat file `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://golangpr.up.railway.app
```

### 3. Jalankan Development Server
```bash
bun dev
```
Buka browser di:
- **Kasir POS**: [http://localhost:3000](http://localhost:3000)
- **Live Tracker**: [http://localhost:3000/orders](http://localhost:3000/orders)

---

## 📂 Struktur Proyek

```text
src/
├── app/
│   ├── layout.tsx              # Root Layout + PWA Meta & Providers
│   ├── page.tsx                # Halaman POS Kasir (White & Orange)
│   ├── orders/
│   │   └── page.tsx            # Live Order Tracker Dashboard (White & Emerald)
│   ├── manifest.ts             # Next.js PWA Web App Manifest
│   └── globals.css             # Tailwind CSS Directives & Custom Utilities
├── components/
│   ├── navbar.tsx              # Header Navigation + Live Server Health Indicator
│   ├── bottom-nav.tsx          # Mobile PWA Bottom Navigation Bar
│   └── providers.tsx           # TanStack QueryClientProvider & Devtools
├── features/
│   ├── pos/
│   │   ├── components/         # MenuItemCard, MenuGrid, CartDrawer
│   │   └── data/               # staticMenuItems.ts (Katalog Menu Cafe)
│   ├── payment/
│   │   └── components/         # PaymentModal, QRIS Viewer, Webhook Simulator
│   └── orders/
│       ├── components/         # RevenueStats, OrderTable, StatusBadge
│       └── hooks/              # useOrders, useCreateOrder, usePaymentWebhook, useHealthCheck
├── lib/
│   ├── api.ts                  # Central Fetch API Client ke Railway Backend
│   └── utils.ts                # Currency & Date Helper Functions
└── types/
    └── order.ts                # TypeScript Interfaces & Types
```

---

## 📝 Lisensi & Kredit
Dikembangkan sebagai bagian dari tugas Capstone Project terintegrasi Backend Golang Railway.
