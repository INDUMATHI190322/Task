import { useForm } from "react-hook-form"
import { useState,useEffect } from "react"; 

import axios from 'axios'
import "./Informationtable.css"

function Informationtable(){
  const {register}=useForm();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
console.log(backendUrl);
  const [details, setdetails] = useState([]);
  const [formData, setFormData] = useState({
    id:'',
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
        setdetails(response.data);
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
  const handleSubmit = async(e) => {
    e.preventDefault();
  const data = {
    id:formData.id||null,
    Name: formData.Name,
    Password: formData.Password,
    Occupation: formData.Occupation,
    country: formData.country,
  };
  // const datavalue = {
  //   id:99,
  //   Name: 'indhu',
  //   Password: '123',
  //   Occupation: 'test',
  //   country: 'test',
  // }

 try {
  const response = await axios.post('http://localhost:3001/details/create',data);
  console.log("Post created:", response.data);

  
} catch (error) {
  console.error("Error creating post:", error);
}
  }

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
  const handleUpdate = async (id) => {
    console.log(`Updating user with ID: ${id} with data:`);

 try {
  const response = await axios.put(`http://localhost:3001/details/${id}/update`);
  console.log('Response from PUT /details:', response.data);
  
} catch (error) {
  console.error("Error updating user:", error);
}
    // const updatedData={...formData}
    // axios.put(`${backendUrl}/details/${id}`,updatedData)
    //   .then((response) => {
    //     console.log('Response from PUT /details:', response.data);
    //     setdetails(details.map(details => (details.id === id ? response.data : details)));
    //   })
    //   .catch((error) => {
    //     console.error('Error updating user:', error);
    //   });
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
               <span> NAME :   </span> <input type="text"name="Name"onChange={handleChange}className="inp"{...register("Name",{required:"name is required",minlength:{value:4,message:"minimum 4 char required"}})}/>
               <br/><br/>
                <span> ID :   </span> <input type="text"name="id"onChange={handleChange}className="inp"{...register("id",{required:"id is required",minlength:{value:4,message:"minimum 1 required"}})}/>
               <br/><br/>
               <span> PASSWORD : </span> <input type="text"name="Password"onChange={handleChange}className="inpu"{...register("Password",{required:"password is required",minlength:{value:4,message:"password required"}})}/>
                 <br/><br/>
               <span> OCCUPATION : </span> <input type="text"name="Occupation"onChange={handleChange}className="input"{...register("Occupation",{required:"occupation is required",minlength:{value:4,message:"minimum 6 char required"}})}/>
               <br/><br/>
               <span> COUNTRY : </span> <input type="text"name="country"onChange={handleChange}className="inputu"{...register("country",{required:"country is required",minlength:{value:4,message:"Enter the country name"}})}/>
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
                  <button onClick={() => handleUpdate(formData.id)}>Update</button>
                  {/* Delete Button */}
                  <button onClick={() => handleDelete(formData.id)}>Delete</button>
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























import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
 
  app.enableCors({
  origin: ['*'],         // Allow only requests from localhost:3000
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'], // Allowed headers
   exposedHeaders: ['X-Custom-Header'],
   maxAge: 3600, // Cache preflight requests for 1 hour
   preflightContinue: false, // Automatically handle preflight request
   });
   await app.listen(process.env.PORT ?? 3001);
//   var http = require('http');

// http.createServer(function (request, response) {
// response.writeHead(200, {
//     'Content-Type': 'text/plain',
//     'Access-Control-Allow-Origin' : '*',
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
// });

// }).listen(3001);
}
bootstrap();





// .inp{

//   width: 325px;
//   margin-left: 55px;
//   }
//   .inpu{
  
//       width: 325px;
//       margin-left: 29px;
//       }
//       .input{
  
//           width: 325px;
//           margin-left: 20px;
//           }
//           .inputu{
  
//               width: 325px;
//               margin-left: 40px;
//               }
//   .head{
//       font-style: italic;
//     text-shadow:0px 0px 5px blue;
//     font-size: 50px;
  
//   }
  
//   .body{
//       background-color: skyblue;
//   }
//   .table
//   {
//       border-style: solid;
//       table-layout: auto;
//   }
//   .infotable{
//           width:80%;
//           border-collapse: collapse;
//           margin-top: 10px;
//       }
      
//       .info-table th, .info-table td {
//           border: 1px solid #ccc;
//           padding: 10px;
//           text-align: left;
//       }
      
//       .info-table th {
//           background-color: #007BFF;
//           color: white;
//       }
      
//       .info-table tr:nth-child(even) {
//           background-color: #f2f2f2;
//       }
//       body{
//           background-color:lightblue;
//       }
//   .container{
//       background-color: #f2f2f2;
      
//   }
      
  