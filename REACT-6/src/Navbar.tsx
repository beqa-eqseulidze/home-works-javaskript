import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full p-[50px] bg-[#333] text-white">
      {}
      <div className="relative inline-block"
        onMouseEnter={()=> setIsOpen(true)}
        onMouseLeave={()=> setIsOpen(false)}>
        {}
        <Link to="/" className="cursor-pointer hover:text-gray-300">HOME</Link>

        {}
        {isOpen && (
          <div className="absolute top-[100%] left-0 pt-[10px]">
            <div className="bg-white text-black p-[10px] rounded shadow-lg w-[100px]">
              <Link to="/users" className="block py-[5px] hover:bg-gray-100">users</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};