import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Filter, X } from 'lucide-react';
import { useProducts, useCategories } from '@/lib/hooks';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

const AGE_RANGES = ['0-6 months', '6-12 months', '1-2 years', '2-4 years'];
const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low–High', value: 'price-asc' },
  { label: 'Price: High–Low', value: 'price-desc' },
];

function FilterPanel({
  categories, selectedCats, toggleCat,
  selectedAges, toggleAge,
  sort, setSort, query, setQuery, onClear, filterCount
}: {
  categories: { slug: string; name: string; emoji: string }[];
  selectedCats: string[]; toggleCat: (s: string) => void;
  selectedAges: string[]; toggleAge: (s: string) => void;
  sort: string; setSort: (s: string) => void;
  query: string; setQuery: (s: string) => void;
  onClear: () => void; filterCount: number;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-semibold">Search</label>
        <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." className="mt-1 rounded-xl" />
      </div>
      <div>
        <label className="text-sm font-semibold">Category</label>
        <div className="mt-2 space-y-2">
          {categories.map(c => (
            <label key={c.slug} className="flex items-center gap-2 cursor-pointer text-sm">
              <Checkbox checked={selectedCats.includes(c.slug)} onCheckedChange={() => toggleCat(c.slug)} />
              <span>{c.emoji} {c.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold">Age Range</label>
        <div className="mt-2 space-y-2">
          {AGE_RANGES.map(a => (
            <label key={a} className="flex items-center gap-2 cursor-pointer text-sm">
              <Checkbox checked={selectedAges.includes(a)} onCheckedChange={() => toggleAge(a)} />
              <span>{a}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold">Sort</label>
        <div className="mt-2 space-y-1">
          {SORT_OPTIONS.map(o => (
            <button
              key={o.value}
              onClick={() => setSort(o.value)}
              className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${sort === o.value ? 'bg-primary-light text-primary font-medium' : 'hover:bg-muted'}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
      {filterCount > 0 && (
        <Button variant="outline" onClick={onClear} className="w-full rounded-xl">
          <X className="h-4 w-4 mr-1" /> Clear Filters
        </Button>
      )}
    </div>
  );
}

export default function ProductsPage({ prefilterCategory }: { prefilterCategory?: string }) {
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCats, setSelectedCats] = useState<string[]>(
    prefilterCategory ? [prefilterCategory] : (searchParams.get('category')?.split(',').filter(Boolean) || [])
  );
  const [selectedAges, setSelectedAges] = useState<string[]>(searchParams.get('age')?.split(',').filter(Boolean) || []);
  const [sort, setSort] = useState(searchParams.get('sort') || 'featured');

  const toggleCat = (slug: string) => setSelectedCats(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]);
  const toggleAge = (age: string) => setSelectedAges(prev => prev.includes(age) ? prev.filter(a => a !== age) : [...prev, age]);
  const clearFilters = () => { setQuery(''); setSelectedCats(prefilterCategory ? [prefilterCategory] : []); setSelectedAges([]); setSort('featured'); };

  const filterCount = (selectedCats.length - (prefilterCategory ? 1 : 0)) + selectedAges.length + (query ? 1 : 0);

  const filtered = useMemo(() => {
    let result = [...products];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (selectedCats.length > 0) result = result.filter(p => selectedCats.includes(p.category_slug));
    if (selectedAges.length > 0) result = result.filter(p => selectedAges.some(a => p.age_range.toLowerCase().includes(a.toLowerCase())));
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return result;
  }, [products, query, selectedCats, selectedAges, sort]);

  const filterProps = { categories, selectedCats, toggleCat, selectedAges, toggleAge, sort, setSort, query, setQuery, onClear: clearFilters, filterCount };

  const category = prefilterCategory ? categories.find(c => c.slug === prefilterCategory) : null;

  return (
    <>
      <Helmet>
        <title>{category ? `${category.name} | Select Baby World Mysore` : 'All Baby Products | Select Baby World Mysore'}</title>
        <meta name="description" content={category ? `Shop ${category.name} at Select Baby World Mysore` : 'Browse 200+ baby products at wholesale prices.'} />
      </Helmet>

      {/* Category Hero */}
      {category && (
        <div className="py-4 text-center" style={{ backgroundColor: category.color }}>
          <span className="text-5xl">{category.emoji}</span>
          <h1 className="font-heading text-3xl font-bold mt-2">{category.name}</h1>
          <p className="text-muted-foreground mt-1">{category.description}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-3">
            <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/products" className="hover:text-primary">Products</Link> / <span>{category.name}</span>
          </div>
        </div>
      )}

      <div className="container py-8">
        {!category && <h1 className="font-heading text-3xl font-bold mb-6">All Products</h1>}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20">
              <FilterPanel {...filterProps} />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">{filtered.length} products</p>
              {/* Mobile filter */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="sm" className="rounded-xl">
                    <Filter className="h-4 w-4 mr-1" /> Filters
                    {filterCount > 0 && <span className="ml-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">{filterCount}</span>}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="rounded-t-2xl max-h-[80vh] overflow-y-auto">
                  <SheetTitle>Filters</SheetTitle>
                  <div className="p-4">
                    <FilterPanel {...filterProps} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-6xl">🔍</span>
                <h3 className="font-heading text-xl font-bold mt-4">No products found</h3>
                <p className="text-muted-foreground mt-1">Try adjusting your filters</p>
                <Button onClick={clearFilters} className="mt-4 rounded-xl">Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
