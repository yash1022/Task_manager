import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import "../CSS/dash.css"  
import Content from './Content'
import Navbar from './Navbar'
export default function Dashboard() {

 
  return (
    <>
    <Navbar></Navbar>
   <div className='side'>
   <Sidebar></Sidebar>

   </div>

   <div className='data'>

    <Content></Content>






   </div>
    

         
    
    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}