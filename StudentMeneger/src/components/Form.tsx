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
      id: Date.now().toString(), // unique id, string ტიპად (json-server v1 კონვენციაა)
      name,
      age: Number(age),
      course,
    };

    // მზა student-ი გადაეცემა მშობელს callback-ით
    onAdd(newStudent);

    // form-ის გასუფთავება
    setName('');
    setAge('');
    setCourse('');
  }

  return (
    <div className="flex flex-col gap-2 mb-4">
      {/* Name input — controlled input, value მოდის state-იდან */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
      />
      {/* Age input */}
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="border p-2 rounded"
      />
      {/* Course input */}
      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="border p-2 rounded"
      />
      {/* დამატების ღილაკი */}
      <button
        onClick={handleAddStudent}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Student
      </button>
    </div>
  );
}

export default Form;