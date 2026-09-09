import React from 'react';
import type { Student } from '../types/Student';

interface StudentItemProps {
    student: Student;
    onDelete: (id: number) => void;
}

export function StudentItem({ student, onDelete }: StudentItemProps) {
    return React.createElement(
        'li',
        { className: 'flex items-center justify-between p-3.5 bg-slate-50 hover:bg-amber-50/50 rounded-lg border border-slate-200/80 transition-colors' },
        React.createElement(
            'div',
            { className: 'flex items-center space-x-3 text-sm' },
            React.createElement('span', { className: 'font-semibold text-slate-800' }, student.name),
            React.createElement('span', { className: 'text-slate-400' }, '—'),
            React.createElement('span', { className: 'text-slate-600' }, `${student.age} წლის`),
            React.createElement('span', { className: 'text-slate-400' }, '—'),
            React.createElement(
                'span',
                { className: 'px-2.5 py-0.5 bg-amber-700 text-white rounded-full text-xs font-medium shadow-sm' },
                student.course
            )
        ),

        React.createElement(
            'button',
            {
                onClick: () => onDelete(student.id),
                className: 'text-xs font-semibold text-amber-600 hover:text-amber-700 hover:bg-amber-100/60 px-2.5 py-1.5 rounded-md transition-colors'
            },
            'ამოშლა'
        )
    );
}