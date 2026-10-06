import { useEffect, useState } from 'react';
import type { Product } from '../components/ProductCard';
import { getUserProductsByCategory } from '../features/addProduct/storage';

const LIMIT = 10;

interface UseProductsReturn {
  products: Product[];
  total: number;
  loading: boolean;
}

export const useProducts = (
  category: string,
  skip: number
): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const url = category
      ? `https://dummyjson.com/products/category/${category}?limit=${LIMIT}&skip=${skip}`
      : `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;

        // 1️⃣ API-დან წამოღებული პროდუქტები
        const apiProducts: Product[] = data.products;

        // 2️⃣ localStorage-დან მომხმარებლის დამატებული (იმავე კატეგორიის)
        const userProducts = getUserProductsByCategory(category);

        // 3️⃣ თუ პირველ გვერდზე ვართ, მომხმარებლის პროდუქტები წინ ჩავსვათ
        if (skip === 0 && userProducts.length > 0) {
          const combined = [...userProducts, ...apiProducts].slice(0, LIMIT);
          setProducts(combined);
          setTotal(data.total + userProducts.length);
        } else {
          setProducts(apiProducts);
          setTotal(data.total + userProducts.length);
        }

        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [category, skip]);

  return { products, total, loading };
};