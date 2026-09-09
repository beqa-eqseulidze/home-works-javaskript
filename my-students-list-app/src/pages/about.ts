import React from 'react';

export function About() {
    return React.createElement(
        'div',
        { className: 'bg-white p-8 rounded-xl shadow-sm border border-slate-200' },
        React.createElement('h1', { className: 'text-2xl font-bold text-slate-800 mb-3' }, 'ჩვენს შესახებ'),
        React.createElement('p', { className: 'text-slate-600 leading-relaxed' }, 'ეს არის სტუდენტების მართვის აპლიკაცია, სადაც შეგიძლიათ გაეცნოთ სიაში არსებულ სტუდენტებს, ჩაამატოთ ახალი სტუდენტები რომელთაც სწავლა დაიწყეს, ამოშალოთ ის სტუდენტები რომელებმაც უკვე დაამთავრე სწავლა')
    );
}