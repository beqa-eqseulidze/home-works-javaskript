import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    if(!value.trim()) return;
    onSearch(value.trim());
  };

  const handleEnter = (e) => {
    if(e.key === "Enter") handleSearch();
  };

  return(
    <div className="flex items-center gap-3 bg-slate-800 rounded-xl p-3 shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-blue-400 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input type="text" placeholder="search" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleEnter}
        className="flex-1 bg-transparent outline-none text-slate-100 placeholder:text-slate-400 text-lg" />

      <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-800 transition-colors text-white text-sm font-semibold px-8 py-2 rounded-lg cursor-pointer">
        Search
      </button>
    </div>
  );
}