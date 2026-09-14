export default function CountryCard({ country, onClick }) {
  return(
    <div onClick={onClick} className="bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1.5" >
      {/* დროშა*/}
      <div className="h-65 w-full bg-gray-50 flex items-center justify-center overflow-hidden border- border-gray-900">
        <img src={country.flags.svg}  alt={`${country.name} flag`} className="w-full h-full object-cover"/>
      </div>

      {/* ტექსტი */}
      <div className="p-6 flex flex-col justify-between">
        <h2 className="font-black text-2xl mb-3 text-gray-900 tracking-wide line-clamp-1">
          {country.name} 
        </h2>
        
        <div className="flex flex-col gap-2 text-sm text-gray-800">
          <p>
            {/* მოსახლეობა */}
            <span className="font-semibold text-gray-900">Population:</span>{' '}
            <span className="text-gray-700">{country.population.toLocaleString()}</span> 
          </p>
          <p>
            {/* რეგიონი */}
            <span className="font-semibold  text-gray-900">Region:</span>{' '}
            <span className=" text-gray-700 ">{country.region}</span>
          </p>
          <p>
            {/* დედაქალაქი */}
            <span className="font-semibold  text-gray-900">Capital:</span>{' '}
            <span className="text-gray-700">{country.capital}</span>
          </p>
        </div>
      </div>
    </div>
  );
}