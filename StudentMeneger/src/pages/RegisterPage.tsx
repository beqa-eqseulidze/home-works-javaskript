import { useNavigate } from 'react-router-dom';
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
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg">
      <h1 className="text-xl font-bold mb-4">Register Student</h1>
      <Form onAdd={handleAdd} />
    </div>
  );
}

export default RegisterPage;
