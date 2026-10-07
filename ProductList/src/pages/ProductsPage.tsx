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
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Hero banner: თბილი ტონალობის სურათი overlay-თ და სტილიზებული ტექსტით */}
      <section
        className="relative mb-8 flex h-60 items-center justify-center overflow-hidden rounded-3xl bg-amber-900 bg-cover bg-center shadow-lg sm:h-72"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-900/50 to-amber-950/70 backdrop-blur-[1px]" />
        <div className="relative px-6 text-center text-stone-100">
          <span className="mb-2 inline-block rounded-full bg-amber-500/20 px-3.5 py-1 text-xs font-semibold tracking-wider text-amber-200 uppercase backdrop-blur-md">
            Premium Collection
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-amber-50 drop-shadow-sm">
            Products Catalog
          </h1>
          {/* <p className="mt-2 text-sm text-stone-200 sm:text-base max-w-lg mx-auto font-medium">
            აღმოაჩინეთ საუკეთესო პროდუქტები თქვენთვის სასურველ კატეგორიაში
          </p> */}
        </div>
      </section>

      {/* კატეგორიების ღილაკები */}
      <div className="mb-6 flex flex-wrap gap-2.5">
        {FILTERS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleCategoryChange(item.id)}
            className={`flex-1 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${item.id === category
                ? "border-amber-800 bg-amber-800 text-white shadow-md shadow-amber-900/20"
                : "border-stone-200 bg-stone-200/60 text-stone-700 hover:bg-stone-300/80 hover:text-stone-900"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* ახალი პროდუქტის დამატების ღილაკი (კატეგორიების ქვემოთ) */}
      <div className="mb-8 flex justify-center sm:justify-end">
        <Link
          to="/add-product"
          className="inline-flex items-center gap-2 rounded-2xl bg-amber-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-amber-900/20 transition-all duration-200 hover:bg-amber-900 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
        >
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          ახალი პროდუქტის დამატება
        </Link>
      </div>

      {/* შეცდომისა და ჩატვირთვის შეტყობინებები */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm font-medium text-red-700">
          შეცდომა: {error}
        </div>
      )}
      {loading && (
        <div className="mb-8 flex justify-center py-12">
          <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-sm border border-stone-200/80">
            <svg className="h-5 w-5 animate-spin text-amber-800" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span className="text-sm font-medium text-stone-600">იტვირთება...</span>
          </div>
        </div>
      )}

      {/* პროდუქტების grid: Warm Minimalist ქარდები */}
      <ul className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              to={`/products/${product.id}`}
              className="group flex flex-col justify-between h-full rounded-2xl border border-stone-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/70 hover:shadow-xl hover:shadow-stone-200/80"
            >
              <div>
                <div className="mb-3 flex h-40 w-full items-center justify-center overflow-hidden rounded-xl bg-stone-100/70 p-3 transition-colors group-hover:bg-amber-50/50">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="mb-1.5 inline-block rounded-md bg-amber-100/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-900">
                  {product.category.replace(/-/g, " ")}
                </span>
                <h2 className="text-sm font-semibold text-stone-800 line-clamp-1 group-hover:text-amber-800 transition-colors">
                  {product.title}
                </h2>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2.5">
                <span className="text-base font-extrabold text-amber-900">${product.price}</span>
                <span className="text-xs font-semibold text-amber-800 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  ნახვა →
                </span>
              </div>
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