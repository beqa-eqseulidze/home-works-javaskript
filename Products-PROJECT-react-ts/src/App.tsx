import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Banner } from './components/Banner';
import { Products } from './components/Products';
import { AddProduct } from './features/addProduct/AddProduct';
import { SuccessMessage } from './features/successMessage/SuccessMessage';

function App() {
  const [category, setCategory] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar active={category} onChange={setCategory} />
      <Banner />

      <Routes>
        <Route path="/" element={<Products category={category} />} />
        <Route
          path="/add-product"
          element={<AddProduct onSuccess={setSuccessMessage} />}
        />
      </Routes>

      {/* წარმატების მესიჯი */}
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setSuccessMessage('')}
        />
      )}
    </div>
  );
}

export default App;