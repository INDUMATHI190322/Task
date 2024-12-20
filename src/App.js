import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';




import Home from'./Components/Home';

import './App.css'; // Global styles
import Navbar from'./Components/Navbar';
import User from './Components/User';
import Author from './Components/Author';
import Book from './Components/Book';
import Category from './Components/Category';
import Transaction from './Components/Transaction';
import Librarian from './Components/Librarian';
import UserDetails from './Components/Userdetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    
      <div className="container-fluid">
        
      

      <Navbar></Navbar>

        <Routes>
        <Route path="/"  element={<Home/>}/>
          <Route path="/users" element={<User />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/authors" element={<Author />} />
          <Route path="/books" element={<Book />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/transactions" element={<Transaction />} />
        
        </Routes>
      </div>
  
  );
}

export default App;
