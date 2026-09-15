import { useState, useMemo } from "react";
import type { Student } from "../types/student";

export function useStudentSearch(students: Student[]) {
  const [query, setQuery] = useState("");

  const filteredStudents = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return students;

    return students.filter(
      (s) =>
        s.firstName.toLowerCase().includes(q) ||
        s.lastName.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
    );
  }, [students, query]);

  return { query, setQuery, filteredStudents };
}