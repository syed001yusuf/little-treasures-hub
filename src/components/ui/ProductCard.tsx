import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { memo, useCallback, useState } from 'react';
import { StarRating } from './StarRating';
import { Button } from './button';
import { useCart } from '@/lib/cart-context';
import type { Product } from '@/lib/types';

function ProductCardComponent({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  const { addItem } = useCart();
  const discount = product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
  const isCrazyDeal = product.category_slug === 'crazy-deals';

  const handleAdd = useCallback(() => {
    addItem({ id: product.id, name: product.name, price: product.price, image_url: product.image_url, unit: product.unit });
  }, [addItem, product.id, product.name, product.price, product.image_url, product.unit]);

  const toggleLike = useCallback(() => setLiked(prev => !prev), []);

  return (
    <div className="group relative bg-card rounded-2xl border shadow-sm hover:shadow-md transition-all overflow-hidden">
      {/* Image */}
      <Link to={`/products/${product.id}`} className="block relative aspect-square bg-muted overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain"
            loading="lazy"
            decoding="async"
            width={400}
            height={400}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🧸</div>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
            <span className="bg-card text-foreground px-3 py-1 rounded-full text-sm font-bold">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* Badges */}
      {isCrazyDeal ? (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow animate-pulse">
          🔥 Crazy Deal
        </span>
      ) : (
        <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
          {product.category_slug.replace(/-/g, ' ')}
        </span>
      )}
      <button
        onClick={toggleLike}
        aria-label={liked ? 'Unlike product' : 'Like product'}
        className="absolute top-2 right-2 h-9 w-9 sm:h-8 sm:w-8 rounded-full bg-card/80 backdrop-blur flex items-center justify-center"
      >
        <Heart className={`h-4 w-4 ${liked ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
      </button>
      {discount > 5 && (
        <span className={`absolute top-11 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${isCrazyDeal ? 'bg-red-600 text-white' : 'bg-accent text-accent-foreground'}`}>
          {discount}% OFF
        </span>
      )}

      {/* Info */}
      <div className="p-2 sm:p-3 space-y-1 sm:space-y-1.5">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-heading font-semibold text-xs sm:text-sm line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <p className="text-[10px] sm:text-xs text-muted-foreground">{product.age_range}</p>
        <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">{product.brand}</p>
        <div className="hidden sm:flex items-center gap-1.5">
          <StarRating rating={product.rating} size={12} />
          <span className="text-xs text-muted-foreground">({product.review_count})</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <span className="text-primary font-bold text-sm sm:text-base">₹{product.price.toLocaleString('en-IN')}</span>
          {product.mrp > product.price && (
            <span className="text-[10px] sm:text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
          )}
        </div>
        <Button
          className="w-full mt-1 rounded-xl text-xs sm:text-sm min-h-[40px] sm:min-h-[36px]"
          size="sm"
          disabled={!product.in_stock}
          onClick={handleAdd}
        >
          <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
        </Button>
      </div>
    </div>
  );
}

export const ProductCard = memo(ProductCardComponent);
