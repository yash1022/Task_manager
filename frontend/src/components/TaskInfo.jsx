import React, { useContext } from 'react'
import { FaTag, FaCalendarAlt, FaTimes  } from 'react-icons/fa';
import '../CSS/ReadTask.css'

import {Readcontext} from './Content'

export default function TaskInfo() {

  const Popup=useContext(Readcontext)
  


  return (
    <div>

          <div className='popupbox' style={{height:"265px", width:"370px", padding:'20px'}}>

          <button style={{ position: 'absolute', top: '10px', left: '-17px', background: 'none', border: 'none', cursor: 'pointer' }} onClick={()=> Popup.SetReadPopup(false)}>
          <FaTimes color='#888' size={18} />
        </button>


                {/* Task Name */}
        <div style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '18px', marginBottom: '10px', fontFamily:"Montserrat,serif",marginTop:'40px' }}>
        Walk
        </div>
        <hr style={{ border: '0.5px solid #ccc', marginBottom: '10px' }} />
        
        {/* Category Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaTag color='#888' />
            <span style={{ fontWeight: 'bold', fontFamily:"Montserrat,serif" }}>Category</span>
          </div>
          <span style={{ fontFamily:"Montserrat,serif"}}>Work</span>
        </div>
        <hr style={{ border: '0.5px solid #ccc', marginBottom: '10px' }} />
        
        {/* Due Date Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaCalendarAlt color='#888' />
            <span style={{ fontWeight: 'bold', fontFamily:"Montserrat,serif" }}>Due date</span>
          </div>
          <span style={{ fontFamily:"Montserrat,serif"}}>March 10, 2025</span>
        </div>















          </div>
      
    </div>
  )
}
