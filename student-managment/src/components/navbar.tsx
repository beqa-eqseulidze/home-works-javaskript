import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/logo-managament.png'

export function Navbar() {
    return (
        <nav className="bg-slate-900 text-white shadow-md">
            <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-wide text-blue-400">
                    <img src={Logo} alt="Logo" className="w-10 h-10 object-contain" />
                    <span>Student Management App</span>
                </Link>
                <div className="flex gap-4 font-medium text-sm">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'text-blue-400 underline underline-offset-4' : 'hover:text-slate-300 transition-colors'
                        }
                    >
                        მთავარი
                    </NavLink>
                    <NavLink
                        to="/students"
                        className={({ isActive }) =>
                            isActive ? 'text-blue-400 underline underline-offset-4' : 'hover:text-slate-300 transition-colors'
                        }
                    >
                        სტუდენტები
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? 'text-blue-400 underline underline-offset-4' : 'hover:text-slate-300 transition-colors'
                        }
                    >
                        შესახებ
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}