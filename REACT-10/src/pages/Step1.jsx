import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Step1(){
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);

  //check if fields are empty
  const handleNext = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!name.trim() || !email.trim() || !phone.trim()) {
      return;
    }
    navigate('/step-2');
  };

  return(
    <form onSubmit={handleNext} className="flex flex-col h-full justify-between">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Personal info</h2>
        <p className="text-slate-400 text-sm mb-6">Please provide your name, email address, and phone number.</p>

        <div className="space-y-4">
          {/*Name*/}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-medium text-slate-700">Name</label>
              {touched && !name.trim() && (
                <span className="text-xs text-red-600">Field can't be empty</span>
              )}
            </div>
            <input type="text" placeholder="e.g. Stephen King" value={name} onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none ${
                touched && !name.trim() ? 'border-red-500 focus:border-red-500'
                  : 'border-slate-300 focus:border-indigo-600'
              }`}
            />
          </div>

          {/*Email*/}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-medium text-slate-700">Email Address</label>
              {touched && !email.trim() && (
                <span className="text-xs text-red-600">Field can't be empty</span>
              )}
            </div>
            <input type="email" placeholder="e.g. stephenking@lorem.com" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none ${
                touched && !email.trim() ? 'border-red-500 focus:border-red-500'
                  : 'border-slate-300 focus:border-indigo-600'
              }`}
            />
          </div>

          {/*Phone*/}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-medium text-slate-700">Phone Number</label>
              {touched && !phone.trim() && (
                <span className="text-xs text-red-600">Field can't be empty</span>
              )}
            </div>
            <input type="tel" placeholder="e.g. +1 234 567 890" value={phone}  onChange={(e) => setPhone(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none ${
                touched && !phone.trim() ? 'border-red-500 focus:border-red-500'
                  : 'border-slate-300 focus:border-indigo-600'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="bg-indigo-950 hover:bg-indigo-900 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer" >
          Next Step
        </button>
      </div>
    </form>
  );
}