/* ──────────────────────────────────────────────────────────
 * CSV EXPORT HELPERS
 *
 * Serialise admin-edited lists back into the exact column
 * order used by /public/assets/sheets/*.csv so the user can
 * drop the downloaded file straight into the repo.
 *
 * Notes:
 *   - The "features" field is stored in-memory as a comma
 *     separated string (matches the storefront UI). The CSV
 *     uses a pipe (|) sub-delimiter, so we convert on export.
 *   - Booleans are written as TRUE / FALSE to match the
 *     existing parser in src/lib/sheets.ts.
 * ────────────────────────────────────────────────────────── */

import Papa from 'papaparse';
import type { Category, Product, Review, Settings } from './types';

function bool(v: boolean): string {
  return v ? 'TRUE' : 'FALSE';
}

function download(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function productsToCsv(products: Product[]): string {
  const rows = products.map(p => ({
    id: p.id,
    name: p.name,
    category_slug: p.category_slug,
    brand: p.brand,
    age_range: p.age_range,
    price: p.price,
    mrp: p.mrp,
    unit: p.unit,
    image_url: p.image_url,
    description: p.description,
    features: (p.features || '').split(',').map(s => s.trim()).filter(Boolean).join('|'),
    in_stock: bool(p.in_stock),
    featured: bool(p.featured),
    rating: p.rating,
    review_count: p.review_count,
    alt_image_url: p.alt_image_url,
  }));
  return Papa.unparse(rows, {
    columns: [
      'id', 'name', 'category_slug', 'brand', 'age_range', 'price', 'mrp', 'unit',
      'image_url', 'description', 'features', 'in_stock', 'featured', 'rating',
      'review_count', 'alt_image_url',
    ],
  });
}

export function categoriesToCsv(categories: Category[]): string {
  return Papa.unparse(categories, {
    columns: ['id', 'name', 'slug', 'emoji', 'description', 'color', 'banner_image_url', 'sort_order'],
  });
}

export function settingsToCsv(settings: Settings): string {
  const rows = Object.entries(settings).map(([key, value]) => ({ key, value }));
  return Papa.unparse(rows, { columns: ['key', 'value'] });
}

export function reviewsToCsv(reviews: Review[]): string {
  return Papa.unparse(reviews, {
    columns: ['id', 'reviewer_name', 'rating', 'review_text', 'date', 'avatar_initial'],
  });
}

export const downloadCsv = download;
