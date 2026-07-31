import type { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import { StudentStatus } from "../types/student";
import type {
    Student,
    CreateStudentInput,
    ApiResponse,
} from "../types/student";

function filterItems<T>(items: T[], predicate: (item: T) => boolean): T[] {
    return items.filter(predicate);
}

const initialStudents: Student[] = [
    {
        id: "1",
        firstName: "გიორგი",
        lastName: "ბერიძე",
        email: "giorgi@example.com",
        age: 21,
        course: "React & TypeScript",
        status: StudentStatus.Active,
        createdAt: new Date(),
    },
    {
        id: "2",
        firstName: "ნინო",
        lastName: "კაპანაძე",
        email: "nino@example.com",
        age: 22,
        course: "Node.js",
        status: StudentStatus.Graduated,
        createdAt: new Date(),
    },
];

const emptyForm: CreateStudentInput = {
    firstName: "",
    lastName: "",
    email: "",
    age: 18,
    course: "",
    status: StudentStatus.Active,
};

const STORAGE_KEY = "students_data";

export function Students() {
    const [students, setStudents] = useState<Student[]>(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (error) {
                console.error("Failed to parse students from localStorage", error);
                return initialStudents;
            }
        }
        return initialStudents;
    });

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<CreateStudentInput>(emptyForm);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    }, [students]);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "age" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (editingId) {
            setStudents((prev) =>
                prev.map((student) =>
                    student.id === editingId ? { ...student, ...formData } : student
                )
            );
            setEditingId(null);
        } else {
            const newStudent: Student = {
                ...formData,
                id: Date.now().toString(),
                createdAt: new Date(),
            };
            setStudents((prev) => [...prev, newStudent]);
        }

        setFormData(emptyForm);
    };

    const handleDelete = (id: string) => {
        setStudents((prev) => prev.filter((student) => student.id !== id));
    };

    const handleEdit = (student: Student) => {
        setEditingId(student.id);
        setFormData({
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            age: student.age,
            course: student.course,
            status: student.status,
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData(emptyForm);
    };

    const filteredStudents = filterItems(students, (student) => {
        const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
        const query = searchQuery.toLowerCase();
        return (
            fullName.includes(query) ||
            student.email.toLowerCase().includes(query) ||
            student.course.toLowerCase().includes(query)
        );
    });

    const responseData: ApiResponse<Student> = {
        data: filteredStudents,
        totalCount: filteredStudents.length,
        success: true,
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
                სტუდენტების მართვა
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-100"
            >
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    {editingId ? "სტუდენტის რედაქტირება" : "ახალი სტუდენტის დამატება"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="სახელი"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="border p-2 rounded w-full focus:outline-blue-500"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="გვარი"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="border p-2 rounded w-full focus:outline-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="ელ. ფოსტა"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="border p-2 rounded w-full focus:outline-blue-500"
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="ასაკი"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        min={16}
                        className="border p-2 rounded w-full focus:outline-blue-500"
                    />
                    <input
                        type="text"
                        name="course"
                        placeholder="კურსი"
                        value={formData.course}
                        onChange={handleInputChange}
                        required
                        className="border p-2 rounded w-full focus:outline-blue-500"
                    />
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="border p-2 rounded w-full focus:outline-blue-500"
                    >
                        <option value={StudentStatus.Active}>აქტიური</option>
                        <option value={StudentStatus.Inactive}>არააქტიური</option>
                        <option value={StudentStatus.Graduated}>დამთავრებული</option>
                    </select>
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        {editingId ? "განახლება" : "დამატება"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                        >
                            გაუქმება
                        </button>
                    )}
                </div>
            </form>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="მოძებნე სტუდენტი (სახელი, გვარი, ფოსტა, კურსი)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border rounded-lg shadow-sm focus:outline-blue-500"
                />
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto border border-gray-100">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b text-gray-600 text-sm">
                            <th className="p-3">სახელი & გვარი</th>
                            <th className="p-3">ელ. ფოსტა</th>
                            <th className="p-3">ასაკი</th>
                            <th className="p-3">კურსი</th>
                            <th className="p-3">სტატუსი</th>
                            <th className="p-3 text-right">მოქმედება</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responseData.data.length > 0 ? (
                            responseData.data.map((student) => (
                                <tr key={student.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-800">
                                        {student.firstName} {student.lastName}
                                    </td>
                                    <td className="p-3 text-gray-600">{student.email}</td>
                                    <td className="p-3 text-gray-600">{student.age}</td>
                                    <td className="p-3 text-gray-600">{student.course}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 text-xs font-semibold rounded ${student.status === StudentStatus.Active
                                                ? "bg-green-100 text-green-700"
                                                : student.status === StudentStatus.Graduated
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {student.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-right space-x-2">
                                        <button
                                            onClick={() => handleEdit(student)}
                                            className="text-blue-600 hover:underline text-sm font-medium"
                                        >
                                            რედაქტირება
                                        </button>
                                        <button
                                            onClick={() => handleDelete(student.id)}
                                            className="text-red-600 hover:underline text-sm font-medium"
                                        >
                                            წაშლა
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-gray-500">
                                    სტუდენტები ვერ მოიძებნა.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}