import { Link } from 'react-router-dom';
import Logo from '../assets/logo-managament.png'

export function Home() {
    return (
        <div className="max-w-2xl mx-auto text-center py-12 ">
            <img src={Logo} alt="Logo" className="w-50 h-50 object-contain mx-auto block mb-4" />
            <h1 className="text-4xl font-extrabold text-slate-800 mb-4">
                კეთილი იყოს თქვენი მობრძანება!
            </h1>
            <p className="text-slate-600 mb-8 leading-relaxed">
                ეს არის სტუდენტების მართვის სისტემა, სადაც შეგიძლიათ დაამატოთ, მოძებნოთ და მართოთ სტუდენტთა სია.
            </p>
            <Link
                to="/students"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors"
            >
                სტუდენტების მართვა
            </Link>
        </div>
    );
}