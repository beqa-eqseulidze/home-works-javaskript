// კომპონენტის Props: მიმდინარე გვერდი, გვერდების საერთო რაოდენობა და გვერდის შეცვლის callback
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// ერთდროულად ნაჩვენები გვერდის ღილაკების რაოდენობა
const WINDOW = 5;

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // ფანჯრის საწყისი გვერდი: აქტიური გვერდი ცენტრში (მე-3 პოზიცია) რჩება,
  // მაგრამ პირველ და ბოლო გვერდებზე ფანჯარა საზღვრებს არ სცდება
  const start = Math.max(1, Math.min(currentPage - 2, totalPages - WINDOW + 1));
  // ფანჯრის ბოლო გვერდი
  const end = Math.min(totalPages, start + WINDOW - 1);
  // გვერდის ნომრების მასივი, მაგ. [3, 4, 5, 6, 7]
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          // აქტიური გვერდი ლურჯია, დანარჩენი ნაცრისფერი; ყველა ღილაკი მრგვალია (rounded-full)
          className={`h-9 w-9 rounded-full border text-sm font-medium transition-colors ${
            page === currentPage
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}