import { useEffect } from 'react';

interface Props{
  message: string;
  onClose: () => void;
}

export const SuccessMessage =({ message, onClose }: Props)=>{
  useEffect(()=>{
    const timer = setTimeout(onClose, 5000); 
    return()=>clearTimeout(timer);
  }, [onClose]);

  return(
    <div className="fixed bottom-5 right-6 z-50 animate-[slideIn_0.5s_ease-out]">
      <div className="flex items-center gap-3 px-7 py-4 bg-green-600 text-white shadow-lg">
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <span className="text-lg font-bold">{message}</span>
      </div>
    </div>
  );
};