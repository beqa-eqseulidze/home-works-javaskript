import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { ProductDetails } from "../types";

// კატეგორიების სია ფორმის dropdown-ისთვის
const CATEGORIES = [
  "smartphones",
  "laptops",
  "tablets",
  "mobile-accessories",
  "beauty",
  "fragrances",
  "skin-care",
  "furniture",
  "home-decoration",
  "kitchen-accessories",
  "groceries",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "tops",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
  "sports-accessories",
  "sunglasses",
  "motorcycle",
  "vehicle",
];

// Yup ვალიდაციის სქემა
const productValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "სათაური უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს")
    .required("სათაურის შევსება სავალდებულოა"),
  price: Yup.number()
    .typeError("ფასი უნდა იყოს რიცხვი")
    .positive("ფასი უნდა იყოს დადებითი რიცხვი")
    .required("ფასის შევსება სავალდებულოა"),
  category: Yup.string().required("კატეგორიის არჩევა სავალდებულოა"),
  description: Yup.string()
    .trim()
    .min(10, "აღწერა უნდა იყოს მინიმუმ 10 სიმბოლო")
    .required("აღწერის შევსება სავალდებულოა"),
  thumbnail: Yup.string()
    .trim()
    .url("გთხოვთ მიუთითოთ ვალიდური URL (მაგ: https://...)")
    .required("სურათის URL-ის შევსება სავალდებულოა"),
  brand: Yup.string().trim(),
  stock: Yup.number()
    .typeError("მარაგი უნდა იყოს რიცხვი")
    .integer("მარაგი უნდა იყოს მთელი რიცხვი")
    .min(0, "მარაგი არ შეიძლება იყოს უარყოფითი")
    .required("მარაგის შევსება სავალდებულოა"),
  rating: Yup.number()
    .typeError("რეიტინგი უნდა იყოს რიცხვი")
    .min(0, "რეიტინგი უნდა იყოს 0-დან 5-მდე")
    .max(5, "რეიტინგი უნდა იყოს 0-დან 5-მდე")
    .required("რეიტინგის შევსება სავალდებულოა"),
});

export default function AddProductPage() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdProduct, setCreatedProduct] = useState<ProductDetails | null>(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      category: "",
      description: "",
      thumbnail: "",
      brand: "",
      stock: "10",
      rating: "4.5",
    },
    validationSchema: productValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitError(null);
      setSuccessMessage(null);
      try {
        const payload = {
          title: values.title.trim(),
          price: Number(values.price),
          category: values.category,
          description: values.description.trim(),
          thumbnail: values.thumbnail.trim(),
          brand: values.brand.trim() || undefined,
          stock: Number(values.stock),
          rating: Number(values.rating),
        };

        const res = await fetch("https://dummyjson.com/products/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: პროდუქტის დამატება ვერ მოხერხდა`);
        }

        const data: ProductDetails = await res.json();
        setCreatedProduct(data);
        setSuccessMessage("პროდუქტი წარმატებით დაემატა!");
        resetForm();
      } catch (err: unknown) {
        if (err instanceof Error) {
          setSubmitError(err.message);
        } else {
          setSubmitError("დაფიქსირდა უცნობი შეცდომა");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      {/* Back ღილაკი */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-600 hover:text-amber-800 transition-colors"
        >
          ← პროდუქტების სიაში დაბრუნება
        </Link>
      </div>

      <div className="rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 border-b border-stone-100 pb-4">
          <h1 className="text-2xl font-extrabold text-stone-900 sm:text-3xl">
            ახალი პროდუქტის დამატება
          </h1>
          <p className="mt-1 text-sm text-stone-500 font-medium">
            შეავსეთ ფორმის ველები ახალი პროდუქტის შესაქმნელად
          </p>
        </div>

        {/* წარმატების შეტყობინება */}
        {successMessage && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-emerald-800">
            <div className="flex items-center gap-2 font-semibold">
              <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {successMessage}
            </div>
            {createdProduct && (
              <div className="mt-2 text-xs text-emerald-700">
                გენერირებული ID: <span className="font-mono font-bold">{createdProduct.id}</span>
              </div>
            )}
            <div className="mt-3 flex gap-4">
              <button
                type="button"
                onClick={() => setSuccessMessage(null)}
                className="text-xs font-semibold text-emerald-700 underline hover:text-emerald-900"
              >
                კიდევ დამატება
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-xs font-semibold text-emerald-700 underline hover:text-emerald-900"
              >
                მთავარ გვერდზე გადასვლა
              </button>
            </div>
          </div>
        )}

        {/* შეცდომის შეტყობინება */}
        {submitError && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            {submitError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
          {/* სათაური (Title) */}
          <div>
            <label htmlFor="title" className="mb-1.5 block text-sm font-semibold text-stone-700">
              სათაური <span className="text-amber-700">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="მაგ: iPhone 15 Pro"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                formik.touched.title && formik.errors.title
                  ? "border-red-400 focus:ring-red-100"
                  : "border-stone-300 focus:border-amber-600 focus:ring-amber-100"
              }`}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1.5 text-xs font-medium text-red-600">{formik.errors.title}</p>
            )}
          </div>

          {/* ფასი და კატეგორია (2 სვეტი) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* ფასი (Price) */}
            <div>
              <label htmlFor="price" className="mb-1.5 block text-sm font-semibold text-stone-700">
                ფასი ($) <span className="text-amber-700">*</span>
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="999.99"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                  formik.touched.price && formik.errors.price
                    ? "border-red-400 focus:ring-red-100"
                    : "border-stone-300 focus:border-amber-600 focus:ring-amber-100"
                }`}
              />
              {formik.touched.price && formik.errors.price && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{formik.errors.price}</p>
              )}
            </div>

            {/* კატეგორია (Category) */}
            <div>
              <label htmlFor="category" className="mb-1.5 block text-sm font-semibold text-stone-700">
                კატეგორია <span className="text-amber-700">*</span>
              </label>
              <select
                id="category"
                name="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.category}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                  formik.touched.category && formik.errors.category
                    ? "border-red-400 focus:ring-red-100"
                    : "border-stone-300 focus:border-amber-600 focus:ring-amber-100"
                }`}
              >
                <option value="">აირჩიეთ კატეგორია</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {formik.touched.category && formik.errors.category && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{formik.errors.category}</p>
              )}
            </div>
          </div>

          {/* სურათის URL (Thumbnail) */}
          <div>
            <label htmlFor="thumbnail" className="mb-1.5 block text-sm font-semibold text-stone-700">
              სურათის URL <span className="text-amber-700">*</span>
            </label>
            <input
              id="thumbnail"
              name="thumbnail"
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.thumbnail}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                formik.touched.thumbnail && formik.errors.thumbnail
                  ? "border-red-400 focus:ring-red-100"
                  : "border-stone-300 focus:border-amber-600 focus:ring-amber-100"
              }`}
            />
            {formik.touched.thumbnail && formik.errors.thumbnail && (
              <p className="mt-1.5 text-xs font-medium text-red-600">{formik.errors.thumbnail}</p>
            )}
          </div>

          {/* ბრენდი, მარაგი, რეიტინგი (3 სვეტი) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* ბრენდი */}
            <div>
              <label htmlFor="brand" className="mb-1.5 block text-sm font-semibold text-stone-700">
                ბრენდი
              </label>
              <input
                id="brand"
                name="brand"
                type="text"
                placeholder="Apple"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.brand}
                className="w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm transition-all focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-100"
              />
            </div>

            {/* მარაგი (Stock) */}
            <div>
              <label htmlFor="stock" className="mb-1.5 block text-sm font-semibold text-stone-700">
                მარაგი <span className="text-amber-700">*</span>
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                placeholder="10"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                  formik.touched.stock && formik.errors.stock
                    ? "border-red-400 focus:ring-red-100"
                    : "border-stone-300 focus:border-amber-600 focus:ring-amber-100"
                }`}
              />
              {formik.touched.stock && formik.errors.stock && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{formik.errors.stock}</p>
              )}
            </div>

            {/* რეიტინგი (Rating) */}
            <div>
              <label htmlFor="rating" className="mb-1.5 block text-sm font-semibold text-stone-700">
                რეიტინგი (0-5) <span className="text-amber-700">*</span>
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                step="0.1"
                placeholder="4.5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rating}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                  formik.touched.rating && formik.errors.rating
                    ? "border-red-400 focus:ring-red-100"
                    : "border-stone-300 focus:border-amber-600 focus:ring-amber-100"
                }`}
              />
              {formik.touched.rating && formik.errors.rating && (
                <p className="mt-1.5 text-xs font-medium text-red-600">{formik.errors.rating}</p>
              )}
            </div>
          </div>

          {/* აღწერა (Description) */}
          <div>
            <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-stone-700">
              აღწერა <span className="text-amber-700">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="შეიყვანეთ პროდუქტის დეტალური აღწერა..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                formik.touched.description && formik.errors.description
                  ? "border-red-400 focus:ring-red-100"
                  : "border-stone-300 focus:border-amber-600 focus:ring-amber-100"
              }`}
            />
            {formik.touched.description && formik.errors.description && (
              <p className="mt-1.5 text-xs font-medium text-red-600">{formik.errors.description}</p>
            )}
          </div>

          {/* Submit & Cancel ღილაკები */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-100 focus:outline-none transition-colors"
            >
              გაუქმება
            </button>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-800 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-amber-900/20 transition-all hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 disabled:opacity-50"
            >
              {formik.isSubmitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  იგზავნება...
                </>
              ) : (
                "პროდუქტის დამატება"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
