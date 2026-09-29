export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) =>{
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-400 transition flex flex-col cursor-pointer">
      <div className="bg-gray-50 p-2 flex items-center justify-center h-30">
        <img src={product.thumbnail} alt={product.title} className="max-h-full max-w-full object-contain" loading="lazy"/>
      </div>

      <div className="p-2 flex flex-col flex-1">
        <h3 className="text-[13px] text-gray-800 line-clamp-2 leading-snug">
          {product.title}
        </h3>

        <div className="mt-1">
          <span className="text-[16px] font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};