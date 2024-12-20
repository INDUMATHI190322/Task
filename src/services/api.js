import axios from 'axios';

const API_URL = 'http://localhost:3002';



export const getUsers = () => axios.get(`${API_URL}/users`);
export const createUser = (data) => axios.post(`${API_URL}/users`, data);
export const updateUser = async (id, user) => {
  return await axios.put(`${API_URL}/users/${id}`, user);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${API_URL}/users/${id}`);
};


  



export const getAuthors = () => axios.get(`${API_URL}/authors`);
export const createAuthor = (data) => axios.post(`${API_URL}/authors`, data);


export const getBooks = async () => {
  return await axios.get(`${API_URL}/books`);
};

export const createBook = async (bookData) => {
  return await axios.post(`${API_URL}/books`, bookData);
};

export const updateBook = async (id, bookData) => {
  return await axios.put(`${API_URL}/books/${id}`, bookData);
};

export const deleteBook = async (id) => {
  return await axios.delete(`${API_URL}/books/${id}`);
};
// export const getBooks = () => axios.get(`${API_URL}/books`);
// export const createBook = (data) => axios.post(`${API_URL}/books`, data);
export const getTransactions = async () => {
  try {
    const response = await axios.get(`${API_URL}/transactions`);
    return response;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// Create a new transaction
export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${API_URL}/transactions`, transactionData);
    return response;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

// Update an existing transaction
export const updateTransaction = async (id, transactionData) => {
  try {
    const response = await axios.put(`${API_URL}/transactions/${id}`, transactionData);
    return response;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

// Delete a transaction
export const deleteTransaction = async (transactionId) => {
  try {
    const response = await axios.delete(`${API_URL}/transactions/${transactionId}`);
    return response;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
};

// export const getTransactions = () => axios.get(`${API_URL}/transactions`);
// export const createTransaction = (data) => axios.post(`${API_URL}/transactions`, data);

export const getCategories = () => axios.get(`${API_URL}/categories`);
export const createCategory = (data) => axios.post(`${API_URL}/categories`, data);
export const getLibrarians = async () => {
  try {
    const response = await API_URL.get('/librarians');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new librarian
export const createLibrarian = async (librarian) => {
  try {
    const response = await API_URL.post('/librarians', librarian);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing librarian
export const updateLibrarian = async (id, librarian) => {
  try {
    const response = await API_URL.put(`/librarians/${id}`, librarian);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a librarian
export const deleteLibrarian = async (id) => {
  try {
    const response = await API_URL.delete(`/librarians/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// src/services/api.js
export const getUserDetails = async (userId) => {
  const response = await fetch(`http://localhost:3002/users/${userId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }

  const data = await response.json();
  console.log('Fetched User Data:', data);  // Log the full response to check

  return data;
};



// export const getLibrarians = () => axios.get(`${API_URL}/librarians`);
// export const createLibrarian = (data) => axios.post(`${API_URL}/librarians`, data);
// export const getLibrarians = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/librarians`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching librarians:', error);
//     throw error;
//   }
// };

// // Function to create a new librarian
// export const createLibrarian = async (librarianData) => {
//   try {
//     const response = await axios.post(`${API_URL}/librarians`, librarianData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating librarian:', error);
//     throw error;
//   }
// };

// // Function to update an existing librarian
// export const updateLibrarian = async (id, librarianData) => {
//   try {
//     const response = await axios.put(`${API_URL}/librarians/${id}`, librarianData);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating librarian:', error);
//     throw error;
//   }
// };

// // Function to delete a librarian
// export const deleteLibrarian = async (id) => {
//   try {
//     await axios.delete(`${API_URL}/librarians/${id}`);
//   } catch (error) {
//     console.error('Error deleting librarian:', error);
//     throw error;
//   }
// };