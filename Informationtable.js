import { useForm } from "react-hook-form"
import { useState,useEffect } from "react"; 

import axios from 'axios'
import "./Informationtable.css"

function Informationtable(){
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

  // GET request to fetch users
  useEffect(() => {
    console.log('Fetching users...');
    axios.get(`${backendUrl}/details`)
      .then((response) => {
        console.log('Response from GET /details:', response.data);
        setDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching details:', error);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(`Input changed: ${e.target.name} = ${e.target.value}`);
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
  

  //   console.log('Form submitted with data:', formData);
  //   axios({
  //     // Endpoint to send files
  //     url: `${backendUrl}/details/create`,
  //     method: "POST",
  //     headers: {
  //         // Add any auth token here
  //         authorization: "your token comes here",
  //     },

  //     // Attaching the form data
  //     data: formData,
  // })
  //     // Handle the response from backend here
  //     .then((res) => {
  //       console.log("Post created:", res.data);
  //     })

  //     // Catch errors if any
  //     .catch((err) => {
  //       console.error("Error creating post:", err);
  //     }
  //   );

   

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

//const fun = () => {
//   setdetails({
//     Name: '',
//     Password: '',
//     Occupation: '',
//     country: '',
//   });
// };
  // DELETE request to remove user
  const handleDelete = async (id) => {
    console.log(`Deleting user with ID: ${id}`);

 try {
  const response = await axios.delete(`http://localhost:3001/details/${id}`);
  console.log("Post created:", response.data);
} catch (error) {
  console.error("Error deleting user:", error);
}
    // axios.delete(`${backendUrl}/details/${id}`)
    //   .then(() => {
    //     console.log(`User with ID: ${id} deleted successfully`);
    //     setdetails(details.filter(details => details.id !== id));
    //   })
    //   .catch((error) => {
    //     console.error('Error deleting user:', error);
    //   });
    }
  

      return(

        <div>
           <center><p className="head">INFORMATION TABLE</p>
            <form onSubmit={handleSubmit}>
            <span> ID :   </span> <input type="text"name="id"onChange={handleChange} value={formData.id}className="inp"disabled/>
            <br/><br/>
               <span> NAME :   </span> <input type="text"name="Name"onChange={handleChange} value={formData.Name}className="inp"/>
               <br/><br/>
                
               <span> PASSWORD : </span> <input type="text"name="Password"onChange={handleChange} value={formData.Password}className="inpu"/>
                 <br/><br/>
               <span> OCCUPATION : </span> <input type="text"name="Occupation"onChange={handleChange} value={formData.Occupation}className="input"/>
               <br/><br/>
               <span> COUNTRY : </span> <input type="text"name="country"onChange={handleChange} value={formData.country}className="inputu"/>
              <br/><br/>
                <input type="submit"style={{background:"#a1eaFb"}}/>
            
            </form>
            <br />
        <table>
          <thead>
            <tr>
            <th>ID</th>
              <th>Name</th>
              <th>PASSWORD</th>
              <th>OCCUPATION</th>
              <th>COUNTRY</th>
              <th>ACTIONS</th>
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
      </center>
    
  

            
          
          
        </div>
    
    )
  }
  




export default Informationtable;























