import { Provider } from './context/Contexts';
import Language from './components/Language';
import Fruit from './components/Fruits';
import Country from './components/Country';

export default function App(){
  return (
    <Provider>
      <div className="bg-green-200 max-w-xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-5">
          react context Provider</h2>
          
        <div className="flex flex-col gap-3">
          <Language/>
          <Fruit/>
          <Country/>
        </div>
      </div>
    </Provider>
  );
}