import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAdminStore } from '@/lib/admin-store';
import type { Review } from '@/lib/types';

import { Field } from './admin-ui';

interface Props {
  open: boolean;
  onClose: () => void;
  review: Review | null;
}

function emptyReview(): Review {
  return {
    id: '',
    reviewer_name: '',
    rating: 5,
    review_text: '',
    date: new Date().toISOString().slice(0, 10),
    avatar_initial: '',
  };
}

type Errors = Partial<Record<keyof Review, string>>;

function validate(r: Review, list: Review[], isNew: boolean): Errors {
  const e: Errors = {};
  if (!r.id.trim()) e.id = 'ID is required.';
  else if (isNew && list.some(x => x.id === r.id)) e.id = 'ID already exists.';
  if (!r.reviewer_name.trim() || r.reviewer_name.trim().length < 2) e.reviewer_name = 'Name is required.';
  if (!Number.isFinite(r.rating) || r.rating < 1 || r.rating > 5) e.rating = 'Rating must be between 1 and 5.';
  if (!r.review_text.trim() || r.review_text.trim().length < 5) e.review_text = 'Add at least a short review.';
  if (!r.date) e.date = 'Pick a date.';
  return e;
}

export function ReviewFormDialog({ open, onClose, review }: Props) {
  const { reviews, setReviews } = useAdminStore();
  const isNew = review === null;
  const [draft, setDraft] = useState<Review>(emptyReview);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    if (open) {
      setDraft(review ? { ...review } : emptyReview());
      setErrors({});
    }
  }, [open, review]);

  const set = <K extends keyof Review>(key: K, value: Review[K]) =>
    setDraft(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    const finalDraft: Review = {
      ...draft,
      avatar_initial: (draft.avatar_initial || draft.reviewer_name.trim()[0] || '?').slice(0, 2).toUpperCase(),
    };
    const errs = validate(finalDraft, reviews, isNew);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error('Please fix the highlighted fields.');
      return;
    }
    setReviews(prev => {
      if (isNew) return [finalDraft, ...prev];
      return prev.map(r => (r.id === review!.id ? finalDraft : r));
    });
    toast.success(isNew ? 'Review added locally.' : 'Review updated locally.', {
      description: 'Open Export to publish to the live site.',
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="sm:max-w-lg max-w-[95vw] max-h-[90vh] p-0 overflow-hidden flex flex-col gap-0">
        <header className="px-4 sm:px-6 py-4 border-b bg-gradient-to-r from-amber-50 to-pink-50">
          <h2 className="text-lg font-semibold text-rose-900">
            {isNew ? 'Add review' : 'Edit review'}
          </h2>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="ID" htmlFor="r-id" required error={errors.id}>
              <Input id="r-id" value={draft.id} onChange={e => set('id', e.target.value)}
                disabled={!isNew} className="font-mono text-base sm:text-sm" />
            </Field>
            <Field label="Date" htmlFor="r-date" required error={errors.date}>
              <Input id="r-date" type="date" value={draft.date}
                onChange={e => set('date', e.target.value)} className="text-base sm:text-sm" />
            </Field>

            <Field label="Reviewer name" htmlFor="r-name" required error={errors.reviewer_name}>
              <Input id="r-name" value={draft.reviewer_name}
                onChange={e => set('reviewer_name', e.target.value)} className="text-base sm:text-sm" />
            </Field>
            <Field label="Rating" htmlFor="r-rating" required error={errors.rating} hint="1–5, half steps">
              <Input id="r-rating" type="number" min={1} max={5} step={0.5} value={draft.rating}
                onChange={e => set('rating', Number(e.target.value) || 0)} className="text-base sm:text-sm" />
            </Field>
          </div>

          <Field label="Review" htmlFor="r-text" required error={errors.review_text}>
            <textarea
              id="r-text"
              value={draft.review_text}
              onChange={e => set('review_text', e.target.value)}
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </Field>

          <Field label="Avatar initial" htmlFor="r-init" hint="Auto-derived from name if blank.">
            <Input id="r-init" maxLength={2} value={draft.avatar_initial}
              onChange={e => set('avatar_initial', e.target.value.toUpperCase())}
              className="w-20 text-center text-base sm:text-sm" />
          </Field>
        </div>

        <footer className="px-4 sm:px-6 py-3 border-t bg-slate-50 flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="bg-rose-600 hover:bg-rose-700">
            {isNew ? 'Add review' : 'Save changes'}
          </Button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
