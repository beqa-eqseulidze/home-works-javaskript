import { useNavigate } from "react-router-dom";
import { StudentsList } from "../components/students/StudentsList";

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Page title */}
      <div className="mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          სტუდენტების მართვის სისტემა
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
          სტუდენტური{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
            პლატფორმა
          </span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          მართეთ სტუდენტების ინფორმაცია — დაამატეთ, ჩაასწორეთ, წაშალეთ
          და მოძებნეთ სასურველი სტუდენტი
        </p>
      </div>

      {/* Students list with all filters and cards */}
      <StudentsList onViewStudent={(id) => navigate(`/students/${id}`)} />
    </div>
  );
}
