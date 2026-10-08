import React from 'react';
import bgCardFront from '../assets/bg-card-front.png';
import cardLogo from '../assets/card-logo.svg';

interface CardFrontProps {
  name: string;
  number: string;
  expMonth: string;
  expYear: string;
}

export const CardFront: React.FC<CardFrontProps> = ({
  name,
  number,
  expMonth,
  expYear,
 })=>{
  return (
    <div className="relative w-[447px] h-[245px] rounded-xl p-8 text-white shadow-2xl flex flex-col justify-between overflow-hidden">
      <img src={bgCardFront} alt="" 
      className="absolute inset-0 w-full h-full object-cover -z-10" />

      <div>
        <img src={cardLogo} alt="" className="w-21 h-12" />
      </div>

      <div className="space-y-6">
        <p className="text-2xl tracking-[0.18em] font-mono">
          {number || '0000 0000 0000 0000'}
        </p>
        <div className="flex justify-between text-sm uppercase tracking-widest text-slate-200">
          <span className="truncate max-w-[240px]">{name || 'Cardholder name'}</span>
          <span>
            {expMonth || '00'}/{expYear || '00'}
          </span>
        </div>
      </div>
    </div>
  );
};