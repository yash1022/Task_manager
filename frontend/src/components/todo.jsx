import React, { useContext, useState } from "react";
import { MdCheck, MdOutlineDeleteForever } from "react-icons/md";


import "../CSS/todo.css";
import { PopContext } from "./Content";

function Todo() {
    const Popup_context = useContext(PopContext);
    const [expandedTask, setExpandedTask] = useState(null);
    
    const handleDelete = (id) => {
        const updatedTask = Popup_context.task.filter((curTask) => curTask.id !== id);
        Popup_context.setTask(updatedTask);
    };

    const deleteAll = () => {
        Popup_context.setTask([]);
    };

    const handleCheck = (id) => {
        const updatedTask = Popup_context.task.map((curTask) => {
            if (curTask.id === id) {
                return { ...curTask, checked: !curTask.checked };
            }
            return curTask;
        });
        Popup_context.setTask(updatedTask);
    };


    const handleclick=(id)=>{
        setExpandedTask(expandedTask === id ? null : id);
    }

    return (
        <div className="todocontainer">
            <header>
                <h5>To-do List</h5>
               
                <button type="button" className="todo-btn" onClick={()=>{Popup_context.SetPopup(true)}}>Add Task</button>
                
            </header>
            <br />
            <div className="mylist">


                <ul>
                    {Popup_context.task.map((curTask) => (
                        <li key={curTask.id} className="todoitem" onClick={() => handleclick(curTask.id)}>
                            <span className={curTask.checked ? "checklist" : "notchecklist"}>
                                {curTask.content}
                            </span>

                           
                <span
                    className="priority"
                    style={{
                        color:
                            curTask.priority === "High"
                                ? "red"
                                : curTask.priority === "Medium"
                                ? "yellow"
                                : "green",
                    }}
                >   
                    {curTask.priority}
                </span>

                {expandedTask === curTask.id && (
                            <div className="additional-info">
                                <p>Start Date: {curTask.startDate}</p>
                                <p>End Date: {curTask.endDate}</p>
                                <p>Priority: {curTask.priority}</p>
                            </div>
                        )}
                            <button className="checkbtn" onClick={() => handleCheck(curTask.id)}>
                                <MdCheck />
                            </button>
                            <button
                                className="deletebtn"
                                onClick={() => handleDelete(curTask.id)}
                            >
                                <MdOutlineDeleteForever />
                            </button>
                        </li>
                    ))}
                </ul>
                <button className="clearbtn" onClick={deleteAll}>
                    Clear All
                </button>
            </div>
        </div>
    );
}

export default Todo;
