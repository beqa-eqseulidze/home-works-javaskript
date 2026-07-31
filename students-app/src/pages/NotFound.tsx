import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest">
                404
            </h1>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-semibold mt-2 mb-6">
                გვერდი ვერ მოიძებნა
            </div>
            <p className="text-gray-600 text-lg max-w-md mb-8">
                სამწუხაროდ, გვერდი მისამართზე, რომელსაც ეძებთ, არ არსებობს ან გადაადგილებულია.
            </p>
            <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-md"
            >
                მთავარ გვერდზე დაბრუნება
            </Link>
        </div>
    );
}