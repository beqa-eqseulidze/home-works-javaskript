import { Link } from 'react-router-dom';

interface Props {
  total: number;
  page: number;
  totalPages: number;
}

export const ProductsHeader = ({ total, page, totalPages }: Props) => {
  return(
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[15px] font-bold text-gray-900">
        Total Products{' '}
        <span className="text-gray-500 font-normal text-[15px]">({total})</span>
      </h2>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-500">
          Page {page} / {totalPages || 1}
        </span>

        <Link to="/add-product"
          className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700  text-white text-base hover:text-[17px] font-bold">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Add product 
        </Link>
      </div>
    </div>
  );
};