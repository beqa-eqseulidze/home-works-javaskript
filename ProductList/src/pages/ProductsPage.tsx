import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import type { Product, ProductsResponse } from "../types";

// API-ის საბაზისო მისამართი
const API = "https://dummyjson.com";
// პროდუქტების რაოდენობა ერთ გვერდზე (limit)
const LIMIT = 10;
// "All" რეჟიმში გვერდების მაქსიმალური რაოდენობა
const MAX_PAGES = 10;
// გვერდი, სადაც უნდა გამოჩნდეს laptops და smartphones
const FEATURED_PAGE = 3;
const FEATURED_CATEGORIES = ["laptops", "smartphones"];
// "ყველა პროდუქტის" მნიშვნელობა
const ALL = "all";
// Hero banner-ის სურათი
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80";

// კატეგორიების ჯგუფები: id იწერება URL-ში, label ჩანს ღილაკზე,
// categories არის API-ის იმ კატეგორიების სია, რომლებიც ჯგუფში შედის
const CATEGORY_GROUPS = [
  {
    id: "electronics",
    label: "Electronics",
    categories: ["smartphones", "tablets", "laptops", "mobile-accessories"],
  },
  {
    id: "beauty",
    label: "Beauty",
    categories: ["beauty", "fragrances", "skin-care"],
  },
  {
    id: "home",
    label: "Home",
    categories: ["furniture", "home-decoration", "kitchen-accessories"],
  },
  {
    id: "groceries",
    label: "Groceries",
    categories: ["groceries"],
  },
  {
    id: "mens-fashion",
    label: "Men's Fashion",
    categories: ["mens-shirts", "mens-shoes", "mens-watches"],
  },
  {
    id: "womens-fashion",
    label: "Women's Fashion",
    categories: [
      "tops",
      "womens-bags",
      "womens-dresses",
      "womens-jewellery",
      "womens-shoes",
      "womens-watches",
    ],
  },
  {
    id: "sports-accessories",
    label: "Sports & Accessories",
    categories: ["sports-accessories", "sunglasses"],
  },
  {
    id: "transport",
    label: "Transport",
    categories: ["motorcycle", "vehicle"],
  },
];

// ფილტრის ღილაკების სია: "All" + ყველა ჯგუფი
const FILTERS = [{ id: ALL, label: "All" }, ...CATEGORY_GROUPS];

// დამხმარე ფუნქცია: fetch + error შემოწმება + JSON დაბრუნება
async function getJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

// პროდუქტების გადალაგება: laptops და smartphones ხვდება მე-3 გვერდზე
function arrangeProducts(all: Product[]): Product[] {
  // ორივე featured კატეგორიის პროდუქტები ერთ მასივში
  const featured = FEATURED_CATEGORIES.flatMap((category) =>
    all.filter((p) => p.category === category)
  );
  // დანარჩენი კატეგორიების პროდუქტები
  const others = all.filter((p) => !FEATURED_CATEGORIES.includes(p.category));

  // მე-3 გვერდისთვის საჭირო პირველი 10 featured პროდუქტი
  const pageItems = featured.slice(0, LIMIT);
  // დარჩენილი პროდუქტები (featured-ის ზედმეტი ნაწილი ბოლოში გადადის)
  const rest = [...others, ...featured.slice(LIMIT)];
  // პოზიცია, საიდანაც იწყება მე-3 გვერდი (skip = 20)
  const insertAt = (FEATURED_PAGE - 1) * LIMIT;

  return [
    ...rest.slice(0, insertAt),
    ...pageItems,
    ...rest.slice(insertAt),
  ];
}

export default function ProductsPage() {
  // ჯგუფი და გვერდი ინახება URL-ში (?category=...&page=...),
  // რომ Back ღილაკზე იგივე მდგომარეობა დაბრუნდეს
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? ALL;
  const page = Number(searchParams.get("page")) || 1;

  // ყველა პროდუქტი, loading და error state-ები
  const [rawProducts, setRawProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // პროდუქტების ერთჯერადი ჩატვირთვა კომპონენტის გამოჩენისას
  useEffect(() => {
    const controller = new AbortController(); // request-ის გასაუქმებლად

    getJson<ProductsResponse>(`${API}/products?limit=0`, controller.signal) // limit=0 → ყველა პროდუქტი
      .then((data) => setRawProducts(data.products))
      .catch((err: Error) => {
        // გაუქმებული request error-ად არ ითვლება
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    // cleanup: კომპონენტის გაქრობისას request-ის გაუქმება
    return () => controller.abort();
  }, []);

  // არჩეული ჯგუფის მიხედვით პროდუქტების გაფილტვრა
  const filteredProducts = useMemo(() => {
    if (category === ALL) return arrangeProducts(rawProducts);

    // ჯგუფის პოვნა id-ით; თუ URL-ში უცნობი მნიშვნელობაა, ვაჩვენებთ ყველა პროდუქტს
    const group = CATEGORY_GROUPS.find((g) => g.id === category);
    if (!group) return arrangeProducts(rawProducts);

    // პროდუქტი ჩანს, თუ მისი API კატეგორია ჯგუფის სიაშია
    return rawProducts.filter((p) => group.categories.includes(p.category));
  }, [rawProducts, category]);

  // skip: რამდენი პროდუქტი უნდა გამოვტოვოთ მიმდინარე გვერდამდე
  const skip = (page - 1) * LIMIT;
  // მიმდინარე გვერდის 10 პროდუქტი (ლოკალური skip/limit)
  const products = useMemo(
    () => filteredProducts.slice(skip, skip + LIMIT),
    [filteredProducts, skip]
  );

  // გვერდების რაოდენობა; "All" რეჟიმში მაქსიმუმ 10
  const pagesCount = Math.ceil(filteredProducts.length / LIMIT);
  const totalPages = category === ALL ? Math.min(MAX_PAGES, pagesCount) : pagesCount;

  // ჯგუფის შეცვლისას გვერდი ბრუნდება 1-ზე
  const handleCategoryChange = (next: string) => {
    setSearchParams({ category: next, page: "1" });
  };

  // გვერდის შეცვლა (ჯგუფი უცვლელია)
  const handlePageChange = (next: number) => {
    setSearchParams({ category, page: String(next) });
  };

  return (
    <main className="mx-auto max-w-5xl p-6">
      {/* Hero banner: სურათი ბნელი overlay-თ და სათაურით; სურათის გარეშე ჩანს gradient */}
      <section
        className="relative mb-8 flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 bg-cover bg-center sm:h-72"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative px-4 text-center text-white">
          <h1 className="text-3xl font-bold sm:text-5xl">Products</h1>
          <p className="mt-2 text-sm sm:text-base">
            Discover the best products in every category
          </p>
        </div>
      </section>

      {/* ჯგუფების ღილაკები: "All" + 8 ჯგუფი; flex-1 ღილაკებს თანაბრად გაჭიმავს მთლიან სიგანეზე */}
      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleCategoryChange(item.id)}
            className={`flex-1 whitespace-nowrap rounded-full border px-3 py-1 text-sm transition-colors ${
              item.id === category
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* შეცდომისა და ჩატვირთვის შეტყობინებები */}
      {error && <p className="mb-4 text-red-600">Error: {error}</p>}
      {loading && <p className="mb-4 text-gray-500">Loading...</p>}

      {/* პროდუქტების grid: დაჭერისას გადადის დეტალების გვერდზე */}
      <ul className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              to={`/products/${product.id}`}
              className="block rounded-lg border border-gray-200 p-3 transition-shadow hover:shadow-md"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="mb-2 h-32 w-full object-contain"
              />
              <h2 className="text-sm font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-600">${product.price}</p>
            </Link>
          </li>
        ))}
      </ul>

      {/* გვერდების ნავიგაცია */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}