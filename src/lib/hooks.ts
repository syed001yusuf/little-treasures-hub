import { useQuery } from '@tanstack/react-query';
import { getProducts, getCategories, getBanners, getSettings, getReviews } from './sheets';

const STALE_TIME = 60 * 60 * 1000; // 1 hour

export const useProducts = () => useQuery({ queryKey: ['products'], queryFn: getProducts, staleTime: STALE_TIME });
export const useCategories = () => useQuery({ queryKey: ['categories'], queryFn: getCategories, staleTime: STALE_TIME });
export const useBanners = () => useQuery({ queryKey: ['banners'], queryFn: getBanners, staleTime: STALE_TIME });
export const useSettings = () => useQuery({ queryKey: ['settings'], queryFn: getSettings, staleTime: STALE_TIME });
export const useReviews = () => useQuery({ queryKey: ['reviews'], queryFn: getReviews, staleTime: STALE_TIME });
