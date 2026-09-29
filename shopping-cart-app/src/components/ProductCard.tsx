import type { Product } from '../types/product';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden hover:border-black transition-all duration-200 flex flex-col justify-between">
            <div className="relative pt-[75%] bg-zinc-50 border-b border-zinc-100">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="absolute top-0 left-0 w-full h-full object-contain p-4"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                        {product.category}
                    </span>
                    <h3 className="text-base font-bold text-black mt-1 line-clamp-1">
                        {product.title}
                    </h3>
                    <p className="text-zinc-500 text-xs mt-2 line-clamp-2">
                        {product.description}
                    </p>
                </div>
                <div className="mt-5 flex items-center justify-between">
                    <span className="text-lg font-bold text-black">${product.price}</span>
                    <button className="bg-black hover:bg-zinc-800 text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors">
                        ყიდვა
                    </button>
                </div>
            </div>
        </div>
    );
}