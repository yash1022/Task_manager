import React from 'react'
import "../CSS/Event.css"
import { MdCheck, MdOutlineDeleteForever } from "react-icons/md";

export default function Events() {
  return (
    <div>

         <div className="Eventcontainer">
                    <header>
                        <h5>Events</h5>
                       
                        <button type="button" className="todo-btn">Add Event</button>
                        
                    </header>
                    <br />
                    <div className="Eventlist">
        
        
                        <ul>
                            
                                <li className="Eventitem">
                                    <span className= "checklist" >
                                        {/* {curTask.content} */}
                                        Mid term exams
                                    </span>
        
                                   
                       
        
                                    <button className="checkbtn">
                                        <MdCheck />
                                    </button>
                                    <button
                                        className="deletebtn"
                                        
                                    >
                                        <MdOutlineDeleteForever />
                                    </button>
                                </li>
                           
                        </ul>
                        <button className="clearbtn">
                            Clear All
                        </button>
                    </div>
                </div>
      
    </div>
  )
}
