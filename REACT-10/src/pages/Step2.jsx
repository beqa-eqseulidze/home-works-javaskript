import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconArcade from '../assets/icon-arcade.svg';
import iconAdvanced from '../assets/icon-advanced.svg';
import iconPro from '../assets/icon-pro.svg';

export default function Step2() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('arcade');
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    { id: 'arcade', name: 'Arcade', priceMonthly: '$9/mo', priceYearly: '$90/yr', icon: iconArcade },
    { id: 'advanced', name: 'Advanced', priceMonthly: '$12/mo', priceYearly: '$120/yr', icon: iconAdvanced },
    { id: 'pro', name: 'Pro', priceMonthly: '$15/mo', priceYearly: '$150/yr', icon: iconPro },
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Select your plan</h2>
        <p className="text-slate-400 text-sm mb-8">You have the option of monthly or yearly billing.</p>

        {/*plans cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {plans.map((plan) => (
            <div key={plan.id} onClick={() => setSelectedPlan(plan.id)}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex md:flex-col justify-between items-start ${
                selectedPlan === plan.id ? 'border-indigo-800 bg-indigo-50/30 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              }`}>
            
              {/*აიკონი */}
              <div className="mb-0 md:mb-10"> 
                <img src={plan.icon} alt={plan.name} className="w-10 h-10" />
              </div>

              {/* დეტალები */}
              <div>
                <div className="font-bold text-slate-900">{plan.name}</div>
                <div className="text-sm text-slate-500 mt-1 font-bold">
                  {isYearly ? plan.priceYearly : plan.priceMonthly}
                </div>
                {isYearly && (
                  <div className="text-[11px] text-slate-900 font-medium mt-1">2 months free</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/*toggle*/}
        <div className="bg-slate-50 py-3 rounded-xl flex items-center justify-center gap-6">
          <span className={`text-sm font-semibold ${!isYearly ? 'text-slate-900' : 'text-slate-400'}`}>
            Monthly
          </span>
          <button type="button" onClick={()=> setIsYearly(!isYearly)}
            className="w-10 h-5 bg-indigo-950 rounded-full p-1 flex items-center transition-colors focus:outline-none cursor-pointer">
            <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                isYearly ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-sm font-semibold ${isYearly ? 'text-slate-900' : 'text-slate-400'}`}>
            Yearly
          </span>
        </div>
      </div>

      {/*გადართვის ღილაკები */}
      <div className="flex justify-between items-center mt-10">
        <button onClick={()=>navigate('/step-1')} //დაბრუნების ღილაკი
          className="text-slate-600 hover:text-slate-700 font-semibold text-sm transition-colors cursor-pointer" >
          Go Back
        </button>
        <button onClick={()=>navigate('/step-3')} //დასრულების ღილაკი.
          className="bg-indigo-950 hover:bg-indigo-900 text-white font-medium px-12 py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer" >
          Finish
        </button>
      </div>
    </div>
  );
}