import Papa from 'papaparse';
import type { Product, Category, Banner, Review, Settings } from './types';
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS, DEFAULT_REVIEWS } from './constants';

const SHEET_ID = import.meta.env.VITE_SHEET_ID || '';

function getSheetUrl(sheetName: string): string {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
}

async function fetchSheet<T>(sheetName: string): Promise<T[]> {
  if (!SHEET_ID) return [];
  try {
    const res = await fetch(getSheetUrl(sheetName));
    if (!res.ok) return [];
    const csv = await res.text();
    const { data } = Papa.parse(csv, { header: true, skipEmptyLines: true });
    return data as T[];
  } catch {
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  const raw = await fetchSheet<Record<string, string>>('products');
  if (raw.length === 0) return DEFAULT_PRODUCTS;
  return raw.map(r => ({
    id: r.id || '',
    name: r.name || '',
    category_slug: r.category_slug || '',
    brand: r.brand || '',
    age_range: r.age_range || '',
    price: Number(r.price) || 0,
    mrp: Number(r.mrp) || 0,
    unit: r.unit || '',
    image_url: r.image_url || '',
    description: r.description || '',
    features: r.features || '',
    in_stock: r.in_stock?.toLowerCase() !== 'false',
    featured: r.featured?.toLowerCase() === 'true',
    rating: Number(r.rating) || 0,
    review_count: Number(r.review_count) || 0,
    alt_image_url: r.alt_image_url || '',
  }));
}

export async function getCategories(): Promise<Category[]> {
  const raw = await fetchSheet<Record<string, string>>('categories');
  if (raw.length === 0) return DEFAULT_CATEGORIES;
  return raw.map(r => ({
    id: r.id || '',
    name: r.name || '',
    slug: r.slug || '',
    emoji: r.emoji || '',
    description: r.description || '',
    color: r.color || '#FFE4EC',
    banner_image_url: r.banner_image_url || '',
    sort_order: Number(r.sort_order) || 0,
  }));
}

export async function getBanners(): Promise<Banner[]> {
  const raw = await fetchSheet<Record<string, string>>('banners');
  if (raw.length === 0) return [];
  return raw.map(r => ({
    id: r.id || '',
    title: r.title || '',
    subtitle: r.subtitle || '',
    cta_text: r.cta_text || '',
    cta_link: r.cta_link || '',
    image_url: r.image_url || '',
    bg_color: r.bg_color || '',
    active: r.active?.toLowerCase() === 'true',
  }));
}

export async function getSettings(): Promise<Settings> {
  const raw = await fetchSheet<Record<string, string>>('settings');
  const settings: Settings = {};
  raw.forEach(r => { if (r.key) settings[r.key] = r.value || ''; });
  return settings;
}

export async function getReviews(): Promise<Review[]> {
  const raw = await fetchSheet<Record<string, string>>('reviews');
  if (raw.length === 0) return DEFAULT_REVIEWS;
  return raw.map(r => ({
    id: r.id || '',
    reviewer_name: r.reviewer_name || '',
    rating: Number(r.rating) || 5,
    review_text: r.review_text || '',
    date: r.date || '',
    avatar_initial: r.avatar_initial || r.reviewer_name?.[0] || '?',
  }));
}
