import type { NewProduct } from './types';

const LOCAL_STORAGE = 'userProducts';

export const getUserProducts = (): NewProduct[]=>{
  const raw = localStorage.getItem(LOCAL_STORAGE);
  if(!raw) return [];
  try{
    return JSON.parse(raw) as NewProduct[];
  } catch {
    return [];
  }
};

// add new product to localstorage
export const saveUserProduct = (product: NewProduct): void=>{
  const current = getUserProducts();
  const updated = [product, ...current];
  localStorage.setItem(LOCAL_STORAGE, JSON.stringify(updated));
};

//filter with category
export const getUserProductsByCategory = (category: string): NewProduct[]=>{
  const all = getUserProducts();
  if (!category) return all;
  return all.filter((p) => p.category === category);
};