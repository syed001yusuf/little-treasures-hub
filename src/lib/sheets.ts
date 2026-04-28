/* ──────────────────────────────────────────────────────────
 * DATA LAYER — LOCAL CSV + GOOGLE SHEETS (commented out)
 *
 * Current mode: LOCAL CSV
 *   Reads CSV seed files from /public/assets/sheets/*.csv
 *   served by Vite's static-file server at runtime.
 *
 * To switch back to Google Sheets later:
 *   1. Uncomment the GOOGLE SHEETS section below.
 *   2. Set VITE_SHEET_ID in your .env file.
 *   3. The fetchSheet function will prefer Google Sheets
 *      and fall back to local CSV automatically.
 * ────────────────────────────────────────────────────────── */

import Papa from 'papaparse';
import type { Product, Category, Banner, Review, Settings } from './types';
import {
  DEFAULT_CATEGORIES,
  DEFAULT_PRODUCTS,
  DEFAULT_REVIEWS,
  DEFAULT_BANNERS,
  DEFAULT_SETTINGS,
} from './constants';

/* ════════════════════════════════════════════════════════════
 * GOOGLE SHEETS — commented out for now.
 * Uncomment this block + update fetchSheet() to re-enable.
 * ════════════════════════════════════════════════════════════
 *
 * const SHEET_ID = import.meta.env.VITE_SHEET_ID || '';
 *
 * function getSheetUrl(sheetName: string): string {
 *   return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
 * }
 *
 * ════════════════════════════════════════════════════════════ */

/** Base path for local CSV seed files in the public directory. */
const LOCAL_CSV_BASE = '/assets/sheets';

/**
 * Build the URL for a local CSV seed file.
 * Files live in /public/assets/sheets/ and are served as
 * static assets by Vite (dev) or from the dist folder (prod).
 */
function getLocalCsvUrl(sheetName: string): string {
  return `${LOCAL_CSV_BASE}/${sheetName}.csv`;
}

/**
 * Fetch and parse a CSV file into typed row objects.
 * Works identically for local files and remote URLs.
 */
async function parseCsv<T>(url: string): Promise<T[]> {
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const csv = await res.text();
    const { data } = Papa.parse(csv, { header: true, skipEmptyLines: true });
    return data as T[];
  } catch {
    return [];
  }
}

/**
 * Primary data fetcher.
 *
 * Current mode: reads from local CSV only.
 * To add Google Sheets back, uncomment the SHEET_ID block above
 * and prepend getSheetUrl(sheetName) to the sources array:
 *
 *   const sources = SHEET_ID
 *     ? [getSheetUrl(sheetName), getLocalCsvUrl(sheetName)]
 *     : [getLocalCsvUrl(sheetName)];
 */
async function fetchSheet<T>(sheetName: string): Promise<T[]> {
  const sources = [getLocalCsvUrl(sheetName)];

  for (const source of sources) {
    const rows = await parseCsv<T>(source);
    if (rows.length > 0) return rows;
  }

  return [];
}

/* ──────────────────────────────────────────────────────────
 * PUBLIC FETCHERS
 *
 * Each function fetches a specific CSV, maps raw string rows
 * to strongly-typed objects, and falls back to DEFAULT_*
 * constants if the CSV is empty or unreachable.
 *
 * Note on the "features" field in products.csv:
 *   The CSV uses pipe (|) as a sub-delimiter inside the
 *   features column (e.g. "breathable|soft|washable").
 *   The UI splits on comma (,) to render feature chips, so
 *   we replace pipes with commas during mapping.
 * ────────────────────────────────────────────────────────── */

/**
 * Fetch products from the local "products.csv" seed file.
 * Each CSV row is mapped to a Product object. Numeric fields
 * (price, mrp, rating, review_count) are coerced via Number().
 * Boolean fields (in_stock, featured) are parsed from string.
 * The features column uses pipe (|) as sub-delimiter in the CSV;
 * we normalise it to commas so the UI can split on comma.
 * Falls back to DEFAULT_PRODUCTS when CSV is unavailable.
 */
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
    features: (r.features || '').replace(/\|/g, ','),
    in_stock: r.in_stock?.toUpperCase() !== 'FALSE',
    featured: r.featured?.toUpperCase() === 'TRUE',
    rating: Number(r.rating) || 0,
    review_count: Number(r.review_count) || 0,
    alt_image_url: r.alt_image_url || '',
  }));
}

/**
 * Fetch categories from the local "categories.csv" seed file.
 * Falls back to DEFAULT_CATEGORIES (9 categories).
 */
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

/**
 * Fetch homepage banners from the local "banners.csv" seed file.
 * Only banners with active=TRUE are used by the UI.
 * Falls back to DEFAULT_BANNERS when CSV is unavailable.
 */
export async function getBanners(): Promise<Banner[]> {
  const raw = await fetchSheet<Record<string, string>>('banners');
  if (raw.length === 0) return DEFAULT_BANNERS;
  return raw.map(r => ({
    id: r.id || '',
    title: r.title || '',
    subtitle: r.subtitle || '',
    cta_text: r.cta_text || '',
    cta_link: r.cta_link || '',
    image_url: r.image_url || '',
    bg_color: r.bg_color || '',
    active: r.active?.toUpperCase() === 'TRUE',
  }));
}

/**
 * Fetch key-value settings from the local "settings.csv" seed file.
 * Each row has a "key" and "value" column. Falls back to
 * DEFAULT_SETTINGS when CSV is unavailable.
 */
export async function getSettings(): Promise<Settings> {
  const raw = await fetchSheet<Record<string, string>>('settings');
  if (raw.length === 0) return DEFAULT_SETTINGS;
  const settings: Settings = {};
  raw.forEach(r => { if (r.key) settings[r.key] = r.value || ''; });
  return settings;
}

/**
 * Fetch customer reviews from the local "reviews.csv" seed file.
 * Falls back to DEFAULT_REVIEWS (10 reviews).
 */
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
