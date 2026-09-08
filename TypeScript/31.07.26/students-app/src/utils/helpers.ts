import type { CreateStudentPayload, FormErrors } from "../types/student.types";

export function validateStudentForm(data: Partial<CreateStudentPayload>): FormErrors {
  const errors: FormErrors = {};

  if (!data.name?.trim()) {
    errors.name = "სახელი სავალდებულოა";
  } else if (data.name.trim().length < 2) {
    errors.name = "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს";
  }

  if (!data.surname?.trim()) {
    errors.surname = "გვარი სავალდებულოა";
  } else if (data.surname.trim().length < 2) {
    errors.surname = "გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს";
  }

  if (!data.age) {
    errors.age = "ასაკი სავალდებულოა";
  } else if (data.age < 16 || data.age > 80) {
    errors.age = "ასაკი უნდა იყოს 16-დან 80-მდე";
  }

  if (!data.email?.trim()) {
    errors.email = "ელ-ფოსტა სავალდებულოა";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "ელ-ფოსტა არასწორი ფორმატია";
  }

  if (!data.phone?.trim()) {
    errors.phone = "ტელეფონი სავალდებულოა";
  } else if (!/^\d{3}-\d{3}-\d{3}$/.test(data.phone)) {
    errors.phone = "ფორმატი: 5XX-XXX-XXX";
  }

  if (!data.department) {
    errors.department = "ფაკულტეტი სავალდებულოა";
  }

  if (!data.grade) {
    errors.grade = "შეფასება სავალდებულოა";
  }

  if (data.gpa === undefined || data.gpa === null) {
    errors.gpa = "GPA სავალდებულოა";
  } else if (data.gpa < 0 || data.gpa > 4) {
    errors.gpa = "GPA უნდა იყოს 0-დან 4-მდე";
  }

  if (!data.status) {
    errors.status = "სტატუსი სავალდებულოა";
  }

  if (!data.enrollmentYear) {
    errors.enrollmentYear = "ჩარიცხვის წელი სავალდებულოა";
  } else if (data.enrollmentYear < 2000 || data.enrollmentYear > new Date().getFullYear()) {
    errors.enrollmentYear = `წელი უნდა იყოს 2000-დან ${new Date().getFullYear()}-მდე`;
  }

  return errors;
}

export function getGradeColor(grade: string): string {
  const colors: Record<string, string> = {
    A: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    B: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    C: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    D: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
    F: "bg-red-500/20 text-red-400 border border-red-500/30",
  };
  return colors[grade] ?? "bg-gray-500/20 text-gray-400";
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    აქტიური: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    არააქტიური: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
    დამთავრებული: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    შეჩერებული: "bg-red-500/20 text-red-400 border border-red-500/30",
  };
  return colors[status] ?? "bg-gray-500/20 text-gray-400";
}

export function getGpaColor(gpa: number): string {
  if (gpa >= 3.7) return "text-emerald-400";
  if (gpa >= 3.0) return "text-blue-400";
  if (gpa >= 2.0) return "text-amber-400";
  return "text-red-400";
}

export function formatGpa(gpa: number): string {
  return gpa.toFixed(2);
}
