import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import './style.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    React.createElement(
      React.StrictMode,
      null,
      React.createElement(
        BrowserRouter,
        null,
        React.createElement(App)
      )
    )
  );
}