type DeleteConfirmModalProps = {
  studentName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteConfirmModal({
  studentName,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 border border-red-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl shadow-red-500/10 animate-scale-in">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 border border-red-500/20">
          <span className="text-3xl">🗑️</span>
        </div>

        <h2 className="text-white text-xl font-bold text-center mb-2">
          სტუდენტის წაშლა
        </h2>
        <p className="text-gray-400 text-center text-sm mb-6">
          დარწმუნებული ხართ, რომ გინდათ{" "}
          <span className="text-red-400 font-semibold">{studentName}</span>-ის
          წაშლა? ეს მოქმედება შეუქცევადია.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl font-medium transition-all duration-200 border border-white/10"
          >
            გაუქმება
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all duration-200 shadow-lg shadow-red-500/20"
          >
            წაშლა
          </button>
        </div>
      </div>
    </div>
  );
}
