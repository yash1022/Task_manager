import React, { useState, createContext, useContext, useEffect } from "react";
import Todo from "./todo";
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../CSS/Schedules.css';
import { Taskpopup } from "../components/Popup";
import { authContext } from "../App";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaRegClosedCaptioning } from "react-icons/fa";
import { MdCheck, MdOutlineDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";






function Schedule() {
  const Auth = useContext(authContext);
  const [Events, SetEvents]= useState([]);
  const [EventData, SetEventData]= useState([]);
  const nav= useNavigate();
  
  


  useEffect(()=>{

    FetchEvents();




  },[])

  const FetchEvents= async()=>
  {

    try{



      const response= await fetch(`http://localhost:5000/api/getEvents/${Auth.User.email}?includeNotes=true`,{

        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
       
      })

      

      if(response.ok)
      {
          const data= await response.json()

          SetEvents(data);

      }



    }
    catch(e)
    {
      console.error(e)
    }

       





  }


  const handleClick=(id)=>{

    const event= Events.filter((x)=> x.id === id)[0];

    SetEventData(event);
    
    
  }


  const handleDelete = async (id) => {
    const updatedTask = Events.filter((curTask) => curTask.id !== id);
    SetEvents(updatedTask);
    SetEventData([])

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

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: 'short' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

const checkstatus = (startdate,endate)=>{

  const currentDate = new Date();
  const startDate = new Date(startdate);
  const enDate = new Date(endate);

  if(currentDate>=startDate && currentDate<=enDate)
  {
    return 'Active'
  }

  else if(currentDate<startDate)
  {
    return 'Upcoming';
  }

  else
  {
    return 'Compleated'
  }

 





}
 

  // Providing the context here to cover Todo and Taskpopup components
  return (
    <div>
      <Navbar />
      <div className="main-box">
        <div className='side-bar'>
          <Sidebar />
        </div>


       
          <div className="box box-1">
            {EventData.length!=0? (<>

              <p style={{fontFamily:"Montserrat,serif", fontSize:"50px",fontWeight:'600', marginBottom:'20px'}}>{EventData.title}</p>
            <p style={{fontFamily:"Montserrat,serif" ,fontSize:'20px', fontWeight:'500'}}>From: <span style={{fontFamily:"Montserrat,serif" ,fontSize:'20px',color:'gray'}}>{formatDate(EventData.start_date)}</span></p>
            <p style={{fontFamily:"Montserrat,serif", fontSize:'20px', fontWeight:'500'}}>To: <span style={{fontFamily:"Montserrat,serif" ,fontSize:'20px', color:'gray'}}>{formatDate(EventData.end_date)}</span></p>
            <p style={{fontFamily:"Montserrat,serif", fontSize:'20px', fontWeight:'500'}}>Status: <span style={{fontFamily:"Montserrat,serif" ,fontSize:'20px', color:'gray'}}> {checkstatus(EventData.start_date, EventData.end_date)} </span></p>

            <p style={{fontFamily:"Montserrat,serif", fontSize:'20px', fontWeight:'500',marginTop:'20px'}}>Description: <span style={{fontFamily:"Montserrat,serif", fontSize:'20px', fontWeight:'400', color:'gray'}}>{EventData.description}</span></p>

            <p style={{fontFamily:"Montserrat,serif",fontWeight:'500', marginTop:'25px', color:'gray'}}>Notes</p>
            <hr></hr>

            <div  className='notes-container' style={{width:'760px', height:'220px', display:'flex', gap:'15px', overflowX:'auto'}}>
              <div style={{height:'180px', width:'180px', backgroundColor:"#4b5563", marginTop:'10px', padding:'10px', borderRadius:"10px", display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column',flexShrink:'0'}}>
                

                <AiOutlineFileAdd  size={50} color="#d1d5db" onClick={()=> nav('/notes',{state:{Eventid:EventData.id}})}/>
                <p style={{color:'#d1d5db',fontFamily:"Montserrat,serif"}}>Add note</p>

              </div>
              {
                EventData.notes.map((note)=>(

  <div style={{height:'175px', width:'180px', backgroundColor:"#4b5563", marginTop:'10px', paddingTop:'10px',paddingLeft:'10px', paddingRight:'10px', paddingBottom:'15px', borderRadius:"10px", display:'flex', flexDirection:'column', flexShrink:'0', overflowY:'hidden'}} 
  onClick={()=> nav('/read',{state:{id:note.id, title:note.title,content:note.content, date:formatDate(note.created_at)}})}>
                  <p style={{fontFamily:"Montserrat,serif", color:'#d1d5db', fontWeight:'600', fontSize:"17px"}}>{note.title}:</p>
                  <p style={{fontFamily:"Montserrat,serif", color:'#d1d5db', marginTop:'5px', fontSize:'12px'}}>{formatDate(note.created_at)}</p>
                  <p style={{fontFamily: "Montserrat,serif", 
        color: '#d1d5db',
        fontSize: '14px',
        overflow: 'hidden',
        flex: 1, // Takes remaining space
        display: '-webkit-box',
        WebkitLineClamp: '4', // Show max 4 lines
        WebkitBoxOrient: 'vertical',
        lineHeight: '1.4',
        marginTop:'15px'}}>{note.content.substring(1,100)}...</p>

  
                
  
                  </div>))
}
             


            </div>

            </>
              ):(<p style={{fontFamily:"Montserrat,serif", color:'gray', textAlign:'center', marginTop:'35%'}}>Event data will be shown here</p>)}
            
            






          </div>
          <div className="box box-2">

            <p style={{fontFamily:"Montserrat,serif",textAlign:"center", fontWeight:'600'}}>Events</p>

            <div style={{marginTop:'20px'}}>
        {Events.map((event, index) => (
          <div
            key={index}
            style={{
              height: "45px",
              width: "300px",
              backgroundColor: "#f5f5f5",
              borderLeft: "4px solid blue",
              display: "flex",
              alignItems: "center",
              padding: "0 10px",
              marginBottom: "10px",
              borderRadius: "5px",
              fontFamily:"Montserrat,serif",
              textWrap:'nowrap',
              justifyContent:'space-between'

            }} 
          onClick={()=>handleClick(event.id)}
          >
            {event.title}


            <span
              className="priority1"
              style={{
                color:
                  event.priority === "High"
                    ? "red"
                    : event.priority === "Medium"
                      ? "blue"
                      : "green",
              }}
            >
              {event.priority}
            </span>

            <button
              className="deletebtn"

              onClick={() => handleDelete(event.id)}
              style={{alignContent:'end', marginLeft:'auto'}}

            >
              <MdOutlineDeleteForever />
            </button>
          </div>
        ))}
      </div>


         

          </div>
        
      {/* </div> */}
      
      </div>
    </div>
  );
}

export default Schedule;

