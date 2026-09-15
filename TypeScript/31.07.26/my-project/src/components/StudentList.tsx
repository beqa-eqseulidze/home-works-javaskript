


































































import type { Student, UpdateStudentDto } from "../types/student";
import { StudentItem } from "./StudentItem";

interface Props {
  students: Student[];
  onRemove: (id: string) => void;
  onUpdate: (id: string, dto: UpdateStudentDto) => void;
}

export function StudentList({ students, onRemove, onUpdate }: Props) {
  if (students.length === 0) return <p>სტუდენტები არ მოიძებნა</p>;

  return (
    <ul>
      {students.map((s) => (
        <StudentItem key={s.id} student={s} onRemove={onRemove} onUpdate={onUpdate} />
      ))}
    </ul>
  );
}