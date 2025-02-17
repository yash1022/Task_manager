import React from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

export default function ReadNotes() {
    const loc=useLocation();
    const {id,title,content,date}= loc.state;
  return (
    <div>

        <Navbar></Navbar>

        <div style={{display:'flex', justifyContent:'flex-start', width:'100vw', height:'100vh', gap:'30px'}}>

            
            
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100vw', height: '85vh', gap: '30px', marginTop: '75px' }}>
  <div style={{height:'100%', width:'290px',marginTop:'20px',marginLeft:'20px'}}>
    <Sidebar />
  </div>
  <div style={{ height: '580px', width: '1000px', backgroundColor: '#f8f9fa', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' , marginTop:'20px', borderRadius:'15px', padding:'20px'}}>

  <h1 style={{ color: '#000', fontSize: '37px', marginBottom: '10px', textAlign:'left',fontFamily:"Montserrat,serif" }}>{title}</h1>
    <p style={{ color: '#6c757d', fontSize: '14px', marginBottom: '10px',fontFamily:"Montserrat,serif" }}>Created on: {date}</p>
    <hr></hr>
    <p style={{ color: '#000', fontSize: '18px', lineHeight: '1.6', marginTop:'23px',fontFamily:"Montserrat,serif" }}>
      {content};
    </p>
    
  </div>
</div>

            









        </div>












      
    </div>
  )
}
