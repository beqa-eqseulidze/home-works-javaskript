import { useState } from "react";
import { useStudents } from "../../context/StudentsContext";
import type { StudentCardInfo } from "../../types/student.types";
import { Badge } from "../ui/Badge";
import { getAvatarColor } from "../../data/mockStudents";
import {
  getGradeColor,
  getStatusColor,
  getGpaColor,
  formatGpa,
} from "../../utils/helpers";
import { StudentModal } from "./StudentModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

// Using Pick utility type - StudentCardInfo
type StudentCardProps = {
  student: StudentCardInfo & {
    age: number;
    email: string;
    phone: string;
    enrollmentYear: number;
    gpa: number;
  };
  onView: () => void;
};

export function StudentCard({ student, onView }: StudentCardProps) {
  const { deleteStudent } = useStudents();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const initials = `${student.name[0]}${student.surname[0]}`;
  const avatarColor = getAvatarColor(student.name);

  return (
    <>
      <div
        className={`relative bg-white/5 backdrop-blur-sm border rounded-2xl p-5 transition-all duration-300 cursor-pointer group ${
          isHovered
            ? "border-violet-500/50 shadow-lg shadow-violet-500/10 -translate-y-1"
            : "border-white/10"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          {/* Avatar */}
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0`}
          >
            {initials}
          </div>

          {/* Badges */}
          <div className="flex flex-col items-end gap-1.5">
            <Badge className={getStatusColor(student.status)}>
              {student.status}
            </Badge>
            <Badge className={getGradeColor(student.grade)}>
              ★ {student.grade}
            </Badge>
          </div>
        </div>

        {/* Name */}
        <div className="mb-3">
          <h3 className="text-white font-semibold text-base leading-tight">
            {student.name} {student.surname}
          </h3>
          <p className="text-violet-400 text-sm mt-0.5 font-medium">
            {student.department}
          </p>
        </div>

        {/* Info row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs">
            <span>📧</span>
            <span className="truncate max-w-[140px]">{student.email}</span>
          </div>
          <div className="text-right">
            <span className="text-gray-500 text-xs">GPA</span>
            <p className={`font-bold text-sm ${getGpaColor(student.gpa)}`}>
              {formatGpa(student.gpa)}
            </p>
          </div>
        </div>

        {/* Bottom info */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <span>🎓 {student.enrollmentYear} წელი</span>
          <span>·</span>
          <span>📞 {student.phone}</span>
        </div>

        {/* Action buttons */}
        <div
          className={`flex flex-col gap-2 transition-all duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={onView}
            className="w-full py-2 px-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg text-xs font-medium transition-all duration-200 border border-white/10 hover:border-white/20"
          >
            👁️ სრული ინფო
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex-1 py-2 px-3 bg-violet-600/20 hover:bg-violet-600/40 text-violet-300 hover:text-violet-200 rounded-lg text-xs font-medium transition-all duration-200 border border-violet-500/20 hover:border-violet-500/40"
            >
              ✏️ რედაქტირება
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="flex-1 py-2 px-3 bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-red-200 rounded-lg text-xs font-medium transition-all duration-200 border border-red-500/20 hover:border-red-500/40"
            >
              🗑️ წაშლა
            </button>
          </div>
        </div>
      </div>

      {showEditModal && (
        <StudentModal
          mode="edit"
          student={student as Parameters<typeof StudentModal>[0]["student"]}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          studentName={`${student.name} ${student.surname}`}
          onConfirm={() => {
            deleteStudent(student.id);
            setShowDeleteModal(false);
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
