import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessMessage from '../components/SuccessMessage';

export default function Step3() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [addons, setAddons] = useState({
    online: true,
    larger: true,
    customizable: false,
  });

  const toggleAddon = (key) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const addonItems = [
    { id: 'online', title: 'Online service', description: 'Access to multiplayer games', price: '+$1/mo' },
    { id: 'larger', title: 'Larger storage', description: 'Extra 1TB of cloud save', price: '+$2/mo' },
    { id: 'customizable', title: 'Customizable profile', description: 'Custom theme on your profile', price: '+$2/mo' },
  ];

  //თუ ყველაფერი გაიარა...
  if(isSubmitted) {
    return<SuccessMessage/>;
  }

  return(
    <div className="flex flex-col h-full justify-between">
      <div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Pick add-ons</h2>
        <p className="text-slate-400 text-sm mb-8">Add-ons help enhance your gaming experience.</p>

        <div className="space-y-4">
          {addonItems.map((item) => {
            const isChecked = addons[item.id];
            return (
              <div key={item.id} onClick={() =>toggleAddon(item.id)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  isChecked ? 'border-indigo-600 bg-indigo-50/30 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}>

                <div className="flex items-center gap-4">
                  <input type="checkbox" checked={isChecked} onChange={() => {}}
                    className="w-5 h-5 accent-indigo-600 rounded border-slate-300 cursor-pointer" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.description}</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-indigo-600">{item.price}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <button onClick={() => navigate('/step-2')} //უკან დაბრუნება...
          className="text-slate-400 hover:text-slate-700 font-semibold text-sm transition-colors cursor-pointer" >
          Go Back
        </button>
        <button onClick={() => setIsSubmitted(true)} //დასრულება...
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-7 py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer">
          Confirm
        </button>
      </div>
    </div>
  );
}