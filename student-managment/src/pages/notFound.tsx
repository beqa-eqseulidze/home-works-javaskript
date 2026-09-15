import { Link } from 'react-router-dom';
import Logo from '../assets/./logo-managament-404.png'

export function NotFound() {
    return (
        <div className="max-w-md mx-auto text-center py-16">
            <img src={Logo} alt="Logo" className="w-40 h-40 object-contain mx-auto block mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-4">გვერდი ვერ მოიძებნა</h2>
            <p className="text-slate-500 mb-6">სამწუხაროდ, გვერდი რომელსაც ეძებთ არ არსებობს.</p>
            <Link
                to="/"
                className="bg-slate-800 hover:bg-slate-900 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
            >
                მთავარ გვერდზე დაბრუნება
            </Link>
        </div>
    );
}