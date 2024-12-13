import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Informationtable.css"

function UpdateUserPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  // Get the passed user data from the previous page
  const [formData, setFormData] = useState(location.state ? location.state.userData : {
    id:'',
    Name: '',
    Password: '',
    Occupation: '',
    country: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.id||isNaN(formData.id)) {
      alert("User ID is missing. Cannot update.");
      return;
    }

    // Update the user via PUT request
    const userId = parseInt(formData.id);

    // Log ID to make sure it's correctly passed
    console.log("Updating user with ID:", userId);
    
    axios .put(`http://localhost:3001/details/${userId}/update`, formData)
      .then((response) => {
        alert("User updated successfully!");
        navigate('/Finaltable');  // Redirect back to the information table page
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("Failed to update user.");
      });
  };

  return (
    <div>
       <div class="container">
               
               <div class="row"> 
              <center><p className="head">UPDATE USER</p></center>
             
               <form onSubmit={handleSubmit} className="form">
                 
                 <div class="Label">
               <label className="col-lg-2"><span class="glyphicon glyphicon-italic span" ></span>ID:</label><input type="number"name="id"onChange={handleChange} value={formData.id}className="input"style={{width:"38%"}}disabled/>
               </div>
               <div className="Label">
                 <label className="col-lg-2"> <span className="glyphicon glyphicon-user"> </span>NAME:</label> <input type="text"name="Name"onChange={handleChange} value={formData.Name}className="inpu"style={{width:"38%"}} />
                 
                  </div>
                  <div className="Label">
                   
                  <label className="col-lg-2"><span class="glyphicon glyphicon-pencil spanpass"> </span>PASSWORD:</label> <input type="text"name="Password"onChange={handleChange} value={formData.Password}className="inp"style={{width:"38%"}} />
                  </div>
                    <div className="Label">
                  <label className="col-lg-2"><span class="glyphicon glyphicon-tasks spanoccupy"> </span> OCCUPATION:</label><input type="text"name="Occupation"onChange={handleChange} value={formData.Occupation}className="in"style={{width:"38%"}} />
                  </div>
                  <div className="Label">
                  <label className="col-lg-2"><span class="glyphicon glyphicon-globe spancountry"> </span>COUNTRY:</label> <input type="text"name="country"onChange={handleChange} value={formData.country}className="inco"style={{width:"38%"}}/>
                 </div><br></br>
                 <div class="Label">
                 <button type="submit">Update User</button>
                   </div>
               
               </form>
               
               <br />
               
            </div>
            </div>
    </div>
  );
}

export default UpdateUserPage;
