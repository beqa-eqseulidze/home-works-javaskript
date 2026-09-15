import { useState } from 'react';
import type { Student } from '../types';

// props — students მასივი და onDelete callback მოდის მშობლისგან
interface ListProps {
  students: Student[];
  onDelete: (id: number) => void;
}

function List({ students, onDelete }: ListProps) {
  // search state — ცხოვრობს List-ში, რადგან მხოლოდ ჩვენებაზე მოქმედებს
  const [search, setSearch] = useState<string>('');

  // გაფილტრული სია — search-ის ტექსტის მიხედვით, ორიგინალი students არ იცვლება
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
    // toLowerCase() — case-insensitive ძებნისთვის
  );

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <h2 className="font-semibold mb-2">Students:</h2>

      {/* students-ის ნაცვლად filteredStudents-ის map — რომ ფილტრი აისახოს */}
      <ul className="flex flex-col gap-2">
        {filteredStudents.map((student) => (
          <li key={student.id} className="flex justify-between border p-2 rounded">
            {/* key={student.id} — React-ს სჭირდება unique key ლისტისთვის */}
            <span>
              {student.name} — {student.age} — {student.course}
            </span>
            <button
              onClick={() => onDelete(student.id)} // კონკრეტული student-ის წაშლა id-ით
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
