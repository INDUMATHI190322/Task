import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import "./Informationtable.css";

function Finaltable() {
  const [searchQuery, setSearchQuery] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("");
  const [details, setDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page
const [rowsPerPage] = useState(6); // Rows per page

useEffect(() => {
  setCurrentPage(1); // Reset to first page on data change
}, [details]);

  

  // Fetch user data from the backend
  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = () => {
    axios.get('http://localhost:3001/details')
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching details:', error);
      });
  };

  // Navigate to update page
  const handleEdit = (user) => {
    navigate(`/update-user/${user.id}`, { state: { userData: user } });
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

  const handleDelete = async (id) => {
    console.log(`Deleting user with ID: ${id}`);

 try {
  const response = await axios.delete(`http://localhost:3001/details/${id}`);
  console.log("Post created:", response.data);
} catch (error) {
  console.error("Error deleting user:", error);
}
  }

  const handleSort = (option) => {
    setSortOption(option);
    let sortedDetails = [...details];

    switch (option) {
      case "idAsc":
        sortedDetails.sort((a, b) => a.id - b.id);
        break;
      case "idDesc":
        sortedDetails.sort((a, b) => b.id - a.id);
        break;
      case "nameAsc":
        sortedDetails.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case "nameDesc":
        sortedDetails.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      default:
        break;
    }

    setDetails(sortedDetails);
  };
  const indexOfLastRecord = currentPage * rowsPerPage; // Index of last record on the page
const indexOfFirstRecord = indexOfLastRecord - rowsPerPage; // Index of first record on the page
const currentRecords = details.slice(indexOfFirstRecord, indexOfLastRecord); // Slice data for the current page
const totalPages = Math.ceil(details.length / rowsPerPage); // Total number of pages

const handlePageChange = (page) => {
  setCurrentPage(page); // Update the current page
};
const handlePrevious = () => {
  if (currentPage > 1) setCurrentPage(currentPage - 1);
};

const handleNext = () => {
  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
};



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
 {/* Sort Box */}
 <div className="Label">
          <label>Sort By: </label>
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="sort-dropdown"
          >
            <option value="">Select</option>
            <option value="idAsc">ID (Ascending)</option>
            <option value="idDesc">ID (Descending)</option>
            <option value="nameAsc">Name (A-Z)</option>
            <option value="nameDesc">Name (Z-A)</option>
          </select>
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
   {currentRecords.map((item) => (
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
<center>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
</center>

</div>
</div>
)
}
export default Finaltable;