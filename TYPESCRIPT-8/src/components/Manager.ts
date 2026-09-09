//სტუდენტების მონაცემთა მართვა - localStorage
interface IStudent {
  id: number;
  name: string;
  course: string;
}

// ახალი სტუდენტის შექმნისთვის 
interface StudentCreate {
  name: string;
  course: string;
}


let students: IStudent[] = []; 
let nextId: number = 1; 

// localStorage-იდან მონაცემების ჩატვირთვა
const loadFromStorage = (): void => {
  const saved = localStorage.getItem('students');  //localStorage-დან წამოღება (string | null)
  if(saved){
    students = JSON.parse(saved);  // JSON გადაყვანა IStudent[] მასივში
    // reduce-ით ვპოულობთ ID-ს და საწყისი მნიშვნელობა იქნება - 0
    const maxId = students.reduce((max, s) => Math.max(max, s.id), 0);
    nextId = maxId + 1;  // შემდეგი ID = მაქსიმალური ID + 1
  } 
  else {
    students = [];   // ცარიელი მასივი - IStudent[] ტიპი
    nextId = 1;      // პირველი ID იქნება 1
  }
};

// localStorage-ში მონაცემების შენახვა
const saveToStorage = (): void => {
  localStorage.setItem('students', JSON.stringify(students));
};


//ყველა სტუდენტის მიღება
export const getAllStudents = (): IStudent[]=> {
  return students;
};

// ახალი სტუდენტის დამატება
export const addStudent = (data: StudentCreate): IStudent => {
  const student = { ...data, id: nextId++ };
  students.push(student);
  saveToStorage();
  return student;
};

// სტუდენტის წაშლა id-ით
export const deleteStudent = (id: number): void => {
  students = students.filter(s => s.id !== id);
  saveToStorage();
};

// სტუდენტის მონაცემების განახლება
export const updateStudent = (id: number, data: StudentCreate): void => {
  students = students.map(s =>
    s.id === id ? { ...s, ...data } : s
  );
  saveToStorage();
};

// სტუდენტების ძებნა სახელით
// ვაბრუნებთ: IStudent[] - იმ სტუდენტების მასივი, რომელთა სახელი შეიცავს საძიებო ტექსტს..
export const searchStudents = (query: string): IStudent[] => {
  const k = query.toLowerCase();

  //ვფილტრავ და ვტოვებ იმას ვისი სახელიც შეიცავს k;
  return students.filter(s =>
    s.name.toLowerCase().includes(k)
  );
};


loadFromStorage();