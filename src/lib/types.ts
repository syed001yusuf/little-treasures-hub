export interface Product {
  id: string;
  name: string;
  category_slug: string;
  brand: string;
  age_range: string;
  price: number;
  mrp: number;
  unit: string;
  image_url: string;
  description: string;
  features: string;
  in_stock: boolean;
  featured: boolean;
  rating: number;
  review_count: number;
  alt_image_url: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  description: string;
  color: string;
  banner_image_url: string;
  sort_order: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  image_url: string;
  bg_color: string;
  active: boolean;
}

export interface Settings {
  [key: string]: string;
}

export interface Review {
  id: string;
  reviewer_name: string;
  rating: number;
  review_text: string;
  date: string;
  avatar_initial: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  unit: string;
}
