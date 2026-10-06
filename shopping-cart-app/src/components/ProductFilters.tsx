import { CategoryFilter } from './filters/CategoryFilter';
import { SearchFilter } from './filters/SearchFilter';
import { PriceFilter } from './filters/PriceFilter';

interface ProductFiltersProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    minPrice: string;
    maxPrice: string;
    onPriceChange: (min: string, max: string) => void;
}

export function ProductFilters({
    selectedCategory,
    onSelectCategory,
    searchQuery,
    onSearchChange,
    minPrice,
    maxPrice,
    onPriceChange,
}: ProductFiltersProps) {
    return (
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-lg mb-6">
            <SearchFilter searchQuery={searchQuery} onSearchChange={onSearchChange} />
            <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
            />
            <PriceFilter
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={onPriceChange}
            />
        </div>
    );
}