import { ProductGrid } from './ProductGrid';
import type { Product } from './ProductCard';

interface Props{
  loading: boolean;
  products: Product[];
}

export const ProductsContent = ({ loading, products } : Props)=>{
  if(loading){
    return(
      <div className="text-center py-16 text-sm text-gray-500">Loading...</div>
    );
  }

  if(products.length === 0){
    return(
      <div className="text-center py-16 text-sm text-gray-500">Not found</div>
    );
  }

  return <ProductGrid products={products} />;
};