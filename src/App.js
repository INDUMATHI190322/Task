import Sidebar from "./Components/Sidebar"

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Informationtable from "./Components/Informationtable";
import Finaltable from "./Components/Finaltable";
import UpdateUserPage from "./Components/UpdateduserPage"
function App() {
  return (
    
   
      <div className="app">
      <Sidebar></Sidebar>
    
      <div className="content">
        <Routes>
          <Route path="/Informationtable" element={<Informationtable/>} />
          <Route path="/Finaltable" element={<Finaltable/>} />
          <Route path="/update-user/:id" element={<UpdateUserPage />} />
        
        </Routes>
      </div>
    </div>
  );
      
       
    
}

export default App;
