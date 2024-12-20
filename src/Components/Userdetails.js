import React, { useState } from 'react';
import { getUserDetails } from '../services/api';

const UserDetails = () => {
  const [userId, setUserId] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const fetchUserDetails = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getUserDetails(userId);
      console.log('User Details Fetched:', data); // Log data to verify it contains transactions and fines
      setUserDetails(data);
    } catch (err) {
      setError('Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <h1>User Details</h1>

      {/* Input field to enter user ID */}
      <div>
        <label>Enter User ID:</label>
        <input 
          type="text" 
          value={userId} 
          onChange={handleUserIdChange} 
          placeholder="Enter user ID"
        />
        <button onClick={fetchUserDetails}>Fetch User</button>
      </div>

      {/* Show loading state */}
      {loading && <p>Loading...</p>}

      {/* Show error if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display user details */}
      {userDetails && (
        <div>
          <section>
            <h2>Personal Information</h2>
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Phone:</strong> {userDetails.phone}</p>
            <p><strong>Address:</strong> {userDetails.address}</p>
          </section>

          {/* Display Transactions */}
          <section>
            <h2>Transactions</h2>
            {userDetails.transactions && userDetails.transactions.length > 0 ? (
              <ul>
                {userDetails.transactions.map((transaction, index) => (
                  <li key={index}>
                    <p><strong>Book Title:</strong> {transaction.book.title}</p>
                    <p><strong>Borrowed Date:</strong> {transaction.borrowDate}</p>
                    <p><strong>Returned Date:</strong> {transaction.returnedDate || 'Not Returned'}</p>
                    <p><strong>Fine:</strong>{transaction.fine}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transactions found.</p>
            )}
          </section>

          {/* Display Fines
          <section>
            <h2>Fines</h2>
            {userDetails.transactions.fines && userDetails.fines.length > 0 ? (
              <ul>
                {userDetails.transactions.fines.map((fine, index) => (
                  <li key={index}>
                    <p><strong>Description:</strong> {fine.description}</p>
                    <p><strong>Fine Amount:</strong> ${fine.fineAmount}</p>
                    <p><strong>Status:</strong> {fine.paid ? 'Paid' : 'Unpaid'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No fines found.</p>
            )}
          </section> */}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
