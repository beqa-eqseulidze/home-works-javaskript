import CountryCard from './CountryCard';

export default function CountryList({ countries, onSelectCountry }) {
  return(
    <main className="px-6 md:px-16 pb-16">
        {/* თუ ქვეყნები არაა --> */}
      {countries.length === 0 ? ( 
        <div className="text-center text-gray-500 mt-16 text-lg"> 
          no countries..
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {countries.map((country) => (
            <CountryCard key={country.name} country={country} onClick={() => onSelectCountry(country)}/>
          ))}
        </div>
      )}
    </main>
  );
}