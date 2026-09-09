import React from 'react';
import type { Student } from '../types/Student';
import { StudentItem } from './studentItem';

interface StudentListProps {
    students: Student[];
    onDeleteStudent: (id: number) => void;
}

export function StudentList({ students, onDeleteStudent }: StudentListProps) {
    if (students.length === 0) {
        return React.createElement(
            'p',
            { className: 'text-center text-slate-400 italic py-6' },
            'სტუდენტები არ მოიძებნა.'
        );
    }

    return React.createElement(
        'ul',
        { className: 'space-y-2' },
        students.map((student) =>
            React.createElement(StudentItem, {
                key: student.id,
                student: student,
                onDelete: onDeleteStudent
            })
        )
    );
}