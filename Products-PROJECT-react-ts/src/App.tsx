import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Banner } from './components/Banner';
import { Products } from './components/Products';

function App() {
  const [category, setCategory] = useState<string>('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar active={category} onChange={setCategory} />
      <Banner />
      <Products category={category} />
    </div>
  );
}

export default App;