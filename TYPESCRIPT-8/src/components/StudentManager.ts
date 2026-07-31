// სტუდენტის მონაცემთა მოდელი
interface IStudent {
  id: number;
  name: string;
  email: string;
}

type StudentCreate = Omit<IStudent, 'id'>;

class StudentManager {
  students: IStudent[] = [];
  nextId: number;

  // კონსტრუქტორი - localStorage-დან მონაცემების ჩატვირთვა
  constructor() {
    const saved = localStorage.getItem('students');
    if (saved) {
      this.students = JSON.parse(saved);
      const maxId = this.students.reduce((max, s) => Math.max(max, s.id), 0);
      this.nextId = maxId + 1;
    } else {
      this.students = [];
      this.nextId = 1;
    }
  }

  // localStorage-ში შენახვა
  save() {
    localStorage.setItem('students', JSON.stringify(this.students));
  }

  // ყველა სტუდენტის მიღება
  getAll(): IStudent[] {
    return this.students;
  }

  // ახალი სტუდენტის დამატება
  add(data: StudentCreate): IStudent {
    const student = { ...data, id: this.nextId++ };
    this.students.push(student);
    this.save();
    return student;
  }

  // სტუდენტის წაშლა ID-ით
  delete(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
    this.save();
  }

  // სტუდენტის მონაცემების განახლება
  update(id: number, data: StudentCreate): void {
    this.students = this.students.map(s =>
      s.id === id ? { ...s, ...data } : s
    );
    this.save();
  }

  // სტუდენტების ძებნა
  search(query: string): IStudent[] {
    const q = query.toLowerCase();
    return this.students.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q)
    );
  }
}

export default StudentManager;