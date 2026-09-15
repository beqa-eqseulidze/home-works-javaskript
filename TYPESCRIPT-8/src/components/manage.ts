import { useState, useEffect } from 'react';

interface IStudent {
  id: number;
  name: string;
  course: string;
}

interface StudentCreate{
  name: string;
  course: string;
}

//==================== localestorage ==================================:

let students: IStudent[] = [];
let nextId: number = 1;

// localStorage-დან ჩატვირთვა
const loadFromStorage = (): void =>{
  const saved = localStorage.getItem('students');
  if(saved) {
    students = JSON.parse(saved);
    //ყველაზე დიდ id-ს და ვუმატებთ 1-ს,რომ ახალი id არ განმეორდეს
    const maxId = students.reduce((max, s)=>Math.max(max, s.id), 0);
    nextId = maxId + 1;
  } else{
    students=[];
    nextId=1;
  }
};

//localStorage-ში მონაცემების შენახვა
const saveToStorage = (): void => {
  localStorage.setItem('students', JSON.stringify(students));
};


//ყველა სტუდენტის მიღება
const getAllStudents = (): IStudent[] => {
  return students;
};


//ახალი სტუდენტის დამატება..
const addStudent = (data: StudentCreate): IStudent => {
  const student = { ...data, id: nextId++ };
  students.push(student);
  saveToStorage();
  return student;
};

//სტუდენტის წაშლა..
const deleteStudent = (id: number): void => {
  students = students.filter(s => s.id !== id);
  saveToStorage();
};

//სტუდენტის რედაქტირება..
const updateStudent = (id: number, data: StudentCreate): void => {
  students = students.map(s=>
    s.id === id ? { ...s, ...data } : s
  );
  saveToStorage();
};

//სტუდენტის ძებნა სახელით..
const searchStudents = (query: string): IStudent[] => {
  const k = query.toLowerCase();
  return students.filter(s =>
    s.name.toLowerCase().includes(k)
  );
};
loadFromStorage();

//---------------------------------------------------------------------------------------------------------------

//Manager-ით ვაკავშირებთ localStorage-ის ლოგიკას Reactთან ....
export const Manager = ()=>{
  const [students, setStudents] = useState<IStudent[]>([]);     
  const [editing, setEditing] = useState<IStudent | null>(null); 

  useEffect(() =>{
    setStudents(getAllStudents());
  }, []);

  //ახალი სტუდენტის დამატება+განახლება
  const handleAdd = (data:StudentCreate)=> {
    addStudent(data);
    setStudents([...getAllStudents()]);
  };

  //სტუდენტის წაშლა + განახლება
  const handleDelete = (id:number)=>{
    deleteStudent(id);
    setStudents([...getAllStudents()]);
  };

  //სტუდენტის განახლება
  const handleUpdate = (data: StudentCreate) => {
    if(editing) {
      updateStudent(editing.id, data);
      setStudents([...getAllStudents()]);
      setEditing(null);
    }
  };

  //ძებნა თუ ცარიელია ყველა სტუდენტებს ვაჩვენებ. თუარა გაფილტრულ შედეგს..
  const handleSearch = (query: string) => {
    if(query.trim() === '') {
      setStudents([...getAllStudents()]);
    }
    else{
      setStudents(searchStudents(query));
    }
  };

  return {
    students,
    editing,
    setEditing,
    handleAdd,
    handleDelete,
    handleUpdate,
    handleSearch,
  };
};