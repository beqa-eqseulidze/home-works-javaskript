import useFetch from "./useFetch";
import DataList from "./components/DataList";

const App = () => {
  const [todos] = useFetch("https://jsonplaceholder.typicode.com/todos");
  const [users] = useFetch("https://jsonplaceholder.typicode.com/users");

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <h1 className="text-3xl font-extrabold text-slate-800 text-center">
          react Custom Hooks
        </h1>

        <DataList  title="Todos"   data={todos} type="todos" colorTheme="indigo" />

        <DataList  title="Users"  data={users} type="users" colorTheme="emerald" />

      </div>
    </div>
  );
};

export default App;