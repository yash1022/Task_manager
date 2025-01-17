import React, { useContext } from "react";
import "../CSS/sidebar.css";
import { useNavigate } from "react-router-dom";
import { authContext } from "../App";

const Sidebar = () => {
  const navigate= useNavigate();
  const Auth= useContext(authContext)
  return (
    <div className="sidebar">       
      <div className="profile">
        <img
          src={Auth.User?.photoURL?(Auth.User.photoURL):("https://via.placeholder.com/100")} // Placeholder image URL
          alt="Profile"
          className="profile-img"
        />
        <h3 className="profile-name">{Auth.User?.displayName}</h3>
      </div>
      <hr className="separator" />
      <div className="sidebar-buttons">
        <button className="neu-button" onClick={()=>{navigate('/dashboard')}}>Dashboard</button>
        <button className="neu-button" onClick={()=>{navigate('/notes')}}>Notes</button>
        <button className="neu-button">Schedules</button>
        <button className="neu-button" onClick={()=>{navigate('/flashcard')}}>Flashcards</button>
      </div>


      
    </div>
  );
};

export default Sidebar;
