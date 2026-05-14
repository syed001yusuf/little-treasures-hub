import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAdminStore } from '@/lib/admin-store';
import type { Category } from '@/lib/types';

import { Field, ImageSlot } from './admin-ui';
import { ImageModal } from './ImageModal';

interface Props {
  open: boolean;
  onClose: () => void;
  category: Category | null;
}

const SLUG_RE = /^[a-z0-9-]+$/;
const HEX_RE = /^#[0-9a-fA-F]{6}$/;
const URL_RE = /^https?:\/\/.+/i;

function emptyCategory(): Category {
  return {
    id: '',
    name: '',
    slug: '',
    emoji: '',
    description: '',
    color: '#FFE4EC',
    banner_image_url: '',
    sort_order: 0,
  };
}

type Errors = Partial<Record<keyof Category, string>>;

function validate(c: Category, list: Category[], isNew: boolean): Errors {
  const e: Errors = {};
  if (!c.id.trim()) e.id = 'ID is required.';
  else if (isNew && list.some(x => x.id === c.id)) e.id = 'ID already exists.';
  if (!c.name.trim()) e.name = 'Name is required.';
  if (!c.slug.trim()) e.slug = 'Slug is required.';
  else if (!SLUG_RE.test(c.slug)) e.slug = 'lowercase letters, numbers and dashes only.';
  else if (isNew && list.some(x => x.slug === c.slug)) e.slug = 'Slug already exists.';
  if (c.color && !HEX_RE.test(c.color)) e.color = 'Use #RRGGBB hex.';
  if (!Number.isInteger(c.sort_order) || c.sort_order < 0) e.sort_order = 'Must be ≥ 0.';
  if (c.banner_image_url && !URL_RE.test(c.banner_image_url)) e.banner_image_url = 'Enter a valid URL.';
  return e;
}

export function CategoryFormDialog({ open, onClose, category }: Props) {
  const { categories, setCategories } = useAdminStore();
  const isNew = category === null;
  const [draft, setDraft] = useState<Category>(emptyCategory);
  const [errors, setErrors] = useState<Errors>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setDraft(category ? { ...category } : emptyCategory());
      setErrors({});
    }
  }, [open, category]);

  const set = <K extends keyof Category>(key: K, value: Category[K]) =>
    setDraft(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    const errs = validate(draft, categories, isNew);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error('Please fix the highlighted fields.');
      return;
    }
    setCategories(prev => {
      if (isNew) return [draft, ...prev];
      return prev.map(c => (c.id === category!.id ? draft : c));
    });
    toast.success(isNew ? 'Category added locally.' : 'Category updated locally.', {
      description: 'Open Export to publish to the live site.',
    });
    onClose();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={v => !v && onClose()}>
        <DialogContent className="sm:max-w-xl max-w-[95vw] max-h-[90vh] p-0 overflow-hidden flex flex-col gap-0">
          <header className="px-4 sm:px-6 py-4 border-b bg-gradient-to-r from-amber-50 to-rose-50">
            <h2 className="text-lg font-semibold text-rose-900">
              {isNew ? 'Add category' : 'Edit category'}
            </h2>
          </header>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="ID" htmlFor="c-id" required error={errors.id}>
                <Input id="c-id" value={draft.id} onChange={e => set('id', e.target.value)}
                  disabled={!isNew} className="font-mono text-base sm:text-sm" />
              </Field>
              <Field label="Sort order" htmlFor="c-sort" error={errors.sort_order}>
                <Input id="c-sort" type="number" min={0} value={draft.sort_order}
                  onChange={e => set('sort_order', Math.max(0, Math.floor(Number(e.target.value) || 0)))}
                  className="text-base sm:text-sm" />
              </Field>

              <Field label="Name" htmlFor="c-name" required error={errors.name}>
                <Input id="c-name" value={draft.name} onChange={e => set('name', e.target.value)} className="text-base sm:text-sm" />
              </Field>
              <Field label="Slug" htmlFor="c-slug" required error={errors.slug} hint="URL segment, lowercase">
                <Input id="c-slug" value={draft.slug} onChange={e => set('slug', e.target.value)}
                  className="font-mono text-base sm:text-sm" />
              </Field>

              <Field label="Emoji" htmlFor="c-emoji" hint="Optional, 1–2 chars">
                <Input id="c-emoji" maxLength={4} value={draft.emoji}
                  onChange={e => set('emoji', e.target.value)} className="text-2xl text-center" />
              </Field>
              <Field label="Color" htmlFor="c-color" error={errors.color} hint="#RRGGBB">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={HEX_RE.test(draft.color) ? draft.color : '#FFE4EC'}
                    onChange={e => set('color', e.target.value.toUpperCase())}
                    className="h-10 w-12 rounded border cursor-pointer"
                    aria-label="Pick color"
                  />
                  <Input id="c-color" value={draft.color} onChange={e => set('color', e.target.value)}
                    className="font-mono text-base sm:text-sm" />
                </div>
              </Field>
            </div>

            <Field label="Description" htmlFor="c-desc">
              <textarea
                id="c-desc"
                value={draft.description}
                onChange={e => set('description', e.target.value)}
                rows={2}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </Field>

            <ImageSlot
              label="Banner image"
              url={draft.banner_image_url}
              onChange={v => set('banner_image_url', v)}
              onPreview={() => draft.banner_image_url && setPreviewUrl(draft.banner_image_url)}
              error={errors.banner_image_url}
            />
          </div>

          <footer className="px-4 sm:px-6 py-3 border-t bg-slate-50 flex items-center justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} className="bg-rose-600 hover:bg-rose-700">
              {isNew ? 'Add category' : 'Save changes'}
            </Button>
          </footer>
        </DialogContent>
      </Dialog>

      <ImageModal
        open={!!previewUrl}
        url={previewUrl}
        title={draft.name || 'Banner preview'}
        onClose={() => setPreviewUrl(null)}
      />
    </>
  );
}
