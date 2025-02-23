import React, { createContext, useContext, useState } from "react";
import "../CSS/content.css";
import Date from "./date";
import Todo from "./todo";
import Pomodoro from "./pomodoro";
import { Taskpopup } from "../components/Popup";
import { authContext } from "../App";
import Todolist from "./todolist";
import EventPopup from "./EventPopup"
import TaskInfo from "./TaskInfo";

const PopContext = createContext();
const TaskContext= createContext();
const Readcontext = createContext(null);

function Content() {
  const [Popup, SetPopup] = useState(false);
  const [inputValue, setInputValue] = useState({
    content: "",
    checked: false,
    startDate: "",
    endDate: "",
    priority: "Low",
  });
  const [task, setTask] = useState([]);
  const [update, setUpdate] = useState('false');


  const [TaskPopup,SetTaskPopup] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [ReadPopup, SetReadPopup]= useState(false);
  const [data, setData] = useState({})

  const Auth = useContext(authContext);

  return (
    <div>
      <div className="contentcontainer">
        <div className="upper-tab">
          <div className="name">
            {"Welcome, " + Auth.User?.displayName || "User"}
          </div>
          <div className="time">
            <Date />
          </div>
        </div>

        <div className="lower-tab1">
          {Popup && (
            <PopContext.Provider value={{ Popup, SetPopup, inputValue, setInputValue, task, setTask, update, setUpdate }}>
              <Taskpopup onclose={() => SetPopup(false)} />
            </PopContext.Provider>
          )}

          <PopContext.Provider value={{ Popup, SetPopup, inputValue, setInputValue, task, setTask, update, setUpdate }}>
            <Todo />
          </PopContext.Provider>

          <div className="b b3">
            <div className="calender">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=sudeepti2006%40gmail.com&ctz=Asia%2FKolkata"
                style={{ border: "0" }}
                width="367"
                height="300"
                frameBorder="0"
                scrolling="no"
                title="Google Calendar"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="lower-tab1">
          {
            TaskPopup && (<TaskContext.Provider value={{ TaskPopup, SetTaskPopup, activeCategory,setActiveCategory}}>
              <EventPopup></EventPopup>
                  </TaskContext.Provider>)
          }

          {
            ReadPopup && (<Readcontext.Provider value={{SetReadPopup,data}}>
              <TaskInfo></TaskInfo>
                  </Readcontext.Provider>)



          }
          <TaskContext.Provider value={{ TaskPopup, SetTaskPopup, activeCategory, setActiveCategory,SetReadPopup,setData}}>
              <Todolist />
          </TaskContext.Provider>
          
          <Pomodoro />
        </div>
      </div>
    </div>
  );
}

export default Content;
export { PopContext, TaskContext, Readcontext };
