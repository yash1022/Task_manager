import React, { useContext, useEffect, useState } from "react";
import { MdCheck, MdOutlineDeleteForever } from "react-icons/md";
import "../CSS/todo.css";
import { PopContext as PopContext1 } from "./Content";
import { authContext } from "../App";
import { PopContext2 as PopContext2 } from "./Schedules";

function Todo() {
    // Call both useContext hooks unconditionally
    const Popup_context1 = useContext(PopContext1);
    const Popup_context2 = useContext(PopContext2);
    const Popup_context = Popup_context1 || Popup_context2; // Use whichever context is available

    console.log("Popup_context:", Popup_context);

    const Auth = useContext(authContext);
    const [expandedTask, setExpandedTask] = useState(null);

    useEffect(() => {
        if (Popup_context && Popup_context.update) {
            fetchTasks(Auth.User.email);
        } else {
            console.error("Popup_context or Popup_context.update is undefined");
        }
    }, [Popup_context?.update]);

    const fetchTasks= async (email)=>{

        try{
        const response = await fetch('http://localhost:5000/api/getEvents',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                console.log("Error fetching tasks");
                return;
            }

            const data = await response.json();

            // Sort and set tasks if data is an array
            if (Array.isArray(data)) {
                sortTasks(data);
            } else {
                console.error("Fetched data is not an array");
            }
        } catch (err) {
            console.error("Error in fetchTasks:", err);
        }
    };

    const sortTasks = (data) => {
        const sortedTasks = data.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
        Popup_context.setTask(sortedTasks);
    };

    const handleDelete = async (id) => {
        const updatedTask = Popup_context.task.filter((curTask) => curTask.id !== id);
        Popup_context.setTask(updatedTask);

        try {
            await fetch(`http://localhost:5000/api/deleteEvent/${Auth.User.email}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
              
        }
    )

    }
    catch(err){
            console.log("Error deleting task", err)
        }
    };

    const deleteAll = () => {
        Popup_context.setTask([]);
    };

    const handleCheck = (id) => {
        Popup_context.setTask((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, status: !task.status } : task
            )
        );
    };

    const handleclick = (id) => {
        setExpandedTask(expandedTask === id ? null : id);
    };

    return (
        <div className="todocontainer1" style={{ width: "730px" }}>
            <header>
                <h5 style={{ marginLeft: "-634px" }}>Events</h5>
                <button
                    type="button"
                    className="todo-btn1"
                    onClick={() => {
                        if (Popup_context && Popup_context.SetPopup) {
                            Popup_context.SetPopup(true);
                        } else {
                            console.error("Popup_context.SetPopup is not defined");
                        }
                    }}
                >
                    Add Upcoming Events
                </button>
            </header>
            <br />
            <div className="mylist1">
                <ul>
                    {Popup_context?.task?.map((curTask) => (
                        <li
                            className="todoitem"
                            key={curTask.id}
                            onClick={() => handleclick(curTask.id)}
                        >
                            <span className={curTask.status ? "checklist" : "notchecklist"}>
                                {curTask.title}
                            </span>

                            <span
                                className="priority1"
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

                            <div className="additional-info">
                                <p>Start Date: {curTask.start_date}</p>
                                <p>End Date: {curTask.end_date}</p>
                            </div>

                            <button
                                className="checkbtn"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleCheck(curTask.id);
                                }}
                            >
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
            </div>
            <button className="clearbtn1" onClick={deleteAll}>
                Clear All
            </button>
        </div>
    );
}

export default Todo;
