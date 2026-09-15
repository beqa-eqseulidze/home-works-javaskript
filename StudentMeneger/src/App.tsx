import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { Student } from './types';
import { initialStudents } from './data';
import StudentsPage from './pages/StudentsPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  // students state — ცხოვრობს App-ში (top level), რადგან ორივე page-ს სჭირდება
  // ეს არის "single source of truth"
  const [students, setStudents] = useState<Student[]>(initialStudents);

  // ახალი student-ის დამატება state-ში
  function handleAddStudent(student: Student): void {
    setStudents([...students, student]);
  }

  // student-ის წაშლა id-ის მიხედვით
  function handleDeleteStudent(id: number): void {
    setStudents(students.filter((student) => student.id !== id));
  }

  return (
    // Routes/Route — განსაზღვრავს რომელი component გამოჩნდეს რომელ URL-ზე
    <Routes>
      {/* "/" — მთავარი გვერდი, სტუდენტების სია */}
      <Route
        path="/"
        element={<StudentsPage students={students} onDelete={handleDeleteStudent} />}
      />
      {/* "/register" — სარეგისტრაციო გვერდი */}
      <Route
        path="/register"
        element={<RegisterPage onAdd={handleAddStudent} />}
      />
    </Routes>
  );
}

export default App;
