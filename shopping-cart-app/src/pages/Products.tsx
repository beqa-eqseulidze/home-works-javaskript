import { useState, useEffect } from 'react';
import type { Product, ProductsResponse } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import { ProductFilters } from '../components/ProductFilters';

export function Products() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const baseUrl = selectedCategory
                    ? `https://dummyjson.com/products/category/${selectedCategory}?limit=0`
                    : 'https://dummyjson.com/products?limit=0';

                const response = await fetch(baseUrl);
                const data: ProductsResponse = await response.json();

                setAllProducts(data.products);
                setCurrentPage(1);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    const filteredProducts = allProducts.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());

        const min = minPrice !== '' ? Number(minPrice) : 0;
        const max = maxPrice !== '' ? Number(maxPrice) : Infinity;
        const matchesPrice = product.price >= min && product.price <= max;

        return matchesSearch && matchesPrice;
    });

    const totalFiltered = filteredProducts.length;
    const totalPages = Math.ceil(totalFiltered / limit) || 1;

    const startIndex = (currentPage - 1) * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setCurrentPage(1);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handlePriceChange = (min: string, max: string) => {
        setMinPrice(min);
        setMaxPrice(max);
        setCurrentPage(1);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
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
            <h1 className="text-3xl font-bold mb-6">ყველა პროდუქტი</h1>
            <ProductFilters
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={handlePriceChange}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                limit={limit}
                total={totalFiltered}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                showLimitSelect={true}
            />

            {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
                    {paginatedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-zinc-500 font-medium">
                    მითითებული ფილტრებით პროდუქტები ვერ მოიძებნა.
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                limit={limit}
                total={totalFiltered}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
                showLimitSelect={false}
            />
        </div>
    );
}