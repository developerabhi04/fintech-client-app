import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './style.css';

// Option 1: Without StrictMode (prevents double renders)
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
