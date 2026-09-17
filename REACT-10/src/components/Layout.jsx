import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return(
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 md:p-6 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl p-4 flex flex-col md:flex-row w-full max-w-4xl gap-6">
        <Sidebar />

        <div className="flex-1 px-4 py-6 md:px-8 md:py-4 flex flex-col justify-between">
          {children}
        </div>
      </div>
    </div>
  );
}