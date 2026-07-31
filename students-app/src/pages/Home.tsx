import { Link } from "react-router-dom";
import Logo from "../assets/17772738.png";

export function Home() {
    return (
        <div className="max-w-4xl mx-auto text-center py-16 px-4">
            <img
                src={Logo}
                alt="Student Management System Logo"
                className="w-54 h-54 mx-auto mb-6 object-contain rounded-2xl p-2 bg-blue-50/50 shadow-sm"
            />

            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                სტუდენტების მართვის სისტემა
            </h1>
            <p className="text-lg text-gray-600 mb-8">
                მართეთ სტუდენტების მონაცემები მარტივად, სწრაფად და ეფექტურად.
            </p>
            <Link
                to="/students"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
            >
                სტუდენტების სიის ნახვა
            </Link>
        </div>
    );
}