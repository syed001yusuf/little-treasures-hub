export const WHATSAPP_NUMBER = "918880009888";
export const WHATSAPP_URL = "https://wa.me/918880009888";
export const STORE_NAME = "Select Baby World";
export const STORE_ADDRESS = "Gandhi Square, Mysore, Karnataka, India";
export const STORE_PHONE = "+91 88800 09888";
export const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=SELECT+BABY+WORLD+-+Best+Baby+Store+in+Mysore+Reviews";
export const DIRECTIONS_URL = "https://share.google/hPpHQr5iqEjlAvNry";
export const STORE_HOURS = "Monday – Saturday: 10:00 AM – 8:00 PM";
export const GEO_LAT = 12.3052;
export const GEO_LNG = 76.6551;
export const MAP_EMBED_URL = "https://maps.google.com/maps?q=Gandhi+Square+Mysore&output=embed";

export const DEFAULT_CATEGORIES = [
  { id: "1", name: "New Arrivals", slug: "new-arrivals", emoji: "🆕", description: "Latest products just in!", color: "#FFE4EC", banner_image_url: "", sort_order: 1 },
  { id: "2", name: "Carry / Net Beds", slug: "carry-net-beds", emoji: "🛏️", description: "Comfortable carry and net beds for your baby", color: "#E0F4FF", banner_image_url: "", sort_order: 2 },
  { id: "3", name: "Cradles & Bedding", slug: "cradles-bedding", emoji: "🌙", description: "Cozy cradles and bedding sets", color: "#F3E5F5", banner_image_url: "", sort_order: 3 },
  { id: "4", name: "Baby Clothing", slug: "baby-clothing", emoji: "👕", description: "Adorable outfits for your little one", color: "#FFF8E1", banner_image_url: "", sort_order: 4 },
  { id: "5", name: "Footwear", slug: "footwear", emoji: "👟", description: "Tiny shoes and booties", color: "#E8F5E9", banner_image_url: "", sort_order: 5 },
  { id: "6", name: "Baby Accessories", slug: "baby-accessories", emoji: "🎀", description: "Essential accessories for babies", color: "#FBE9E7", banner_image_url: "", sort_order: 6 },
  { id: "7", name: "Gift Items", slug: "gift-items", emoji: "🎁", description: "Perfect gifts for newborns and toddlers", color: "#FCE4EC", banner_image_url: "", sort_order: 7 },
  { id: "8", name: "Carry Cots", slug: "carry-cots", emoji: "🧺", description: "Safe and sturdy carry cots", color: "#E3F2FD", banner_image_url: "", sort_order: 8 },
  { id: "9", name: "Caps & Gloves", slug: "caps-gloves", emoji: "🧤", description: "Warm caps and gloves for babies", color: "#F9FBE7", banner_image_url: "", sort_order: 9 },
];

export const DEFAULT_REVIEWS = [
  { id: "1", reviewer_name: "Priya M.", rating: 5, review_text: "Best baby store in Mysore! Amazing prices and helpful staff.", date: "2024-01-15", avatar_initial: "P" },
  { id: "2", reviewer_name: "Ravi K.", rating: 5, review_text: "Huge variety under one roof. Wholesale prices are unbeatable!", date: "2024-02-20", avatar_initial: "R" },
  { id: "3", reviewer_name: "Anitha S.", rating: 5, review_text: "Shopping here since my first baby. Genuine products every time.", date: "2024-03-10", avatar_initial: "A" },
  { id: "4", reviewer_name: "Deepak R.", rating: 5, review_text: "My go-to for all baby needs. From diapers to strollers — all here!", date: "2024-04-05", avatar_initial: "D" },
];

export const DEFAULT_PRODUCTS: Array<{
  id: string; name: string; category_slug: string; brand: string; age_range: string;
  price: number; mrp: number; unit: string; image_url: string; description: string;
  features: string; in_stock: boolean; featured: boolean; rating: number; review_count: number; alt_image_url: string;
}> = [
  { id: "1", name: "Premium Baby Carrier Net Bed", category_slug: "carry-net-beds", brand: "BabyComfort", age_range: "0-12 months", price: 899, mrp: 1299, unit: "1 piece", image_url: "", description: "Soft and breathable net bed perfect for newborns.", features: "Breathable mesh,Foldable design,Mosquito protection,Lightweight", in_stock: true, featured: true, rating: 4.5, review_count: 23, alt_image_url: "" },
  { id: "2", name: "Cotton Baby Romper Set", category_slug: "baby-clothing", brand: "TinyTots", age_range: "0-6 months", price: 499, mrp: 799, unit: "Pack of 3", image_url: "", description: "Soft cotton rompers in adorable prints.", features: "100% cotton,Skin-friendly,Easy snap buttons,Machine washable", in_stock: true, featured: true, rating: 4.8, review_count: 45, alt_image_url: "" },
  { id: "3", name: "Wooden Baby Cradle with Bedding", category_slug: "cradles-bedding", brand: "DreamNest", age_range: "0-24 months", price: 3499, mrp: 4999, unit: "1 set", image_url: "", description: "Beautifully crafted wooden cradle with soft bedding set.", features: "Solid wood frame,Soft mattress included,Gentle rocking,Safety rails", in_stock: true, featured: true, rating: 4.7, review_count: 18, alt_image_url: "" },
  { id: "4", name: "Baby Soft Booties", category_slug: "footwear", brand: "LittleSteps", age_range: "0-12 months", price: 199, mrp: 349, unit: "1 pair", image_url: "", description: "Ultra-soft booties to keep tiny feet warm.", features: "Anti-slip sole,Soft fabric,Easy to wear,Multiple colors", in_stock: true, featured: true, rating: 4.6, review_count: 67, alt_image_url: "" },
  { id: "5", name: "Baby Gift Hamper - Deluxe", category_slug: "gift-items", brand: "GiftJoy", age_range: "0-12 months", price: 1299, mrp: 1999, unit: "1 hamper", image_url: "", description: "Complete gift hamper with essentials for newborns.", features: "Romper set,Blanket,Toy,Mittens & booties", in_stock: true, featured: true, rating: 4.9, review_count: 34, alt_image_url: "" },
  { id: "6", name: "Knitted Baby Cap & Gloves Set", category_slug: "caps-gloves", brand: "WarmBaby", age_range: "0-12 months", price: 249, mrp: 399, unit: "1 set", image_url: "", description: "Warm knitted cap and gloves for winter.", features: "Soft wool blend,Stretchable,Cute designs,Warm & cozy", in_stock: true, featured: false, rating: 4.4, review_count: 29, alt_image_url: "" },
  { id: "7", name: "Baby Hair Accessories Kit", category_slug: "baby-accessories", brand: "CuteClips", age_range: "6-48 months", price: 349, mrp: 499, unit: "Pack of 10", image_url: "", description: "Adorable hair clips and headbands for baby girls.", features: "Safe clips,No-scratch design,Colorful designs,Gift box packaging", in_stock: true, featured: false, rating: 4.3, review_count: 52, alt_image_url: "" },
  { id: "8", name: "Portable Baby Carry Cot", category_slug: "carry-cots", brand: "SafeNest", age_range: "0-12 months", price: 1599, mrp: 2499, unit: "1 piece", image_url: "", description: "Lightweight and portable carry cot for on-the-go parents.", features: "Padded interior,Carry handles,Sun canopy,Washable cover", in_stock: true, featured: true, rating: 4.7, review_count: 41, alt_image_url: "" },
  { id: "9", name: "Newborn Welcome Set", category_slug: "new-arrivals", brand: "BabyFirst", age_range: "0-3 months", price: 799, mrp: 1199, unit: "1 set", image_url: "", description: "Everything you need for your newborn's first days.", features: "Swaddle blanket,Cap,Mittens,Booties,Bib", in_stock: true, featured: true, rating: 4.8, review_count: 15, alt_image_url: "" },
  { id: "10", name: "Musical Baby Mobile", category_slug: "new-arrivals", brand: "DreamTunes", age_range: "0-12 months", price: 699, mrp: 999, unit: "1 piece", image_url: "", description: "Colorful musical mobile to soothe your baby to sleep.", features: "Soft melodies,Rotating toys,Easy mount,Battery operated", in_stock: true, featured: false, rating: 4.5, review_count: 22, alt_image_url: "" },
];
