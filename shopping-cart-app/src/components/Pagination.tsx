import type { ReactNode } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    limit: number;
    total: number;
    onPageChange: (newPage: number) => void;
    onLimitChange: (newLimit: number) => void;
    showLimitSelect?: boolean;
    rightElement?: ReactNode;
}

export function Pagination({
    currentPage,
    totalPages,
    limit,
    total,
    onPageChange,
    onLimitChange,
    showLimitSelect = false,
    rightElement,
}: PaginationProps) {
    const limitOptions = [5, 10, 20, 50];

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 my-6">

            <div className="flex-1 flex justify-start">
                {showLimitSelect && (
                    <div className="flex items-center gap-2 text-sm text-zinc-600 font-medium whitespace-nowrap">
                        <span>გვერდზე რამდენის გამოტანა:</span>
                        <select
                            value={limit}
                            onChange={(e) => onLimitChange(Number(e.target.value))}
                            className="border border-zinc-300 rounded-md px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
                        >
                            {limitOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3.5 py-1.5 text-sm font-medium bg-white border border-zinc-300 rounded-md hover:bg-zinc-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm text-black"
                >
                    წინა
                </button>

                <span className="text-sm text-zinc-700 font-medium px-1 whitespace-nowrap">
                    {currentPage} | {totalPages} დან
                </span>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="px-3.5 py-1.5 text-sm font-medium bg-white border border-zinc-300 rounded-md hover:bg-zinc-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm text-black"
                >
                    შემდეგი
                </button>
            </div>

            <div className="flex-1 flex justify-end">
                {rightElement}
            </div>

        </div>
    );
}