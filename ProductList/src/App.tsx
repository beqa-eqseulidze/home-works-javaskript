import { Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AddProductPage from "./pages/AddProductPage";

// აპლიკაციის routes: მთავარი გვერდი, დეტალები და პროდუქტის დამატება
export default function App() {
  return (
    <Routes>
      {/* მთავარი გვერდი: პროდუქტების სია */}
      <Route path="/" element={<ProductsPage />} />
      {/* ახალი პროდუქტის დამატების გვერდი */}
      <Route path="/add-product" element={<AddProductPage />} />
      {/* დეტალების გვერდი: :id არის კონკრეტული პროდუქტის იდენტიფიკატორი */}
      <Route path="/products/:id" element={<ProductDetailsPage />} />
    </Routes>
  );
}