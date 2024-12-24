import React,{use, useEffect,useState} from "react";
import '../CSS/date.css';

function DateTime() {
    const [dateTime,setDateTime]=useState("");
   useEffect(()=>{
    const interval= setInterval(()=>{
        const now = new Date();
        const formattedDate = now.toLocaleDateString(); // Corrected method name
        const formattedTime = now.toLocaleTimeString(); // Add time display
        setDateTime(`${formattedDate}-${formattedTime}`); 
    },1000);
    return ()=>clearInterval()
   },[])
  


    return (
        <h2 className="date-time">
            {dateTime}
        </h2>
    );
}

export default DateTime;
