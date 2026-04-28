import { Link } from 'react-router-dom';
import { useProducts } from '@/lib/hooks';
import { ProductCard } from '@/components/ui/ProductCard';

export function FeaturedProducts() {
  const { data: products = [] } = useProducts();
  const featured = products.filter(p => p.featured).slice(0, 8);

  if (featured.length === 0) return null;

  return (
    <section className="container py-12">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-2">Featured Products</h2>
      <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {featured.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      <div className="text-center mt-6">
        <Link to="/products" className="text-primary font-medium hover:underline">View All Products →</Link>
      </div>
    </section>
  );
}

export function NewArrivals() {
  const { data: products = [] } = useProducts();
  const arrivals = products.filter(p => p.category_slug === 'new-arrivals').slice(0, 4);

  if (arrivals.length === 0) return null;

  return (
    <section className="bg-secondary-light py-12">
      <div className="container">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-2">New Arrivals 🆕</h2>
        <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {arrivals.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
