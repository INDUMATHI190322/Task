// import { useForm } from "react-hook-form"
// import { useState,useEffect } from "react"; 

// import axios from 'axios'
// import "./Informationtable.css"

// function Informationtable(){
//   const {register}=useForm();
//   const backendUrl = process.env.REACT_APP_BACKEND_URL;
// console.log(backendUrl);
//   const [details, setDetails] = useState([]);
//   const [formData, setFormData] = useState({
  
//     Name: '',
//     Password: '',
//     Occupation: '',
//     country: '',
//   });
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch all details
//   useEffect(() => {
//     fetchDetails();
//   }, []);

  

//   // GET request to fetch users
//   const fetchDetails=() => {
//     console.log('Fetching users...');
//     axios.get(`${backendUrl}/details`)
//       .then((response) => {
//         console.log('Response from GET /details:', response.data);
//         setDetails(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching details:', error);
//       });
//   }

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     console.log(`Input changed: ${e.target.name} = ${e.target.value}`);
//   };
//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/details/search?q=${searchQuery}`);
//       console.log("Search results:", response.data);
//       setDetails(response.data);
//     } catch (error) {
//       console.error("Error searching details:", error);
//     }
//   };

//   // POST request to add a new user
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);

//     axios
//       .post("http://localhost:3001/details/create", formData)
//       .then((response) => {
//         console.log("Form submitted successfully:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error submitting form:", error);
//       });
//     ResetFun();
//   };
// const ResetFun = () => {
//   setFormData({
    
//     Name: '',
//     Password: '',
//     Occupation: '',
//     country: '',
//   });
// };
  

  

   

//   // PUT request to update user
//   const handleEdit = (user) => {
//     console.log("Editing user:", user);
//     setFormData({
//       id: user.id,        // Ensure the ID is set here
//       Name: user.Name,
//       Password: user.Password,
//       Occupation: user.Occupation,
//       country: user.country,
//     });
//   };
  
// const handleUpdate = () => {
//    // Prevent form from submitting normally
  
//   if (!formData.id) {
//     console.error("User ID is missing. Cannot update.");
//     return; // Exit if no user ID
//   }



//   axios
//     .put(`http://localhost:3001/details/${formData.id}/update`, formData)
//     .then((response) => {
//       console.log("Form updated successfully:", response.data);
//       // You can update the state to reflect the changes in the table, if needed.
//       setDetails(details.map((item) => item.id === formData.id ? response.data : item));
//     })
//     .catch((error) => {
//       console.error("Error submitting form:", error);
//     });
// };


//   // DELETE request to remove user
//   const handleDelete = async (id) => {
//     console.log(`Deleting user with ID: ${id}`);

//  try {
//   const response = await axios.delete(`http://localhost:3001/details/${id}`);
//   console.log("Post created:", response.data);
// } catch (error) {
//   console.error("Error deleting user:", error);
// }
    
//     }
  

//       return(

//         <div>
//           <div class="container">
               
//             <div class="row"> 
//            <center><p className="head">INFORMATION ENTRY FORM</p></center>
          
//             <form onSubmit={handleSubmit} className="form">
              
//               <div class="Label">
//             <label className="col-lg-2"><span class="glyphicon glyphicon-italic span" ></span>ID:</label><input type="text"name="id"onChange={handleChange} value={formData.id}className="input"style={{width:"38%"}} disabled/>
//             </div>
//             <div className="Label">
//               <label className="col-lg-2"> <span className="glyphicon glyphicon-user"> </span>NAME:</label> <input type="text"name="Name"onChange={handleChange} value={formData.Name}className="inpu"style={{width:"38%"}} />
              
//                </div>
//                <div className="Label">
                
//                <label className="col-lg-2"><span class="glyphicon glyphicon-pencil spanpass"> </span>PASSWORD:</label> <input type="text"name="Password"onChange={handleChange} value={formData.Password}className="inp"style={{width:"38%"}} />
//                </div>
//                  <div className="Label">
//                <label className="col-lg-2"><span class="glyphicon glyphicon-tasks spanoccupy"> </span> OCCUPATION:</label><input type="text"name="Occupation"onChange={handleChange} value={formData.Occupation}className="in"style={{width:"38%"}} />
//                </div>
//                <div className="Label">
//                <label className="col-lg-2"><span class="glyphicon glyphicon-globe spancountry"> </span>COUNTRY:</label> <input type="text"name="country"onChange={handleChange} value={formData.country}className="inco"style={{width:"38%"}}/>
//               </div><br></br>
//               <div class="Label">
//                 <input type="submit"style={{background:"#a1eaFb"}}/>
//                 </div>
            
//             </form>
            
//             <br />
            
//          </div>
//          </div>
         
         
//         <div class="container">
//          <div className="row">
//          <center><p className="head">INFORMATION TABLE</p></center>

// <div class="Label">
//    <span class="glyphicon glyphicon-search"></span>&nbsp;&nbsp;<input
//  type="text"
//  placeholder="Search"
//  value={searchQuery}
//  onChange={(e) => setSearchQuery(e.target.value)}
// />
// </div>
// <div className="Label">
// <button onClick={handleSearch}>Search</button>
// </div>
//           <div className="col-lg-12">
//         <table border=  "groove 10px" className="infotable">
//           <thead>
//             <tr>
//             <th className="headid">ID</th>
//               <th className="headid">Name</th>
//               <th className="headid">PASSWORD</th>
//               <th className="headid">OCCUPATION</th>
//               <th className="headid">COUNTRY</th>
//               <th className="headid">ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {details.map((item) => (
//               <tr key={item.id}>
//               <td>{item.id}</td>
//                 <td>{item.Name}</td>
//               <td>{item.Password}</td>
//                 <td>{item.Occupation}</td>
//                 <td>{item.country}</td>
//                 <td>
//                   {/* Edit Button */}
//                   <button onClick={() => handleEdit(item)}>Update</button>
//                   {/* Delete Button */}
//                   <button onClick={() => handleDelete(item.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         </div>
//         </div>
//         </div>
      
    
      
      
    
  

            
          
          
//         </div>
        
    
//     )
//   }
  



//   import { useForm } from "react-hook-form"
// import { useState,useEffect } from "react"; 

// import axios from 'axios'
// import "./Informationtable.css"

// function Finaltable({updatedUser}){
//   const {register}=useForm();
//   const backendUrl = process.env.REACT_APP_BACKEND_URL;
// console.log(backendUrl);
//   const [details, setDetails] = useState([]);
//   const [formData, setFormData] = useState({
  
//     Name: '',
//     Password: '',
//     Occupation: '',
//     country: '',
//   });
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch all details
//   useEffect(() => {
//     fetchDetails();
//   }, []);

  

//   // GET request to fetch users
//   const fetchDetails=() => {
//     console.log('Fetching users...');
//     axios.get(`${backendUrl}/details`)
//       .then((response) => {
//         console.log('Response from GET /details:', response.data);
//         setDetails(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching details:', error);
//       });
//   }

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     console.log(`Input changed: ${e.target.name} = ${e.target.value}`);
//   };
//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/details/search?q=${searchQuery}`);
//       console.log("Search results:", response.data);
//       setDetails(response.data);
//     } catch (error) {
//       console.error("Error searching details:", error);
//     }
//   };

//   // POST request to add a new user
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);

//     axios
//       .post("http://localhost:3001/details/create", formData)
//       .then((response) => {
//         console.log("Form submitted successfully:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error submitting form:", error);
//       });
//     ResetFun();
//   };
// const ResetFun = () => {
//   setFormData({
    
//     Name: '',
//     Password: '',
//     Occupation: '',
//     country: '',
//   });
// };
  

  

   

//   // PUT request to update user
//   const handleEdit = (user) => {
//     console.log("Editing user:", user);
//     setFormData({
//       id: user.id,        // Ensure the ID is set here
//       Name: user.Name,
//       Password: user.Password,
//       Occupation: user.Occupation,
//       country: user.country,
//     });
//   };
  
// const handleUpdate = () => {
//    // Prevent form from submitting normally
  
//   if (!formData.id) {
//     console.error("User ID is missing. Cannot update.");
//     return; // Exit if no user ID
//   }



//   axios
//     .put(`http://localhost:3001/details/${formData.id}/update`, formData)
//     .then((response) => {
//       console.log("Form updated successfully:", response.data);
//       // You can update the state to reflect the changes in the table, if needed.
//       setDetails(details.map((item) => item.id === formData.id ? response.data : item));
//     })
//     .catch((error) => {
//       console.error("Error submitting form:", error);
//     });
// };
// const handleModify = async (e) => {
//   e.preventDefault();

//   if (!formData.id) {
//     alert("No user selected for update.");
//     return; // Exit if no user ID
//   }

//   try {
//     // Await updateUser and store the response in updatedUser
//     const updatedUserResponse = await updatedUser(formData);

//     // Update the local state with the updated user details
//     setDetails((details) =>
//       details.map((item) => (item.id === updatedUserResponse.id ? updatedUserResponse : item))
//     );

//     // Reset the form after successful update
//     setFormData({ Name: "", Password: "", Occupation: "", country: "" });
//     alert("User updated successfully!");
//   } catch (error) {
//     console.error("Error updating user:", error);
//     alert("Failed to update user.");
//   }
// }
//   // const updateUser = async (formData) => {
//   //   try {
//   //     const response = await axios.put(`http://localhost:3001/details/${formData.id}/update`, formData);
//   //     return response.data; // Return the updated user data
//   //   } catch (error) {
//   //     console.error("Error updating user:", error);
//   //     throw error; // Re-throw the error for further handling
//   //   }
//   // }

// <Finaltable updatedUser={updatedUser} />

//   // Pass updateUser as a prop to Finaltable
  



//   // DELETE request to remove user
//   const handleDelete = async (id) => {
//     console.log(`Deleting user with ID: ${id}`);

//  try {
//   const response = await axios.delete(`http://localhost:3001/details/${id}`);
//   console.log("Post created:", response.data);
// } catch (error) {
//   console.error("Error deleting user:", error);
// }
    
//     }
// return(
// <div class="container">
// <div className="row">
// <center><p className="head">INFORMATION TABLE</p></center>

// <div class="Label">
// <span class="glyphicon glyphicon-search"></span>&nbsp;&nbsp;<input
// type="text"
// placeholder="Search"
// value={searchQuery}
// onChange={(e) => setSearchQuery(e.target.value)}
// />
// </div>
// <div className="Label">
// <button onClick={handleSearch}>Search</button>
// </div>
//  <div className="col-lg-12">
// <table border=  "groove 10px" className="infotable">
//  <thead>
//    <tr>
//    <th className="headid">ID</th>
//      <th className="headid">Name</th>
//      <th className="headid">PASSWORD</th>
//      <th className="headid">OCCUPATION</th>
//      <th className="headid">COUNTRY</th>
//      <th className="headid">ACTIONS</th>
//    </tr>
//  </thead>
//  <tbody>
//    {details.map((item) => (
//      <tr key={item.id}>
//      <td>{item.id}</td>
//        <td>{item.Name}</td>
//      <td>{item.Password}</td>
//        <td>{item.Occupation}</td>
//        <td>{item.country}</td>
//        <td>
//          {/* Edit Button */}
//          <button onClick={() => handleEdit(item)}>Update</button>
//          {/* Delete Button */}
//          <button onClick={() => handleDelete(item.id)}>Delete</button>
//        </td>
//      </tr>
//    ))}
//  </tbody>
// </table>
// </div>
// </div>

//       {/* Update Form */}
//       {formData.id && (
//         <form onSubmit={handleUpdate}>
//           <input name="Name" value={formData.Name} onChange={handleChange} placeholder="Name" />
//           <input name="Password" value={formData.Password} onChange={handleChange} placeholder="Password" />
//           <input name="Occupation" value={formData.Occupation} onChange={handleChange} placeholder="Occupation" />
//           <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
//           <button type="submit">Update User</button>
//         </form>
//       )}
// </div>
// )
// }
// export default Finaltable;




// export default Informationtable;


import { useForm } from "react-hook-form"
import { useState,useEffect } from "react"; 

import axios from 'axios'
import "./Informationtable.css"

function Finaltable(){
  const {register}=useForm();
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
<div class="container">
<div className="row">
<center><p className="head">INFORMATION TABLE</p></center>

<div class="Label">
<span class="glyphicon glyphicon-search"></span>&nbsp;&nbsp;<input
type="text"
placeholder="Search"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
</div>
<div className="Label">
<button onClick={handleSearch}>Search</button>
</div>
 <div className="col-lg-12">
<table border=  "groove 10px" className="infotable">
 <thead>
   <tr>
   <th className="headid">ID</th>
     <th className="headid">Name</th>
     <th className="headid">PASSWORD</th>
     <th className="headid">OCCUPATION</th>
     <th className="headid">COUNTRY</th>
     <th className="headid">ACTIONS</th>
   </tr>
 </thead>
 <tbody>
   {details.map((item) => (
     <tr key={item.id}>
     <td>{item.id}</td>
       <td>{item.Name}</td>
     <td>{item.Password}</td>
       <td>{item.Occupation}</td>
       <td>{item.country}</td>
       <td>
         {/* Edit Button */}
         <button onClick={() => handleEdit(item)}>Update</button>
         {/* Delete Button */}
         <button onClick={() => handleDelete(item.id)}>Delete</button>
       </td>
     </tr>
   ))}
 </tbody>
</table>
</div>
</div>
</div>
)
}



















import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Informationtable.css";

function Finaltable() {
  const [details, setDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("id_asc"); // Default sort option
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = () => {
    axios
      .get("http://localhost:3001/details")
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching details:", error);
      });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${backendUrl}/details/search?q=${searchQuery}`);
      setDetails(response.data);
    } catch (error) {
      console.error("Error searching details:", error);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    sortDetails(e.target.value);
  };

  const sortDetails = (option) => {
    let sortedDetails = [...details];
    switch (option) {
      case "id_asc":
        sortedDetails.sort((a, b) => a.id - b.id);
        break;
      case "id_desc":
        sortedDetails.sort((a, b) => b.id - a.id);
        break;
      case "name_asc":
        sortedDetails.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case "name_desc":
        sortedDetails.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      default:
        break;
    }
    setDetails(sortedDetails);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/details/${id}`);
      setDetails(details.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <center>
          <p className="head">INFORMATION TABLE</p>
        </center>

        {/* Search Box */}
        <div className="Label">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Sorting Dropdown */}
        <div className="Label">
          <select value={sortOption} onChange={handleSortChange}>
            <option value="id_asc">Sort by ID (Ascending)</option>
            <option value="id_desc">Sort by ID (Descending)</option>
            <option value="name_asc">Sort by Name (A-Z)</option>
            <option value="name_desc">Sort by Name (Z-A)</option>
          </select>
        </div>

        {/* Table */}
        <div className="col-lg-12">
          <table border="groove 10px" className="infotable">
            <thead>
              <tr>
                <th className="headid">ID</th>
                <th className="headid">Name</th>
                <th className="headid">Password</th>
                <th className="headid">Occupation</th>
                <th className="headid">Country</th>
                <th className="headid">Actions</th>
              </tr>
            </thead>
            <tbody>
              {details.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.Name}</td>
                  <td>{item.Password}</td>
                  <td>{item.Occupation}</td>
                  <td>{item.country}</td>
                  <td>
                    <button onClick={() => navigate(`/update-user/${item.id}`, { state: { userData: item } })}>
                      Update
                    </button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export default Finaltable;




















