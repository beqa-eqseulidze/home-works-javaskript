interface ISearchBar {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch } : ISearchBar)=>{
  return(
    <div className="relative mb-4">
      <input type="text" placeholder="სტუდენტის ძებნა..." onChange={(e)=>onSearch(e.target.value)}
        className="w-full px-4 py-2 pl-10 border border-blue-600 rounded-lg"/>
      <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
};

export default SearchBar;