import React, { useEffect, useState } from 'react';
import { getAuthors, createAuthor } from '../services/api';

const Author = () => {
  const [authors, setAuthors] = useState([]);
  const [newAuthor, setNewAuthor] = useState({ name: '' });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const response = await getAuthors();
    setAuthors(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAuthor(newAuthor);
    fetchAuthors();
  };

  return (
    <div className="container mt-4">
      <h2>Author Management</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })} />
        <button className="btn btn-primary" type="submit">Add Author</button>
      </form>

      <ul className="mt-4">
        {authors.map((author) => (
          <li key={author.id}>{author.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Author;
