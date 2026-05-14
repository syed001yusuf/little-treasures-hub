import { useCallback, useMemo, useState } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminStore } from '@/lib/admin-store';
import { useDebounced } from '@/lib/use-debounced';

import { ConfirmDialog } from './ConfirmDialog';
import { SettingFormDialog } from './SettingFormDialog';

export function SettingsPanel() {
  const { settings, setSettings } = useAdminStore();
  const [search, setSearch] = useState('');
  const debounced = useDebounced(search, 150);

  const [editKey, setEditKey] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDeleteKey, setConfirmDeleteKey] = useState<string | null>(null);

  const entries = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    const sorted = Object.entries(settings).sort(([a], [b]) => a.localeCompare(b));
    if (!q) return sorted;
    return sorted.filter(([k, v]) => k.toLowerCase().includes(q) || v.toLowerCase().includes(q));
  }, [settings, debounced]);

  const openAdd = useCallback(() => { setEditKey(null); setDialogOpen(true); }, []);
  const openEdit = useCallback((key: string) => { setEditKey(key); setDialogOpen(true); }, []);

  const confirmDelete = () => {
    if (!confirmDeleteKey) return;
    setSettings(prev => {
      const next = { ...prev };
      delete next[confirmDeleteKey];
      return next;
    });
    setConfirmDeleteKey(null);
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-sm text-muted-foreground">
            Key/value pairs read by the storefront via <code>useSettings()</code>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search settings…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 w-full sm:w-56 text-base sm:text-sm"
              aria-label="Search settings"
            />
          </div>
          <Button onClick={openAdd} className="bg-rose-600 hover:bg-rose-700 shrink-0">
            <Plus className="h-4 w-4 sm:mr-1" />
            <span className="hidden sm:inline">Add setting</span>
          </Button>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-rose-200 bg-white p-10 text-center">
          <p className="text-slate-700 font-medium">No settings yet.</p>
          <Button onClick={openAdd} className="mt-4 bg-rose-600 hover:bg-rose-700">
            <Plus className="h-4 w-4 mr-1" /> Add a setting
          </Button>
        </div>
      ) : (
        <div className="rounded-xl border border-rose-100 bg-white shadow-sm divide-y">
          {entries.map(([key, value]) => (
            <div key={key} className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 hover:bg-rose-50/40">
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-slate-500 break-all">{key}</p>
                <p className="text-sm text-slate-800 break-words">
                  {value || <em className="text-muted-foreground">empty</em>}
                </p>
              </div>
              <div className="flex items-center justify-end gap-2 shrink-0">
                <Button size="sm" variant="outline" className="h-8" onClick={() => openEdit(key)} aria-label={`Edit ${key}`}>
                  <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
                </Button>
                <Button size="sm" variant="ghost" className="h-8 text-red-600 hover:bg-red-50" onClick={() => setConfirmDeleteKey(key)} aria-label={`Delete ${key}`}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <SettingFormDialog open={dialogOpen} onClose={() => setDialogOpen(false)} settingKey={editKey} />

      <ConfirmDialog
        open={!!confirmDeleteKey}
        title={`Delete "${confirmDeleteKey}"?`}
        description="The storefront will fall back to defaults for this key after publish."
        onClose={() => setConfirmDeleteKey(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
