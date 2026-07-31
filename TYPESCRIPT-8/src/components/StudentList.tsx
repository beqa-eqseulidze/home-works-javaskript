import StudentItem from './StudentItem';

interface IStudent {
  id: number;
  name: string;
  email: string;
}

interface StudentListProps {
  students: IStudent[];
  onEdit: (student: IStudent) => void;
  onDelete: (id: number) => void;
}

const StudentList = ({ students, onEdit, onDelete }: StudentListProps) => {
  if (students.length === 0) {
    return <div className="text-center py-8 text-gray-500">სტუდენტები არ მოიძებნა</div>;
  }

  return (
    <div className="space-y-3">
      {students.map((student) => (
        <StudentItem key={student.id} student={student} onEdit={onEdit}onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default StudentList;