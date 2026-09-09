export interface Student {
    id: number;
    name: string;
    age: number;
    course: string;
}

export type NewStudentInput = Omit<Student, 'id'>;