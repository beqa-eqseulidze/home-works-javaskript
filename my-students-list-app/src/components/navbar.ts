import React from 'react';
import { NavLink } from 'react-router-dom';

export function Navbar() {
    const getLinkClass = ({ isActive }: { isActive: boolean }): string => {
        return isActive
            ? 'bg-amber-600 text-white font-medium px-4 py-2 rounded-md text-sm transition-all shadow-sm'
            : 'text-amber-100 hover:text-white hover:bg-amber-700/50 font-medium px-4 py-2 rounded-md text-sm transition-all';
    };

    return React.createElement(
        'nav',
        { className: 'bg-amber-800 p-2.5 rounded-xl mb-8 shadow-sm flex items-center justify-between border border-amber-900/10' },
        React.createElement(
            'div',
            { className: 'flex space-x-2' },
            React.createElement(
                NavLink,
                { to: '/', className: getLinkClass },
                'მთავარი'
            ),
            React.createElement(
                NavLink,
                { to: '/about', className: getLinkClass },
                'ჩვენს შესახებ'
            ),
            React.createElement(
                NavLink,
                { to: '/students', className: getLinkClass },
                'სტუდენტების მენეჯმენტი'
            )
        )
    );
}