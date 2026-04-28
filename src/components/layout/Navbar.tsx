import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { useCart } from '@/lib/cart-context';
import { useCategories } from '@/lib/hooks';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar({ onSearchOpen }: { onSearchOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { data: categories = [] } = useCategories();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 w-full transition-shadow ${scrolled ? 'shadow-md bg-card/95 backdrop-blur-sm' : 'bg-card'}`}>
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary-light hover:text-primary ${isActive(link.to) ? 'text-primary bg-primary-light' : 'text-foreground'}`}
            >
              {link.label}
            </Link>
          ))}
          {/* Categories Dropdown */}
          <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
            <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-primary-light hover:text-primary ${location.pathname.startsWith('/category') ? 'text-primary bg-primary-light' : 'text-foreground'}`}>
              Categories <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {catOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-card rounded-xl shadow-lg border p-2 z-50">
                {categories.map(cat => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-primary-light hover:text-primary transition-colors"
                    onClick={() => setCatOpen(false)}
                  >
                    <span>{cat.emoji}</span> {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onSearchOpen} className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu — controlled state closes on navigation */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="p-6">
                <Logo />
              </div>
              <nav className="flex flex-col px-4 pb-6 gap-1">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-primary-light ${isActive(link.to) ? 'bg-primary-light text-primary' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Categories</div>
                {categories.map(cat => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm hover:bg-primary-light transition-colors"
                  >
                    <span>{cat.emoji}</span> {cat.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
