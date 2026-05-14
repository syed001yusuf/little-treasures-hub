import { useMemo, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Boxes, FolderTree, Info, LogOut, Menu, MessageSquareQuote, Package,
  Settings as SettingsIcon, Download,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { endSession } from '@/lib/admin-auth';
import { useAdminStore } from '@/lib/admin-store';

interface AdminLayoutProps {
  onLogout: () => void;
}

const NAV = [
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/categories', label: 'Categories', icon: FolderTree },
  { to: '/admin/settings', label: 'Settings', icon: SettingsIcon },
  { to: '/admin/reviews', label: 'Reviews', icon: MessageSquareQuote },
  { to: '/admin/export', label: 'Export', icon: Download },
];

function navTitleFor(pathname: string): string {
  const match = NAV.find(n => pathname.startsWith(n.to));
  return match?.label ?? 'Admin';
}

export function AdminLayout({ onLogout }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { hasProductsDraft, hasCategoriesDraft, hasSettingsDraft, hasReviewsDraft } = useAdminStore();
  const dirty = hasProductsDraft || hasCategoriesDraft || hasSettingsDraft || hasReviewsDraft;

  const pageTitle = useMemo(() => navTitleFor(location.pathname), [location.pathname]);

  const handleLogout = () => {
    endSession();
    onLogout();
    navigate('/');
  };

  const navList = (variant: 'desktop' | 'mobile') => (
    <nav className={variant === 'mobile' ? 'p-3 space-y-1' : 'flex-1 p-3 space-y-1'}>
      {NAV.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => variant === 'mobile' && setMobileOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive ? 'bg-white text-rose-700 shadow-sm' : 'text-white/90 hover:bg-white/10'
            }`
          }
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  );

  const renderSidebar = (variant: 'desktop' | 'mobile') => (
    <div className="h-full flex flex-col bg-gradient-to-b from-rose-600 to-pink-700 text-white">
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Boxes className="h-6 w-6" />
          <span className="font-bold text-lg tracking-tight">Admin</span>
        </div>
        <p className="text-xs text-white/70 mt-1">Catalog control panel</p>
      </div>
      {navList(variant)}
      <div className="p-3 border-t border-white/10">
        <Button
          variant="ghost"
          className="w-full justify-start text-white hover:bg-white/10 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign out
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col">
        {renderSidebar('desktop')}
      </aside>

      {/* Main column */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 border-b bg-white px-3 sm:px-6 flex items-center gap-3 sticky top-0 z-30">
          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 border-0">
              {renderSidebar('mobile')}
            </SheetContent>
          </Sheet>

          <h2 className="text-sm sm:text-base font-semibold text-slate-700 truncate flex-1">
            {pageTitle}
          </h2>

          {dirty && (
            <button
              type="button"
              onClick={() => navigate('/admin/export')}
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 px-2 sm:px-3 py-1 text-xs font-medium transition-colors"
              aria-label="Open Export to publish drafts"
              title="Draft saved locally. Open Export to publish."
            >
              <Info className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Draft saved · open Export to publish</span>
              <span className="sm:hidden">Draft</span>
            </button>
          )}
        </header>

        {/* Body */}
        <div className="flex-1 p-3 sm:p-6 overflow-x-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
