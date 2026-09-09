import React from 'react';
import Logo from '../assets/Student_Management_App_Logo.png'

export function Home() {
    return React.createElement(
        'div',
        { className: 'bg-white p-8 rounded-xl shadow-sm border border-slate-200' },
        React.createElement('h1', { className: 'text-2xl font-bold text-slate-800 mb-3' }, 'მოგესალმებით სტუდენტების მენეჯმენტის აპლიკაციაში'),
        React.createElement('p', { className: 'text-slate-600 leading-relaxed' }, 'თვალი შეავლეთ სტუდენტების სიას რომლებიც სწავლობენ ფაკულტეტებზე ასევე დაამატეთ ან ამოშალეთ ის სტუდენტები სიაში რომლებმაც ჩააბარეს ან დაამთავრეს ფაკულტეტი.'),
        React.createElement('img', {
            src: Logo,
            className: 'max-w-md w-full h-auto rounded-lg shadow-sm border border-slate-100 object-cover mx-auto mt-7'
        })
    );
}