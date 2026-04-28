import { useParams, Link } from 'react-router-dom';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { Minus, Plus, ShoppingCart, MessageCircle } from 'lucide-react';
import { useProducts, useCategories } from '@/lib/hooks';
import { useCart } from '@/lib/cart-context';
import { buildProductInquiry } from '@/lib/whatsapp';
import { StarRating } from '@/components/ui/StarRating';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';

export default function ProductDetail() {
  // ── ALL HOOKS MUST BE CALLED UNCONDITIONALLY AT THE TOP ──
  const { id } = useParams<{ id: string }>();
  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: categories = [] } = useCategories();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState<string | null>(null);

  // Derived data via useMemo so hook order is stable across renders.
  const product = useMemo(() => products.find(p => p.id === id), [products, id]);

  const safeProductName = product?.name?.trim() || 'Product';
  const safeDescription = product?.description?.trim() || 'View product details at Select Baby World.';

  // Title effect — hook is always called; the body no-ops when product is missing.
  useEffect(() => {
    if (!product) {
      document.title = 'Product | Select Baby World';
      return;
    }
    document.title = `${safeProductName} — ₹${product.price.toLocaleString('en-IN')} | Select Baby World`;
  }, [product, safeProductName]);

  const category = useMemo(
    () => (product ? categories.find(c => c.slug === product.category_slug) : undefined),
    [categories, product]
  );

  const discount = useMemo(
    () => (product && product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0),
    [product]
  );

  const features = useMemo(
    () => (product?.features ? product.features.split(',').map(f => f.trim()).filter(Boolean) : []),
    [product]
  );

  const related = useMemo(
    () => (product ? products.filter(p => p.category_slug === product.category_slug && p.id !== product.id).slice(0, 4) : []),
    [products, product]
  );

  const images = useMemo(
    () => (product ? [product.image_url, product.alt_image_url].filter(Boolean) : []),
    [product]
  );

  const displayImage = mainImage || product?.image_url;

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addItem(
      { id: product.id, name: product.name, price: product.price, image_url: product.image_url, unit: product.unit },
      qty
    );
  }, [addItem, product, qty]);

  // ── EARLY RETURNS ARE SAFE ONLY AFTER ALL HOOKS ABOVE ──
  if (productsLoading) {
    return (
      <div className="container py-20 text-center">
        <span className="text-6xl">⏳</span>
        <h2 className="font-heading text-2xl font-bold mt-4">Loading product…</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <span className="text-6xl">🔍</span>
        <h2 className="font-heading text-2xl font-bold mt-4">Product not found</h2>
        <Link to="/products" className="text-primary hover:underline mt-2 block">Browse all products</Link>
      </div>
    );
  }

  const isCrazyDeal = product.category_slug === 'crazy-deals';

  return (
    <>
      <div className="container py-6 sm:py-8">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
          <Link to="/" className="hover:text-primary">Home</Link> /
          <Link to="/products" className="hover:text-primary">Products</Link> /
          {category && <><Link to={`/category/${category.slug}`} className="hover:text-primary">{category.name}</Link> / </>}
          <span className="text-foreground truncate max-w-[60vw]">{safeProductName}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Image */}
          <div className="md:col-span-1 lg:col-span-3 space-y-3">
            <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden flex items-center justify-center">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={safeProductName}
                  className="w-full h-full object-contain p-4 sm:p-8"
                  width={800}
                  height={800}
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <span className="text-7xl sm:text-8xl">🧸</span>
              )}
              <span className={`absolute top-3 left-3 sm:top-4 sm:left-4 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full ${product.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {product.in_stock ? 'In Stock ✓' : 'Out of Stock'}
              </span>
              {isCrazyDeal && (
                <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full shadow">
                  🔥 Crazy Deal {discount > 0 ? `· ${discount}% OFF` : ''}
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(img)}
                    aria-label={`View image ${i + 1}`}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 overflow-hidden ${(mainImage || product.image_url) === img ? 'border-primary' : 'border-border'}`}
                  >
                    <img src={img} alt={safeProductName} className="w-full h-full object-contain p-1" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-1 lg:col-span-2 space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {category && (
                <span className="inline-block bg-primary-light text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {category.emoji} {category.name}
                </span>
              )}
              {isCrazyDeal && (
                <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  🔥 Crazy Deal
                </span>
              )}
            </div>
            <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold leading-tight">{safeProductName}</h1>
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-sm text-muted-foreground">({product.review_count} reviews)</span>
            </div>
            <p className="text-sm text-muted-foreground">{product.brand} · {product.age_range}</p>

            <div className="flex items-baseline flex-wrap gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
              {product.mrp > product.price && <span className="text-base sm:text-lg text-muted-foreground line-through">₹{product.mrp.toLocaleString('en-IN')}</span>}
              {discount > 5 && <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full">{discount}% OFF</span>}
            </div>
            <p className="text-xs text-muted-foreground">{product.unit}</p>

            <hr className="border-border" />
            <p className="text-sm text-muted-foreground leading-relaxed">{safeDescription}</p>

            {features.length > 0 && (
              <ul className="space-y-1.5">
                {features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className="text-primary">✓</span> {f}
                  </li>
                ))}
              </ul>
            )}

            <hr className="border-border" />

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-xl">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-muted"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-medium min-w-[40px] text-center">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  aria-label="Increase quantity"
                  className="px-3 py-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-muted"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                className="w-full rounded-xl text-base min-h-[48px]"
                size="lg"
                disabled={!product.in_stock}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl text-base min-h-[48px] border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                size="lg"
              >
                <a href={buildProductInquiry(safeProductName, product.price, qty)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" /> Order on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <h2 className="font-heading text-xl sm:text-2xl font-bold mb-4 sm:mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
