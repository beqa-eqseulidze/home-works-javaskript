import { Link, useNavigate } from 'react-router-dom';
import type { Student } from '../types';
import Form from '../components/Form';

// props — onAdd callback მოდის App-იდან (state-ის განახლებისთვის)
interface RegisterPageProps {
  onAdd: (student: Student) => void;
}

// სარეგისტრაციო გვერდი ("/register") — მხოლოდ ფორმა
function RegisterPage({ onAdd }: RegisterPageProps) {
  // useNavigate — საშუალებას იძლევა კოდიდან გადავიდეთ სხვა route-ზე
  const navigate = useNavigate();

  // Form-იდან მოსული ახალი student-ის დამუშავება
  function handleAdd(student: Student): void {
    onAdd(student); // state-ის განახლება App-ში
    navigate('/'); // დამატების შემდეგ ავტომატურად დაბრუნება მთავარ გვერდზე
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-16 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        {/* Link უკან, "/"-ზე დასაბრუნებლად */}
        <Link
          to="/"
          className="text-sm text-gray-400 hover:text-gray-600 transition"
        >
          ← Back
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-6">
          Register Student
        </h1>

        <Form onAdd={handleAdd} />
      </div>
    </div>
  );
}

export default RegisterPage;