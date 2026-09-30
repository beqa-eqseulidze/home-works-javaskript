import { useEffect, useState } from 'react';
import { usePageController } from '../hooks/usePageController';
import { useProducts } from '../hooks/useProducts';
import { ProductsHeader } from './ProductsHeader';
import { ProductsContent } from './ProductsContent';
import { PageNumbers } from './PageNumbers';
import { PageButtons } from './PageButtons';

interface Props {
  category: string;
}

export const Products = ({ category }: Props)=>{
  const [total, setTotal] = useState(0);

  const { skip, page, totalPages, handleNext, handlePrevious, goToPage } =
    usePageController(category, total);

  const { products, total: fetchedTotal, loading } = useProducts(category, skip);

  useEffect(() => {
    setTotal(fetchedTotal);
  }, [fetchedTotal]);

  return(
    <section className="max-w-6xl mx-auto px-5 pt-5 pb-4">
      <ProductsHeader total={total} page={page} totalPages={totalPages} />
      
      <ProductsContent loading={loading} products={products} />

      {/* Page numbers */}
      <PageNumbers page={page} totalPages={totalPages || 1} onPageClick={goToPage} />

      {/* Previous / Next */}
      <PageButtons page={page} totalPages={totalPages || 1} onNext={handleNext} onPrev={handlePrevious}
      />
    </section>
  );
};