import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the 'react-dom/client' import
import './index.css';
import App from './App';
import SettingsContextProvider from './context/SettingsContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
  <SettingsContextProvider>
    <App />
  </SettingsContextProvider>
);
