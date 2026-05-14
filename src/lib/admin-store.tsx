/* ──────────────────────────────────────────────────────────
 * ADMIN DRAFT STORE
 *
 * Thin wrapper around localStorage that holds the admin's
 * working copy of products / categories / settings / reviews.
 *
 * Strategy:
 *   - On first load, hydrate from localStorage.
 *   - If a draft exists for an entity, it IS the source of
 *     truth for the admin UI. Otherwise we fall back to the
 *     base data fetched from CSV via React Query.
 *   - Any mutation writes the full updated list back to
 *     localStorage so refreshes never lose work.
 *   - Reset / Export are explicit user actions.
 * ────────────────────────────────────────────────────────── */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { Category, Product, Review, Settings } from './types';
import { useCategories, useProducts, useReviews, useSettings } from './hooks';

const KEYS = {
  products: 'admin_draft_products_v1',
  categories: 'admin_draft_categories_v1',
  settings: 'admin_draft_settings_v1',
  reviews: 'admin_draft_reviews_v1',
} as const;

function readDraft<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeDraft<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or disabled — surface via toast at call site if needed */
  }
}

function clearDraft(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* noop */
  }
}

interface AdminStoreCtx {
  products: Product[];
  categories: Category[];
  settings: Settings;
  reviews: Review[];

  setProducts: (next: Product[] | ((prev: Product[]) => Product[])) => void;
  setCategories: (next: Category[] | ((prev: Category[]) => Category[])) => void;
  setSettings: (next: Settings | ((prev: Settings) => Settings)) => void;
  setReviews: (next: Review[] | ((prev: Review[]) => Review[])) => void;

  hasProductsDraft: boolean;
  hasCategoriesDraft: boolean;
  hasSettingsDraft: boolean;
  hasReviewsDraft: boolean;

  resetProducts: () => void;
  resetCategories: () => void;
  resetSettings: () => void;
  resetReviews: () => void;

  loading: boolean;
}

const AdminStoreContext = createContext<AdminStoreCtx | null>(null);

export function AdminStoreProvider({ children }: { children: ReactNode }) {
  const productsQ = useProducts();
  const categoriesQ = useCategories();
  const settingsQ = useSettings();
  const reviewsQ = useReviews();

  const [productsDraft, setProductsDraft] = useState<Product[] | null>(() => readDraft(KEYS.products));
  const [categoriesDraft, setCategoriesDraft] = useState<Category[] | null>(() => readDraft(KEYS.categories));
  const [settingsDraft, setSettingsDraft] = useState<Settings | null>(() => readDraft(KEYS.settings));
  const [reviewsDraft, setReviewsDraft] = useState<Review[] | null>(() => readDraft(KEYS.reviews));

  // Persist on change.
  useEffect(() => {
    if (productsDraft) writeDraft(KEYS.products, productsDraft);
  }, [productsDraft]);
  useEffect(() => {
    if (categoriesDraft) writeDraft(KEYS.categories, categoriesDraft);
  }, [categoriesDraft]);
  useEffect(() => {
    if (settingsDraft) writeDraft(KEYS.settings, settingsDraft);
  }, [settingsDraft]);
  useEffect(() => {
    if (reviewsDraft) writeDraft(KEYS.reviews, reviewsDraft);
  }, [reviewsDraft]);

  const products = productsDraft ?? productsQ.data ?? [];
  const categories = categoriesDraft ?? categoriesQ.data ?? [];
  const settings = settingsDraft ?? settingsQ.data ?? {};
  const reviews = reviewsDraft ?? reviewsQ.data ?? [];

  const setProducts: AdminStoreCtx['setProducts'] = useCallback(updater => {
    setProductsDraft(prev => {
      const base = prev ?? productsQ.data ?? [];
      return typeof updater === 'function' ? (updater as (p: Product[]) => Product[])(base) : updater;
    });
  }, [productsQ.data]);

  const setCategories: AdminStoreCtx['setCategories'] = useCallback(updater => {
    setCategoriesDraft(prev => {
      const base = prev ?? categoriesQ.data ?? [];
      return typeof updater === 'function' ? (updater as (c: Category[]) => Category[])(base) : updater;
    });
  }, [categoriesQ.data]);

  const setSettings: AdminStoreCtx['setSettings'] = useCallback(updater => {
    setSettingsDraft(prev => {
      const base = prev ?? settingsQ.data ?? {};
      return typeof updater === 'function' ? (updater as (s: Settings) => Settings)(base) : updater;
    });
  }, [settingsQ.data]);

  const setReviews: AdminStoreCtx['setReviews'] = useCallback(updater => {
    setReviewsDraft(prev => {
      const base = prev ?? reviewsQ.data ?? [];
      return typeof updater === 'function' ? (updater as (r: Review[]) => Review[])(base) : updater;
    });
  }, [reviewsQ.data]);

  const value = useMemo<AdminStoreCtx>(() => ({
    products,
    categories,
    settings,
    reviews,
    setProducts,
    setCategories,
    setSettings,
    setReviews,
    hasProductsDraft: productsDraft !== null,
    hasCategoriesDraft: categoriesDraft !== null,
    hasSettingsDraft: settingsDraft !== null,
    hasReviewsDraft: reviewsDraft !== null,
    resetProducts: () => { clearDraft(KEYS.products); setProductsDraft(null); },
    resetCategories: () => { clearDraft(KEYS.categories); setCategoriesDraft(null); },
    resetSettings: () => { clearDraft(KEYS.settings); setSettingsDraft(null); },
    resetReviews: () => { clearDraft(KEYS.reviews); setReviewsDraft(null); },
    loading: productsQ.isLoading || categoriesQ.isLoading || settingsQ.isLoading || reviewsQ.isLoading,
  }), [
    products, categories, settings, reviews,
    setProducts, setCategories, setSettings, setReviews,
    productsDraft, categoriesDraft, settingsDraft, reviewsDraft,
    productsQ.isLoading, categoriesQ.isLoading, settingsQ.isLoading, reviewsQ.isLoading,
  ]);

  return <AdminStoreContext.Provider value={value}>{children}</AdminStoreContext.Provider>;
}

export function useAdminStore(): AdminStoreCtx {
  const ctx = useContext(AdminStoreContext);
  if (!ctx) throw new Error('useAdminStore must be used inside <AdminStoreProvider>');
  return ctx;
}
