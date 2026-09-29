import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/Aromelle-logo.png'

export function Navbar() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="bg-white border-b border-zinc-200 mb-8 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <Link to="/" >
                    <img
                        src={Logo}
                        alt="Logo"
                        className="w-25 h-25 object-contain"
                    />
                </Link>

                <div className="flex gap-6 font-medium text-sm">
                    <Link
                        to="/"
                        className={`transition-colors duration-200 ${isActive('/')
                            ? 'text-black border-b-2 border-black pb-1 font-semibold'
                            : 'text-zinc-500 hover:text-black'
                            }`}
                    >
                        მთავარი
                    </Link>
                    <Link
                        to="/products"
                        className={`transition-colors duration-200 ${isActive('/products')
                            ? 'text-black border-b-2 border-black pb-1 font-semibold'
                            : 'text-zinc-500 hover:text-black'
                            }`}
                    >
                        პროდუქტები
                    </Link>
                    <Link
                        to="/about"
                        className={`transition-colors duration-200 ${isActive('/about')
                            ? 'text-black border-b-2 border-black pb-1 font-semibold'
                            : 'text-zinc-500 hover:text-black'
                            }`}
                    >
                        ჩვენს შესახებ
                    </Link>
                </div>
            </div>
        </nav>
    );
}