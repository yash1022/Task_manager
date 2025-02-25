import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the 'react-dom/client' import
import './index.css';
import App from './App';
import SettingsContextProvider from './context/SettingsContext';
import { PopContext } from './components/Content';  // Import PopContext
// Import PopContext2

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root

// Define the initial state values for PopContext and PopContext2


root.render(
  <React.StrictMode>
    <SettingsContextProvider>
      {/* <PopContext.Provider value={initialPopContextValues}>   */}
        {/* <PopContext2.Provider value={initialPopContext2Values}>   */}
          <App />
        {/* </PopContext2.Provider>
      </PopContext.Provider> */}
    </SettingsContextProvider>
  </React.StrictMode>
);
