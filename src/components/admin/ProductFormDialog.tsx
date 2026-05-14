import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAdminStore } from '@/lib/admin-store';
import type { Product } from '@/lib/types';

import { ChipInput, Field, ImageSlot } from './admin-ui';
import { ImageModal } from './ImageModal';

interface Props {
  open: boolean;
  onClose: () => void;
  /** Product to edit, or null when adding a new one. */
  product: Product | null;
}

const URL_RE = /^https?:\/\/.+/i;
const ID_RE = /^[A-Za-z0-9_-]+$/;

function emptyProduct(): Product {
  return {
    id: '',
    name: '',
    category_slug: '',
    brand: '',
    age_range: '',
    price: 0,
    mrp: 0,
    unit: 'piece',
    image_url: '',
    description: '',
    features: '',
    in_stock: true,
    featured: false,
    rating: 0,
    review_count: 0,
    alt_image_url: '',
  };
}

type Errors = Partial<Record<keyof Product, string>>;

function validate(p: Product, products: Product[], categorySlugs: Set<string>, isNew: boolean): Errors {
  const e: Errors = {};
  if (!p.id.trim()) e.id = 'ID is required.';
  else if (!ID_RE.test(p.id)) e.id = 'Use letters, numbers, dash or underscore only.';
  else if (isNew && products.some(x => x.id === p.id)) e.id = 'A product with this ID already exists.';

  if (!p.name.trim() || p.name.trim().length < 2) e.name = 'Name is required.';
  if (!p.category_slug) e.category_slug = 'Choose a category.';
  else if (!categorySlugs.has(p.category_slug)) e.category_slug = 'Unknown category.';

  if (!Number.isFinite(p.price) || p.price < 0) e.price = 'Price must be ≥ 0.';
  if (!Number.isFinite(p.mrp) || p.mrp < 0) e.mrp = 'MRP must be ≥ 0.';
  if (p.price > 0 && p.mrp > 0 && p.mrp < p.price) e.mrp = 'MRP should be ≥ price.';

  if (!Number.isFinite(p.rating) || p.rating < 0 || p.rating > 5) e.rating = 'Rating must be 0–5.';
  if (!Number.isInteger(p.review_count) || p.review_count < 0) e.review_count = 'Must be ≥ 0.';

  if (p.image_url && !URL_RE.test(p.image_url)) e.image_url = 'Enter a valid URL.';
  if (p.alt_image_url && !URL_RE.test(p.alt_image_url)) e.alt_image_url = 'Enter a valid URL.';
  return e;
}

export function ProductFormDialog({ open, onClose, product }: Props) {
  const { products, categories, setProducts } = useAdminStore();
  const isNew = product === null;
  const [draft, setDraft] = useState<Product>(emptyProduct);
  const [errors, setErrors] = useState<Errors>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Reset draft whenever the dialog opens with a different target.
  useEffect(() => {
    if (open) {
      setDraft(product ? { ...product } : emptyProduct());
      setErrors({});
    }
  }, [open, product]);

  const set = <K extends keyof Product>(key: K, value: Product[K]) => {
    setDraft(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    const slugs = new Set(categories.map(c => c.slug));
    const errs = validate(draft, products, slugs, isNew);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error('Please fix the highlighted fields.');
      return;
    }
    setProducts(prev => {
      if (isNew) return [draft, ...prev];
      return prev.map(p => (p.id === product!.id ? draft : p));
    });
    toast.success(isNew ? 'Product added locally.' : 'Product updated locally.', {
      description: 'Open Export to publish to the live site.',
    });
    onClose();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={v => !v && onClose()}>
        <DialogContent className="sm:max-w-2xl max-w-[95vw] max-h-[90vh] p-0 overflow-hidden flex flex-col gap-0">
          <header className="px-4 sm:px-6 py-4 border-b bg-gradient-to-r from-rose-50 to-pink-50">
            <h2 className="text-lg font-semibold text-rose-900">
              {isNew ? 'Add product' : 'Edit product'}
            </h2>
            {!isNew && product && (
              <p className="text-xs text-muted-foreground truncate">{product.name}</p>
            )}
          </header>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Product ID" htmlFor="p-id" required error={errors.id}>
                <Input
                  id="p-id"
                  value={draft.id}
                  onChange={e => set('id', e.target.value)}
                  disabled={!isNew}
                  className="font-mono text-base sm:text-sm"
                  placeholder="P-001"
                />
              </Field>
              <Field label="Name" htmlFor="p-name" required error={errors.name}>
                <Input id="p-name" value={draft.name} onChange={e => set('name', e.target.value)} className="text-base sm:text-sm" />
              </Field>

              <Field label="Category" htmlFor="p-cat" required error={errors.category_slug}>
                <select
                  id="p-cat"
                  value={draft.category_slug}
                  onChange={e => set('category_slug', e.target.value)}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-base sm:text-sm"
                >
                  <option value="">— Select —</option>
                  {categories.map(c => (
                    <option key={c.slug} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Brand" htmlFor="p-brand">
                <Input id="p-brand" value={draft.brand} onChange={e => set('brand', e.target.value)} className="text-base sm:text-sm" />
              </Field>

              <Field label="Age range" htmlFor="p-age" hint="e.g. 0-3 months">
                <Input id="p-age" value={draft.age_range} onChange={e => set('age_range', e.target.value)} className="text-base sm:text-sm" />
              </Field>
              <Field label="Unit" htmlFor="p-unit" hint="piece, set, pack…">
                <Input id="p-unit" value={draft.unit} onChange={e => set('unit', e.target.value)} className="text-base sm:text-sm" />
              </Field>

              <Field label="Price (₹)" htmlFor="p-price" required error={errors.price}>
                <Input id="p-price" type="number" inputMode="numeric" value={draft.price}
                  onChange={e => set('price', Number(e.target.value) || 0)} className="text-base sm:text-sm" />
              </Field>
              <Field label="MRP (₹)" htmlFor="p-mrp" error={errors.mrp}>
                <Input id="p-mrp" type="number" inputMode="numeric" value={draft.mrp}
                  onChange={e => set('mrp', Number(e.target.value) || 0)} className="text-base sm:text-sm" />
              </Field>

              <Field label="Rating" htmlFor="p-rating" error={errors.rating} hint="0 to 5">
                <Input id="p-rating" type="number" step={0.1} min={0} max={5} value={draft.rating}
                  onChange={e => set('rating', Number(e.target.value) || 0)} className="text-base sm:text-sm" />
              </Field>
              <Field label="Review count" htmlFor="p-rc" error={errors.review_count}>
                <Input id="p-rc" type="number" min={0} value={draft.review_count}
                  onChange={e => set('review_count', Math.max(0, Math.floor(Number(e.target.value) || 0)))}
                  className="text-base sm:text-sm" />
              </Field>
            </div>

            <Field label="Description" htmlFor="p-desc">
              <textarea
                id="p-desc"
                value={draft.description}
                onChange={e => set('description', e.target.value)}
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </Field>

            <Field label="Features" hint="Press Enter or comma after each value.">
              <ChipInput value={draft.features} onChange={v => set('features', v)} placeholder="washable, breathable…" />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <ImageSlot
                label="Main image"
                url={draft.image_url}
                onChange={v => set('image_url', v)}
                onPreview={() => draft.image_url && setPreviewUrl(draft.image_url)}
                error={errors.image_url}
              />
              <ImageSlot
                label="Alt image"
                url={draft.alt_image_url}
                onChange={v => set('alt_image_url', v)}
                onPreview={() => draft.alt_image_url && setPreviewUrl(draft.alt_image_url)}
                error={errors.alt_image_url}
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.in_stock}
                  onChange={e => set('in_stock', e.target.checked)}
                  className="h-4 w-4 accent-emerald-600"
                />
                In stock
              </label>
              <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.featured}
                  onChange={e => set('featured', e.target.checked)}
                  className="h-4 w-4 accent-amber-500"
                />
                Featured
              </label>
            </div>
          </div>

          <footer className="px-4 sm:px-6 py-3 border-t bg-slate-50 flex items-center justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} className="bg-rose-600 hover:bg-rose-700">
              {isNew ? 'Add product' : 'Save changes'}
            </Button>
          </footer>
        </DialogContent>
      </Dialog>

      <ImageModal
        open={!!previewUrl}
        url={previewUrl}
        title={draft.name || 'Image preview'}
        onClose={() => setPreviewUrl(null)}
      />
    </>
  );
}
