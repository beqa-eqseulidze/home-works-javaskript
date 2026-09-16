interface DeleteMessageProps {
  message: string; 
  isVisible: boolean;   
}

const DeleteMessage = ({ message, isVisible }: DeleteMessageProps) => {
  if(!isVisible) return null;

  return(
    <div className="mt-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
      {/* წაშლის აიკონი*/}
      <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
      </svg>
      <span className="font-bold font-arial">{message}</span>
    </div>
  );
};

export default DeleteMessage;