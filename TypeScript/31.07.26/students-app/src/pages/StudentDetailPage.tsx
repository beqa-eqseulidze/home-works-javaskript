import { useParams, useNavigate } from "react-router-dom";
import { useStudents } from "../context/StudentsContext";
import { useState } from "react";
import { Badge } from "../components/ui/Badge";
import { StudentModal } from "../components/students/StudentModal";
import { DeleteConfirmModal } from "../components/students/DeleteConfirmModal";
import { getAvatarColor } from "../data/mockStudents";
import {
  getGradeColor,
  getStatusColor,
  getGpaColor,
  formatGpa,
} from "../utils/helpers";

export function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { students, deleteStudent } = useStudents();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const student = students.find((s) => s.id === id);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-5xl mb-6">
          😕
        </div>
        <h2 className="text-white text-2xl font-bold mb-2">
          სტუდენტი ვერ მოიძებნა
        </h2>
        <p className="text-gray-400 mb-6">
          ID: <span className="text-gray-300 font-mono">{id}</span> — ამ
          სტუდენტს ვერ ვპოულობთ
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold transition-all duration-200"
        >
          ← უკან დაბრუნება
        </button>
      </div>
    );
  }

  const initials = `${student.name[0]}${student.surname[0]}`;
  const avatarColor = getAvatarColor(student.name);

  return (
    <>
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            ←
          </span>
          სტუდენტების სიაში დაბრუნება
        </button>

        {/* Profile card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
          {/* Header banner */}
          <div
            className={`h-32 bg-gradient-to-r ${avatarColor} opacity-30`}
          />

          {/* Profile info */}
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-5">
              {/* Avatar */}
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-black text-3xl shadow-xl border-4 border-gray-900`}
              >
                {initials}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 pb-1">
                <button
                  onClick={() => setShowEditModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-violet-600/20 hover:bg-violet-600/40 text-violet-300 hover:text-violet-200 rounded-xl text-sm font-medium transition-all duration-200 border border-violet-500/20"
                >
                  ✏️ რედაქტირება
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 hover:text-red-200 rounded-xl text-sm font-medium transition-all duration-200 border border-red-500/20"
                >
                  🗑️ წაშლა
                </button>
              </div>
            </div>

            {/* Name & department */}
            <h1 className="text-white text-2xl font-black mb-1">
              {student.name} {student.surname}
            </h1>
            <p className="text-violet-400 font-medium">{student.department}</p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Badge className={getStatusColor(student.status)}>
                {student.status}
              </Badge>
              <Badge className={getGradeColor(student.grade)}>
                ★ შეფასება — {student.grade}
              </Badge>
              <Badge
                className={`${getGpaColor(student.gpa)} bg-white/5 border border-white/10`}
              >
                GPA {formatGpa(student.gpa)}
              </Badge>
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Personal info */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider opacity-60">
              პირადი ინფორმაცია
            </h3>

            <InfoRow icon="🎂" label="ასაკი" value={`${student.age} წელი`} />
            <InfoRow icon="📧" label="ელ-ფოსტა" value={student.email} />
            <InfoRow icon="📞" label="ტელეფონი" value={student.phone} />
          </div>

          {/* Academic info */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider opacity-60">
              სასწავლო ინფორმაცია
            </h3>

            <InfoRow
              icon="🎓"
              label="ჩარიცხვის წელი"
              value={`${student.enrollmentYear} წელი`}
            />
            <InfoRow
              icon="🏛️"
              label="ფაკულტეტი"
              value={student.department}
            />
            <InfoRow
              icon="📅"
              label="განახლება"
              value={student.updatedAt.toLocaleDateString("ka-GE")}
            />
          </div>
        </div>

        {/* GPA Visual */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider opacity-60">
              GPA პროგრესი
            </h3>
            <span className={`text-2xl font-black ${getGpaColor(student.gpa)}`}>
              {formatGpa(student.gpa)} / 4.00
            </span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ${
                student.gpa >= 3.7
                  ? "from-emerald-500 to-teal-400"
                  : student.gpa >= 3.0
                  ? "from-blue-500 to-cyan-400"
                  : student.gpa >= 2.0
                  ? "from-amber-500 to-orange-400"
                  : "from-red-500 to-rose-400"
              }`}
              style={{ width: `${(student.gpa / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {showEditModal && (
        <StudentModal
          mode="edit"
          student={student}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          studentName={`${student.name} ${student.surname}`}
          onConfirm={() => {
            deleteStudent(student.id);
            navigate("/");
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-lg flex-shrink-0">{icon}</span>
      <div>
        <p className="text-gray-500 text-xs">{label}</p>
        <p className="text-white text-sm font-medium mt-0.5 break-all">
          {value}
        </p>
      </div>
    </div>
  );
}
