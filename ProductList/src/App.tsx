import { Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

// აპლიკაციის routes: მთავარი გვერდი და პროდუქტის დეტალების გვერდი
export default function App() {
  return (
    <Routes>
      {/* მთავარი გვერდი: პროდუქტების სია */}
      <Route path="/" element={<ProductsPage />} />
      {/* დეტალების გვერდი: :id არის კონკრეტული პროდუქტის იდენტიფიკატორი */}
      <Route path="/products/:id" element={<ProductDetailsPage />} />
    </Routes>
  );
}