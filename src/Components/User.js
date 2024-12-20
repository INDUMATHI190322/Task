import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import "./library.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', address: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      console.log(response.data);  // Log the response data to check the structure
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error('Response data is not an array');
        setUsers([]);  // Fallback to an empty array
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);  // Handle error and reset state
    }
  };
  

  const handleCreate = async (e) => {
    e.preventDefault();
    await createUser(newUser);
    setNewUser({ name: '', email: '', phone: '', address: '' });
    fetchUsers();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editingUser) {
      await updateUser(editingUser.id, editingUser);
      setEditingUser(null);
      fetchUsers();
    }
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="container mt-4 user">
      <h2>User Management</h2>

      {/* Create User Form */}
      <form onSubmit={handleCreate}>
        <input 
          placeholder="Name" 
          value={newUser.name} 
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} 
        />
        <input 
          placeholder="Email" 
          value={newUser.email} 
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
        />
        <input 
          placeholder="Phone" 
          value={newUser.phone} 
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} 
        />
        <input 
          placeholder="Address" 
          value={newUser.address} 
          onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} 
        />
        <button className="btn btn-primary" type="submit">Add User</button>
      </form>

      {/* Edit User Form */}
      {editingUser && (
        <form onSubmit={handleUpdate} className="mt-4">
          <h4>Edit User</h4>
          <input 
            placeholder="Name" 
            value={editingUser.name} 
            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} 
          />
          <input 
            placeholder="Email" 
            value={editingUser.email} 
            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} 
          />
          <input 
            placeholder="Phone" 
            value={editingUser.phone} 
            onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })} 
          />
          <input 
            placeholder="Address" 
            value={editingUser.address} 
            onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })} 
          />
          <button className="btn btn-success" type="submit">Update User</button>
          <button 
            className="btn btn-secondary ml-2" 
            type="button" 
            onClick={() => setEditingUser(null)}
          >
            Cancel
          </button>
        </form>
      )}

      {/* User Table */}
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                <button 
                  className="btn btn-warning btn-sm" 
                  onClick={() => setEditingUser(user)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger btn-sm ml-2" 
                  onClick={() => handleDelete(user.id)}
                >
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

export default User;
