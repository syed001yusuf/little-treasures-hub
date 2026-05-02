import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAdminStore } from '@/lib/admin-store';

import { Field } from './admin-ui';

interface Props {
  open: boolean;
  onClose: () => void;
  /** When editing, the existing key. When adding, null. */
  settingKey: string | null;
}

const KEY_RE = /^[a-z0-9_]+$/;

export function SettingFormDialog({ open, onClose, settingKey }: Props) {
  const { settings, setSettings } = useAdminStore();
  const isNew = settingKey === null;

  const [draftKey, setDraftKey] = useState('');
  const [draftValue, setDraftValue] = useState('');
  const [errors, setErrors] = useState<{ key?: string; value?: string }>({});

  useEffect(() => {
    if (open) {
      setDraftKey(settingKey ?? '');
      setDraftValue(settingKey ? settings[settingKey] ?? '' : '');
      setErrors({});
    }
  }, [open, settingKey, settings]);

  const handleSave = () => {
    const errs: typeof errors = {};
    const key = draftKey.trim();
    if (!key) errs.key = 'Key is required.';
    else if (!KEY_RE.test(key)) errs.key = 'lowercase letters, numbers and underscore only.';
    else if (isNew && settings[key] !== undefined) errs.key = 'A setting with this key already exists.';
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error('Please fix the highlighted fields.');
      return;
    }

    setSettings(prev => {
      const next = { ...prev };
      if (settingKey && settingKey !== key) delete next[settingKey];
      next[key] = draftValue;
      return next;
    });
    toast.success(isNew ? 'Setting added locally.' : 'Setting updated locally.', {
      description: 'Open Export to publish to the live site.',
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="sm:max-w-md max-w-[95vw] max-h-[90vh] p-0 overflow-hidden flex flex-col gap-0">
        <header className="px-4 sm:px-6 py-4 border-b bg-gradient-to-r from-rose-50 to-pink-50">
          <h2 className="text-lg font-semibold text-rose-900">
            {isNew ? 'Add setting' : 'Edit setting'}
          </h2>
        </header>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          <Field label="Key" htmlFor="s-key" required error={errors.key} hint="snake_case identifier">
            <Input
              id="s-key"
              value={draftKey}
              onChange={e => setDraftKey(e.target.value)}
              className="font-mono text-base sm:text-sm"
              placeholder="store_name"
            />
          </Field>
          <Field label="Value" htmlFor="s-val">
            <textarea
              id="s-val"
              value={draftValue}
              onChange={e => setDraftValue(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
          </Field>
        </div>

        <footer className="px-4 sm:px-6 py-3 border-t bg-slate-50 flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} className="bg-rose-600 hover:bg-rose-700">
            {isNew ? 'Add' : 'Save'}
          </Button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
