import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Minus, Plus, ShoppingCart, MessageCircle } from 'lucide-react';
import { useProducts, useCategories } from '@/lib/hooks';
import { useCart } from '@/lib/cart-context';
import { buildProductInquiry } from '@/lib/whatsapp';
import { StarRating } from '@/components/ui/StarRating';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState<string | null>(null);

  const product = products.find(p => p.id === id);
  if (!product) return <div className="container py-20 text-center"><span className="text-6xl">🔍</span><h2 className="font-heading text-2xl font-bold mt-4">Product not found</h2><Link to="/products" className="text-primary hover:underline mt-2 block">Browse all products</Link></div>;

  const category = categories.find(c => c.slug === product.category_slug);
  const discount = product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const features = product.features ? product.features.split(',').map(f => f.trim()).filter(Boolean) : [];
  const related = products.filter(p => p.category_slug === product.category_slug && p.id !== product.id).slice(0, 4);
  const displayImage = mainImage || product.image_url;
  const images = [product.image_url, product.alt_image_url].filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{product.name} — ₹{product.price} | Select Baby World</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="container py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link> /
          <Link to="/products" className="hover:text-primary">Products</Link> /
          {category && <><Link to={`/category/${category.slug}`} className="hover:text-primary">{category.name}</Link> / </>}
          <span className="text-foreground truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Image */}
          <div className="lg:col-span-3 space-y-3">
            <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden flex items-center justify-center">
              {displayImage ? (
                <img src={displayImage} alt={product.name} className="w-full h-full object-contain p-8" />
              ) : (
                <span className="text-8xl">🧸</span>
              )}
              <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${product.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {product.in_stock ? 'In Stock ✓' : 'Out of Stock'}
              </span>
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setMainImage(img)} className={`w-16 h-16 rounded-xl border-2 overflow-hidden ${(mainImage || product.image_url) === img ? 'border-primary' : 'border-border'}`}>
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-4">
            {category && <span className="inline-block bg-primary-light text-primary text-xs font-bold px-3 py-1 rounded-full">{category.emoji} {category.name}</span>}
            <h1 className="font-heading text-2xl sm:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-sm text-muted-foreground">({product.review_count} reviews)</span>
            </div>
            <p className="text-sm text-muted-foreground">{product.brand} · {product.age_range}</p>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
              {product.mrp > product.price && <span className="text-lg text-muted-foreground line-through">₹{product.mrp.toLocaleString('en-IN')}</span>}
              {discount > 5 && <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full">{discount}% OFF</span>}
            </div>
            <p className="text-xs text-muted-foreground">{product.unit}</p>

            <hr className="border-border" />
            <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>

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
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-muted"><Minus className="h-4 w-4" /></button>
                <span className="px-4 py-2 font-medium min-w-[40px] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-muted"><Plus className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                className="w-full rounded-xl text-base"
                size="lg"
                disabled={!product.in_stock}
                onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image_url: product.image_url, unit: product.unit }, qty)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-xl text-base border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                size="lg"
              >
                <a href={buildProductInquiry(product.name, product.price, qty)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5 mr-2" /> Order on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
