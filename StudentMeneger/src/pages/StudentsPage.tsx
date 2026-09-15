import { Link } from 'react-router-dom';
import type { Student } from '../types';
import List from '../components/List';

// props — students და onDelete მოდის App-იდან
interface StudentsPageProps {
  students: Student[];
  onDelete: (id: number) => void;
}

// მთავარი გვერდი ("/") — სია + Register ღილაკი
function StudentsPage({ students, onDelete }: StudentsPageProps) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Student Manager</h1>
      </div>

      {/* List component — ჩვენება + Search + Delete */}
      <List students={students} onDelete={onDelete} />

      {/* wrapper — flex justify-center აცენტრებს Link-ს */}
      <div className="flex justify-center mt-4">
        {/* Link — გადადის /register გვერდზე, URL-ის შეცვლით (React Router) */}
        <Link
          to="/register"
          className="bg-blue-500 text-white px-3 py-2 rounded"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default StudentsPage;
