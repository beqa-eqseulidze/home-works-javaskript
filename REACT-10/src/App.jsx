import { useState } from 'react';
import countriesData from './data/data.json';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import CountryCard from './components/CountryCard';

export default function App(){
  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState(''); 
  const [region, setRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  // ფუნქცია, რომელიც იძახება მხოლოდ Search ღილაკზე დაჭერისას
  const handleSearchSubmit = () => {
    setSubmittedSearch(search);
  };

  // ვფილტრავ სახელით (submittedSearch-ის მიხედვით) და რეგიონით
  const filteredCountries = countriesData.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(submittedSearch.toLowerCase());
    const matchesRegion = region ? country.region === region : true;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <Header/>

      {/* Search ფილტრი (გადავცეთ onSearchSubmit) */}
      <SearchFilter search={search}  setSearch={setSearch} region={region} setRegion={setRegion} onSearchSubmit={handleSearchSubmit} />

      <main className="px-6 md:px-17">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filteredCountries.map((country) =>(
            <CountryCard key={country.name} country={country} onClick={() => setSelectedCountry(country)}/>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <p className="text-center text-gray-500 mt-12">not found</p>
        )}
      </main>
    </div>
  );
}