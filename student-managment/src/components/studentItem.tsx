import type { Student } from '../types/Student';

interface StudentItemProps {
    student: Student;
    onDeleteStudent: (id: number) => void;
}

export function StudentItem({ student, onDeleteStudent }: StudentItemProps) {
    return (
        <li className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
            <span className="text-sm font-medium text-slate-700">
                <strong className="text-slate-900">{student.name}</strong> — {student.age} წლის — <span className="text-blue-600 font-semibold">{student.course}</span>
            </span>
            <button
                onClick={() => onDeleteStudent(student.id)}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-md transition-colors font-medium"
            >
                ამოშლა
            </button>
        </li>
    );
}