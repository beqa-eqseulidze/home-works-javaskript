import { Link } from 'react-router-dom';
import Logo from '../assets/logo-managament.png'

export function About() {
    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">პროექტის შესახებ</h2>

            <Link to="/">
                <img src={Logo} alt="Logo" className="w-30 h-30 object-contain mx-auto block mb-4" />
            </Link>

            <p className="text-slate-600 leading-relaxed mb-4">
                ეს პროექტი მოიცავს სტუდენტების სიის დამენეჯმენტებას სადაც ასახული არის სტუდენტები რომლებიც სწავლობენ არჩეულ ფაკულტეტებზე, ასევე მას აქვს შესაძლებლობა დაამატო ახალი სტუდენტები და ასევე ამოშალო ის სტუდენტები რომლებმაც დაასრულეს ფაკულტეტი ან უარი თქვეს სწავლის გაგრძელებაზე
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-1">
                <li>სტუდენტების დამატება და წაშლა</li>
                <li>ძებნის ფუნქციონალი (Search Filter)</li>
                <li>მონაცემების შენახვა LocalStorage-ში</li>
            </ul>

            <p className="text-slate-600 leading-relaxed mt-4">
                შესაქმნელად გამოყენებულ იქნა: React და TypeScript
            </p>
            <p className="text-slate-600 leading-relaxed mb-2">
                ასევე გამოყენებული იქნა ფრეიმვორკები: Tailwind CSS და React Router DOM
            </p>
        </div>
    );
}