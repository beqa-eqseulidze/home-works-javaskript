import { useStudents } from "../../context/StudentsContext";
import type { ApiResponse } from "../../types/student.types";
import { Status } from "../../types/student.types";

// Using generic ApiResponse<T> type
function buildStats(students: ReturnType<typeof useStudents>["students"]): ApiResponse<{
  total: number;
  active: number;
  avgGpa: number;
  graduated: number;
}> {
  const total = students.length;
  const active = students.filter((s) => s.status === Status.Active).length;
  const graduated = students.filter((s) => s.status === Status.Graduated).length;
  const avgGpa =
    total > 0 ? students.reduce((sum, s) => sum + s.gpa, 0) / total : 0;

  return {
    data: { total, active, avgGpa, graduated },
    success: true,
    message: "Statistics calculated successfully",
    total,
  };
}

type StatCardProps = {
  icon: string;
  label: string;
  value: string | number;
  color: string;
  bgColor: string;
};

function StatCard({ icon, label, value, color, bgColor }: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center text-2xl flex-shrink-0`}
      >
        {icon}
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className={`text-2xl font-bold mt-0.5 ${color}`}>{value}</p>
      </div>
    </div>
  );
}

export function StatsBar() {
  const { students } = useStudents();
  const { data: stats } = buildStats(students);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon="🎓"
        label="სულ სტუდენტი"
        value={stats.total}
        color="text-white"
        bgColor="bg-violet-600/20"
      />
      <StatCard
        icon="✅"
        label="აქტიური"
        value={stats.active}
        color="text-emerald-400"
        bgColor="bg-emerald-600/20"
      />
      <StatCard
        icon="📊"
        label="საშ. GPA"
        value={stats.avgGpa.toFixed(2)}
        color="text-blue-400"
        bgColor="bg-blue-600/20"
      />
      <StatCard
        icon="🏆"
        label="დამთავრებული"
        value={stats.graduated}
        color="text-amber-400"
        bgColor="bg-amber-600/20"
      />
    </div>
  );
}
