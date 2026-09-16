import { useState, type FormEvent } from 'react';
import type { NewStudentInput } from '../types/Student';

interface StudentFormProps {
    onAddStudent: (newStudent: NewStudentInput) => void;
}

export function StudentForm({ onAddStudent }: StudentFormProps) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [course, setCourse] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const cleanedName = name.trim().replace(/\s+/g, ' ');
        const cleanedCourse = course.trim().replace(/\s+/g, ' ');

        if (!cleanedName || !age || !cleanedCourse) {
            alert('გთხოვთ შეავსოთ ყველა ველი!');
            return;
        }

        const nameRegex = /^[a-zA-Z\s]+$/;

        if (!nameRegex.test(cleanedName)) {
            alert('სახელი უნდა შეიცავდეს მხოლოდ ინგლისურ ასოებს!');
            return;
        }

        onAddStudent({
            name: cleanedName,
            age: Number(age),
            course: cleanedCourse
        });

        setName('');
        setAge('');
        setCourse('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">ახალი სტუდენტის დამატება</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        სახელი:
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="შეიყვანეთ სახელი..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="age" className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        ასაკი:
                    </label>
                    <input
                        id="age"
                        type="number"
                        placeholder="შეიყვანეთ ასაკი..."
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <div>
                    <label htmlFor="course" className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        კურსი:
                    </label>
                    <input
                        id="course"
                        type="text"
                        placeholder="შეიყვანეთ კურსი (მაგ: TypeScript)..."
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition-colors shadow-sm"
                >
                    სტუდენტის დამატება
                </button>
            </div>
        </form>
    );
}