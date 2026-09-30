import { useState, useEffect } from 'react';
import type { Product, ProductsResponse } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import { CategoryFilter } from '../components/CategoryFilter';

export function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [skip, setSkip] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const baseUrl = selectedCategory
                    ? `https://dummyjson.com/products/category/${selectedCategory}`
                    : 'https://dummyjson.com/products';

                const response = await fetch(`${baseUrl}?limit=${limit}&skip=${skip}`);
                const data: ProductsResponse = await response.json();

                setProducts(data.products);
                setTotal(data.total);
            } catch (error) {
                console.error('პროდუქტების დაფეჩვისას მოხდა შეცდომა:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [skip, limit, selectedCategory]);

    const currentPage = Math.floor(skip / limit) + 1;
    const totalPages = Math.ceil(total / limit) || 1;

    const handlePageChange = (newPage: number) => {
        const newSkip = (newPage - 1) * limit;
        setSkip(newSkip);
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setSkip(0);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setSkip(0);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">ყველა პროდუქტი</h1>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                limit={limit}
                total={total}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                showLimitSelect={true}
                rightElement={
                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleCategoryChange}
                    />
                }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                limit={limit}
                total={total}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                showLimitSelect={false}
            />
        </div>
    );
}