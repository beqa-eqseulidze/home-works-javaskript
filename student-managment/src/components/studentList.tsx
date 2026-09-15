import type { Student } from '../types/Student';
import { StudentItem } from './studentItem';

interface StudentListProps {
    students: Student[];
    onDeleteStudent: (id: number) => void;
}

export function StudentList({ students, onDeleteStudent }: StudentListProps) {
    if (students.length === 0) {
        return (
            <p className="text-slate-500 text-sm text-center py-4">
                სტუდენტები ვერ მოიძებნა.
            </p>
        );
    }

    return (
        <ul className="space-y-2">
            {students.map((student) => (
                <StudentItem
                    key={student.id}
                    student={student}
                    onDeleteStudent={onDeleteStudent}
                />
            ))}
        </ul>
    );
}