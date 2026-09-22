import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { Student } from './types';
import StudentsPage from './pages/StudentsPage';
import RegisterPage from './pages/RegisterPage';

// json-server-ის endpoint (db.json-ის "students" resource)
const API_URL = 'http://localhost:3001/students';

function App() {
  // students state — თავიდან ცარიელი მასივი, სერვერიდან შემოივსება
  const [students, setStudents] = useState<Student[]>([]);

  // isLoading — true სანამ fetch არ დასრულდება (UI-ში loading indicator-ისთვის)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect — გამოიძახება App component-ის mount-ზე
  useEffect(() => {
    // GET მოთხოვნა — სტუდენტების საწყისი სიის წამოსაღებად
    fetch(API_URL)
      .then((response) => response.json())
      .then((data: Student[]) => {
        setStudents(data); // state-ის შევსება მიღებული მონაცემებით
        setIsLoading(false); // მონაცემები ჩამოვიდა — loading state-ი სრულდება
      });
  }, []); // ცარიელი dependency array — მხოლოდ ერთხელ, mount-ზე

  // ახალი student-ის დამატება — სერვერზე POST + state-ის განახლება
  function handleAddStudent(student: Student): void {
    fetch(API_URL, {
      method: 'POST', // ახალი resource-ის შექმნა
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student), // JS object → JSON string
    })
      .then((response) => response.json()) // სერვერის პასუხი (შენახული student, id-ითურთ)
      .then((savedStudent: Student) => {
        // state-ში ემატება ზუსტად ის, რაც სერვერმა დააბრუნა
        setStudents([...students, savedStudent]);
      });
  }

  // student-ის წაშლა — სერვერზე DELETE + state-ის განახლება
  function handleDeleteStudent(id: string): void {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE', // კონკრეტული id-ის მქონე resource-ის წაშლა
    }).then(() => {
      // წარმატებული წაშლის შემდეგ, ლოკალურ state-შიც ამოვაგდებთ
      setStudents(students.filter((student) => student.id !== id));
    });
  }

  return (
    // Routes/Route — განსაზღვრავს რომელი component გამოჩნდეს რომელ URL-ზე
    <Routes>
      {/* "/" — მთავარი გვერდი, სტუდენტების სია */}
      <Route
        path="/"
        element={
          <StudentsPage
            students={students}
            onDelete={handleDeleteStudent}
            isLoading={isLoading} // loading state გადაეცემა StudentsPage-ს
          />
        }
      />
      {/* "/register" — სარეგისტრაციო გვერდი */}
      <Route path="/register" element={<RegisterPage onAdd={handleAddStudent} />} />
    </Routes>
  );
}

export default App;