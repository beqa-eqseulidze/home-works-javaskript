import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { Student } from './types';
import StudentsPage from './pages/StudentsPage';
import RegisterPage from './pages/RegisterPage';

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
// json-server-ის API მისამართი
=======
// json-server-ის endpoint (db.json-ის "students" resource)
>>>>>>> 34ee4e1 (update StudentMeneger)
const API_URL = 'http://localhost:3001/students';

function App() {
  // students state — თავიდან ცარიელი მასივი, სერვერიდან შემოივსება
  const [students, setStudents] = useState<Student[]>([]);

  // useEffect — გამოიძახება App component-ის mount-ზე (ეკრანზე პირველად გამოჩენისას)
  useEffect(() => {
    // fetch-ით GET მოთხოვნა json-server-ისკენ, სტუდენტების წამოსაღებად
    fetch(API_URL)
      .then((response) => response.json()) // response body-ის JSON-ად გარდაქმნა
      .then((data: Student[]) => setStudents(data)); // მიღებული მონაცემებით state-ის განახლება
  }, []); // ცარიელი dependency array — ეს ეფექტი მხოლოდ ერთხელ გაეშვება (mount-ზე)

  // ახალი student-ის state-ში დამატების ფუნქცია
  // (ამ ეტაპზე მხოლოდ local state-ს ცვლის, სერვერზე ჯერ არ იგზავნება — POST შემდეგ ნაბიჯშია)
  function handleAddStudent(student: Student): void {
    setStudents([...students, student]);
  }

  // student-ის state-იდან წაშლის ფუნქცია, id-ის მიხედვით
  // (ამ ეტაპზე მხოლოდ local state-ს ცვლის, სერვერზე ჯერ არ იგზავნება — DELETE შემდეგ ნაბიჯშია)
  function handleDeleteStudent(id: number): void {
<<<<<<< HEAD
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        setStudents(students.filter((student) => student.id !== id));
      })
      .catch((err) => console.error('წაშლა ვერ მოხერხდა:', err));
>>>>>>> 4c1b586 (integrate json-server with db.json for student persistence)
=======
    setStudents(students.filter((student) => student.id !== id));
>>>>>>> 34ee4e1 (update StudentMeneger)
  }

  return (
    // Routes/Route — განსაზღვრავს რომელი გვერდი გამოჩნდეს რომელ URL-ზე
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