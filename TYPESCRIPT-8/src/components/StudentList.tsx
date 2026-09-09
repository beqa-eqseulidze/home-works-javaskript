import StudentItem from './StudentItem';

interface IStudent {
  id: number;
  name: string;
  course: string;
}

//კომპონენტისთვის საჭირო props-ები
interface StudentListProps {
  students: IStudent[]; //სტუდენტების სია
  onEdit: (student: IStudent) => void; //რედაქტირების ფუნქცია
  onDelete: (id: number) => void; //წაშლის ფუნქცია
}

const StudentList = ({ students, onEdit, onDelete }: StudentListProps) => {
  // თუ სია ცარიელია:
  if (students.length === 0) {
    return <div className="text-center py-2 text-gray-600">ვერ მოიძებნა</div>;
  }


  return (
    <div className="space-y-3">
      {/* map-ით გადავუვლით ყველა სტუდენტს და ვაჩვენებთ */}
      {students.map((student) => (
        <StudentItem  key={student.id} student={student} // სტუდენტის მონაცემები
          onEdit={onEdit}    // რედაქტირების ფუნქცია
          onDelete={onDelete} />  // წაშლის ფუნქცია
      ))}
    </div>
  );
};

export default StudentList;