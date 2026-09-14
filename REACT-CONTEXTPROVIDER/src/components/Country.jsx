import { useContext } from 'react';
import { Context } from '../context/Contexts';

export default function CountryComponent() {
  const { countries } = useContext(Context);

  return (
    <div className=" border-2 border-purple-800 p-6 rounded-xl shadow-sm ">
      <h3 className="text-xl font-bold text-purple-800 mb-3 flex items-center gap-2">
        countries
      </h3>

      <ul className="space-y-2">
        {countries.map((country, i)=>(
          <li key={i} className="bg-white px-4 py-2 rounded-lg text-purple-900 font-medium ">
            {country}
          </li>
        ))}
      </ul>
    </div>
  );
}