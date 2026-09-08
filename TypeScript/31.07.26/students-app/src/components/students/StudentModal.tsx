import { useState, useEffect } from "react";
import { useStudents } from "../../context/StudentsContext";
import type {
  Student,
  StudentFormData,
  FormErrors,
} from "../../types/student.types";
import { Department, Grade, Status } from "../../types/student.types";
import { validateStudentForm } from "../../utils/helpers";

type ModalMode = "add" | "edit";

type StudentModalProps = {
  mode: ModalMode;
  student?: Student;
  onClose: () => void;
};

const defaultFormData: StudentFormData = {
  name: "",
  surname: "",
  age: 18,
  email: "",
  phone: "",
  department: Department.ComputerScience,
  grade: Grade.B,
  gpa: 3.0,
  status: Status.Active,
  enrollmentYear: new Date().getFullYear(),
};

export function StudentModal({ mode, student, onClose }: StudentModalProps) {
  const { addStudent, updateStudent } = useStudents();

  const [formData, setFormData] = useState<StudentFormData>(
    mode === "edit" && student
      ? {
          name: student.name,
          surname: student.surname,
          age: student.age,
          email: student.email,
          phone: student.phone,
          department: student.department,
          grade: student.grade,
          gpa: student.gpa,
          status: student.status,
          enrollmentYear: student.enrollmentYear,
        }
      : defaultFormData
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleChange<K extends keyof StudentFormData>(
    key: K,
    value: StudentFormData[K]
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateStudentForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      if (mode === "add") {
        addStudent(formData);
      } else if (mode === "edit" && student) {
        updateStudent(student.id, formData);
      }
      setIsSubmitting(false);
      onClose();
    }, 400);
  }

  const title = mode === "add" ? "სტუდენტის დამატება" : "სტუდენტის რედაქტირება";
  const icon = mode === "add" ? "➕" : "✏️";

  const inputClass = (field: keyof FormErrors) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm transition-all duration-200 outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-500/50 focus:ring-red-500/30 focus:border-red-500"
        : "border-white/10 focus:ring-violet-500/30 focus:border-violet-500/50"
    }`;

  const selectClass = (field: keyof FormErrors) =>
    `w-full bg-gray-900 border rounded-xl px-4 py-3 text-white text-sm transition-all duration-200 outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-500/50 focus:ring-red-500/30"
        : "border-white/10 focus:ring-violet-500/30 focus:border-violet-500/50"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-violet-500/10">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-xl">
              {icon}
            </div>
            <h2 className="text-white text-xl font-bold">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-200 flex items-center justify-center text-lg"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name & Surname */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                სახელი *
              </label>
              <input
                type="text"
                placeholder="მაგ: გიორგი"
                className={inputClass("name")}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                გვარი *
              </label>
              <input
                type="text"
                placeholder="მაგ: მამულაშვილი"
                className={inputClass("surname")}
                value={formData.surname}
                onChange={(e) => handleChange("surname", e.target.value)}
              />
              {errors.surname && (
                <p className="mt-1 text-xs text-red-400">{errors.surname}</p>
              )}
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                ელ-ფოსტა *
              </label>
              <input
                type="email"
                placeholder="example@uni.ge"
                className={inputClass("email")}
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                ტელეფონი *
              </label>
              <input
                type="text"
                placeholder="5XX-XXX-XXX"
                className={inputClass("phone")}
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Age & Enrollment Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                ასაკი *
              </label>
              <input
                type="number"
                min={16}
                max={80}
                className={inputClass("age")}
                value={formData.age}
                onChange={(e) =>
                  handleChange("age", parseInt(e.target.value) || 0)
                }
              />
              {errors.age && (
                <p className="mt-1 text-xs text-red-400">{errors.age}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                ჩარიცხვის წელი *
              </label>
              <input
                type="number"
                min={2000}
                max={new Date().getFullYear()}
                className={inputClass("enrollmentYear")}
                value={formData.enrollmentYear}
                onChange={(e) =>
                  handleChange("enrollmentYear", parseInt(e.target.value) || 0)
                }
              />
              {errors.enrollmentYear && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.enrollmentYear}
                </p>
              )}
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              ფაკულტეტი *
            </label>
            <select
              className={selectClass("department")}
              value={formData.department}
              onChange={(e) =>
                handleChange("department", e.target.value as Department)
              }
            >
              {Object.values(Department).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-1 text-xs text-red-400">{errors.department}</p>
            )}
          </div>

          {/* Grade, GPA, Status */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                შეფასება *
              </label>
              <select
                className={selectClass("grade")}
                value={formData.grade}
                onChange={(e) =>
                  handleChange("grade", e.target.value as Grade)
                }
              >
                {Object.values(Grade).map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors.grade && (
                <p className="mt-1 text-xs text-red-400">{errors.grade}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                GPA (0-4) *
              </label>
              <input
                type="number"
                step="0.01"
                min={0}
                max={4}
                className={inputClass("gpa")}
                value={formData.gpa}
                onChange={(e) =>
                  handleChange("gpa", parseFloat(e.target.value) || 0)
                }
              />
              {errors.gpa && (
                <p className="mt-1 text-xs text-red-400">{errors.gpa}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                სტატუსი *
              </label>
              <select
                className={selectClass("status")}
                value={formData.status}
                onChange={(e) =>
                  handleChange("status", e.target.value as Status)
                }
              >
                {Object.values(Status).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="mt-1 text-xs text-red-400">{errors.status}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl font-medium transition-all duration-200 border border-white/10"
            >
              გაუქმება
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:opacity-50 text-white rounded-xl font-bold transition-all duration-200 shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>მიმდინარეობს...</span>
                </>
              ) : (
                <span>{mode === "add" ? "დამატება" : "შენახვა"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
