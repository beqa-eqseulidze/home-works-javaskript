import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/17772738.png";

export function Navbar() {
    const activeClass = "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1";
    const inactiveClass = "text-gray-600 hover:text-blue-500 transition pb-1";

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 w-full">
            <div className="w-full px-6 py-3 flex justify-between items-center">
                <Link
                    to="/"
                    className="flex items-center gap-2.5 text-xl font-bold text-gray-800 hover:opacity-90 transition"
                >
                    <img
                        src={Logo}
                        alt="Student MS Logo"
                        className="w-15 h-15 object-contain rounded-md"
                    />
                    <span className="tracking-tight text-gray-900 font-extrabold">
                        Student <span className="text-blue-600">MS</span>
                    </span>
                </Link>

                {/*ნავიგაციის ლინკები */}
                <nav className="flex gap-6 items-center">
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                    >
                        მთავარი
                    </NavLink>
                    <NavLink
                        to="/students"
                        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                    >
                        სტუდენტები
                    </NavLink>
                    <NavLink
                        to="/aboutUs"
                        className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
                    >
                        ჩვენ შესახებ
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}