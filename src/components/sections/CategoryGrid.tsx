import { Link } from 'react-router-dom';
import { useCategories } from '@/lib/hooks';

export function CategoryGrid() {
  const { data: categories = [] } = useCategories();

  return (
    <section className="container py-12">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center mb-2">Shop by Category</h2>
      <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.sort((a, b) => a.sort_order - b.sort_order).map(cat => (
          <Link
            key={cat.slug}
            to={`/category/${cat.slug}`}
            className="group flex flex-col items-center gap-2 p-6 rounded-2xl transition-all hover:scale-105 hover:ring-2 hover:ring-primary hover:shadow-md"
            style={{ backgroundColor: cat.color }}
          >
            <span className="text-4xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
            <span className="font-heading font-bold text-sm text-center text-foreground">{cat.name}</span>
          </Link>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link to="/products" className="text-primary font-medium hover:underline">View All Products →</Link>
      </div>
    </section>
  );
}
