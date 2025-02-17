import React, { useState, createContext, useContext } from "react";
import Todo from "./todo";
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../CSS/Schedules.css';
import { Taskpopup } from "../components/Popup";
import { authContext } from "../App";

const PopContext2 = createContext();

function Schedule() {
  const [Popup, SetPopup] = useState(false);
  const [inputValue, setInputValue] = useState({ content: "", checked: false, startDate: "", endDate: "", priority: "Low" });
  const [task, setTask] = useState([]);
  const [update, setUpdate] = useState('false');

  // Providing the context here to cover Todo and Taskpopup components
  return (
    <div>
      <Navbar />
      <div className="main-box">
        <div className='side-bar'>
          <Sidebar />
        </div>
        <div className="todo-container">
          {Popup && (
            <PopContext2.Provider value={{ Popup, SetPopup, inputValue, setInputValue, task, setTask, update, setUpdate }}>
              <Taskpopup onclose={() => { SetPopup(false); }} />
            </PopContext2.Provider>
          )}

          <PopContext2.Provider value={{ Popup, SetPopup, inputValue, setInputValue, task, setTask, update, setUpdate }}>
            <Todo />
          </PopContext2.Provider>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
export { PopContext2 };
