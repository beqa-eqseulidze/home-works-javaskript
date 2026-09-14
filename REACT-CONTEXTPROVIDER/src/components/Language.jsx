import { useContext } from 'react';
import { Context } from '../context/Contexts';

export default function LanguageComponent() {
  const { languages } = useContext(Context);

  return (
    <div className=" border-2 border-blue-500 p-6 rounded-xl ">
      <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
        programming languages
      </h3>

      <ul className="space-y-2">
        {languages.map((language, i)=>(
          <li key={i} className="bg-white px-4 py-2 rounded-lg text-blue-900 font-medium ">
            {language}
          </li>
        ))}
      </ul>
    </div>
  );
}