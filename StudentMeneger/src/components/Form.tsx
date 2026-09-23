import { useState } from 'react';
import type { Student } from '../types';

// props — Form component იღებს onAdd callback-ს მშობლისგან
interface FormProps {
  onAdd: (student: Student) => void;
}

function Form({ onAdd }: FormProps) {
  // form-ის input-ების საკუთარი (local) state-ები
  const [name, setName] = useState<string>('');         //useState hook-ის გამოძახება, TypeScript-ის <string> generic type-ით.
  const [age, setAge] = useState<string>('');          //useState hook-ის გამოძახება, TypeScript-ის <string> generic type-ით.
  const [course, setCourse] = useState<string>('');   //useState hook-ის გამოძახება, TypeScript-ის <string> generic type-ით.

  // ღილაკზე დაჭერისას გამოძახებული ფუნქცია
  function        handleAddStudent(): void {
    // validation — თუ რომელიმე ველი ცარიელია, არაფერი ხდება
    if (!name || !age || !course) return;

    // ახალი Student object-ის აწყობა
    const newStudent: Student = {
      id: Date.now().toString(),
      name,
      age: Number(age),
      course,
    };

    onAdd(newStudent);

    // form-ის გასუფთავება
    setName('');
    setAge('');
    setCourse('');
  }

  // საერთო input class — ერთხელ განსაზღვრული, ყველა input-ში გამოსაყენებლად
  const inputClass =
    'border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100';

  return (
    <div className="flex flex-col gap-3 mb-6">
      {/* Name input */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Name</label>
        <input
          type="text"
          placeholder="e.g. Nika"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Age input */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Age</label>
        <input
          type="number"
          placeholder="e.g. 20"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Course input */}
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-500">Course</label>
        <input
          type="text"
          placeholder="e.g. TypeScript"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* დამატების ღილაკი */}
      <button
        onClick={handleAddStudent}
        className="mt-2 bg-indigo-600 text-white font-medium py-2 rounded-lg transition hover:bg-indigo-700 active:bg-indigo-800"
      >
        Add Student
      </button>
    </div>
  );
}

export default Form;