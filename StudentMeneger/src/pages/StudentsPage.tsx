import { Link } from 'react-router-dom';
import type { Student } from '../types';
import List from '../components/List';

// props — students, onDelete და isLoading მოდის App-იდან
interface StudentsPageProps {
  students: Student[];
  onDelete: (id: string) => void;
  isLoading: boolean;
}

// მთავარი გვერდი ("/") — სია + Register ღილაკი
function StudentsPage({ students, onDelete, isLoading }: StudentsPageProps) {
  return (
    // მთელი გვერდის ფონი — light gray, ცენტრში card
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Student Manager</h1>
        </div>

        {/* List component — ჩვენება + Search + Delete + loading/empty states */}
        <List students={students} onDelete={onDelete} isLoading={isLoading} />

        {/* wrapper — flex justify-center აცენტრებს Link-ს */}
        <div className="flex justify-center mt-6">
          {/* Link — გადადის /register გვერდზე */}
          <Link
            to="/register"
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition hover:bg-indigo-700 active:bg-indigo-800"
          >
            + Register Student
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentsPage;