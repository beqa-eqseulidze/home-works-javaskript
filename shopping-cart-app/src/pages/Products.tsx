import { useState, useEffect } from 'react';
import type { Product, ProductsResponse } from '../types/product';
import { ProductCard } from '../components/ProductCard';

export function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [skip, setSkip] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const limit = 10;

    useEffect(() => {
        setLoading(true);
        fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
            .then((res) => res.json())
            .then((data: ProductsResponse) => {
                setProducts(data.products);
                setTotal(data.total);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, [skip]);

    const currentPage = Math.floor(skip / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    const handleNext = () => {
        if (skip + limit < total) {
            setSkip((prev) => prev + limit);
        }
    };

    const handlePrev = () => {
        if (skip >= limit) {
            setSkip((prev) => prev - limit);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 pb-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-extrabold text-black">პროდუქტების კატალოგი</h2>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-6 mt-12 bg-white p-4 rounded-xl border border-zinc-200 w-fit mx-auto">
                        <button
                            onClick={handlePrev}
                            disabled={skip === 0}
                            className="px-5 py-2 rounded-lg text-sm font-medium text-black bg-zinc-100 hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            წინა გვერდი
                        </button>

                        <span className="text-black text-sm font-semibold">
                            გვერდი {currentPage} of {totalPages}
                        </span>

                        <button
                            onClick={handleNext}
                            disabled={skip + limit >= total}
                            className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-black hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                            შემდეგი გვერდი
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}