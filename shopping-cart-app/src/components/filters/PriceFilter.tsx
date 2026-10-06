interface PriceFilterProps {
    minPrice: string;
    maxPrice: string;
    onPriceChange: (min: string, max: string) => void;
}

export function PriceFilter({
    minPrice,
    maxPrice,
    onPriceChange,
}: PriceFilterProps) {
    return (
        <div className="flex items-center gap-2 text-sm text-zinc-600 font-medium">
            <span>ფასი :</span>
            <input
                type="number"
                placeholder="მინ"
                value={minPrice}
                onChange={(e) => onPriceChange(e.target.value, maxPrice)}
                className="w-20 border border-zinc-300 rounded-md px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
            <span>-</span>
            <input
                type="number"
                placeholder="მაქს"
                value={maxPrice}
                onChange={(e) => onPriceChange(minPrice, e.target.value)}
                className="w-20 border border-zinc-300 rounded-md px-2 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
            />
        </div>
    );
}