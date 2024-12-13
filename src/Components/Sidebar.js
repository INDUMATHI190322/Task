import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Add your styles

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>My App</h2>
      <ul>
        <li>
          <Link to="/Informationtable">ENTRY FORM</Link>
        </li>
        <li>
          <Link to="/Finaltable">INFORMATION TABLE</Link>
        </li>
        
      </ul>
    </div>
  );
}

export default Sidebar;
