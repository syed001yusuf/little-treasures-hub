import { useParams } from 'react-router-dom';
import { useCategories } from '@/lib/hooks';
import ProductsPage from './Products';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  return <ProductsPage prefilterCategory={slug} />;
}
