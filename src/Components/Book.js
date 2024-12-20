import React, { useEffect, useState } from 'react';
import { getBooks, createBook, getAuthors, getCategories, updateBook, deleteBook } from '../services/api';

const Book = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', authorId: '', categoryId: '', year: '', stock: '' });
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchCategories();
  }, []);

  const fetchBooks = async () => {
    const response = await getBooks();
    setBooks(response.data);
  };

  const fetchAuthors = async () => {
    const response = await getAuthors();
    setAuthors(response.data);
  };

  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!newBook.title || !newBook.authorId || !newBook.categoryId || !newBook.year || !newBook.stock) {
      alert('Please fill in all fields');
      return;
    }
  
    try {
      if (editingBook) {
        // Update existing book
        await updateBook(editingBook.id, newBook);
      } else {
        // Create new book
        await createBook(newBook);
      }
      setNewBook({ title: '', authorId: '', categoryId: '', year: '', stock: '' });
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const handleEdit = (book) => {
    if (!book) {
      console.error('Book is null or undefined');
      return;
    }
  
    setEditingBook(book);
    setNewBook({
      title: book.title,
      authorId: book.author?.id || '',  // Ensure authorId is safely accessed
      categoryId: book.category?.id || '',  // Ensure categoryId is safely accessed
      year: book.year,
      stock: book.stock,
    });
  };
  
  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(bookId);
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Book Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <select
          value={newBook.authorId}
          onChange={(e) => setNewBook({ ...newBook, authorId: e.target.value })}
        >
          <option value="">Select Author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <select
          value={newBook.categoryId}
          onChange={(e) => setNewBook({ ...newBook, categoryId: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Year"
          type="number"
          value={newBook.year}
          onChange={(e) => setNewBook({ ...newBook, year: parseInt(e.target.value, 10) })}
        />
        <input
          placeholder="Stock"
          type="number"
          value={newBook.stock}
          onChange={(e) => setNewBook({ ...newBook, stock: parseInt(e.target.value, 10) })}
        />

        <button className="btn btn-primary" type="submit">
          {editingBook ? 'Update Book' : 'Add Book'}
        </button>
      </form>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Year</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author?.name}</td>
              <td>{book.category?.name}</td>
              <td>{book.year}</td>
              <td>{book.stock}</td>
              <td>
                <button onClick={() => handleEdit(book)} className="btn btn-warning btn-sm">
                  Edit
                </button>
                <button onClick={() => handleDelete(book.id)} className="btn btn-danger btn-sm ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Book;
