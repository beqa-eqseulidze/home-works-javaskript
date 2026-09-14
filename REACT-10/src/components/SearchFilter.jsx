export default function SearchFilter({ search, setSearch, region, setRegion, onSearchSubmit }) {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(onSearchSubmit) onSearchSubmit();
  };

  return(
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-9 px-6 md:px-16">
      {/* Searchbar*/}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <div className="bg-white shadow-sm rounded-md flex items-center px-3 py-3 w-full md:w-80 gap-3 border border-gray-100">
          <span className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
            </svg>
          </span>

      <input type="text"  placeholder="search for a country..." value={search} onChange={(e) => setSearch(e.target.value)} 
            className="w-full outline-none text-lg text-gray-900 bg-transparent" />
        </div>

        {/* ღილაკი */}
        <button type="submit" className="bg-green-500 hover:bg-green-900 text-white px-10 py-3 rounded-md text-lg font-medium transition cursor-pointer shadow-sm whitespace-nowrap" > Search
        </button>
      </div>

      {/* Region filter */}
      <select value={region} onChange={(e) => setRegion(e.target.value)} 
      className="bg-white shadow-lg rounded-md px-4 py-4 outline-none text-lg text-gray-900 w-70 cursor-pointer border border-gray-100" >
        <option value="">filter with region</option>
        {regions.map((reg) => (
          <option key={reg} value={reg}>
            {reg}
          </option>
        ))}
      </select>
    </form>
  );
}