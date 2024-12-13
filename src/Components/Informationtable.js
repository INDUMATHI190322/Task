import { useForm } from "react-hook-form"
import { useState,useEffect } from "react"; 
import { useLocation, useNavigate } from "react-router-dom";

import axios from 'axios'
import "./Informationtable.css"

function Informationtable(){
  const {register}=useForm();
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log(backendUrl);
  const [details, setDetails] = useState([]);
  const [formData, setFormData] = useState({
  
    Name: '',
    Password: '',
    Occupation: '',
    country: '',
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all details
  useEffect(() => {
    fetchDetails();
  }, []);

  

  // GET request to fetch users
  const fetchDetails=() => {
    console.log('Fetching users...');
    axios.get(`${backendUrl}/details`)
      .then((response) => {
        console.log('Response from GET /details:', response.data);
        setDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching details:', error);
      });
  }

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(`Input changed: ${e.target.name} = ${e.target.value}`);
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${backendUrl}/details/search?q=${searchQuery}`);
      console.log("Search results:", response.data);
      setDetails(response.data);
    } catch (error) {
      console.error("Error searching details:", error);
    }
  };

  // POST request to add a new user
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios
      .post("http://localhost:3001/details/create", formData)
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        alert("Details added succesfully");
        navigate('/Finaltable'); 
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
    ResetFun();
  };
const ResetFun = () => {
  setFormData({
    
    Name: '',
    Password: '',
    Occupation: '',
    country: '',
  });
};
  

  

   

  // PUT request to update user
  const handleEdit = (user) => {
    console.log("Editing user:", user);
    setFormData({
      id: user.id,        // Ensure the ID is set here
      Name: user.Name,
      Password: user.Password,
      Occupation: user.Occupation,
      country: user.country,
    });
  };
  
const handleUpdate = () => {
   // Prevent form from submitting normally
  
  if (!formData.id) {
    console.error("User ID is missing. Cannot update.");
    return; // Exit if no user ID
  }



  axios
    .put(`http://localhost:3001/details/${formData.id}/update`, formData)
    .then((response) => {
      console.log("Form updated successfully:", response.data);
      // You can update the state to reflect the changes in the table, if needed.
      setDetails(details.map((item) => item.id === formData.id ? response.data : item));
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
    });
};


  // DELETE request to remove user
  const handleDelete = async (id) => {
    console.log(`Deleting user with ID: ${id}`);

 try {
  const response = await axios.delete(`http://localhost:3001/details/${id}`);
  console.log("Post created:", response.data);
} catch (error) {
  console.error("Error deleting user:", error);
}
    
    }
  

      return(

        <div>
          <div class="container">
               
            <div class="row"> 
           <center><p className="head">INFORMATION ENTRY FORM</p></center>
          
            <form onSubmit={handleSubmit} className="form">
              
              <div class="Label">
            <label className="col-lg-2"><span class="glyphicon glyphicon-italic span" ></span>ID:</label><input type="text"name="id"onChange={handleChange} value={formData.id}className="input"style={{width:"38%"}}disabled/>
            </div>
            <div className="Label">
              <label className="col-lg-2"> <span className="glyphicon glyphicon-user"> </span>NAME:</label> <input type="text"name="Name"onChange={handleChange} value={formData.Name}className="inpu"style={{width:"38%"}}required />
              
               </div>
               <div className="Label">
                
               <label className="col-lg-2"><span class="glyphicon glyphicon-pencil spanpass"> </span>PASSWORD:</label> <input type="text"name="Password"onChange={handleChange} value={formData.Password}className="inp"style={{width:"38%"}} required/>
               </div>
                 <div className="Label">
               <label className="col-lg-2"><span class="glyphicon glyphicon-tasks spanoccupy"> </span> OCCUPATION:</label><input type="text"name="Occupation"onChange={handleChange} value={formData.Occupation}className="in"style={{width:"38%"}}required />
               </div>
               <div className="Label">
               <label className="col-lg-2"><span class="glyphicon glyphicon-globe spancountry"> </span>COUNTRY:</label> <input type="text"name="country"onChange={handleChange} value={formData.country}className="inco"style={{width:"38%"}}required/>
              </div><br></br>
              <div class="Label">
                <input type="submit"style={{background:"#a1eaFb"}}/>
                </div>
            
            </form>
            
            <br />
            
         </div>
         </div>
         
         
       
      
    
      
      
    
  

            
          
          
        </div>
        
    
    )
  }
  




export default Informationtable;























