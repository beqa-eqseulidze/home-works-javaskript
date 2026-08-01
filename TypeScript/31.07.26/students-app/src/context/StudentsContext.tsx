import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import type {
  Student,
  StudentsContextType,
  CreateStudentPayload,
  StudentUpdatePayload,
  FilterConfig,
  SortConfig,
} from "../types/student.types";
import {
  SortField,
  SortOrder,
  Grade,
} from "../types/student.types";
import { generateId, MOCK_STUDENTS } from "../data/mockStudents";

const StudentsContext = createContext<StudentsContextType | undefined>(
  undefined
);

const defaultFilter: FilterConfig = {
  search: "",
  department: "",
  status: "",
  grade: "",
  minGpa: 0,
  maxGpa: 4,
};

const defaultSort: SortConfig = {
  field: SortField.Name,
  order: SortOrder.Asc,
};

const gradeOrder: Record<Grade, number> = {
  [Grade.A]: 4,
  [Grade.B]: 3,
  [Grade.C]: 2,
  [Grade.D]: 1,
  [Grade.F]: 0,
};

export function StudentsProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [filter, setFilterState] = useState<FilterConfig>(defaultFilter);
  const [sort, setSortState] = useState<SortConfig>(defaultSort);

  const addStudent = useCallback((payload: CreateStudentPayload) => {
    const newStudent: Student = {
      ...payload,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setStudents((prev) => [newStudent, ...prev]);
  }, []);

  const updateStudent = useCallback(
    (id: string, payload: StudentUpdatePayload) => {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, ...payload, updatedAt: new Date() } : s
        )
      );
    },
    []
  );

  const deleteStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const setFilter = useCallback((newFilter: Partial<FilterConfig>) => {
    setFilterState((prev) => ({ ...prev, ...newFilter }));
  }, []);

  const setSort = useCallback((newSort: SortConfig) => {
    setSortState(newSort);
  }, []);

  const filteredStudents = useMemo<Student[]>(() => {
    let result = [...students];

    // Search filter
    if (filter.search) {
      const query = filter.search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.surname.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query) ||
          s.department.toLowerCase().includes(query)
      );
    }

    // Department filter
    if (filter.department) {
      result = result.filter((s) => s.department === filter.department);
    }

    // Status filter
    if (filter.status) {
      result = result.filter((s) => s.status === filter.status);
    }

    // Grade filter
    if (filter.grade) {
      result = result.filter((s) => s.grade === filter.grade);
    }

    // GPA range filter
    result = result.filter(
      (s) => s.gpa >= filter.minGpa && s.gpa <= filter.maxGpa
    );

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sort.field) {
        case SortField.Name:
          comparison = `${a.name} ${a.surname}`.localeCompare(
            `${b.name} ${b.surname}`
          );
          break;
        case SortField.Age:
          comparison = a.age - b.age;
          break;
        case SortField.Grade:
          comparison = gradeOrder[a.grade] - gradeOrder[b.grade];
          break;
        case SortField.GPA:
          comparison = a.gpa - b.gpa;
          break;
        case SortField.Department:
          comparison = a.department.localeCompare(b.department);
          break;
      }
      return sort.order === SortOrder.Asc ? comparison : -comparison;
    });

    return result;
  }, [students, filter, sort]);

  const value: StudentsContextType = {
    students,
    filter,
    sort,
    addStudent,
    updateStudent,
    deleteStudent,
    setFilter,
    setSort,
    filteredStudents,
  };

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents(): StudentsContextType {
  const context = useContext(StudentsContext);
  if (!context) {
    throw new Error("useStudents must be used within StudentsProvider");
  }
  return context;
}
