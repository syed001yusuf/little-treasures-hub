

## Select Baby World — E-Commerce Website

A complete baby products wholesale store website for Select Baby World, Gandhi Square, Mysore. Built as a React SPA with Google Sheets as the CMS.

### Data Layer (`/lib/sheets.ts`)
- Fetch all 5 Google Sheets tabs (products, categories, banners, settings, reviews) as public CSV
- Parse CSV into typed TypeScript objects with proper error handling (empty array fallback)
- Use `VITE_SHEET_ID` env variable for the spreadsheet ID
- React Query with 1-hour stale time for caching
- Type definitions in `/lib/types.ts`

### Branding & Design
- **Colors**: Coral (#FF6B8A), soft pink (#FFE4EC), blue (#4A90D9), sky blue (#E0F4FF), orange (#FFB347), neutral (#F8F9FA)
- **Fonts**: Baloo 2 (headings) + Nunito (body) via Google Fonts
- **Style**: Rounded corners (2xl), subtle shadows, warm and playful
- **SVG Logo**: Baby stroller icon + "SELECT BABY WORLD" text

### Pages (7 total)

1. **Homepage** (`/`) — Hero banner with gradient + floating SVG shapes, USP strip (4 cards), Shop by Category grid (9 categories with emoji + pastel backgrounds), Featured Products carousel/grid, New Arrivals section, Why Choose Us cards, Google Reviews carousel (with 4 hardcoded fallbacks), Visit Our Store section with map embed + contact info

2. **Products** (`/products`) — All products with sidebar filters (category checkboxes, age range, sort options, search), responsive product grid, URL search params for filter state

3. **Category** (`/category/:slug`) — Category hero banner with emoji + color, breadcrumb, pre-filtered product grid with same filter sidebar

4. **Product Detail** (`/products/:id`) — Large image + thumbnails, full product info (price/MRP/discount/rating/brand/age), quantity selector, Add to Cart + WhatsApp order buttons, "You May Also Like" section

5. **Cart** (`/cart`) — Cart items list with quantity controls, order summary, WhatsApp checkout with formatted message, empty cart state

6. **About** (`/about`) — Store story, mission, 4 stats row, store hours

7. **Contact** (`/contact`) — Contact form (→ WhatsApp), store info card, Google Maps embed

### Shared Components
- **Navbar**: Sticky, logo, nav links, categories dropdown with emoji, search icon, cart badge. Mobile hamburger with slide-in drawer
- **Footer**: 4-column layout (brand, quick links, categories, contact), copyright bar
- **Floating WhatsApp button**: Fixed bottom-right, green circle, pulse animation
- **Search Modal**: Full-screen overlay, real-time client-side filtering, compact result cards
- **Product Card**: Image, category badge, wishlist heart, name, price/MRP/discount, Add to Cart, out-of-stock overlay

### Cart System
- React Context + localStorage (`sbw_cart` key)
- WhatsApp checkout with formatted multi-line order message
- Quantity controls, remove items

### SEO
- React Helmet for per-page meta tags
- JSON-LD LocalBusiness structured data on homepage
- Static robots.txt

### Constants
- All hardcoded values (WhatsApp number, store address, Google Reviews URL, directions URL, geo coordinates) as specified

