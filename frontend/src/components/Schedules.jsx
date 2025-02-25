import React, { useState, createContext, useContext } from "react";
import Todo from "./todo";
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import '../CSS/Schedules.css';
import { Taskpopup } from "../components/Popup";
import { authContext } from "../App";



function Schedule() {
 

  // Providing the context here to cover Todo and Taskpopup components
  return (
    <div>
      <Navbar />
      <div className="main-box">
        <div className='side-bar'>
          <Sidebar />
        </div>


        {/* <div className="box-container"> */}
          <div className="box box-1">
            <p style={{fontFamily:"Montserrat,serif", fontSize:"45px",fontWeight:'600', marginBottom:'20px'}}>Practicles</p>
            <p style={{fontFamily:"Montserrat,serif" ,fontSize:'20px', fontWeight:'500'}}>From: <span style={{fontFamily:"Montserrat,serif" ,fontSize:'20px',color:'gray'}}>25,Feb</span></p>
            <p style={{fontFamily:"Montserrat,serif", fontSize:'20px', fontWeight:'500'}}>To: <span style={{fontFamily:"Montserrat,serif" ,fontSize:'20px', color:'gray'}}>3,Mar</span></p>

            <p style={{fontFamily:"Montserrat,serif", fontSize:'20px', fontWeight:'500',marginTop:'20px'}}>Description: <span style={{fontFamily:"Montserrat,serif", fontSize:'20px', fontWeight:'400', color:'gray'}}>These are first practicals of 4th semester</span></p>

            <p style={{fontFamily:"Montserrat,serif",fontWeight:'500', marginTop:'25px', color:'gray'}}>Notes</p>
            <hr></hr>

            <div style={{width:'auto', height:'180px',backgroundColor:"black" }}>
              <div style={{height:'175px', width:'200px', backgroundColor:"#4b5563", marginTop:'10px', padding:'10px', borderRadius:"10px"}}>
                <p style={{fontFamily:"Montserrat,serif", color:'#d1d5db'}}>Machine learning</p>

              </div>


            </div>
            






          </div>
          <div className="box box-2">
         

          </div>
        
      {/* </div> */}
      
      </div>
    </div>
  );
}

export default Schedule;

