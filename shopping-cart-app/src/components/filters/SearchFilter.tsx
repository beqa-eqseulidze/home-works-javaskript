interface SearchFilterProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export function SearchFilter({ searchQuery, onSearchChange }: SearchFilterProps) {
    return (
        <div className="flex items-center gap-2 text-sm text-zinc-600 font-medium flex-1 min-w-[220px]">
            <span>ძებნა:</span>
            <input
                type="text"
                placeholder="სათაური ან აღწერა..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full border border-zinc-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
        </div>
    );
}