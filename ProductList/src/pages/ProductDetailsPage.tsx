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
    <main className="mx-auto max-w-4xl p-6">
      {/* Back ღილაკი: აბრუნებს წინა გვერდზე (იგივე კატეგორიასა და გვერდზე) */}
      <Link
        to="/"
        onClick={(e) => {
          e.preventDefault();
          window.history.back();
        }}
        className="mb-6 inline-block text-sm text-blue-600 hover:underline"
      >
        ← Back
      </Link>

      {/* ჩატვირთვისა და შეცდომის შეტყობინებები */}
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {/* პროდუქტის დეტალები: მარცხნივ სურათი, მარჯვნივ ინფორმაცია */}
      {product && (
        <div className="grid gap-8 md:grid-cols-2">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full rounded-lg border border-gray-200 object-contain"
          />
          <div>
            <h1 className="mb-2 text-2xl font-bold">{product.title}</h1>
            {/* კატეგორია და brand (თუ არსებობს) */}
            <p className="mb-4 text-sm capitalize text-gray-500">
              {product.category.replace(/-/g, " ")}
              {product.brand ? ` · ${product.brand}` : ""}
            </p>
            {/* პროდუქტის აღწერა */}
            <p className="mb-4 text-gray-700">{product.description}</p>
            <p className="mb-1 text-xl font-semibold">${product.price}</p>
            <p className="text-sm text-gray-600">
              Rating: {product.rating} · In stock: {product.stock}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}