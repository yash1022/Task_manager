import React from "react";
import "../CSS/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">       
      <div className="profile">
        <img
          src="https://via.placeholder.com/100" // Placeholder image URL
          alt="Profile"
          className="profile-img"
        />
        <h3 className="profile-name">John Doe</h3>
      </div>
      <hr className="separator" />
      <div className="sidebar-buttons">
        <button className="neu-button">Dashboard</button>
        <button className="neu-button">Notes</button>
        <button className="neu-button">Schedules</button>
        <button className="neu-button">Flashcards</button>
      </div>


      
    </div>
  );
};

export default Sidebar;
