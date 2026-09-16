interface SuccessMessageProps {
  message: string;     
  isVisible: boolean; 
}

const SuccessMessage = ({ message, isVisible }: SuccessMessageProps) => {
  // თუ არ უნდა ჩანდეს, არაფერს ვაბრუნებთ
  if (!isVisible) return null;

  return(
    <div className="mt-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in">
      {/*check icon */}
      <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
      <span className="font-bold font-arial">{message}</span>
    </div>
  );
};

export default SuccessMessage;