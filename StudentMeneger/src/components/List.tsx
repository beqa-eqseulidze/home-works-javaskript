import { useState } from 'react';
import type { Student } from '../types';

// props — students, onDelete callback და isLoading loading-ის ჩვენებისთვის
interface ListProps {
  students: Student[];
  onDelete: (id: string) => void;
  isLoading: boolean;
}

function List({ students, onDelete, isLoading }: ListProps) {
  // search state — ცხოვრობს List-ში, რადგან მხოლოდ ჩვენებაზე მოქმედებს
  const [search, setSearch] = useState<string>('');

  // ეს ფილტრავს სტუდენტებს, მაგ: როცა დავწერთ a ან an აგდებს ყველა იმ სტუდენტს რომელიც შეიცავს ამ ასოებს 
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );
  // ეს ფილტრავს სტუდენტებს, მაგ: როცა დავწერთ a ამოაგდებს ყველა იმ სტუდენტს რომელიც იწყება ამ ასოზე 
  //   const filteredStudents = students.filter((student) =>
  //   student.name.toLowerCase().startsWith(search.toLowerCase())
  // );

  return (
    <div>
      {/* Search input — focus:ring სტილით */}
      <input
        type="text"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 border border-gray-300 rounded-lg px-4 py-2 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />

      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Students
      </h2>

      {/* Loading state — fetch ჯერ არ დასრულებულა */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <div className="h-6 w-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Empty state — loading დასრულდა, მაგრამ სია ცარიელია */}
      {!isLoading && filteredStudents.length === 0 && (
        <p className="text-center text-sm text-gray-400 py-10">
          No students found.
        </p>
      )}

      {/* სტუდენტების სია — მხოლოდ თუ loading დასრულდა და სია არ არის ცარიელი */}
      {!isLoading && filteredStudents.length > 0 && (
        <ul className="flex flex-col gap-2">
          {filteredStudents.map((student) => (
            <li
              key={student.id}
              className="flex justify-between items-center bg-white border border-gray-100 rounded-lg px-4 py-3 shadow-sm transition hover:shadow-md"
            >
              <div>
                <p className="font-medium text-gray-800">{student.name}</p>
                <p className="text-sm text-gray-500">
                  {student.age} years — {student.course}
                </p>
              </div>
              <button
                onClick={() => onDelete(student.id)}
                className="text-sm text-red-500 hover:text-red-700 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default List;