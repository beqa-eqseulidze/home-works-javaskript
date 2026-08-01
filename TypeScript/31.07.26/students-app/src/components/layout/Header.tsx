type HeaderProps = {
  onToggleSidebar: () => void;
};

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-16 bg-gray-950/80 backdrop-blur-xl border-b border-white/8 flex items-center px-6 gap-4">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/30">
          <span className="text-white font-black text-lg">S</span>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-white font-bold text-base leading-none">
            StudentMS
          </h1>
          <p className="text-violet-400 text-xs">სტუდენტების მართვა</p>
        </div>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 transition-all duration-200"
        >
          ☰
        </button>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-violet-500/20">
          A
        </div>
      </div>
    </header>
  );
}
