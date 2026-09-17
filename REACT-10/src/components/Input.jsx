export default function Input({ label, type = 'text', placeholder, value, onChange, error }) {
  return(
    <div className="w-full flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <label className="text-xs font-semibold text-slate-700">{label}</label>
        {error && <span className="text-xs font-medium text-rose-500">{error}</span>}
      </div>
      <input type={type}placeholder={placeholder} value={value} onChange={onChange}
        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none ${
          error ? 'border-rose-500 focus:ring-2 focus:ring-rose-200' 
            : 'border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100'
        }`}
      />
    </div>
  );
}