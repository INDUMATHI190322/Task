import axios from 'axios';

const API_URL = 'http://localhost:3002';

export const getUsers = () => axios.get(`${API_URL}/users`);
export const createUser = (data) => axios.post(`${API_URL}/users`, data);


export const getAuthors = () => axios.get(`${API_URL}/authors`);
export const createAuthor = (data) => axios.post(`${API_URL}/authors`, data);

export const getBooks = () => axios.get(`${API_URL}/books`);
export const createBook = (data) => axios.post(`${API_URL}/books`, data);

export const getTransactions = () => axios.get(`${API_URL}/transactions`);
export const createTransaction = (data) => axios.post(`${API_URL}/transactions`, data);

export const getCategories = () => axios.get(`${API_URL}/categories`);
export const createCategory = (data) => axios.post(`${API_URL}/categories`, data);

export const getLibrarians = () => axios.get(`${API_URL}/librarians`);
export const createLibrarian = (data) => axios.post(`${API_URL}/librarians`, data);
