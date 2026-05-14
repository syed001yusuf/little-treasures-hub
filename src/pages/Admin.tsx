import { lazy, Suspense, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { AdminGate } from '@/components/admin/AdminGate';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { isAuthenticated } from '@/lib/admin-auth';
import { AdminStoreProvider } from '@/lib/admin-store';

const ProductsTable = lazy(() =>
  import('@/components/admin/ProductsTable').then(m => ({ default: m.ProductsTable }))
);
const CategoriesTable = lazy(() =>
  import('@/components/admin/CategoriesTable').then(m => ({ default: m.CategoriesTable }))
);
const SettingsPanel = lazy(() =>
  import('@/components/admin/SettingsPanel').then(m => ({ default: m.SettingsPanel }))
);
const ReviewsTable = lazy(() =>
  import('@/components/admin/ReviewsTable').then(m => ({ default: m.ReviewsTable }))
);
const ExportPanel = lazy(() =>
  import('@/components/admin/ExportPanel').then(m => ({ default: m.ExportPanel }))
);

function AdminFallback() {
  return (
    <div className="flex items-center justify-center py-16 text-rose-500" role="status" aria-live="polite">
      <Loader2 className="h-6 w-6 animate-spin" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}

function lazyRoute(node: React.ReactNode) {
  return <Suspense fallback={<AdminFallback />}>{node}</Suspense>;
}

export default function Admin() {
  const [authed, setAuthed] = useState<boolean>(() => isAuthenticated());

  if (!authed) {
    return <AdminGate onSuccess={() => setAuthed(true)} />;
  }

  return (
    <AdminStoreProvider>
      <Routes>
        <Route element={<AdminLayout onLogout={() => setAuthed(false)} />}>
          <Route index element={<Navigate to="products" replace />} />
          <Route path="products" element={lazyRoute(<ProductsTable />)} />
          <Route path="categories" element={lazyRoute(<CategoriesTable />)} />
          <Route path="settings" element={lazyRoute(<SettingsPanel />)} />
          <Route path="reviews" element={lazyRoute(<ReviewsTable />)} />
          <Route path="export" element={lazyRoute(<ExportPanel />)} />
          <Route path="*" element={<Navigate to="products" replace />} />
        </Route>
      </Routes>
    </AdminStoreProvider>
  );
}
