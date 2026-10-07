// კომპონენტის Props: მიმდინარე გვერდი, გვერდების საერთო რაოდენობა და გვერდის შეცვლის callback
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// გვერდების მასივის გენერირება Ellipsis (...) ლოგიკით
function getPageItems(currentPage: number, totalPages: number): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: (number | "...")[] = [1];

  if (currentPage > 3) {
    items.push("...");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    if (!items.includes(i)) {
      items.push(i);
    }
  }

  if (currentPage < totalPages - 2) {
    items.push("...");
  }

  if (totalPages > 1 && !items.includes(totalPages)) {
    items.push(totalPages);
  }

  return items;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageItems = getPageItems(currentPage, totalPages);

  return (
    <nav className="flex items-center justify-center gap-1.5 py-4">
      {/* წინა გვერდის ღილაკი (<) */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-200/70 hover:text-stone-900 disabled:pointer-events-none disabled:opacity-30"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* გვერდის ნომრები */}
      {pageItems.map((item, idx) => {
        if (item === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="flex h-9 w-9 items-center justify-center text-sm font-bold text-stone-400 select-none"
            >
              •••
            </span>
          );
        }

        const isActive = item === currentPage;

        return (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
              isActive
                ? "border-2 border-amber-800 bg-amber-50/80 text-amber-900 shadow-xs font-extrabold scale-105"
                : "text-stone-600 hover:bg-stone-200/70 hover:text-stone-900"
            }`}
          >
            {item}
          </button>
        );
      })}

      {/* შემდეგი გვერდის ღილაკი (>) */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-200/70 hover:text-stone-900 disabled:pointer-events-none disabled:opacity-30"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}