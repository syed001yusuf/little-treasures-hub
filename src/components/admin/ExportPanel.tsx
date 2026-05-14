import { useState } from 'react';
import { Download, FileWarning, RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAdminStore } from '@/lib/admin-store';
import {
  categoriesToCsv, downloadCsv, productsToCsv, reviewsToCsv, settingsToCsv,
} from '@/lib/csv-export';

import { ConfirmDialog } from './ConfirmDialog';

export function ExportPanel() {
  const {
    products, categories, settings, reviews,
    hasProductsDraft, hasCategoriesDraft, hasSettingsDraft, hasReviewsDraft,
    resetProducts, resetCategories, resetSettings, resetReviews,
  } = useAdminStore();

  const [resetTarget, setResetTarget] = useState<{ label: string; reset: () => void } | null>(null);

  const items = [
    {
      key: 'products',
      label: 'products.csv',
      count: products.length,
      dirty: hasProductsDraft,
      reset: resetProducts,
      build: () => productsToCsv(products),
    },
    {
      key: 'categories',
      label: 'categories.csv',
      count: categories.length,
      dirty: hasCategoriesDraft,
      reset: resetCategories,
      build: () => categoriesToCsv(categories),
    },
    {
      key: 'settings',
      label: 'settings.csv',
      count: Object.keys(settings).length,
      dirty: hasSettingsDraft,
      reset: resetSettings,
      build: () => settingsToCsv(settings),
    },
    {
      key: 'reviews',
      label: 'reviews.csv',
      count: reviews.length,
      dirty: hasReviewsDraft,
      reset: resetReviews,
      build: () => reviewsToCsv(reviews),
    },
  ];

  const downloadAll = () => {
    items.forEach(it => downloadCsv(it.label, it.build()));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Export</h1>
        <p className="text-sm text-muted-foreground">
          Drafts live on this device only. To publish to the live site, follow the three steps below.
        </p>
      </div>

      <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 sm:p-5 text-sm text-blue-900 space-y-3">
        <p className="font-semibold flex items-center gap-2">
          <FileWarning className="h-4 w-4" /> Publishing your changes
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-blue-800">
          <li>Click <strong>Download</strong> for each modified file (or use Download all).</li>
          <li>Replace the matching file inside <code className="bg-blue-100 px-1 rounded">public/assets/sheets/</code> in your repo.</li>
          <li>Commit &amp; push. The next deploy serves the new data.</li>
        </ol>
        <p className="text-xs text-blue-700/90">
          This panel can&rsquo;t write to the live site automatically — it&rsquo;s by design (no backend).
        </p>
      </div>

      <div className="rounded-xl border border-rose-100 bg-white shadow-sm divide-y">
        {items.map(it => (
          <div key={it.key} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <code className="font-mono text-sm">{it.label}</code>
                {it.dirty && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-medium">
                    Modified locally
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{it.count} rows</p>
            </div>
            <div className="flex items-center gap-2 sm:shrink-0">
              {it.dirty && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setResetTarget({ label: it.label, reset: it.reset })}
                  className="flex-1 sm:flex-initial"
                >
                  <RotateCcw className="h-4 w-4 mr-1" /> Reset
                </Button>
              )}
              <Button
                size="sm"
                onClick={() => downloadCsv(it.label, it.build())}
                className="bg-rose-600 hover:bg-rose-700 flex-1 sm:flex-initial"
              >
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Button onClick={downloadAll} className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">
          <Download className="h-4 w-4 mr-2" /> Download all
        </Button>
      </div>

      <ConfirmDialog
        open={!!resetTarget}
        title={`Discard local changes to ${resetTarget?.label ?? ''}?`}
        description="This restores the file to the version currently served on the live site."
        confirmLabel="Discard changes"
        onClose={() => setResetTarget(null)}
        onConfirm={() => {
          resetTarget?.reset();
          setResetTarget(null);
        }}
      />
    </div>
  );
}
