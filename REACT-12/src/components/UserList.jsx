import UserCard from "./UserCard";

export default function UserList({ users }) {
  if (!users.length) return null;

  return(
    <div className="flex flex-col gap-2">
      {users.map((user)=>(
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}