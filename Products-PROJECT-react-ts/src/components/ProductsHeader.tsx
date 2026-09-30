interface Props {
  total: number;
  page: number;
  totalPages: number;
}

export const ProductsHeader = ({ total, page, totalPages }: Props) => {
  return(
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[15px] font-bold text-gray-900">
        Total Product{' '}
        <span className="text-gray-500 font-normal text-[15px]">({total})</span>
      </h2>
      <span className="text-xs text-gray-500">
        Page {page} / {totalPages || 1}
      </span>
    </div>
  );
};