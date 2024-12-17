import React from "react";
import "../CSS/Navbar.css";
import  { useContext, useState } from 'react';
import {auth,provider} from "../config/firebaseconfig"
import {signInWithPopup, signOut} from 'firebase/auth';
import{authContext} from '../App'




const Navbar = () => {

  const Auth= useContext(authContext);
    

   const signInWithGoogle= async(e)=>{
        e.preventDefault();
        signInWithPopup(auth,provider).then(async(result)=>{
          if(result)
            {
                console.log("User has signed in",result.user);
                alert(`welcome ${result.user.displayName}`);
                Auth.setValue(true)
                Auth.setToken(result.user.accessToken);
                Auth.setUser(result.user.email);
                
            }


            const userdata={  
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            }
      
      
            try
            {
              const response =await fetch('http://localhost:5000/api/auth',{
      
                method:'POST',
                headers:{
                  'Content-Type':'application/json'
                },
      
                body: JSON.stringify(userdata)
              })
      
      
      
              if(response)
                {
                    console.log("USER DATA SENT TO BACKEND")
                    console.log(response)
                }
            }catch(e)
            {
              console.error("Error sending user data to backend",e)
            }







        })


        
  

    }

    const handlelogout=(e)=>{
        e.preventDefault();
    
        signOut(auth).then(()=>{
          console.log("User has signed out");
          Auth.setValue(false);
          Auth.setToken(null);
          Auth.setUser(null);
      })
    
      }
    
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>MindMapper</h1>
      </div>
      <div className="navbar-buttons">
        <button className="nav-btn">Home</button>
        <button className="nav-btn">About</button>
        {Auth.value?(<button className="nav-btn" onClick={handlelogout}>Logout</button>):(<button className="nav-btn" onClick={signInWithGoogle}>Login</button>)}
        
      </div>
    </nav>
  );
};

export default Navbar;
