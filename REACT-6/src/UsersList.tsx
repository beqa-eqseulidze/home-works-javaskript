import { useState, useEffect } from 'react';

interface IUser {
  id: number;
  name: string;
  email: string;
}

export const UsersList = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);


  //delete
  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };


  return (
    <div className="w-80% mx-auto mt-[50px]">
      <h1 className="text-1xl font-bold mb-4">list</h1>
      {users.map((user) => (
        <div key={user.id} className="w-full border-b-[10px] border-[#dacb03] py-[20px]">
          <span>{user.name}</span>
          <button 
            onClick={() => deleteUser(user.id)} className="ml-[50px] bg-red-600 text-white border-none px-[40px] py-[4px] cursor-pointer">
            DELETE
          </button>
        </div>
      ))}
    </div>
  );
};