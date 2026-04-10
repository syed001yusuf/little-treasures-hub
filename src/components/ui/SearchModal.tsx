import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useProducts } from '@/lib/hooks';
import { Input } from '@/components/ui/input';

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const { data: products = [] } = useProducts();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const q = query.toLowerCase();
  const results = q.length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category_slug.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      ).slice(0, 8)
    : [];

  const handleSelect = (id: string) => {
    navigate(`/products/${id}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-foreground/60 backdrop-blur-sm flex items-start justify-center pt-[10vh]" onClick={onClose}>
      <div className="w-full max-w-lg mx-4 bg-card rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 p-4 border-b">
          <Search className="h-5 w-5 text-muted-foreground shrink-0" />
          <Input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products, brands..."
            className="border-0 focus-visible:ring-0 text-base"
          />
          <button onClick={onClose} className="shrink-0 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {q.length > 1 && results.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              <p className="font-medium">No products found</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          )}
          {results.map(p => (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className="w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors text-left"
            >
              <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.name} className="h-full w-full object-contain" />
                ) : (
                  <span className="text-2xl">🧸</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.brand} · ₹{p.price.toLocaleString('en-IN')}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
