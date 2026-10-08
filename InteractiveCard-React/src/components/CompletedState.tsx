import React from 'react';
import iconComplete from '../assets/icon-complete.svg';

interface CompletedStateProps{
  onReset:()=>void;
}

export const CompletedState: React.FC<CompletedStateProps> = ({ onReset }) => {
  return(
    <div className="w-full max-w-[380px] flex flex-col items-center text-center space-y-6">
      <img src={iconComplete} alt="Complete Icon" className="w-20 h-20" />
      
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-widest  text-slate-900">
          Thank you!
        </h2>
        <p className="text-slate-500 text-sm">
          We've added your card details
        </p>
      </div>

      <button  onClick={onReset}
        className="w-full bg-[#180224] hover:bg-[#2c0542] text-white py-3.5 rounded-lg font-medium transition-colors cursor-pointer" >
        Continue
      </button>
    </div>
  );
};