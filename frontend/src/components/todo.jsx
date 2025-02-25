import React, { useContext, useEffect, useState } from "react";
import { MdCheck, MdOutlineDeleteForever } from "react-icons/md";
import "../CSS/todo.css";
import { PopContext as PopContext1 } from "./Content";
import { authContext } from "../App";

import { MdOutlinePlaylistAddCircle } from "react-icons/md";

function Todo() {
    // Call both useContext hooks unconditionally
    const Popup_context1 = useContext(PopContext1);
   
    const Popup_context = Popup_context1// Use whichever context is available
    const Auth = useContext(authContext);
    

    useEffect(() => {
      
            fetchTasks(Auth.User.email);
       
    }, [Popup_context?.update]);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'short' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
      };

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

  
    const handleCheck = (id) => {
        Popup_context.setTask((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, status: !task.status } : task
            )
        );
    };

    return (
        <div className="todocontainer1" style={{ width: "700px" }}>
            <header>
                <h5 >Events</h5>
                  <div style={{marginLeft:'-300px',marginTop:'-20px',display:'flex',alignItems:'center',gap:'4px'}}>
                 
                       <MdOutlinePlaylistAddCircle  size={30} color="gray" onClick={()=>Popup_context.SetPopup(true)}/>
                       <p style={{color:'gray',fontFamily:"Montserrat,serif"}}>Add event</p>
                  </div>
            </header>
            <hr style={{width:'650px', marginLeft:'-40px', marginTop:'7px', marginBottom:"10px"}}></hr>
            
            <div className="mylist1">
                <ul >
                    {Popup_context?.task?.map((curTask) => (
                        <li
                            className="todoitem"
                            key={curTask.id}

                            style={{ height: '45px',
                                width: '680px',
                                backgroundColor: '#f5f5f5',
                                borderLeft: '4px solid blue',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 10px',
                                marginBottom: '10px',
                                borderRadius: '5px'}}
                            
                        >
                             <input type="checkbox" checked={curTask.status} style={{ marginRight: '10px' }} onClick={(event)=> {event.stopPropagation();handleCheck(curTask.id)}} />
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
                                            ? "blue"
                                            : "green",
                                }}
                            >
                                {curTask.priority}
                            </span>

                            <div className="additional-info" style={{display:'flex',gap:'12px'}}>
                                <p style={{fontFamily:"Montserrat,serif"}}>From: {formatDate(curTask.start_date)}</p>
                                <p style={{fontFamily:"Montserrat,serif"}}>To: {formatDate(curTask.end_date)}</p>
                            </div>

                            {/* <button
                                className="checkbtn"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleCheck(curTask.id);
                                }}
                            >
                                <MdCheck />
                            </button> */}
                            <button
                                className="deletebtn"

                                onClick={()=>handleDelete(curTask.id)}
                               
                            >
                                <MdOutlineDeleteForever />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
          
        </div>
    );
}

export default Todo;
