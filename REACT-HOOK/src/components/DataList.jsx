const DataList = ({ title, data, type, colorTheme = "indigo" }) => {
  const themes = {
    indigo: {
      header: "text-indigo-600",
      badge: "bg-indigo-100 text-indigo-700"
    },
    emerald: {
      header: "text-emerald-600",
      badge: "bg-emerald-100 text-emerald-700"
    }
  };

  const theme = themes[colorTheme] || themes.indigo;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
      <h2 className={`text-xl font-bold ${theme.header} mb-4 flex items-center gap-2`}>
        {title}
      </h2>
      
      {data ? (
        <ul className="space-y-2">
          {data.slice(0, 5).map((item) => (
            <li 
              key={item.id} 
              className={`p-3 bg-slate-50 rounded-lg text-slate-700 text-sm border border-slate-100 ${theme.hover} transition flex justify-between items-center`}
            >
              <span className="font-medium text-slate-900">
                {type === 'todos' ? item.title : item.name}
              </span>
              
              {type === 'users' && (
                <span className={`text-xs ${theme.badge} px-2 py-1 rounded-full`}>
                  {item.address.city}
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-400 animate-pulse">loading.</p>
      )}
    </div>
  );
};

export default DataList;