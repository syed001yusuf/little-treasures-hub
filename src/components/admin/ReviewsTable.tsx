import { memo, useCallback, useMemo, useState } from 'react';
import { Pencil, Plus, Search, Star, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminStore } from '@/lib/admin-store';
import type { Review } from '@/lib/types';
import { useDebounced } from '@/lib/use-debounced';

import { ConfirmDialog } from './ConfirmDialog';
import { ReviewFormDialog } from './ReviewFormDialog';

export function ReviewsTable() {
  const { reviews, setReviews } = useAdminStore();
  const [search, setSearch] = useState('');
  const debounced = useDebounced(search, 150);

  const [editTarget, setEditTarget] = useState<Review | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return reviews;
    return reviews.filter(r => [r.id, r.reviewer_name, r.review_text].some(v => v?.toLowerCase().includes(q)));
  }, [reviews, debounced]);

  const openAdd = useCallback(() => { setEditTarget(null); setDialogOpen(true); }, []);
  const openEdit = useCallback((r: Review) => { setEditTarget(r); setDialogOpen(true); }, []);
  const askDelete = useCallback((id: string) => setConfirmDeleteId(id), []);

  const confirmDelete = () => {
    if (!confirmDeleteId) return;
    setReviews(prev => prev.filter(r => r.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reviews</h1>
          <p className="text-sm text-muted-foreground">{reviews.length} total.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 w-full sm:w-64 text-base sm:text-sm"
              aria-label="Search reviews"
            />
          </div>
          <Button onClick={openAdd} className="bg-rose-600 hover:bg-rose-700 shrink-0">
            <Plus className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Add review</span>
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-rose-200 bg-white p-10 text-center">
          <p className="text-slate-700 font-medium">No reviews yet.</p>
          <Button onClick={openAdd} className="mt-4 bg-rose-600 hover:bg-rose-700">
            <Plus className="h-4 w-4 mr-1" /> Add a review
          </Button>
        </div>
      ) : (
        <>
          {/* Mobile */}
          <div className="md:hidden space-y-3">
            {filtered.map(r => (
              <ReviewCard key={r.id} review={r} onEdit={openEdit} onDelete={askDelete} />
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden md:block rounded-xl border border-rose-100 bg-white shadow-sm overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gradient-to-r from-amber-100 via-pink-100 to-rose-100 text-rose-900">
                  {['Avatar', 'ID', 'Reviewer', 'Rating', 'Review', 'Date', 'Actions'].map(h => (
                    <th key={h} className="px-3 py-2 text-left font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <ReviewRow key={r.id} review={r} onEdit={openEdit} onDelete={askDelete} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <ReviewFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} review={editTarget} />

      <ConfirmDialog
        open={!!confirmDeleteId}
        title="Delete review?"
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

const ReviewCard = memo(function ReviewCard({
  review, onEdit, onDelete,
}: { review: Review; onEdit: (r: Review) => void; onDelete: (id: string) => void }) {
  return (
    <div className="rounded-xl border border-rose-100 bg-white shadow-sm p-3">
      <div className="flex gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold">
          {review.avatar_initial || review.reviewer_name[0] || '?'}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 truncate">{review.reviewer_name}</p>
          <p className="text-xs text-muted-foreground">{review.date}</p>
          <div className="mt-0.5 inline-flex items-center gap-1 text-amber-700 text-sm">
            <Star className="h-3 w-3 fill-amber-400 stroke-amber-500" /> {review.rating}
          </div>
          <p className="mt-1 text-sm text-slate-700 break-words">{review.review_text}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <Button size="sm" variant="outline" className="h-8" onClick={() => onEdit(review)}>
          <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
        </Button>
        <Button size="sm" variant="ghost" className="h-8 text-red-600 hover:bg-red-50" onClick={() => onDelete(review.id)}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
});

const ReviewRow = memo(function ReviewRow({
  review, onEdit, onDelete,
}: { review: Review; onEdit: (r: Review) => void; onDelete: (id: string) => void }) {
  return (
    <tr className="border-t border-rose-50 hover:bg-rose-50/40">
      <td className="px-3 py-2 align-middle">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold">
          {review.avatar_initial || review.reviewer_name[0] || '?'}
        </span>
      </td>
      <td className="px-3 py-2 align-middle font-mono text-xs">{review.id}</td>
      <td className="px-3 py-2 align-middle font-medium">{review.reviewer_name}</td>
      <td className="px-3 py-2 align-middle">
        <span className="inline-flex items-center gap-1 text-amber-700">
          <Star className="h-3 w-3 fill-amber-400 stroke-amber-500" /> {review.rating}
        </span>
      </td>
      <td className="px-3 py-2 align-middle max-w-[360px] truncate text-slate-700" title={review.review_text}>
        {review.review_text}
      </td>
      <td className="px-3 py-2 align-middle text-xs text-slate-600">{review.date}</td>
      <td className="px-3 py-2 align-middle whitespace-nowrap">
        <div className="flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8" onClick={() => onEdit(review)} aria-label={`Edit ${review.reviewer_name}`}>
            <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
          </Button>
          <Button size="sm" variant="ghost" className="h-8 px-2 text-red-600 hover:bg-red-50" onClick={() => onDelete(review.id)} aria-label={`Delete review`}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
});
