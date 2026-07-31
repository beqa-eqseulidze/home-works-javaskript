export enum StudentStatus {
    Active = "ACTIVE",
    Inactive = "INACTIVE",
    Graduated = "GRADUATED",
}

export interface Student {
    readonly id: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    course: string;
    status: StudentStatus;
    createdAt: Date;
}

export type CreateStudentInput = Omit<Student, "id" | "createdAt">;

export type StudentBasicInfo = Pick<Student, "firstName" | "lastName">;

export type UpdateStudentInput = Partial<CreateStudentInput>;

export interface ApiResponse<T extends unknown> {
    data: T[];
    totalCount: number;
    success: boolean;
}