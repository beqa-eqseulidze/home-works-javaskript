import { useState } from "react";
import { StudentStatus } from "../types/student";
import type { CreateStudentDto } from "../types/student";

interface Props {
  onAdd: (dto: CreateStudentDto) => void;
}

export function StudentForm({ onAdd }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(18);
  const [status, setStatus] = useState<StudentStatus>(StudentStatus.Active);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) return;

    onAdd({ firstName, lastName, email, age, status });
    setFirstName("");
    setLastName("");
    setEmail("");
    setAge(18);
    setStatus(StudentStatus.Active);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="სახელი" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input placeholder="გვარი" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="number" placeholder="ასაკი" value={age} onChange={(e) => setAge(Number(e.target.value))} />
      <select value={status} onChange={(e) => setStatus(e.target.value as StudentStatus)}>
        <option value={StudentStatus.Active}>Active</option>
        <option value={StudentStatus.Inactive}>Inactive</option>
        <option value={StudentStatus.Graduated}>Graduated</option>
      </select>
      <button type="submit">დამატება</button>
    </form>
  );
}