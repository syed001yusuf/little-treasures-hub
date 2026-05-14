import { memo, useCallback, useMemo, useState } from 'react';
import { Pencil, Plus, Search, Star, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminStore } from '@/lib/admin-store';
import type { Category, Product } from '@/lib/types';
import { useDebounced } from '@/lib/use-debounced';

import { FALLBACK_IMG } from './admin-ui';
import { ConfirmDialog } from './ConfirmDialog';
import { ImageModal } from './ImageModal';
import { ProductFormDialog } from './ProductFormDialog';

/* Soft tinted background derived from a category color hex. */
function tint(hex: string | undefined, alpha = 0.14): string {
  if (!hex || !/^#?[0-9a-fA-F]{6}$/.test(hex)) return 'rgba(244, 244, 245, 0.6)';
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface PreviewState { url: string; title: string }

export function ProductsTable() {
  const { products, categories } = useAdminStore();
  const { setProducts } = useAdminStore();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounced(search, 150);

  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [preview, setPreview] = useState<PreviewState | null>(null);

  const categoryMap = useMemo(() => {
    const m = new Map<string, Category>();
    categories.forEach(c => m.set(c.slug, c));
    return m;
  }, [categories]);

  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return products;
    return products.filter(p =>
      [p.id, p.name, p.brand, p.category_slug, p.description].some(v => v?.toLowerCase().includes(q))
    );
  }, [products, debouncedSearch]);

  const openAdd = useCallback(() => {
    setEditTarget(null);
    setDialogOpen(true);
  }, []);
  const openEdit = useCallback((p: Product) => {
    setEditTarget(p);
    setDialogOpen(true);
  }, []);
  const closeDialog = useCallback(() => setDialogOpen(false), []);
  const askDelete = useCallback((id: string) => setConfirmDeleteId(id), []);
  const showPreview = useCallback((p: PreviewState) => setPreview(p), []);

  const confirmDelete = () => {
    if (!confirmDeleteId) return;
    setProducts(prev => prev.filter(p => p.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <Header
        count={products.length}
        search={search}
        onSearch={setSearch}
        onAdd={openAdd}
      />

      {filtered.length === 0 ? (
        <EmptyState onAdd={openAdd} />
      ) : (
        <>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                category={categoryMap.get(p.category_slug)}
                onEdit={openEdit}
                onDelete={askDelete}
                onPreview={showPreview}
              />
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block rounded-xl border border-rose-100 bg-white shadow-sm overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100 text-rose-900">
                  {['Image', 'Alt', 'ID', 'Name', 'Category', 'Brand', 'Price', 'MRP', 'Stock', 'Featured', 'Rating', 'Actions'].map(h => (
                    <th key={h} className="px-3 py-2 text-left font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <ProductRow
                    key={p.id}
                    product={p}
                    category={categoryMap.get(p.category_slug)}
                    onEdit={openEdit}
                    onDelete={askDelete}
                    onPreview={showPreview}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <ProductFormDialog open={dialogOpen} onClose={closeDialog} product={editTarget} />

      <ConfirmDialog
        open={!!confirmDeleteId}
        title="Delete product?"
        description="This removes the product from your local draft. You can reset from the Export page."
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={confirmDelete}
      />

      <ImageModal
        open={!!preview}
        url={preview?.url ?? null}
        title={preview?.title}
        onClose={() => setPreview(null)}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * Header (search + add)
 * ────────────────────────────────────────────────────────── */
function Header({
  count, search, onSearch, onAdd,
}: { count: number; search: string; onSearch: (v: string) => void; onAdd: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Products</h1>
        <p className="text-sm text-muted-foreground">{count} total. Tap Edit to modify.</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products…"
            value={search}
            onChange={e => onSearch(e.target.value)}
            className="pl-8 w-full sm:w-64 text-base sm:text-sm"
            aria-label="Search products"
          />
        </div>
        <Button onClick={onAdd} className="bg-rose-600 hover:bg-rose-700 shrink-0">
          <Plus className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">Add product</span>
        </Button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
 * Mobile card
 * ────────────────────────────────────────────────────────── */
const ProductCard = memo(function ProductCard({
  product, category, onEdit, onDelete, onPreview,
}: {
  product: Product;
  category?: Category;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
  onPreview: (p: PreviewState) => void;
}) {
  const bg = tint(category?.color, 0.18);
  return (
    <div
      className="rounded-xl border border-rose-100 bg-white shadow-sm p-3"
      style={{ background: bg }}
    >
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => product.image_url && onPreview({ url: product.image_url, title: product.name })}
          className="h-20 w-20 shrink-0 rounded-md overflow-hidden border bg-white hover:ring-2 hover:ring-rose-300"
          aria-label={`Preview ${product.name}`}
        >
          <img
            src={product.image_url || FALLBACK_IMG}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width={80}
            height={80}
            className="h-full w-full object-cover"
            onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
          />
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 truncate">{product.name || 'Untitled'}</p>
          <p className="text-xs text-muted-foreground font-mono truncate">{product.id}</p>
          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="inline-flex items-center rounded-full bg-white/70 px-2 py-0.5 border">
              {category?.name ?? product.category_slug ?? '—'}
            </span>
            {product.in_stock ? (
              <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 font-medium">In stock</span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2 py-0.5 font-medium">Out</span>
            )}
            {product.featured && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 font-medium">
                <Star className="h-3 w-3 fill-amber-400 stroke-amber-500" /> Featured
              </span>
            )}
          </div>
          <div className="mt-1 text-sm">
            <span className="font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
            {product.mrp > 0 && product.mrp !== product.price && (
              <span className="ml-2 text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <Button size="sm" variant="outline" className="h-8" onClick={() => onEdit(product)}>
          <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
        </Button>
        <Button size="sm" variant="ghost" className="h-8 text-red-600 hover:bg-red-50" onClick={() => onDelete(product.id)}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
});

/* ──────────────────────────────────────────────────────────
 * Desktop row
 * ────────────────────────────────────────────────────────── */
const ProductRow = memo(function ProductRow({
  product, category, onEdit, onDelete, onPreview,
}: {
  product: Product;
  category?: Category;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
  onPreview: (p: PreviewState) => void;
}) {
  const bg = tint(category?.color, 0.14);
  return (
    <tr style={{ backgroundColor: bg }} className="border-t border-rose-50 hover:bg-rose-50/40 transition-colors">
      <td className="px-3 py-2 align-middle">
        <Thumb url={product.image_url} alt={product.name} onView={() => product.image_url && onPreview({ url: product.image_url, title: product.name })} />
      </td>
      <td className="px-3 py-2 align-middle">
        <Thumb url={product.alt_image_url} alt={`${product.name} alt`} onView={() => product.alt_image_url && onPreview({ url: product.alt_image_url, title: `${product.name} alt` })} />
      </td>
      <td className="px-3 py-2 align-middle font-mono text-xs">{product.id}</td>
      <td className="px-3 py-2 align-middle font-medium text-slate-900 max-w-[220px] truncate" title={product.name}>{product.name || '—'}</td>
      <td className="px-3 py-2 align-middle">
        <span className="inline-flex items-center rounded-full bg-white/70 px-2 py-0.5 text-xs font-medium border">
          {category?.name ?? product.category_slug ?? '—'}
        </span>
      </td>
      <td className="px-3 py-2 align-middle text-slate-700">{product.brand || '—'}</td>
      <td className="px-3 py-2 align-middle font-semibold">₹{product.price.toLocaleString('en-IN')}</td>
      <td className="px-3 py-2 align-middle text-muted-foreground line-through">₹{product.mrp.toLocaleString('en-IN')}</td>
      <td className="px-3 py-2 align-middle">
        {product.in_stock ? (
          <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-medium">In stock</span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-xs font-medium">Out</span>
        )}
      </td>
      <td className="px-3 py-2 align-middle">
        {product.featured ? (
          <span className="inline-flex items-center gap-0.5 text-amber-700 text-xs font-medium">
            <Star className="h-3 w-3 fill-amber-400 stroke-amber-500" /> Yes
          </span>
        ) : <span className="text-muted-foreground text-xs">No</span>}
      </td>
      <td className="px-3 py-2 align-middle">
        <span className="inline-flex items-center gap-1 text-amber-700">
          <Star className="h-3 w-3 fill-amber-400 stroke-amber-500" /> {product.rating || 0}
        </span>
      </td>
      <td className="px-3 py-2 align-middle whitespace-nowrap">
        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8" onClick={() => onEdit(product)} aria-label={`Edit ${product.name}`}>
            <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
          </Button>
          <Button size="sm" variant="ghost" className="h-8 px-2 text-red-600 hover:bg-red-50" onClick={() => onDelete(product.id)} aria-label={`Delete ${product.name}`}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
});

function Thumb({ url, alt, onView }: { url: string; alt: string; onView: () => void }) {
  if (!url) {
    return (
      <div className="h-12 w-12 rounded-md border-2 border-dashed border-rose-200 bg-rose-50/40" aria-label="No image" />
    );
  }
  return (
    <button
      type="button"
      onClick={onView}
      className="h-12 w-12 rounded-md overflow-hidden border bg-white shadow-sm hover:ring-2 hover:ring-rose-300 transition"
      aria-label={`Preview ${alt}`}
    >
      <img
        src={url}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={48}
        height={48}
        className="h-full w-full object-cover"
        onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
      />
    </button>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-xl border border-dashed border-rose-200 bg-white p-10 text-center">
      <p className="text-slate-700 font-medium">No products match your search.</p>
      <Button onClick={onAdd} className="mt-4 bg-rose-600 hover:bg-rose-700">
        <Plus className="h-4 w-4 mr-1" /> Add your first product
      </Button>
    </div>
  );
}
