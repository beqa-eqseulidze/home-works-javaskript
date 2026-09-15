import StudentItem from './StudentItem';

interface IStudent{
  id: number;
  name: string;
  course: string;
}

interface StudentListProps{
  students: IStudent[];  
  onEdit: (student: IStudent) => void;  
  onDelete: (id: number) => void;  
}

const StudentList = ({ students, onEdit, onDelete }: StudentListProps) => {
  //თუ სია ცარიელია:
  if(students.length===0) {
    return <div className="text-center py-2 text-gray-600">0 სტუდენტი</div>;
  }


  return(
    <div className="space-y-3">
      {students.map((student)=>(
        <StudentItem key={student.id} student={student} 
          onEdit={onEdit} //რედაქტირება
          onDelete={onDelete}/> //წაშლის ფუნქცია
      ))}
    </div>
  );
};

export default StudentList;