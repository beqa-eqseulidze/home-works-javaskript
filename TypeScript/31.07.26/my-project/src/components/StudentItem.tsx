import { useState } from "react";
import type { Student, UpdateStudentDto } from "../types/student";

interface Props {
  student: Student;
  onRemove: (id: string) => void;
  onUpdate: (id: string, dto: UpdateStudentDto) => void;
}

export function StudentItem({ student, onRemove, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(student.firstName);
  const [lastName, setLastName] = useState(student.lastName);

  const handleSave = () => {
    onUpdate(student.id, { firstName, lastName });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <button onClick={handleSave}>შენახვა</button>
        <button onClick={() => setIsEditing(false)}>გაუქმება</button>
      </li>
    );
  }

  return (
    <li>
      {student.firstName} {student.lastName} — {student.email} — {student.status}
      <button onClick={() => setIsEditing(true)}>რედაქტირება</button>
      <button onClick={() => onRemove(student.id)}>წაშლა</button>
    </li>
  );
}