// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getUserDetails } from '../services/api';

// const UserDetails = () => {
//   const { id: userId } = useParams(); // Fetch user ID from URL
//   const [userDetails, setUserDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const data = await getUserDetails(userId);
//         setUserDetails(data);
//       } catch (err) {
//         setError(err.message || 'Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [userId]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

// ;

//   return (
//     <div>
//       <h1>User Details</h1>
//       <section>
//         <h2>Personal Information</h2>
//         <p><strong>Name:</strong> {userDetails.personalInfo.name}</p>
//         <p><strong>Email:</strong> {userDetails.personalInfo.email}</p>
//         <p><strong>Phone:</strong> {userDetails.personalInfo.phone}</p>
//         <p><strong>Address:</strong> {userDetails.personalInfo.address}</p>
//       </section>

//       <section>
//         <h2>Transactions</h2>
//         {userDetails.transactions.length > 0 ? (
//           <ul>
//             {userDetails.transactions.map((transaction, index) => (
//               <li key={index}>
//                 <p><strong>Book Title:</strong> {transaction.bookTitle}</p>
//                 <p><strong>Borrowed Date:</strong> {transaction.borrowedDate}</p>
//                 <p><strong>Returned Date:</strong> {transaction.returnedDate || 'Not Returned'}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No transactions found.</p>
//         )}
//       </section>

//       <section>
//         <h2>Fines</h2>
//         {userDetails.fines.length > 0 ? (
//           <ul>
//             {userDetails.fines.map((fine, index) => (
//               <li key={index}>
//                 <p><strong>Description:</strong> {fine.description}</p>
//                 <p><strong>Fine Amount:</strong> ${fine.fineAmount}</p>
//                 <p><strong>Status:</strong> {fine.paid ? 'Paid' : 'Unpaid'}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No fines found.</p>
//         )}
//         <p><strong>Total Fines:</strong> ${userDetails.totalFines}</p>
//         <p><strong>Unpaid Fines:</strong> ${userDetails.unpaidFines}</p>
//       </section>
//     </div>
//   );
// };

// export default UserDetails;
