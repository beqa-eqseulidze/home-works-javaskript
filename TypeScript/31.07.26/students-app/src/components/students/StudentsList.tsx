import { useState } from "react";
import { useStudents } from "../../context/StudentsContext";
import { StudentCard } from "./StudentCard";
import { StudentModal } from "./StudentModal";
import { FilterBar } from "./FilterBar";
import { StatsBar } from "./StatsBar";

type StudentsListProps = {
  onViewStudent: (id: string) => void;
};

export function StudentsList({ onViewStudent }: StudentsListProps) {
  const { filteredStudents, students } = useStudents();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <StatsBar />

      {/* Header + Add button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-xl font-bold">სტუდენტების სია</h2>
          <p className="text-gray-400 text-sm mt-0.5">
            {filteredStudents.length === students.length
              ? `სულ ${students.length} სტუდენტი`
              : `${filteredStudents.length} შედეგი ${students.length}-დან`}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5"
        >
          <span className="text-lg">+</span>
          <span>სტუდენტის დამატება</span>
        </button>
      </div>

      {/* Filter bar */}
      <FilterBar />

      {/* Grid */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onView={() => onViewStudent(student.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl mb-4">
            🔍
          </div>
          <h3 className="text-white text-lg font-semibold mb-2">
            სტუდენტი ვერ მოიძებნა
          </h3>
          <p className="text-gray-400 text-sm max-w-xs">
            სცადეთ ძებნის კრიტერიუმების შეცვლა ან ახალი სტუდენტის დამატება
          </p>
        </div>
      )}

      {showAddModal && (
        <StudentModal mode="add" onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
}
