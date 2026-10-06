const categories=[
  { label: 'All', category: '' },
  { label: 'Smartphones', category: 'smartphones' },
  { label: 'Mens-Shirts', category: 'mens-shirts' },
  { label: 'Beauty', category: 'beauty' },
  { label: 'Home-Decoration', category: 'home-decoration' },
  { label: 'Sports', category: 'sports-accessories' },
];

interface Props{
  active: string;
  onChange:(category:string)=>void;
}

export const Navbar = ({ active, onChange } : Props)=>{
  return(
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-base font-bold text-gray-900">
          </span>
        </div>

        {/* SearchBar */}
        <div className="flex-1 hidden md:flex items-center bg-gray-100 rounded-lg px-3 h-9 max-w-md mx-auto gap-2">
          <svg
            className="w-4 h-4 text-gray-400 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm px-2 w-full placeholder:text-gray-400"
          />
        </div>

        {/* login / cart */}
        <div className="flex items-center gap-8 text-sm text-gray-800 shrink-0">
          <button type="button" className="flex items-center gap-2 hover:text-emerald-600 cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 4-6 8-6s8 2 8 6" strokeLinecap="round" />
            </svg>
            <span className="hidden sm:inline">Login</span>
          </button>

          <button type="button"className="flex items-center gap-2 hover:text-emerald-600 cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
          </button>
        </div>
      </div>

      {/* categories section */}
      <nav className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-5 h-10 flex items-center justify-between text-xs text-gray-700 cursor-pointer">
          {categories.map((item)=>(
            <button key={item.category} type="button" onClick={()=>onChange(item.category)}
              className={`py-2 transition cursor-pointer ${
                active === item.category ? 'text-blue-500 font-bold text-[15px]' : 'hover:text-blue-500 font-bold hover:text-[14px]'
              }`}>
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};