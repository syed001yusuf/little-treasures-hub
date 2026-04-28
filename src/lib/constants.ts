/* ──────────────────────────────────────────────────────────
 * STORE CONSTANTS
 * Centralised store-wide settings used across the app.
 * These are fallback values — the Google Sheets "settings"
 * tab can override most of these at runtime.
 * ────────────────────────────────────────────────────────── */

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

/* ──────────────────────────────────────────────────────────
 * DEFAULT CATEGORIES (9 categories)
 * Used as fallback when Google Sheets is unavailable.
 * Schema must match the Category type in types.ts.
 * ────────────────────────────────────────────────────────── */
export const DEFAULT_CATEGORIES = [
  { id: "0", name: "Crazy Deals", slug: "crazy-deals", emoji: "🔥", description: "Daily deals at 50%-70% off — grab them before they're gone!", color: "#FFEBEE", banner_image_url: "", sort_order: 0 },
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

/* ──────────────────────────────────────────────────────────
 * DEFAULT BANNERS (3 active homepage banners)
 * Schema matches the Banner type in types.ts.
 * ────────────────────────────────────────────────────────── */
export const DEFAULT_BANNERS = [
  { id: "b1", title: "New Season Collection", subtitle: "Adorable outfits & accessories for your little one — now in stock!", cta_text: "Shop New Arrivals", cta_link: "/category/new-arrivals", image_url: "", bg_color: "#FFE4EC", active: true },
  { id: "b2", title: "Gift Sets Starting ₹799", subtitle: "Perfect presents for baby showers & naming ceremonies", cta_text: "Browse Gift Items", cta_link: "/category/gift-items", image_url: "", bg_color: "#E0F4FF", active: true },
  { id: "b3", title: "Wholesale Prices, Retail Buyers", subtitle: "Premium baby products at unbeatable prices — only at Gandhi Square, Mysore", cta_text: "Shop All Products", cta_link: "/products", image_url: "", bg_color: "#F3E5F5", active: true },
];

/* ──────────────────────────────────────────────────────────
 * DEFAULT SETTINGS (key–value pairs)
 * Matches the Settings type ({ [key: string]: string }).
 * ────────────────────────────────────────────────────────── */
export const DEFAULT_SETTINGS: Record<string, string> = {
  store_name: "Select Baby World",
  tagline: "Mysore's Most Trusted Baby Store",
  whatsapp_number: "918880009888",
  address: "Gandhi Square, Mysore, Karnataka, India",
  map_embed_url: "https://maps.google.com/maps?q=Gandhi+Square+Mysore&output=embed",
  map_directions_url: "https://share.google/hPpHQr5iqEjlAvNry",
  store_hours: "Monday – Saturday: 10:00 AM – 8:00 PM",
  instagram_url: "",
  facebook_url: "",
  google_reviews_url: "https://www.google.com/search?q=SELECT+BABY+WORLD+-+Best+Baby+Store+in+Mysore+Reviews",
};

/* ──────────────────────────────────────────────────────────
 * DEFAULT REVIEWS (10 realistic customer reviews)
 * Schema matches the Review type in types.ts.
 * ────────────────────────────────────────────────────────── */
export const DEFAULT_REVIEWS = [
  { id: "1", reviewer_name: "Priya M.", rating: 5, review_text: "Best baby store in Mysore! Amazing prices and helpful staff. I bought a cradle set and baby clothing — everything was top quality.", date: "2025-11-15", avatar_initial: "P" },
  { id: "2", reviewer_name: "Ravi K.", rating: 5, review_text: "Huge variety under one roof. Wholesale prices are unbeatable! Got a complete newborn kit for my nephew's baby shower.", date: "2025-12-20", avatar_initial: "R" },
  { id: "3", reviewer_name: "Anitha S.", rating: 5, review_text: "Shopping here since my first baby. Genuine branded products every time. The staff is patient and helps you choose the right size.", date: "2026-01-10", avatar_initial: "A" },
  { id: "4", reviewer_name: "Deepak R.", rating: 5, review_text: "My go-to for all baby needs. From carry beds to gift hampers — everything is available. Clean store and well-organized.", date: "2026-01-25", avatar_initial: "D" },
  { id: "5", reviewer_name: "Swathi N.", rating: 4, review_text: "Good collection of baby clothes and accessories. Prices are very reasonable compared to malls. Would love to see more organic options.", date: "2026-02-05", avatar_initial: "S" },
  { id: "6", reviewer_name: "Mohan P.", rating: 5, review_text: "Bought a carry cot and gift hamper for my daughter's newborn. Excellent quality at wholesale prices. Highly recommend!", date: "2026-02-14", avatar_initial: "M" },
  { id: "7", reviewer_name: "Kavya L.", rating: 5, review_text: "The knitted caps and mittens set is adorable! My baby loves the soft fabric. Will definitely buy more from here.", date: "2026-02-28", avatar_initial: "K" },
  { id: "8", reviewer_name: "Arun B.", rating: 4, review_text: "Nice store near Gandhi Square. Easy to find and plenty of parking nearby. They have products for all budgets.", date: "2026-03-10", avatar_initial: "A" },
  { id: "9", reviewer_name: "Meena V.", rating: 5, review_text: "I ordered via WhatsApp and the response was super quick! They packed everything beautifully. Great service.", date: "2026-03-22", avatar_initial: "M" },
  { id: "10", reviewer_name: "Rajesh G.", rating: 5, review_text: "Best place in Mysore for baby products. We furnished our entire nursery from this one shop. Wonderful experience!", date: "2026-04-01", avatar_initial: "R" },
];

/* ──────────────────────────────────────────────────────────
 * DEFAULT PRODUCTS (54 products across 9 categories)
 *
 * image_url is left empty — the UI renders a friendly 🧸
 * emoji when no image is available. For production, populate
 * image URLs in the Google Sheets "products" tab.
 *
 * Schema matches the Product type in types.ts:
 *   id, name, category_slug, brand, age_range, price, mrp,
 *   unit, image_url, description, features, in_stock,
 *   featured, rating, review_count, alt_image_url
 * ────────────────────────────────────────────────────────── */

import type { Product } from './types';

export const DEFAULT_PRODUCTS: Product[] = [
  // ── New Arrivals (6) ──────────────────────────────────
  { id: "1", name: "Newborn Welcome Set", category_slug: "new-arrivals", brand: "BabyFirst", age_range: "0-3 months", price: 799, mrp: 1199, unit: "1 set", image_url: "", description: "Everything you need for your newborn's first days — swaddle, cap, mittens, booties and a bib.", features: "Swaddle blanket,Cap,Mittens,Booties,Bib", in_stock: true, featured: true, rating: 4.8, review_count: 38, alt_image_url: "" },
  { id: "2", name: "Musical Baby Mobile", category_slug: "new-arrivals", brand: "DreamTunes", age_range: "0-12 months", price: 699, mrp: 999, unit: "1 piece", image_url: "", description: "Colorful rotating mobile with soothing melodies to help your baby drift off to sleep.", features: "Soft melodies,Rotating toys,Easy clip mount,Battery operated", in_stock: true, featured: false, rating: 4.5, review_count: 22, alt_image_url: "" },
  { id: "3", name: "Soft Foam Baby Play Mat", category_slug: "new-arrivals", brand: "PlayZone", age_range: "6-48 months", price: 1499, mrp: 2199, unit: "1 piece", image_url: "", description: "Thick, cushioned play mat with alphabet and animal prints for safe tummy time.", features: "Non-toxic EVA foam,Waterproof surface,Easy to clean,Foldable", in_stock: true, featured: true, rating: 4.6, review_count: 31, alt_image_url: "" },
  { id: "4", name: "Baby Milestone Cards Set", category_slug: "new-arrivals", brand: "CherryMoments", age_range: "0-12 months", price: 349, mrp: 499, unit: "Pack of 30", image_url: "", description: "Beautiful illustrated milestone cards to capture your baby's first year memories.", features: "30 cards,Premium cardstock,Pastel illustrations,Gift ready", in_stock: true, featured: false, rating: 4.7, review_count: 19, alt_image_url: "" },
  { id: "5", name: "Organic Cotton Swaddle Set", category_slug: "new-arrivals", brand: "PureBaby", age_range: "0-6 months", price: 599, mrp: 899, unit: "Pack of 2", image_url: "", description: "GOTS-certified organic muslin swaddle blankets in soothing pastel prints.", features: "100% organic cotton,Breathable muslin,120cm x 120cm,Pre-washed", in_stock: true, featured: true, rating: 4.9, review_count: 54, alt_image_url: "" },
  { id: "6", name: "Baby Night Light Projector", category_slug: "new-arrivals", brand: "StarBright", age_range: "0-48 months", price: 549, mrp: 799, unit: "1 piece", image_url: "", description: "Soft-glow star projector with colour-changing modes — perfect nursery companion.", features: "Star projection,3 colour modes,Timer function,USB rechargeable", in_stock: true, featured: false, rating: 4.4, review_count: 27, alt_image_url: "" },

  // ── Carry / Net Beds (6) ──────────────────────────────
  { id: "7", name: "Premium Baby Carrier Net Bed", category_slug: "carry-net-beds", brand: "BabyComfort", age_range: "0-12 months", price: 899, mrp: 1299, unit: "1 piece", image_url: "", description: "Soft and breathable mosquito-net bed perfect for newborns. Keeps insects away.", features: "Breathable mesh,Foldable design,Mosquito protection,Lightweight", in_stock: true, featured: true, rating: 4.5, review_count: 44, alt_image_url: "" },
  { id: "8", name: "Foldable Mosquito Net Bed – Blue", category_slug: "carry-net-beds", brand: "SafeNest", age_range: "0-18 months", price: 749, mrp: 1099, unit: "1 piece", image_url: "", description: "Pop-up mosquito net bed with a soft padded mattress — folds flat for travel.", features: "Pop-up mechanism,Padded mattress,Zip closure,Carry bag included", in_stock: true, featured: false, rating: 4.3, review_count: 33, alt_image_url: "" },
  { id: "9", name: "Portable Baby Net Cradle", category_slug: "carry-net-beds", brand: "BabyComfort", age_range: "0-12 months", price: 1099, mrp: 1599, unit: "1 piece", image_url: "", description: "Sturdy portable cradle with full mosquito net cover and rocking base.", features: "Full net cover,Rocking base,Side pockets,Foldable frame", in_stock: true, featured: false, rating: 4.6, review_count: 26, alt_image_url: "" },
  { id: "10", name: "Deluxe Net Bed with Pillow Set", category_slug: "carry-net-beds", brand: "DreamNest", age_range: "0-12 months", price: 1249, mrp: 1799, unit: "1 set", image_url: "", description: "Spacious net bed with matching pillow and bolsters for complete baby comfort.", features: "Pillow included,2 bolsters,Zip net,Printed cotton base", in_stock: true, featured: true, rating: 4.7, review_count: 37, alt_image_url: "" },
  { id: "11", name: "Travel Baby Net Bed – Pink", category_slug: "carry-net-beds", brand: "LittleNest", age_range: "0-12 months", price: 649, mrp: 999, unit: "1 piece", image_url: "", description: "Ultra-light travel net bed with a cute pink print — fits in any bag.", features: "Ultra-lightweight,Quick fold,Velcro closure,Machine washable", in_stock: true, featured: false, rating: 4.2, review_count: 18, alt_image_url: "" },
  { id: "12", name: "Cotton Mesh Baby Sleeping Bed", category_slug: "carry-net-beds", brand: "BabyComfort", age_range: "0-8 months", price: 599, mrp: 849, unit: "1 piece", image_url: "", description: "Breathable cotton mesh bed ideal for summer — keeps your baby cool and protected.", features: "Cotton mesh,Removable pillow,Zip net,Compact fold", in_stock: true, featured: false, rating: 4.4, review_count: 21, alt_image_url: "" },

  // ── Cradles & Bedding (6) ─────────────────────────────
  { id: "13", name: "Wooden Baby Cradle with Bedding", category_slug: "cradles-bedding", brand: "DreamNest", age_range: "0-24 months", price: 3499, mrp: 4999, unit: "1 set", image_url: "", description: "Beautifully crafted solid-wood cradle with soft bedding set and gentle rocking motion.", features: "Solid wood frame,Soft mattress included,Gentle rocking,Safety rails", in_stock: true, featured: true, rating: 4.7, review_count: 28, alt_image_url: "" },
  { id: "14", name: "6-Piece Crib Bedding Set – Elephant Print", category_slug: "cradles-bedding", brand: "CozyDreams", age_range: "0-24 months", price: 1299, mrp: 1799, unit: "1 set", image_url: "", description: "Adorable elephant-print crib bedding set — includes sheet, pillow, blanket, bumper, bolsters.", features: "100% cotton,Machine washable,Fits standard cribs,6 pieces", in_stock: true, featured: false, rating: 4.6, review_count: 35, alt_image_url: "" },
  { id: "15", name: "Baby Sleeping Bag – Starry Night", category_slug: "cradles-bedding", brand: "WarmBaby", age_range: "0-12 months", price: 699, mrp: 1049, unit: "1 piece", image_url: "", description: "Wearable sleeping bag with starry-night print — keeps baby warm without loose blankets.", features: "2-way zip,TOG 2.5,Shoulder snaps,Kick-proof", in_stock: true, featured: false, rating: 4.5, review_count: 42, alt_image_url: "" },
  { id: "16", name: "Waterproof Crib Mattress Protector", category_slug: "cradles-bedding", brand: "DryGuard", age_range: "0-48 months", price: 449, mrp: 699, unit: "1 piece", image_url: "", description: "Ultra-soft waterproof mattress protector — noiseless and breathable.", features: "Waterproof TPU layer,Breathable,Fitted elastic,Machine washable", in_stock: true, featured: false, rating: 4.4, review_count: 56, alt_image_url: "" },
  { id: "17", name: "Printed Cradle Bedding Set – Bunny", category_slug: "cradles-bedding", brand: "CozyDreams", age_range: "0-12 months", price: 899, mrp: 1299, unit: "1 set", image_url: "", description: "Cute bunny-themed cradle bedding with matching pillow, bolster and mattress.", features: "Cradle mattress,Pillow,Bolster,Cotton fabric", in_stock: true, featured: false, rating: 4.6, review_count: 24, alt_image_url: "" },
  { id: "18", name: "Fleece Baby Blanket – Rainbow", category_slug: "cradles-bedding", brand: "SoftTouch", age_range: "0-36 months", price: 399, mrp: 599, unit: "1 piece", image_url: "", description: "Super-soft fleece blanket with vibrant rainbow stripes — perfect for strollers and cribs.", features: "Ultra-soft fleece,Lightweight,100 x 80 cm,Machine washable", in_stock: true, featured: true, rating: 4.8, review_count: 61, alt_image_url: "" },

  // ── Baby Clothing (8) ─────────────────────────────────
  { id: "19", name: "Cotton Baby Romper Set – Pastel", category_slug: "baby-clothing", brand: "TinyTots", age_range: "0-6 months", price: 499, mrp: 799, unit: "Pack of 3", image_url: "", description: "Soft 100% cotton rompers in pastel shades with easy snap buttons.", features: "100% cotton,Skin-friendly,Easy snap buttons,Machine washable", in_stock: true, featured: true, rating: 4.8, review_count: 73, alt_image_url: "" },
  { id: "20", name: "Baby Frock – Party Wear Pink", category_slug: "baby-clothing", brand: "LittlePrincess", age_range: "6-24 months", price: 599, mrp: 899, unit: "1 piece", image_url: "", description: "Elegant party-wear frock with lace detailing and satin ribbon — perfect for celebrations.", features: "Cotton lining,Lace trim,Back zip,Matching headband", in_stock: true, featured: false, rating: 4.5, review_count: 38, alt_image_url: "" },
  { id: "21", name: "Newborn Jhabla Set – Printed", category_slug: "baby-clothing", brand: "TinyTots", age_range: "0-3 months", price: 349, mrp: 549, unit: "Pack of 5", image_url: "", description: "Front-open jhabla (vest) set in cute animal prints. Essential newborn clothing.", features: "Nappy-friendly design,Tie closure,Soft cotton,Pre-shrunk", in_stock: true, featured: false, rating: 4.6, review_count: 51, alt_image_url: "" },
  { id: "22", name: "Baby Dungaree Set – Denim Blue", category_slug: "baby-clothing", brand: "BabyBoss", age_range: "6-18 months", price: 649, mrp: 999, unit: "1 set", image_url: "", description: "Stylish denim-look dungaree with a contrast T-shirt. Smart-casual for toddlers!", features: "Soft denim,Adjustable straps,Snap buttons,Includes T-shirt", in_stock: true, featured: false, rating: 4.4, review_count: 29, alt_image_url: "" },
  { id: "23", name: "Full Sleeve Bodysuit Pack", category_slug: "baby-clothing", brand: "Mothercare", age_range: "0-12 months", price: 799, mrp: 1199, unit: "Pack of 3", image_url: "", description: "Full-sleeve bodysuits in playful prints. Perfect layering piece for cooler days.", features: "Envelope neck,Snap crotch,Stretchable fabric,3 designs", in_stock: true, featured: true, rating: 4.7, review_count: 64, alt_image_url: "" },
  { id: "24", name: "Baby Kurta Pajama – Festive Gold", category_slug: "baby-clothing", brand: "Chhota Nawab", age_range: "6-24 months", price: 549, mrp: 849, unit: "1 set", image_url: "", description: "Traditional kurta pajama set with gold-print detailing for festivals and occasions.", features: "Cotton silk blend,Churidar pajama,Mandarin collar,Festive print", in_stock: true, featured: false, rating: 4.5, review_count: 33, alt_image_url: "" },
  { id: "25", name: "Printed T-shirt & Shorts Set", category_slug: "baby-clothing", brand: "PlayDay", age_range: "12-48 months", price: 399, mrp: 599, unit: "1 set", image_url: "", description: "Bright printed T-shirt with comfy elastic-waist shorts for everyday play.", features: "Pure cotton,Bold prints,Elastic waist,Colour-fast", in_stock: true, featured: false, rating: 4.3, review_count: 47, alt_image_url: "" },
  { id: "26", name: "Baby Sleepsuit Pack – Stars", category_slug: "baby-clothing", brand: "DreamWear", age_range: "0-12 months", price: 699, mrp: 999, unit: "Pack of 2", image_url: "", description: "Cozy full-length sleepsuits with star print and covered feet for warm nights.", features: "Footed design,Front zip,Soft interlock,Anti-scratch cuffs", in_stock: true, featured: false, rating: 4.7, review_count: 55, alt_image_url: "" },

  // ── Footwear (6) ──────────────────────────────────────
  { id: "27", name: "Baby Soft Booties – Knitted", category_slug: "footwear", brand: "LittleSteps", age_range: "0-12 months", price: 199, mrp: 349, unit: "1 pair", image_url: "", description: "Ultra-soft hand-knitted booties to keep tiny feet warm and cozy.", features: "Anti-slip sole,Soft wool,Easy to wear,Multiple colours", in_stock: true, featured: true, rating: 4.6, review_count: 82, alt_image_url: "" },
  { id: "28", name: "Anti-Slip Baby Socks – Pack of 6", category_slug: "footwear", brand: "TinySole", age_range: "0-24 months", price: 249, mrp: 399, unit: "Pack of 6", image_url: "", description: "Colourful cotton socks with silicone grip dots to prevent slipping on smooth floors.", features: "Anti-slip grips,Cotton blend,Seamless toe,6 pairs", in_stock: true, featured: false, rating: 4.5, review_count: 68, alt_image_url: "" },
  { id: "29", name: "Baby Sandals – Summer Breeze", category_slug: "footwear", brand: "LittleSteps", age_range: "6-24 months", price: 349, mrp: 549, unit: "1 pair", image_url: "", description: "Lightweight open-toe sandals with adjustable velcro strap — ideal for summer outings.", features: "Velcro strap,Cushioned insole,Flexible sole,Lightweight", in_stock: true, featured: false, rating: 4.3, review_count: 36, alt_image_url: "" },
  { id: "30", name: "Knitted Baby Shoes – White", category_slug: "footwear", brand: "CrochetLove", age_range: "0-6 months", price: 179, mrp: 299, unit: "1 pair", image_url: "", description: "Handcrafted crochet baby shoes in elegant white — great for naming ceremonies.", features: "Hand-crocheted,Soft cotton yarn,Ribbon tie,Gift-ready", in_stock: true, featured: false, rating: 4.7, review_count: 24, alt_image_url: "" },
  { id: "31", name: "First Walker Shoes – Navy", category_slug: "footwear", brand: "StepUp", age_range: "9-24 months", price: 499, mrp: 749, unit: "1 pair", image_url: "", description: "Supportive first-walker shoes with flexible rubber sole for confident first steps.", features: "Rubber sole,Ankle support,Breathable mesh,Velcro closure", in_stock: true, featured: true, rating: 4.6, review_count: 41, alt_image_url: "" },
  { id: "32", name: "Crochet Booties Set – Multicolor", category_slug: "footwear", brand: "CrochetLove", age_range: "0-6 months", price: 299, mrp: 449, unit: "Pack of 3", image_url: "", description: "Set of three hand-crocheted booties in pink, blue and yellow — perfect baby-shower gift.", features: "3 pairs,Hand-crocheted,Soft yarn,Gifting box", in_stock: true, featured: false, rating: 4.8, review_count: 29, alt_image_url: "" },

  // ── Baby Accessories (6) ──────────────────────────────
  { id: "33", name: "Baby Hair Accessories Kit", category_slug: "baby-accessories", brand: "CuteClips", age_range: "6-48 months", price: 349, mrp: 499, unit: "Pack of 10", image_url: "", description: "Adorable hair clips and headbands for baby girls — safe, no-scratch design.", features: "Safe clips,No-scratch design,Colourful,Gift box", in_stock: true, featured: false, rating: 4.3, review_count: 52, alt_image_url: "" },
  { id: "34", name: "Baby Bib Set – Waterproof", category_slug: "baby-accessories", brand: "MunchTime", age_range: "0-24 months", price: 299, mrp: 449, unit: "Pack of 5", image_url: "", description: "Waterproof silicone-backed bibs with snap closure. Saves laundry, saves time!", features: "Waterproof back,Snap closure,Crumb catcher,5 designs", in_stock: true, featured: false, rating: 4.5, review_count: 63, alt_image_url: "" },
  { id: "35", name: "Silicone Teething Toy – Ring", category_slug: "baby-accessories", brand: "BiteBuddy", age_range: "3-18 months", price: 199, mrp: 349, unit: "1 piece", image_url: "", description: "BPA-free silicone teething ring with multiple textures to soothe sore gums.", features: "BPA-free,Multiple textures,Easy grip,Refrigerator safe", in_stock: true, featured: true, rating: 4.7, review_count: 74, alt_image_url: "" },
  { id: "36", name: "Baby Nail Clipper & Grooming Set", category_slug: "baby-accessories", brand: "SafeCare", age_range: "0-48 months", price: 249, mrp: 399, unit: "1 set", image_url: "", description: "Complete grooming kit with rounded nail clipper, comb, brush and nose cleaner.", features: "Rounded tips,4-piece set,Carry case,Safety design", in_stock: true, featured: false, rating: 4.4, review_count: 39, alt_image_url: "" },
  { id: "37", name: "Pacifier & Clip Set – BPA Free", category_slug: "baby-accessories", brand: "SoothieBaby", age_range: "0-6 months", price: 149, mrp: 249, unit: "1 set", image_url: "", description: "Orthodontic pacifier with a beaded silicone clip chain — safe and stylish.", features: "BPA-free,Orthodontic shape,Clip chain,Steriliser safe", in_stock: true, featured: false, rating: 4.2, review_count: 45, alt_image_url: "" },
  { id: "38", name: "Baby Grooming Kit – 8 Piece", category_slug: "baby-accessories", brand: "SafeCare", age_range: "0-36 months", price: 449, mrp: 699, unit: "1 set", image_url: "", description: "Comprehensive grooming set with thermometer, nail clipper, comb, brush and more in a cute pouch.", features: "8 pieces,Digital thermometer,Zippered pouch,Travel-friendly", in_stock: true, featured: false, rating: 4.6, review_count: 32, alt_image_url: "" },

  // ── Gift Items (6) ────────────────────────────────────
  { id: "39", name: "Baby Gift Hamper – Deluxe", category_slug: "gift-items", brand: "GiftJoy", age_range: "0-12 months", price: 1299, mrp: 1999, unit: "1 hamper", image_url: "", description: "Beautifully packed gift hamper with romper, blanket, toy, mittens and booties.", features: "Romper set,Blanket,Plush toy,Mittens & booties", in_stock: true, featured: true, rating: 4.9, review_count: 57, alt_image_url: "" },
  { id: "40", name: "Newborn Gift Box – Essential", category_slug: "gift-items", brand: "GiftJoy", age_range: "0-3 months", price: 799, mrp: 1199, unit: "1 box", image_url: "", description: "Essential newborn gift box — cap, jhabla, mittens, socks and a rattle in a keepsake box.", features: "6 items,Keepsake box,Ribbon tied,Greeting card", in_stock: true, featured: false, rating: 4.7, review_count: 38, alt_image_url: "" },
  { id: "41", name: "Premium Baby Gift Set – 10 Piece", category_slug: "gift-items", brand: "Mothercare", age_range: "0-6 months", price: 1799, mrp: 2499, unit: "1 set", image_url: "", description: "Luxury 10-piece gift set: bodysuit, blanket, bib, cap, booties, mittens, washcloth, toy, rattle, bag.", features: "10 pieces,Premium cotton,Gift-wrapped,All essentials", in_stock: true, featured: true, rating: 4.8, review_count: 44, alt_image_url: "" },
  { id: "42", name: "Photo Frame & Handprint Kit", category_slug: "gift-items", brand: "CherryMoments", age_range: "0-12 months", price: 549, mrp: 799, unit: "1 set", image_url: "", description: "Create a lasting memory — baby hand & foot print clay kit with a dual-photo frame.", features: "Air-dry clay,Dual photo slot,Non-toxic,Instructions included", in_stock: true, featured: false, rating: 4.5, review_count: 26, alt_image_url: "" },
  { id: "43", name: "Baby Memory Book – First Year", category_slug: "gift-items", brand: "CherryMoments", age_range: "0-12 months", price: 449, mrp: 649, unit: "1 book", image_url: "", description: "Beautifully illustrated memory book with prompts for baby's first year milestones.", features: "48 pages,Thick cardstock,Illustrated prompts,Gender neutral", in_stock: true, featured: false, rating: 4.6, review_count: 21, alt_image_url: "" },
  { id: "44", name: "Gift Basket – Clothing Set", category_slug: "gift-items", brand: "GiftJoy", age_range: "0-6 months", price: 999, mrp: 1499, unit: "1 basket", image_url: "", description: "Wicker basket packed with a romper, frock, socks, cap and a plush bunny.", features: "Wicker basket,5 clothing items,Plush toy,Cellophane wrap", in_stock: true, featured: false, rating: 4.7, review_count: 30, alt_image_url: "" },

  // ── Carry Cots (5) ────────────────────────────────────
  { id: "45", name: "Portable Baby Carry Cot", category_slug: "carry-cots", brand: "SafeNest", age_range: "0-12 months", price: 1599, mrp: 2499, unit: "1 piece", image_url: "", description: "Lightweight and portable carry cot with sun canopy — ideal for on-the-go parents.", features: "Padded interior,Carry handles,Sun canopy,Washable cover", in_stock: true, featured: true, rating: 4.7, review_count: 51, alt_image_url: "" },
  { id: "46", name: "Padded Carry Cot with Hood", category_slug: "carry-cots", brand: "SafeNest", age_range: "0-10 months", price: 1899, mrp: 2799, unit: "1 piece", image_url: "", description: "Extra-padded carry cot with retractable hood and firm base for newborn safety.", features: "Retractable hood,Firm base,Extra padding,Dual handles", in_stock: true, featured: false, rating: 4.6, review_count: 34, alt_image_url: "" },
  { id: "47", name: "Lightweight Travel Carry Cot", category_slug: "carry-cots", brand: "GoLittle", age_range: "0-8 months", price: 1199, mrp: 1799, unit: "1 piece", image_url: "", description: "Ultra-light carry cot weighing just 1.5 kg — perfect for travel and outings.", features: "1.5 kg weight,Shoulder strap,Foldable,Breathable fabric", in_stock: true, featured: false, rating: 4.4, review_count: 22, alt_image_url: "" },
  { id: "48", name: "Premium Quilted Carry Cot", category_slug: "carry-cots", brand: "DreamNest", age_range: "0-12 months", price: 2199, mrp: 3199, unit: "1 piece", image_url: "", description: "Luxury quilted carry cot with memory-foam mattress and canopy.", features: "Memory foam mattress,Quilted exterior,Zip canopy,Premium zips", in_stock: true, featured: true, rating: 4.8, review_count: 28, alt_image_url: "" },
  { id: "49", name: "Foldable Carry Cot – Polka Dots", category_slug: "carry-cots", brand: "GoLittle", age_range: "0-8 months", price: 999, mrp: 1499, unit: "1 piece", image_url: "", description: "Fun polka-dot print carry cot that folds flat — great for grandparents' house visits.", features: "Folds flat,Polka-dot print,Side pocket,Carry bag", in_stock: true, featured: false, rating: 4.3, review_count: 17, alt_image_url: "" },

  // ── Caps & Gloves (5) ─────────────────────────────────
  { id: "50", name: "Knitted Baby Cap & Gloves Set", category_slug: "caps-gloves", brand: "WarmBaby", age_range: "0-12 months", price: 249, mrp: 399, unit: "1 set", image_url: "", description: "Warm knitted cap and gloves in cute patterns — essential for Mysore winters.", features: "Soft wool blend,Stretchable,Cute patterns,Warm & cozy", in_stock: true, featured: false, rating: 4.4, review_count: 39, alt_image_url: "" },
  { id: "51", name: "Cotton Cap Set – Pack of 3", category_slug: "caps-gloves", brand: "TinyTots", age_range: "0-6 months", price: 199, mrp: 299, unit: "Pack of 3", image_url: "", description: "Lightweight cotton caps in neutral tones — perfect for everyday wear.", features: "Pure cotton,3 colours,Soft elastic,Breathable", in_stock: true, featured: false, rating: 4.5, review_count: 47, alt_image_url: "" },
  { id: "52", name: "Winter Mittens & Booties Combo", category_slug: "caps-gloves", brand: "WarmBaby", age_range: "0-12 months", price: 299, mrp: 449, unit: "1 set", image_url: "", description: "Matching mittens and booties set to keep hands and feet toasty in winter.", features: "Fleece lined,Anti-scratch mittens,Elastic cuffs,Matching set", in_stock: true, featured: true, rating: 4.6, review_count: 34, alt_image_url: "" },
  { id: "53", name: "Sun Hat – UV Protection", category_slug: "caps-gloves", brand: "SunSafe", age_range: "6-36 months", price: 349, mrp: 499, unit: "1 piece", image_url: "", description: "Wide-brim cotton sun hat with UPF 50+ protection and chin strap for outdoor adventures.", features: "UPF 50+,Chin strap,Wide brim,Adjustable toggle", in_stock: true, featured: false, rating: 4.5, review_count: 28, alt_image_url: "" },
  { id: "54", name: "Ear Flap Baby Cap – Teddy", category_slug: "caps-gloves", brand: "CuddleWarm", age_range: "0-18 months", price: 279, mrp: 399, unit: "1 piece", image_url: "", description: "Adorable teddy-bear ear-flap cap in soft fleece — your baby's cutest winter accessory.", features: "Teddy ears,Fleece fabric,Chin tie,Ear coverage", in_stock: true, featured: false, rating: 4.7, review_count: 43, alt_image_url: "" },

  // ── Crazy Deals (6) — daily deals at 50%–70% off ───────
  { id: "CD-001", name: "Crazy Deal: Cotton Romper Pack", category_slug: "crazy-deals", brand: "TinyTots", age_range: "0-12 months", price: 399, mrp: 999, unit: "Pack of 3", image_url: "", description: "Limited-time deal! Pack of 3 cotton rompers at 60% off. Genuine quality, unbeatable price.", features: "100% cotton,Pack of 3,Snap buttons,Machine washable", in_stock: true, featured: true, rating: 4.7, review_count: 89, alt_image_url: "" },
  { id: "CD-002", name: "Crazy Deal: Premium Carry Cot", category_slug: "crazy-deals", brand: "SafeNest", age_range: "0-12 months", price: 999, mrp: 2499, unit: "1 piece", image_url: "", description: "Flat 60% off on our bestselling carry cot. Stocks limited!", features: "Padded interior,Sun canopy,Carry handles,Washable cover", in_stock: true, featured: true, rating: 4.8, review_count: 64, alt_image_url: "" },
  { id: "CD-003", name: "Crazy Deal: Newborn Gift Hamper", category_slug: "crazy-deals", brand: "GiftJoy", age_range: "0-3 months", price: 599, mrp: 1499, unit: "1 hamper", image_url: "", description: "Today's deal — full newborn hamper at flat 60% off. Perfect for baby showers!", features: "Romper,Cap,Mittens,Booties,Bib,Plush toy", in_stock: true, featured: true, rating: 4.9, review_count: 47, alt_image_url: "" },
  { id: "CD-004", name: "Crazy Deal: Wooden Cradle Set", category_slug: "crazy-deals", brand: "DreamNest", age_range: "0-24 months", price: 1749, mrp: 4999, unit: "1 set", image_url: "", description: "Mega deal! Solid wood cradle with bedding at 65% off. Today only.", features: "Solid wood frame,Mattress included,Gentle rocking,Safety rails", in_stock: true, featured: true, rating: 4.7, review_count: 38, alt_image_url: "" },
  { id: "CD-005", name: "Crazy Deal: Anti-Slip Sock Pack (12)", category_slug: "crazy-deals", brand: "TinySole", age_range: "0-24 months", price: 199, mrp: 599, unit: "Pack of 12", image_url: "", description: "67% off! Pack of 12 anti-slip cotton socks. Stock up while it lasts.", features: "Anti-slip grips,Cotton blend,12 pairs,Assorted colours", in_stock: true, featured: true, rating: 4.6, review_count: 112, alt_image_url: "" },
  { id: "CD-006", name: "Crazy Deal: Foam Play Mat XL", category_slug: "crazy-deals", brand: "PlayZone", age_range: "6-48 months", price: 749, mrp: 2199, unit: "1 piece", image_url: "", description: "Flash sale — XL foam play mat at 66% off. Hurry, limited stock!", features: "Non-toxic EVA foam,Waterproof,Foldable,Extra large size", in_stock: true, featured: true, rating: 4.6, review_count: 73, alt_image_url: "" },
];
