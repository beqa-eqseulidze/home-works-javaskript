import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentsProvider } from "./context/StudentsContext";
import { Header } from "./components/layout/Header";
import { DashboardPage } from "./pages/DashboardPage";
import { StudentDetailPage } from "./pages/StudentDetailPage";

function App() {
  return (
    <BrowserRouter>
      <StudentsProvider>
        <div className="min-h-screen bg-gray-950">
          {/* Ambient background gradients */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl" />
          </div>

          {/* Header — always visible */}
          <Header onToggleSidebar={() => {}} />

          {/* Routed pages */}
          <main className="relative z-10 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/students/:id" element={<StudentDetailPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </StudentsProvider>
    </BrowserRouter>
  );
}

export default App;
