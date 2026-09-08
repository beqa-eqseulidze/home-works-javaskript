// ========================================
// ENUMS
// ========================================

export enum Grade {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  F = "F",
}

export enum Department {
  ComputerScience = "კომპიუტერული მეცნიერება",
  Mathematics = "მათემატიკა",
  Physics = "ფიზიკა",
  Biology = "ბიოლოგია",
  Chemistry = "ქიმია",
  History = "ისტორია",
  Literature = "ლიტერატურა",
  Economics = "ეკონომიკა",
}

export enum Status {
  Active = "აქტიური",
  Inactive = "არააქტიური",
  Graduated = "დამთავრებული",
  Suspended = "შეჩერებული",
}

export enum SortField {
  Name = "name",
  Age = "age",
  Grade = "grade",
  GPA = "gpa",
  Department = "department",
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

// ========================================
// BASE TYPES
// ========================================

export type Student = {
  readonly id: string;
  name: string;
  surname: string;
  age: number;
  email: string;
  phone: string;
  department: Department;
  grade: Grade;
  gpa: number;
  status: Status;
  enrollmentYear: number;
  avatar?: string;
  readonly createdAt: Date;
  updatedAt: Date;
};

// ========================================
// GENERIC TYPES
// ========================================

export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message: string;
  total?: number;
};

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  page: number;
  pageSize: number;
  totalPages: number;
};

export type SelectOption<T extends string> = {
  value: T;
  label: string;
};

// ========================================
// UTILITY TYPES USAGE
// ========================================

// Partial - used for editing (not all fields required)
export type StudentUpdatePayload = Partial<Omit<Student, "id" | "createdAt">>;

// Pick - used for the student card (only show specific fields)
export type StudentCardInfo = Pick<
  Student,
  "id" | "name" | "surname" | "department" | "grade" | "gpa" | "status" | "avatar"
>;

// Omit - used for creating new student (id and createdAt auto-generated)
export type CreateStudentPayload = Omit<Student, "id" | "createdAt" | "updatedAt">;

// Readonly - filters and sorts should not be mutated
export type FilterConfig = Readonly<{
  search: string;
  department: Department | "";
  status: Status | "";
  grade: Grade | "";
  minGpa: number;
  maxGpa: number;
}>;

export type SortConfig = Readonly<{
  field: SortField;
  order: SortOrder;
}>;

// ========================================
// FORM TYPES
// ========================================

export type StudentFormData = CreateStudentPayload;

export type FormErrors = Partial<Record<keyof StudentFormData, string>>;

// ========================================
// STORE / CONTEXT TYPES
// ========================================

export type StudentsContextType = {
  students: Student[];
  filter: FilterConfig;
  sort: SortConfig;
  addStudent: (payload: CreateStudentPayload) => void;
  updateStudent: (id: string, payload: StudentUpdatePayload) => void;
  deleteStudent: (id: string) => void;
  setFilter: (filter: Partial<FilterConfig>) => void;
  setSort: (sort: SortConfig) => void;
  filteredStudents: Student[];
};
