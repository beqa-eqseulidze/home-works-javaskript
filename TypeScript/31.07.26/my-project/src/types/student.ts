export const StudentStatus = {
  Active: "ACTIVE",
  Inactive: "INACTIVE",
  Graduated: "GRADUATED",
} as const;

export type StudentStatus = (typeof StudentStatus)[keyof typeof StudentStatus];

export interface Student {
  readonly id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  status: StudentStatus;
}

export type CreateStudentDto = Omit<Student, "id">;
export type UpdateStudentDto = Partial<CreateStudentDto>;
export type StudentPreview = Pick<Student, "id" | "firstName" | "lastName" | "status">;