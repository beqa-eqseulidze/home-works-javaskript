import { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SearchBar from './components/SearchBar';
import StudentManager from './components/StudentManager';

interface IStudent {
  id: number;
  name: string;
  email: string;
}

type StudentCreate = Omit<IStudent, 'id'>;

const App = () => {
  const [manager] = useState(new StudentManager());
  const [students, setStudents] = useState<IStudent[]>([]);
  const [editing, setEditing] = useState<IStudent | null>(null);

  useEffect(() => {
    setStudents(manager.getAll());
  }, []);

  const handleAdd = (data: StudentCreate) => {
    manager.add(data);
    setStudents([...manager.getAll()]);
  };

  const handleDelete = (id: number) => {
    manager.delete(id);
    setStudents([...manager.getAll()]);
  };

  const handleUpdate = (data: StudentCreate) => {
    if (editing) {
      manager.update(editing.id, data);
      setStudents([...manager.getAll()]);
      setEditing(null);
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setStudents([...manager.getAll()]);
    } else {
      setStudents(manager.search(query));
    }
  };

  return(
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
         სტუდენტების მართვა
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <StudentForm onSubmit={editing ? handleUpdate : handleAdd}
              initialData={editing ? { name: editing.name, email: editing.email } : undefined}
              isEditing={!!editing}/>
          </div>

          <div className="md:col-span-2">
            <SearchBar onSearch={handleSearch} />
            <div className="text-sm text-gray-600 mb-2">
              მთლიანად: {students.length} სტუდენტი
            </div>
            <StudentList
              students={students}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;