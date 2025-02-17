import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the 'react-dom/client' import
import './index.css';
import App from './App';
import SettingsContextProvider from './context/SettingsContext';
import { PopContext } from './components/Content';  // Import PopContext
import { PopContext2 } from './components/Schedules'; // Import PopContext2

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root

// Define the initial state values for PopContext and PopContext2
const initialPopContextValues = {
  Popup: false,
  SetPopup: () => {},
  inputValue: { content: "", checked: false, startDate: "", endDate: "", priority: "Low" },
  setInputValue: () => {},
  task: [],
  setTask: () => {},
  update: 'false',
  setUpdate: () => {},
};

const initialPopContext2Values = {
  // Define the initial values for PopContext2 as per your logic
};

root.render(
  <React.StrictMode>
    <SettingsContextProvider>
      <PopContext.Provider value={initialPopContextValues}>  {/* Provide PopContext values */}
        <PopContext2.Provider value={initialPopContext2Values}>  {/* Provide PopContext2 values */}
          <App />
        </PopContext2.Provider>
      </PopContext.Provider>
    </SettingsContextProvider>
  </React.StrictMode>
);
