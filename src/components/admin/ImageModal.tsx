import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ImageModalProps {
  open: boolean;
  url: string | null;
  title?: string;
  onClose: () => void;
}

/**
 * Custom-positioned image preview modal.
 *
 * Implemented without shadcn `Dialog` so we can guarantee a
 * z-index higher than any open form dialog (which uses z-50).
 * We render a fixed overlay at z-[70] and trap Escape to close.
 */
export function ImageModal({ open, url, title, onClose }: ImageModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Image preview'}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 hover:bg-white text-slate-900 inline-flex items-center justify-center shadow"
        aria-label="Close preview"
      >
        <X className="h-5 w-5" />
      </button>
      <div
        className="relative max-w-[95vw] sm:max-w-3xl w-fit"
        onClick={e => e.stopPropagation()}
        style={{ touchAction: 'pinch-zoom' }}
      >
        {url ? (
          <img
            src={url}
            alt={title || 'preview'}
            className="max-h-[80vh] max-w-full w-auto object-contain rounded-md bg-white"
            onError={e => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240"><rect width="100%" height="100%" fill="%23f1f5f9"/><text x="50%" y="50%" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif" font-size="14">Image failed to load</text></svg>';
            }}
          />
        ) : (
          <p className="text-white">No image to display.</p>
        )}
        {title && (
          <p className="mt-2 text-center text-xs text-white/80 truncate max-w-[80vw]">{title}</p>
        )}
      </div>
    </div>
  );
}
