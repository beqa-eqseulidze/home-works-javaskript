import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { ProductDetails } from "../types";

export default function ProductDetailsPage() {
  // პროდუქტის id URL-იდან (/products/:id)
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // პროდუქტის დეტალების ჩატვირთვა; id-ის შეცვლისას თავიდან სრულდება
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/products/${id}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ProductDetails>;
      })
      .then(setProduct)
      .catch((err: Error) => {
        // გაუქმებული request error-ად არ ითვლება
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    // cleanup: წინა request-ის გაუქმება
    return () => controller.abort();
  }, [id]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      {/* Back ღილაკი */}
      <Link
        to="/"
        onClick={(e) => {
          e.preventDefault();
          window.history.back();
        }}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-stone-600 hover:text-amber-800 transition-colors"
      >
        ← პროდუქტების სიაში დაბრუნება
      </Link>

      {/* ჩატვირთვისა და შეცდომის შეტყობინებები */}
      {loading && (
        <div className="flex justify-center py-16">
          <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-sm border border-stone-200/80">
            <svg className="h-5 w-5 animate-spin text-amber-800" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span className="text-sm font-medium text-stone-600">იტვირთება...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm font-medium text-red-700">
          შეცდომა: {error}
        </div>
      )}

      {/* პროდუქტის დეტალები */}
      {product && (
        <div className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex h-80 w-full items-center justify-center rounded-2xl bg-stone-100/80 p-6">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <span className="mb-2 inline-block rounded-full bg-amber-100/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-900">
                  {product.category.replace(/-/g, " ")}
                  {product.brand ? ` · ${product.brand}` : ""}
                </span>
                <h1 className="mb-3 text-2xl font-extrabold text-stone-900 sm:text-3xl">
                  {product.title}
                </h1>
                <p className="mb-6 leading-relaxed text-stone-600">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4 border-t border-stone-100 pt-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-amber-900">${product.price}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-stone-600">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-amber-800 border border-amber-200/60">
                    ★ {product.rating} / 5
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-stone-100 px-2.5 py-1 text-stone-700">
                    მარაგშია: {product.stock} ცალი
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}