import { useNavigate } from "react-router-dom";

export default function UserCard({ user }) {
  const navigate = useNavigate();

  return(
    <div onClick={() => navigate(`/user/${user.login}`)}  className="flex items-center gap-4 bg-slate-800 hover:bg-slate-750 hover:bg-slate-700 transition-colors rounded-xl p-4 cursor-pointer shadow-md" >
      <img src={user.avatar_url} alt={user.login} 
      className="w-15 h-15 rounded-full border border-slate-400"/>
      <div className="flex flex-col">
        <h1 className="font-bold text-slate-100">{user.login}</h1>
        <p className="text-xs text-slate-200">view</p>
      </div>
    </div>
  );
}