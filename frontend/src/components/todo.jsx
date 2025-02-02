import React, { useContext, useEffect, useState } from "react";
import { MdCheck, MdOutlineDeleteForever } from "react-icons/md";


import "../CSS/todo.css";
import { PopContext } from "./Content";
import { authContext } from "../App";

function Todo() {


    const Popup_context = useContext(PopContext);
    const Auth= useContext(authContext);
    const [expandedTask, setExpandedTask] = useState(null);

    useEffect(()=>{

             fetchTasks(Auth.User.email)

    },[Popup_context.update])

    const fetchTasks= async (email)=>{
        const response = await fetch('http://localhost:5000/api/getTasks',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  
                },
                body: JSON.stringify({email})
        });


        if(!response.ok)
        {
            console.log("Error fetching tasks")
            return;
        }

        const data = await response.json();

          
         

           sortTasks(data)    //BY START DATE

          


    }

    const sortTasks = async (data)=>{

        const sortedTasks = data.sort((a,b)=> new Date(a.start_date)- new Date(b.start_date))

        Popup_context.setTask(sortedTasks);


              
     }
    
    const handleDelete = (id) => {
        const updatedTask = Popup_context.task.filter((curTask) => curTask.id !== id);
        Popup_context.setTask(updatedTask);
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


    const handleclick=(id)=>{
        setExpandedTask(expandedTask === id ? null : id);
    }

    return (
        <div className="todocontainer1" style={{width: "730px"}}>
            <header>
                <h5>Events</h5>
               
                <button type="button" className="todo-btn1" onClick={()=>{Popup_context.SetPopup(true)}}>Add Upcoming Events</button>
                
            </header>
            <br />
            <div className="mylist1">


                <ul>
                    {Popup_context.task.map((curTask) => (
                        <li  className="todoitem" key={curTask.id} onClick={()=>handleclick(curTask.id)}>
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
                        
                            <button className="checkbtn" 
                            onClick={(event) => {
                                event.stopPropagation();
                                handleCheck(curTask.id)
                            }}
                            >
                                <MdCheck />
                            </button>
                            <button
                                className="deletebtn"
                                // onClick={() => handleDelete(curTask.id)}
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
