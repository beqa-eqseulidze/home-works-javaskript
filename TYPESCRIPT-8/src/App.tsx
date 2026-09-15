import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import SearchBar from './components/SearchBar';
import {Manager} from './components/manage';

const App = ()=>{
  const {students,editing,setEditing,handleAdd,handleDelete,handleUpdate,handleSearch} = Manager();

  return(
    <div className="min-h-screen bg-gray-300 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 text-gray-900">
          სტუდენტები
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <StudentForm onSubmit={editing ? handleUpdate : handleAdd}
              initialData={editing ? { name: editing.name, course: editing.course} : undefined}
              isEditing={!!editing}/>
          </div>

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