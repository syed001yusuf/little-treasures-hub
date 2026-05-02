import { lazy, Suspense, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from '@/lib/cart-context';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';
import { SearchModal } from '@/components/ui/SearchModal';

// Lazy-load page-level components for faster initial load and smaller main bundle.
const Index = lazy(() => import('./pages/Index'));
const Products = lazy(() => import('./pages/Products'));
const CategoryPage = lazy(() => import('./pages/Category'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const CartPage = lazy(() => import('./pages/Cart'));
const AboutPage = lazy(() => import('./pages/About'));
const ContactPage = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Admin = lazy(() => import('./pages/Admin'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 1 hour stale time matches CSV cache; reduces refetches on tab focus.
      staleTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function PageFallback() {
  return (
    <div className="container py-20 text-center">
      <span className="text-5xl">⏳</span>
      <p className="mt-3 text-muted-foreground">Loading…</p>
    </div>
  );
}

/**
 * Storefront chrome (Navbar / Footer / FloatingWhatsApp / SearchModal)
 * is hidden on /admin routes so the admin panel renders full-screen
 * with its own layout. We split the routed UI into its own component
 * so we can inspect the current pathname via `useLocation`.
 */
function AppRoutes() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar onSearchOpen={() => setSearchOpen(true)} />}
      {!isAdmin && <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />}
      <main className={isAdmin ? '' : 'min-h-screen'}>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingWhatsApp />}
    </>
  );
}

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
