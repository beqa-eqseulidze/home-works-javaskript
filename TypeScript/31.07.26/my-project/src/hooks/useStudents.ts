import { useState } from "react";
import type { Student, CreateStudentDto, UpdateStudentDto } from "../types/student";

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);

  const addStudent = (dto: CreateStudentDto) => {
    const newStudent: Student = { id: crypto.randomUUID(), ...dto };
    setStudents((prev) => [...prev, newStudent]);
  };

  const removeStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const updateStudent = (id: string, dto: UpdateStudentDto) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...dto } : s))
    );
  };

  return { students, addStudent, removeStudent, updateStudent };
}