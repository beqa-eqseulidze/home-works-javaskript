import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import type { NewStudentInput } from '../types/Student';

interface StudentFormProps {
    onAddStudent: (student: NewStudentInput) => void;
}

export function StudentForm({ onAddStudent }: StudentFormProps) {
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [course, setCourse] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!name.trim() || !age || !course.trim()) return;

        onAddStudent({
            name: name.trim(),
            age: Number(age),
            course: course.trim()
        });

        setName('');
        setAge('');
        setCourse('');
    };

    return React.createElement(
        'form',
        { onSubmit: handleSubmit, className: 'bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8' },
        React.createElement('h3', { className: 'text-base font-bold text-slate-800 mb-4' }, 'დაამატეთ ახალი სტუდენტი'),
        React.createElement(
            'div',
            { className: 'grid grid-cols-1 md:grid-cols-3 gap-4 mb-4' },
            React.createElement(
                'div',
                null,
                React.createElement('label', { htmlFor: 'name', className: 'block text-xs font-semibold text-slate-500 uppercase mb-1' }, 'სახელი'),
                React.createElement('input', {
                    id: 'name',
                    type: 'text',
                    placeholder: 'Nika',
                    value: name,
                    onChange: (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
                    className: 'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all'
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { htmlFor: 'age', className: 'block text-xs font-semibold text-slate-500 uppercase mb-1' }, 'ასაკი'),
                React.createElement('input', {
                    id: 'age',
                    type: 'number',
                    placeholder: '20',
                    value: age,
                    onChange: (e: ChangeEvent<HTMLInputElement>) => setAge(e.target.value),
                    className: 'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all'
                })
            ),
            React.createElement(
                'div',
                null,
                React.createElement('label', { htmlFor: 'course', className: 'block text-xs font-semibold text-slate-500 uppercase mb-1' }, 'კურსი'),
                React.createElement('input', {
                    id: 'course',
                    type: 'text',
                    placeholder: 'TypeScript',
                    value: course,
                    onChange: (e: ChangeEvent<HTMLInputElement>) => setCourse(e.target.value),
                    className: 'w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all'
                })
            )
        ),
        React.createElement(
            'button',
            {
                type: 'submit',
                className: 'w-full bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm py-2.5 rounded-lg transition-colors shadow-sm'
            },
            'დაამატეთ სტუდენტი'
        )
    );
}