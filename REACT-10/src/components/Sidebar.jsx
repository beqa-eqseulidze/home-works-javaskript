import React from 'react';
import { NavLink } from 'react-router-dom';
import sidebarBg from '../assets/bg-sidebar-desktop.svg';

const steps = [
  { number: '1', title: 'YOUR INFO', path: '/step-1' },
  { number: '2', title: 'SELECT PLAN', path: '/step-2' },
  { number: '3', title: 'ADD-ONS', path: '/step-3' },
];

export default function Sidebar() {
  return (
    <div 
      className="w-full md:w-72 rounded-2xl p-8 flex md:flex-col justify-between relative overflow-hidden text-white shadow-lg bg-cover bg-no-repeat bg-indigo-600"
      style={{ backgroundImage: `url(${sidebarBg})` }}
    >
      <div className="flex md:flex-col gap-6 z-10 w-full justify-around md:justify-start">
        {steps.map((step) => (
          <NavLink
            key={step.number}
            to={step.path}
            className="flex items-center gap-4 group"
          >
            {({ isActive }) => (
              <>
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-sky-200 text-indigo-950 shadow-md scale-105'
                      : 'border border-white/70 text-white group-hover:bg-white/10'
                  }`}
                >
                  {step.number}
                </div>
                <div className="hidden md:block">
                  <span className="text-[11px] text-indigo-200 tracking-wider block">STEP {step.number}</span>
                  <span className="text-sm font-bold tracking-wide text-white">{step.title}</span>
                </div>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}