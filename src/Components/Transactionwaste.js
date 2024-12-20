// import React, { useEffect, useState } from 'react';
// import { getTransactions, createTransaction, getUsers,getBooks } from '../services/api';
// import Book from './Book';

// const Transaction = () => {
//   const [books, setBooks] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [newTransaction, setNewTransaction] = useState({
//     bookId: '',
//     userId: '',
//     borrowDate: '',
//     returnDate: '',
//   });

//   useEffect(() => {
//     fetchTransactions();
//     fetchUsers();
//     fetchBooks();
//   }, []);

//   const fetchTransactions = async () => {
//     const response = await getTransactions();
//     setTransactions(response.data);
//   };
//   const fetchBooks = async () => {
//     try {
//       const response = await getBooks();
//       console.log(response.data);  // Log the response data to ensure books are returned
//       setBooks(response.data);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   };
  

//   const fetchUsers = async () => {
//     const response = await getUsers();
//     setUsers(response.data);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(newTransaction);  // Log the data being sent to the backend
//     try {
//       await createTransaction(newTransaction);
//       fetchTransactions();
//     } catch (error) {
//       console.error("Error while creating transaction:", error);
//     }
//   };
  
  

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   await createTransaction(newTransaction);
//   //   fetchTransactions();
//   // };

//   return (
//     <div className="container mt-4">
//       <h2>Transaction Management</h2>
//       <form onSubmit={handleSubmit}>
//       <select
//   onChange={(e) => setNewTransaction({ ...newTransaction, bookId: e.target.value })}
// >
//   <option value="">Select Book</option>
//   {books.map((book) => (
//     <option key={book.id} value={book.id}>
//       {book.title}
//     </option>
//   ))}
// </select>
//         <select
//           onChange={(e) => setNewTransaction({ ...newTransaction, userId: e.target.value })}
//         >
//           <option value="">Select User</option>
//           {users.map((user) => (
//             <option key={user.id} value={user.id}>
//               {user.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="date"
//           onChange={(e) => setNewTransaction({ ...newTransaction, borrowDate: e.target.value })}
//         />
//         <input
//           type="date"
//           onChange={(e) => setNewTransaction({ ...newTransaction, returnDate: e.target.value })}
//         />
//         <button className="btn btn-primary" type="submit">Add Transaction</button>
//       </form>

//       <table className="table mt-4">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Book Title</th>
//             <th>User</th>
//             <th>Borrow Date</th>
//             <th>Return Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((transaction) => (
//             <tr key={transaction.id}>
//               <td>{transaction.id}</td>
//               <td>{transaction.book?.name}</td>
//               <td>{transaction.user?.name}</td>
//               <td>{transaction.borrowDate}</td>
//               <td>{transaction.returnDate}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Transaction;
