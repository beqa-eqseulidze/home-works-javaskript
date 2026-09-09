import { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SearchBar from './components/SearchBar';
import { getAllStudents, addStudent, deleteStudent, updateStudent, searchStudents } from './components/Manager';

interface IStudent {
  id: number;
  name: string;
  course: string;
}

interface StudentCreate {
  name: string;
  course: string;
}

const App = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [editing, setEditing] = useState<IStudent | null>(null);

  //კომპონენტით ვიღებთ ყველა სტუდენტს
  useEffect(()=>{
    setStudents(getAllStudents());
  }, []);

  //ახალი სტუდენტის დამატება
  const handleAdd = (data: StudentCreate) => {
    addStudent(data);
    setStudents([...getAllStudents()]);
  };

  //სტუდენტის წაშლა
  const handleDelete = (id: number) => {
    deleteStudent(id);
    setStudents([...getAllStudents()]);
  };

  //სტუდენტის მონაცემების განახლება
  const handleUpdate = (data: StudentCreate) => {
    if(editing) {
      updateStudent(editing.id, data);
      setStudents([...getAllStudents()]);
      setEditing(null);
    }
  };

  //სტუდენტების ძებნა
  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setStudents([...getAllStudents()]);
    } else {
      setStudents(searchStudents(query));
    }
  };

  return(
    <div className="min-h-screen bg-gray-300 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-900">
          სტუდენტები
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/*ფორმა დამატება / რედაქტირება */}
          <div>
            <StudentForm onSubmit={editing ? handleUpdate : handleAdd} 
              initialData={editing ? { name: editing.name, course: editing.course } : undefined} 
              isEditing={!!editing}/>
          </div>

          {/* მარჯვენა სვეტი - ძებნა და სტუდენტების სია */}
          <div className="md:col-span-2">
            <SearchBar onSearch={handleSearch} />
            <StudentList students={students} onEdit={setEditing} onDelete={handleDelete}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;