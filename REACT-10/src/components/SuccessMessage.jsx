import React from 'react';
import iconThankYou from '../assets/icon-thank-you.svg';

export default function SuccessMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-12 px-4">
      <div className="w-16 h-16 mb-6 flex items-center justify-center">
        <img src={iconThankYou} alt="Thank you icon" className="w-full h-full object-contain" />
      </div>
      
      <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">
        Thank you!
      </h2>
      
      <p className="text-slate-400 text-sm max-w-md leading-relaxed">
        Thanks for confirming your subscription! We hope you have fun using our platform.
         If you ever need support, please feel free to email us at support@loremgaming.com.
      </p>
    </div>
  );
}