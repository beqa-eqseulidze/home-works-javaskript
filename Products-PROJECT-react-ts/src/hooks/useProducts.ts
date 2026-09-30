import { useEffect, useState } from 'react';
import type { Product } from '../components/ProductCard';

const LIMIT = 10;

interface UseProductsReturn {
  products: Product[];  // 10 პროდუქტი
  total: number; // (194)
  loading: boolean;
}

export const useProducts = (
  category: string,
  skip: number
): UseProductsReturn =>{
  const [products, setProducts] = useState<Product[]>([]); 
  const [total, setTotal] = useState(0);  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const url = category
      ? `https://dummyjson.com/products/category/${category}?limit=${LIMIT}&skip=${skip}`// თუ კატეგორია ავირჩიე - გაფილტროს
      : `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`; // თუ კატეგორია არ ავირჩიე - ყველა პროდუქტი

    fetch(url)
      .then((res)=>res.json())
      .then((data)=>{
        if(cancelled) return;  // თუ ძველია - რეთარნი
        setProducts(data.products); // 10 product
        setTotal(data.total); // total (194)
        setLoading(false);
      })
      .catch(()=>{
        if(!cancelled) setLoading(false);
      });

    return()=>{
      cancelled = true; //ძველი fetch-ის გაუქმება
    };
  }, [category,skip]);

  return { products, total, loading };
};