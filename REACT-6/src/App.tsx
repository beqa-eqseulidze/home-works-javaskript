import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Navbar';
import { UsersList } from './UsersList';
import { NotFound } from './NotFound';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<div className="p-[50px]"><h1 className="text-2xl font-bold">HomePage</h1></div>} />
        <Route path="/users" element={<UsersList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

