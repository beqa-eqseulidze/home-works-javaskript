import { useState, useEffect } from 'react';

interface CategoryFilterProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const categoryTranslations: Record<string, string> = {
    beauty: 'თავის მოვლა',
    fragrances: 'პარფიუმერია',
    furniture: 'ავეჯი',
    groceries: 'საკვები / პროდუქტები',
    'home-decoration': 'სახლის დეკორი',
    'kitchen-accessories': 'სამზარეულოს აქსესუარები',
    laptops: 'ლეპტოპები',
    'mens-shirts': 'მამაკაცის პერანგები',
    'mens-shoes': 'მამაკაცის ფეხსაცმელი',
    'mens-watches': 'მამაკაცის საათები',
    'mobile-accessories': 'მობილურის აქსესუარები',
    motorcycle: 'მოტოციკლები',
    'skin-care': 'კანის მოვლა',
    smartphones: 'სმარტფონები',
    'sports-accessories': 'სპორტული აქსესუარები',
    sunglasses: 'მზის სათვალეები',
    'tablets': 'ტაბლეტები',
    tops: 'ზედები',
    vehicle: 'ავტომობილები',
    'womens-bags': 'ქალის ჩანთები',
    'womens-dresses': 'ქალის კაბები',
    'womens-jewellery': 'ქალის სამკაულები',
    'womens-shoes': 'ქალის ფეხსაცმელი',
    'womens-watches': 'ქალის საათები',
};

export function CategoryFilter({
    selectedCategory,
    onSelectCategory,
}: CategoryFilterProps) {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products/category-list');
                const data: string[] = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="flex items-center gap-2 text-sm text-zinc-600 font-medium">
            <span>კატეგორია:</span>
            <select
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value)}
                className="border border-zinc-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
            >
                <option value="">ყველა</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {categoryTranslations[cat] || cat}
                    </option>
                ))}
            </select>
        </div>
    );
}