import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  open, title, description, confirmLabel = 'Delete', onConfirm, onClose,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="sm:max-w-sm max-w-[95vw] p-0 overflow-hidden">
        <div className="px-5 py-4 border-b">
          <h2 className="font-semibold text-slate-900">{title}</h2>
        </div>
        <div className="px-5 py-4 text-sm text-muted-foreground">
          {description ?? 'This action cannot be undone.'}
        </div>
        <div className="px-5 py-3 border-t bg-slate-50 flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-700">{confirmLabel}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
