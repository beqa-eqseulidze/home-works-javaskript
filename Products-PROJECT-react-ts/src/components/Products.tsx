import { useEffect, useState } from 'react';
import { ProductGrid } from './ProductGrid';
import { Pagination } from './Pagination';
import type { Product } from './ProductCard';

const LIMIT = 10; 

interface Props{
  category: string; 
}

export const Products = ({ category }: Props) => {
  const [products, setProducts] = useState<Product[]>([]); //10 პროდუქტი
  const [total, setTotal] = useState(0); //მთლიანი რაოდენობა
  const [skip, setSkip] = useState(0);                   
  const [loading, setLoading] = useState(true); 

  const totalPages = Math.ceil(total / LIMIT); // (194/10) = 20)
  const page = Math.floor(skip / LIMIT) + 1;   // (skip 10 → გვერდი 2)


  useEffect(() => {
    setSkip(0);
  }, [category]);


   useEffect(() => {
     let cancelled = false;
     setLoading(true);

    const url = category
      ? `https://dummyjson.com/products/category/${category}?limit=${LIMIT}&skip=${skip}`  // თუ კატეგორია ავირჩიე - გაფილტროს
      : `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`; // თუ კატეგორია ავირჩიე - გაფილტროს

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if(cancelled) return;
        setProducts(data.products); //10 პროდუქტი
        setTotal(data.total); //მთლიანი
        setLoading(false);
      })
      .catch(()=>{
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true; 
    };
  }, [category, skip]);


  // Next - (0 - 10 - 20 )
  const handleNext =()=> {
    if(skip + LIMIT < total) setSkip(skip + LIMIT);
  };

  // Previous — (20 - 10 - 0)
  const handlePrev = () => {
    if (skip - LIMIT >= 0) setSkip(skip - LIMIT);
  };

  return(
    <section className="max-w-6xl mx-auto px-5 pt-5 pb-4">
      {/* სათაური + გვერდის ინდიკატორი */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-gray-900">
          Total Products{' '}
          <span className="text-gray-500 font-normal text-[15px]">({total})</span>
        </h2>
        <span className="text-xs text-gray-500">
          Page {page} / {totalPages || 1}
        </span>
      </div>

      {/* სამი მდგომარეობა: იტვირთება / ცარიელი / პროდუქტები */}
      {loading ? (
        <div className="text-center py-16 text-sm text-gray-500">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 text-sm text-gray-500">Not found</div>
      ) : (
        <ProductGrid products={products} />
      )}

      {/* ქვედა კონტროლერი — ყოველთვის ჩანს */}
      <Pagination
        page={page}
        totalPages={totalPages || 1}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};