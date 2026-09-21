import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UserDetail() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const fetchUser = async()=>{
      try{
        const res = await fetch(`https://api.github.com/users/${username}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [username]);

  if (!user) return null;

  return(
    <div className="min-h-screen bg-slate-900 text-slate-100 flex justify-center px-8 py-25">
      <div className="w-full max-w-md bg-slate-800 rounded-xl p-3 flex flex-col items-center gap-6 text-center">

      {/* უკან დაბრუნება */}
        <button onClick={() => navigate("/")} className="self-start text-sm text-blue-400 hover:text-blue-300 cursor-pointer" >
        <svg class="w-10 h-9 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/></svg></button>

      {/*user details: */}
        <img src={user.avatar_url} alt={user.login} className="w-24 h-24 rounded-full"/>
        <h2 className="text-xl font-bold">{user.name || user.login}</h2>
        <p className="text-blue-500 text-lg">@{user.login}</p>
        <p className="text-slate-400 text-sm">
          {user.bio || " no bio"}
        </p>

        <div className="flex gap-5 text-sm">
          <p>Repo : {user.public_repos}</p>
          <p>Followers : {user.followers}</p>
          <p>Following : {user.following}</p>
        </div>
      </div>
    </div>
  );
}