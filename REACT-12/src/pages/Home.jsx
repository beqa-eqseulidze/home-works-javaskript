import { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UserList";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async(username)=>{
    setError("");
    try {
      const res = await fetch(`https://api.github.com/search/users?q=${username}`);
      const data = await res.json();
      setUsers(data.items || []);
      if(!data.items?.length) setError("no user found");
    } 
    catch(err){
      setError("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <SearchBar onSearch={handleSearch} />

        {/*იუზერის როცა არ არსებობს.. */}
        {error && <p className="text-center font-bold text-red-600">{error}</p>}

        <UserList users={users} />
      </div>
    </div>
  );
}