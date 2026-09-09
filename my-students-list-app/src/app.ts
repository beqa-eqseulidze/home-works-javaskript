import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Home } from './pages/home';
import { About } from './pages/about';
import { StudentsPage } from './pages/studentsPage';
import { NotFound } from './pages/notFound';

export function App() {
    const navigate = useNavigate();

    return React.createElement(
        'div',
        { className: 'min-h-screen bg-slate-50 p-4 md:p-8 font-sans' },
        React.createElement(
            'div',
            { className: 'max-w-4xl mx-auto' },
            React.createElement(Navbar),
            React.createElement(
                'main',
                null,
                React.createElement(
                    Routes,
                    null,
                    React.createElement(Route, { path: '/', element: React.createElement(Home) }),
                    React.createElement(Route, { path: '/about', element: React.createElement(About) }),
                    React.createElement(Route, { path: '/students', element: React.createElement(StudentsPage) }),
                    React.createElement(Route, { path: '*', element: React.createElement(NotFound) })
                )
            )
        )
    );
}

export default App;

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { Navbar } from './components/navbar';
// import { Home } from './pages/home';
// import { About } from './pages/about';
// import { StudentsPage } from './pages/studentsPage';
// import { NotFound } from './pages/notFound';

// export function App() {
//     return React.createElement(
//         'div',
//         { className: 'min-h-screen bg-slate-50 p-4 md:p-8 font-sans' },
//         React.createElement(
//             'div',
//             { className: 'max-w-4xl mx-auto' },
//             React.createElement(Navbar),
//             React.createElement(
//                 'main',
//                 null,
//                 React.createElement(
//                     Routes,
//                     null,
//                     React.createElement(Route, { path: '/', element: React.createElement(Home) }),
//                     React.createElement(Route, { path: '/about', element: React.createElement(About) }),
//                     React.createElement(Route, { path: '/students', element: React.createElement(StudentsPage) }),
//                     React.createElement(Route, { path: '*', element: React.createElement(NotFound) })
//                 )
//             )
//         )
//     );
// }

// export default App;