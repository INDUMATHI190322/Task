import React, { useState, useEffect } from 'react';
import { getLibrarians, createLibrarian, updateLibrarian, deleteLibrarian } from '../services/api'; // Assuming api.js contains these functions

const Librarian = () => {
  const [librarians, setLibrarians] = useState([]);
  const [newLibrarian, setNewLibrarian] = useState({ name: '', email: '', phone: '' });
  const [updateLibrarianData, setUpdateLibrarianData] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch librarians when the component mounts
  useEffect(() => {
    fetchLibrarians();
  }, []);

  // Fetch all librarians from the backend
  const fetchLibrarians = async () => {
    try {
      const response = await getLibrarians();
      setLibrarians(response.data || []);
    } catch (error) {
      setError('Failed to load librarians');
    }
  };

  // Add a new librarian
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!newLibrarian.name || !newLibrarian.email || !newLibrarian.phone) {
      setError('All fields are required');
      return;
    }
  
    try {
      await createLibrarian(newLibrarian);
      fetchLibrarians();  // Refresh the librarian list after adding
      setNewLibrarian({ name: '', email: '', phone: '' });
      setSuccess('Librarian added successfully!');
      setError('');
    } catch (error) {
      console.error("Error adding librarian:", error);
      setError('Failed to add librarian');
    }
  };
  

  // Update librarian details
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!updateLibrarianData.name || !updateLibrarianData.email || !updateLibrarianData.phone) {
      setError('All fields are required to update.');
      return;
    }

    try {
      await updateLibrarian(updateLibrarianData.id, updateLibrarianData);
      fetchLibrarians();
      setSuccess('Librarian updated successfully!');
      setError('');
      setUpdateLibrarianData(null);
    } catch (error) {
      setError('Failed to update librarian');
    }
  };

  // Delete a librarian
  const handleDelete = async (id) => {
    try {
      await deleteLibrarian(id);
      fetchLibrarians();
      setSuccess('Librarian deleted successfully!');
      setError('');
    } catch (error) {
      setError('Failed to delete librarian');
    }
  };

  // Pre-fill the form for editing
  const handleEdit = (librarian) => {
    setUpdateLibrarianData(librarian);
  };

  return (
    <div className="container mt-4">
      <h2>Librarian Management</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Add New Librarian Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newLibrarian.name}
          onChange={(e) => setNewLibrarian({ ...newLibrarian, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newLibrarian.email}
          onChange={(e) => setNewLibrarian({ ...newLibrarian, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={newLibrarian.phone}
          onChange={(e) => setNewLibrarian({ ...newLibrarian, phone: e.target.value })}
        />
        <button className="btn btn-primary" type="submit">Add Librarian</button>
      </form>

      {/* Update Librarian Form */}
      {updateLibrarianData && (
        <div>
          <h3>Update Librarian</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Name"
              value={updateLibrarianData.name}
              onChange={(e) => setUpdateLibrarianData({ ...updateLibrarianData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={updateLibrarianData.email}
              onChange={(e) => setUpdateLibrarianData({ ...updateLibrarianData, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              value={updateLibrarianData.phone}
              onChange={(e) => setUpdateLibrarianData({ ...updateLibrarianData, phone: e.target.value })}
            />
            <button className="btn btn-warning" type="submit">Update Librarian</button>
            <button
              className="btn btn-secondary ml-2"
              onClick={() => setUpdateLibrarianData(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Librarians List */}
      <div className="mt-4">
        {librarians.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {librarians.map((librarian) => (
                <tr key={librarian.id}>
                  <td>{librarian.name}</td>
                  <td>{librarian.email}</td>
                  <td>{librarian.phone}</td>
                  <td>
                    <button className="btn btn-warning ml-2" onClick={() => handleEdit(librarian)}>
                      Edit
                    </button>
                    <button className="btn btn-danger ml-2" onClick={() => handleDelete(librarian.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No librarians found.</div>
        )}
      </div>
    </div>
  );
};

export default Librarian;
