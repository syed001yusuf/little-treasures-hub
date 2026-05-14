import { memo, useCallback, useMemo, useState } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminStore } from '@/lib/admin-store';
import type { Category } from '@/lib/types';
import { useDebounced } from '@/lib/use-debounced';

import { FALLBACK_IMG } from './admin-ui';
import { CategoryFormDialog } from './CategoryFormDialog';
import { ConfirmDialog } from './ConfirmDialog';
import { ImageModal } from './ImageModal';

export function CategoriesTable() {
  const { categories, setCategories } = useAdminStore();
  const [search, setSearch] = useState('');
  const debounced = useDebounced(search, 150);

  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(c =>
      [c.id, c.name, c.slug, c.description].some(v => v?.toLowerCase().includes(q))
    );
  }, [categories, debounced]);

  const openAdd = useCallback(() => { setEditTarget(null); setDialogOpen(true); }, []);
  const openEdit = useCallback((c: Category) => { setEditTarget(c); setDialogOpen(true); }, []);
  const askDelete = useCallback((id: string) => setConfirmDeleteId(id), []);

  const confirmDelete = () => {
    if (!confirmDeleteId) return;
    setCategories(prev => prev.filter(c => c.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
          <p className="text-sm text-muted-foreground">{categories.length} total.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 w-full sm:w-64 text-base sm:text-sm"
              aria-label="Search categories"
            />
          </div>
          <Button onClick={openAdd} className="bg-rose-600 hover:bg-rose-700 shrink-0">
            <Plus className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Add category</span>
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-rose-200 bg-white p-10 text-center">
          <p className="text-slate-700 font-medium">No categories yet.</p>
          <Button onClick={openAdd} className="mt-4 bg-rose-600 hover:bg-rose-700">
            <Plus className="h-4 w-4 mr-1" /> Add a category
          </Button>
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map(c => (
              <CategoryCard
                key={c.id}
                category={c}
                onEdit={openEdit}
                onDelete={askDelete}
                onPreview={u => setPreviewUrl(u)}
              />
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block rounded-xl border border-rose-100 bg-white shadow-sm overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gradient-to-r from-amber-100 via-rose-100 to-pink-100 text-rose-900">
                  {['Banner', 'Emoji', 'ID', 'Name', 'Slug', 'Description', 'Color', 'Sort', 'Actions'].map(h => (
                    <th key={h} className="px-3 py-2 text-left font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <CategoryRow
                    key={c.id}
                    category={c}
                    onEdit={openEdit}
                    onDelete={askDelete}
                    onPreview={u => setPreviewUrl(u)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <CategoryFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} category={editTarget} />

      <ConfirmDialog
        open={!!confirmDeleteId}
        title="Delete category?"
        description="Products tagged with this category keep their slug. You can reset from Export."
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={confirmDelete}
      />

      <ImageModal
        open={!!previewUrl}
        url={previewUrl}
        title="Category banner"
        onClose={() => setPreviewUrl(null)}
      />
    </div>
  );
}

const CategoryCard = memo(function CategoryCard({
  category, onEdit, onDelete, onPreview,
}: {
  category: Category;
  onEdit: (c: Category) => void;
  onDelete: (id: string) => void;
  onPreview: (url: string) => void;
}) {
  return (
    <div className="rounded-xl border border-rose-100 bg-white shadow-sm p-3" style={{ background: `${category.color}26` }}>
      <div className="flex gap-3">
        {category.banner_image_url ? (
          <button
            type="button"
            onClick={() => onPreview(category.banner_image_url)}
            className="h-16 w-24 shrink-0 rounded-md overflow-hidden border bg-white hover:ring-2 hover:ring-rose-300"
            aria-label={`Preview ${category.name}`}
          >
            <img src={category.banner_image_url} alt={category.name} loading="lazy" decoding="async"
              className="h-full w-full object-cover" width={96} height={64}
              onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }} />
          </button>
        ) : (
          <div className="h-16 w-24 shrink-0 rounded-md border-2 border-dashed border-rose-200 bg-rose-50/40" aria-label="No banner" />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{category.emoji || '📦'}</span>
            <p className="font-semibold text-slate-900 truncate">{category.name}</p>
          </div>
          <p className="text-xs text-muted-foreground font-mono truncate">{category.slug}</p>
          <p className="text-xs text-slate-600 truncate mt-0.5">{category.description || '—'}</p>
          <div className="mt-1 flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1">
              <span className="h-3 w-3 rounded border" style={{ backgroundColor: category.color }} />
              <code>{category.color}</code>
            </span>
            <span className="text-muted-foreground">Sort: {category.sort_order}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <Button size="sm" variant="outline" className="h-8" onClick={() => onEdit(category)}>
          <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
        </Button>
        <Button size="sm" variant="ghost" className="h-8 text-red-600 hover:bg-red-50" onClick={() => onDelete(category.id)}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
});

const CategoryRow = memo(function CategoryRow({
  category, onEdit, onDelete, onPreview,
}: {
  category: Category;
  onEdit: (c: Category) => void;
  onDelete: (id: string) => void;
  onPreview: (url: string) => void;
}) {
  return (
    <tr style={{ backgroundColor: `${category.color}26` }} className="border-t border-rose-50 hover:bg-rose-50/40">
      <td className="px-3 py-2 align-middle">
        {category.banner_image_url ? (
          <button
            type="button"
            onClick={() => onPreview(category.banner_image_url)}
            className="h-12 w-20 rounded-md overflow-hidden border bg-white hover:ring-2 hover:ring-rose-300"
            aria-label={`Preview ${category.name}`}
          >
            <img src={category.banner_image_url} alt={category.name} loading="lazy" decoding="async"
              className="h-full w-full object-cover" width={80} height={48}
              onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }} />
          </button>
        ) : (
          <div className="h-12 w-20 rounded-md border-2 border-dashed border-rose-200 bg-rose-50/40" />
        )}
      </td>
      <td className="px-3 py-2 align-middle text-2xl">{category.emoji || '—'}</td>
      <td className="px-3 py-2 align-middle font-mono text-xs">{category.id}</td>
      <td className="px-3 py-2 align-middle font-medium">{category.name}</td>
      <td className="px-3 py-2 align-middle font-mono text-xs text-slate-600">{category.slug}</td>
      <td className="px-3 py-2 align-middle max-w-[280px] truncate text-slate-700" title={category.description}>{category.description || '—'}</td>
      <td className="px-3 py-2 align-middle">
        <span className="inline-flex items-center gap-1.5 text-xs">
          <span className="h-4 w-4 rounded border" style={{ backgroundColor: category.color }} />
          <code className="font-mono">{category.color}</code>
        </span>
      </td>
      <td className="px-3 py-2 align-middle">{category.sort_order}</td>
      <td className="px-3 py-2 align-middle whitespace-nowrap">
        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8" onClick={() => onEdit(category)} aria-label={`Edit ${category.name}`}>
            <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
          </Button>
          <Button size="sm" variant="ghost" className="h-8 px-2 text-red-600 hover:bg-red-50" onClick={() => onDelete(category.id)} aria-label={`Delete ${category.name}`}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
});
