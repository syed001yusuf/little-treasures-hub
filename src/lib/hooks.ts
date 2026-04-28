/* ──────────────────────────────────────────────────────────
 * REACT-QUERY HOOKS
 *
 * Each hook wraps a Google Sheets fetcher from sheets.ts using
 * TanStack React Query. Data is cached for 1 hour (staleTime)
 * so the CSV fetch only fires once per session in practice.
 * ────────────────────────────────────────────────────────── */

import { useQuery } from '@tanstack/react-query';
import { getProducts, getCategories, getBanners, getSettings, getReviews } from './sheets';

/** Cache duration — refetch from Google Sheets after 1 hour. */
const STALE_TIME = 60 * 60 * 1000;

export const useProducts = () => useQuery({ queryKey: ['products'], queryFn: getProducts, staleTime: STALE_TIME });
export const useCategories = () => useQuery({ queryKey: ['categories'], queryFn: getCategories, staleTime: STALE_TIME });
export const useBanners = () => useQuery({ queryKey: ['banners'], queryFn: getBanners, staleTime: STALE_TIME });
export const useSettings = () => useQuery({ queryKey: ['settings'], queryFn: getSettings, staleTime: STALE_TIME });
export const useReviews = () => useQuery({ queryKey: ['reviews'], queryFn: getReviews, staleTime: STALE_TIME });
