export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface Props{
  product: Product;
}

export const ProductCard = ({ product } : Props)=>{
  return(
    <div className="bg-white rounded-lg border shadow-md border-gray-200 hover:border-gray-300 overflow-hidden hover:shadow-2xl transition flex flex-col cursor-pointer">
      <div className="bg-gray-50 p-2 flex items-center justify-center h-30">
        <img src={product.thumbnail} alt={product.title}
         className="max-h-full max-w-full object-contain"/>
      </div>

      <div className="p-2 flex flex-col flex-1">
        <h3 className="text-[13px] text-gray-800 line-clamp-2">
          {product.title}
        </h3>

        <div className="mt-1">
          <span className="text-[15px] font-bold text-gray-900">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
};