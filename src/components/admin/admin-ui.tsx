/* ──────────────────────────────────────────────────────────
 * SHARED ADMIN UI PRIMITIVES
 *
 * Small, presentational helpers used across the admin form
 * dialogs and list pages. Keeping them in one file avoids
 * duplication and makes responsive tweaks single-source.
 * ────────────────────────────────────────────────────────── */

import { ImageOff, Eye, X as XIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export const FALLBACK_IMG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="100%" height="100%" fill="%23f1f5f9"/><text x="50%" y="54%" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif" font-size="12">no image</text></svg>';

interface FieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: ReactNode;
}

/** Labelled form row used inside form dialogs. */
export function Field({ label, htmlFor, error, required, hint, className, children }: FieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-slate-700 flex items-center gap-1"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface ImageSlotProps {
  label: string;
  url: string;
  onChange: (next: string) => void;
  onPreview: () => void;
  error?: string;
}

/**
 * Reusable image input with thumbnail preview, URL field, and
 * remove + preview actions. Fully mobile-responsive: stacks on
 * tiny screens, sits horizontally on >=sm.
 */
export function ImageSlot({ label, url, onChange, onPreview, error }: ImageSlotProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="flex items-start gap-3 flex-wrap sm:flex-nowrap">
        <div className="h-24 w-24 shrink-0 rounded-md border bg-white overflow-hidden flex items-center justify-center">
          {url ? (
            <img
              src={url}
              alt={label}
              loading="lazy"
              decoding="async"
              width={96}
              height={96}
              className="h-full w-full object-cover"
              onError={e => {
                (e.target as HTMLImageElement).src = FALLBACK_IMG;
              }}
            />
          ) : (
            <ImageOff className="h-6 w-6 text-rose-300" />
          )}
        </div>
        <div className="flex-1 min-w-0 space-y-2">
          <input
            type="url"
            value={url}
            onChange={e => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="block w-full h-10 rounded-md border border-input bg-background px-3 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
          />
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={onPreview}
              disabled={!url}
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md border bg-white hover:bg-rose-50 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label={`Preview ${label}`}
            >
              <Eye className="h-3.5 w-3.5" /> Preview
            </button>
            {url && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md border bg-white text-red-600 hover:bg-red-50"
                aria-label={`Remove ${label}`}
              >
                <XIcon className="h-3.5 w-3.5" /> Remove
              </button>
            )}
          </div>
        </div>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface ChipInputProps {
  value: string; // comma separated
  onChange: (next: string) => void;
  placeholder?: string;
}

/**
 * Tag/chip input. Stores comma-separated string internally to
 * stay compatible with the `Product.features` shape used by the
 * storefront and CSV export.
 */
export function ChipInput({ value, onChange, placeholder }: ChipInputProps) {
  const chips = value.split(',').map(s => s.trim()).filter(Boolean);

  const addChip = (raw: string) => {
    const next = raw.trim();
    if (!next) return;
    if (chips.includes(next)) return;
    onChange([...chips, next].join(','));
  };

  const removeChip = (idx: number) => {
    const next = chips.filter((_, i) => i !== idx);
    onChange(next.join(','));
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-input bg-background p-1.5 min-h-[40px] focus-within:ring-2 focus-within:ring-rose-300">
      {chips.map((chip, i) => (
        <span
          key={`${chip}-${i}`}
          className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 text-xs font-medium px-2 py-1 rounded-full"
        >
          {chip}
          <button
            type="button"
            onClick={() => removeChip(i)}
            className="hover:text-rose-950"
            aria-label={`Remove ${chip}`}
          >
            <XIcon className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        type="text"
        placeholder={placeholder ?? 'Type and press Enter…'}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addChip(e.currentTarget.value);
            e.currentTarget.value = '';
          } else if (e.key === 'Backspace' && !e.currentTarget.value && chips.length > 0) {
            removeChip(chips.length - 1);
          }
        }}
        onBlur={e => {
          if (e.currentTarget.value) {
            addChip(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
        className="flex-1 min-w-[120px] bg-transparent border-0 outline-none text-base sm:text-sm px-1"
      />
    </div>
  );
}
