import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
    return React.createElement(
        'div',
        { className: 'bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center py-12' },
        React.createElement('h1', { className: 'text-6xl font-extrabold text-blue-600 mb-2' }, '404'),
        React.createElement('h2', { className: 'text-2xl font-bold text-slate-800 mb-3' }, 'Page Not Found'),
        React.createElement('p', { className: 'text-slate-600 mb-6 text-sm' }, 'გვერდი, რომელსაც ეძებთ, არ არსებობს ან არასწორად ჩაწერთ მისამართი.'),
        React.createElement(
            Link,
            {
                to: '/',
                className: 'inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors shadow-sm'
            },
            'Home გვერდზე დაბრუნება'
        )
    );
}