import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserDetail from "./pages/UserDetail";

export default function App() {
  return(
    <Routes>
      <Route path="/" element={ <Home />} />
      <Route path="/user/:username" element={ <UserDetail />} />
    </Routes>
  );
}