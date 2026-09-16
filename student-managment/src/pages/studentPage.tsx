import { useState, useEffect, type ChangeEvent } from 'react';
import type { Student, NewStudentInput } from '../types/Student';
import { StudentForm } from '../components/studentForm';
import { StudentList } from '../components/studentList';

const API_URL = 'http://localhost:5000/students';

export function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(API_URL)
            .then((res) => {
                if (!res.ok) throw new Error('სერვერიდან მონაცემების წამოღება ვერ მოხერხდა');
                return res.json();
            })
            .then((data: Student[]) => {
                setStudents(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError('შეცდომა სერვერთან კავშირისას');
                setLoading(false);
            });
    }, []);

    const handleAddStudent = (newStudentData: NewStudentInput): void => {
        fetch('http://localhost:5000/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStudentData)
        })
            .then((res) => res.json())
            .then((createdStudent: Student) => {
                setStudents((prev) => [...prev, createdStudent]);
            })
            .catch((err) => console.error('დამატების შეცდომა:', err));
    };

    const handleDeleteStudent = (id: number | string): void => {
        const targetStudent = students.find((s) => s.id === id);
        const studentName = targetStudent ? targetStudent.name : 'ეს სტუდენტი';
        const isConfirmed = window.confirm(`დარწმუნებული ხართ, რომ გინდათ წაშალოთ "${studentName}"?`);

        if (isConfirmed) {
            fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })
                .then((res) => {
                    if (res.ok) {
                        setStudents((prev) => prev.filter((student) => student.id !== id));
                    }
                })
                .catch((err) => console.error('წაშლის შეცდომა:', err));
        }
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchTerm(e.target.value);
    };

    const filteredStudents: Student[] = students.filter((student) =>
        (student.name || '').toLowerCase().includes((searchTerm || '').toLowerCase())
    );

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Student Manager</h2>

            <StudentForm onAddStudent={handleAddStudent} />

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="mb-6">
                    <label htmlFor="search" className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        მოძებნეთ სტუდენტი
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="მოძებნეთ სახელით (მაგალითად Nika)..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <h3 className="text-base font-bold text-slate-800 mb-4">სტუდენტების სია</h3>

                {loading && <p className="text-slate-500 text-sm">მონაცემები იტვირთება სერვერიდან...</p>}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {!loading && !error && (
                    <StudentList students={filteredStudents} onDeleteStudent={handleDeleteStudent} />
                )}
            </div>
        </div>
    );
}