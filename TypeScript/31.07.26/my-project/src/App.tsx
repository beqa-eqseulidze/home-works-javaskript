import { useStudents } from "./hooks/useStudents";
import { useStudentSearch } from "./hooks/useStudentSearch";
import { StudentForm } from "./components/StudentForm";
import { StudentList } from "./components/StudentList";

function App() {
  const { students, addStudent, removeStudent, updateStudent } = useStudents();
  const { query, setQuery, filteredStudents } = useStudentSearch(students);

  return (
    <div>
      <h1>სტუდენტების მართვის სისტემა</h1>
      <StudentForm onAdd={addStudent} />
      <input
        placeholder="ძებნა..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <StudentList students={filteredStudents} onRemove={removeStudent} onUpdate={updateStudent} />
    </div>
  );
}

export default App;