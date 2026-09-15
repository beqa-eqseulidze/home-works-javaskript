import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { Student } from './types';
import { initialStudents } from './data';
import StudentsPage from './pages/StudentsPage';
import RegisterPage from './pages/RegisterPage';

const STORAGE_KEY = 'students';

// localStorage-დან სტუდენტების წაკითხვა — თუ არ არსებობს, initialStudents-ს იყენებს
function loadStudents(): Student[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved) as Student[];
  }
  return initialStudents;
}

function App() {
  // students state — ცხოვრობს App-ში (top level), რადგან ორივე page-ს სჭირდება
  // initializer ჯერ localStorage-ს ამოწმებს, თუ ცარიელია initialStudents-ს იყენებს
  const [students, setStudents] = useState<Student[]>(loadStudents);

  // ყოველი students ცვლილებისას localStorage-ში შენახვა
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

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
