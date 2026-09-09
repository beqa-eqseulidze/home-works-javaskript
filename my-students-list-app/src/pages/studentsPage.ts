import React, { useState, useEffect, type ChangeEvent } from 'react';
import type { Student, NewStudentInput } from '../types/Student';
import { initialStudents } from '../data/initialStudents';
import { StudentForm } from '../components/studentForm';
import { StudentList } from '../components/studentList';

export function StudentsPage() {
    const [students, setStudents] = useState<Student[]>(() => {
        const saved = localStorage.getItem('students_data');
        return saved ? JSON.parse(saved) : initialStudents;
    });
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        localStorage.setItem('students_data', JSON.stringify(students));
    }, [students]);

    const handleAddStudent = (newStudentData: NewStudentInput): void => {
        const newStudent: Student = {
            id: Date.now(),
            ...newStudentData
        };
        setStudents((prev) => [...prev, newStudent]);
    };

    const handleDeleteStudent = (id: number): void => {
        const targetStudent = students.find((s) => s.id === id);
        const studentName = targetStudent ? targetStudent.name : 'ეს სტუდენტი';
        const isConfirmed = window.confirm(`დარწმუნებული ხართ, რომ გინდათ წაშალოთ "${studentName}"?`);

        if (isConfirmed) {
            setStudents((prev) => prev.filter((student) => student.id !== id));
        }
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
    };

    const filteredStudents: Student[] = students.filter((student) =>
        (student.name || '').toLowerCase().includes((searchTerm || '').toLowerCase())
    );

    return React.createElement(
        'div',
        { className: 'max-w-2xl mx-auto' },
        React.createElement('h2', { className: 'text-2xl font-bold text-slate-800 mb-6' }, 'Student Manager'),
        React.createElement(StudentForm, { onAddStudent: handleAddStudent }),
        React.createElement(
            'div',
            { className: 'bg-white p-6 rounded-xl shadow-sm border border-slate-200' },
            React.createElement(
                'div',
                { className: 'mb-6' },
                React.createElement('label', { htmlFor: 'search', className: 'block text-xs font-semibold text-slate-500 uppercase mb-1' }, 'მოძებნეთ სტუდენტი'),
                React.createElement('input', {
                    id: 'search',
                    type: 'text',
                    placeholder: 'მოძებნეთ სახელით (მაგალითად Nika)...',
                    value: searchTerm,
                    onChange: handleSearchChange,
                    className: 'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                })
            ),
            React.createElement('h3', { className: 'text-base font-bold text-slate-800 mb-4' }, 'სტუდენტების სია'),
            React.createElement(StudentList, {
                students: filteredStudents,
                onDeleteStudent: handleDeleteStudent
            })
        )
    );
}