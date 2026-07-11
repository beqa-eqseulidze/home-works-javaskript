import React, { useState, useEffect } from "react";

interface IUser{
  id: number;
  name: string;
  email: string;
  address:{
    city: string;
  };
}


const Users = ()=>{
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-3xl mx-auto">
        {users.map((user)=>(
          <div key={user.id} className="bg-white p-4 mb-4">
            <h3 className="font-bold text-lg text-black">name : {user.name}</h3>
            <p className="text-black">email : {user.email}</p>
            <p className="text-black">city : {user.address.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Users;
