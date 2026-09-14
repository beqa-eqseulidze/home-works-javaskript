import { useContext } from 'react';
import {Context } from '../context/Contexts';

export default function FruitComponent() {
  const { fruits } = useContext(Context);

  return(
    <div className=" border-2 border-orange-500 p-6 rounded-xl ">
      <h3 className="text-xl font-bold text-orange-600 mb-3 flex items-center gap-2">
        fruits
      </h3>

      <ul className="space-y-2">
        {fruits.map((fruit, i)=>(
          <li key={i} className="bg-white px-4 py-2 rounded-lg text-orange-600 font-medium">
            {fruit}
          </li>
        ))}
      </ul>
    </div>
  );
}