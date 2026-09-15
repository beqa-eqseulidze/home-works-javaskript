import type { Student } from './types';

// საწყისი (mock) სტუდენტების მასივი — გამოიყენება App-ის state-ის დასაწყებად
export const initialStudents: Student[] = [
  { id: 1, name: 'Nika', age: 20, course: 'TypeScript' },
  { id: 2, name: 'Ana', age: 22, course: 'JavaScript' },
  { id: 3, name: 'Giorgi', age: 19, course: 'HTML/CSS' },
];
