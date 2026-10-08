import React from 'react';
import bgCardBack from '../assets/bg-card-back.png';

interface CardBackProps {
  cvc: string;
}

export const CardBack: React.FC<CardBackProps> = ({ cvc }) => {
  return (
    <div className="relative w-[447px] h-[245px] rounded-xl shadow-2xl flex flex-col justify-between py-6 overflow-hidden">
      <img src={bgCardBack} alt="" className="absolute inset-0 w-full h-full object-cover -z-10" />

      <div className="w-full h-12 mt-2"></div>

      <div className="px-12 relative top-[-30px]">
        <div className="w-full h-10 flex items-center text-[17px] justify-end pr-3 text-white font-mediumbold text-sm font-bold tracking-wider">
          {cvc || '000'}
        </div>
      </div>

      <div></div>
    </div>
  );
};