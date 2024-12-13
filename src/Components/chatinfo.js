import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EntityForm = () => {
  const [entities, setEntities] = useState([]); // List of entities
  const [formData, setFormData] = useState({
  
    name: '',
    password: '',
    occupation: '',
    country: '',
  }); // Form data state
  const [isEditing, setIsEditing] = useState(false); // Editing mode state
  const [currentId, setCurrentId] = useState(null); // Track the ID being edited

  const API_URL = 'http://localhost:3001'; // Backend API URL

  // Fetch all entities on component mount
  useEffect(() => {
    fetchEntities();
  }, []);

  // Function to fetch all entities
  const fetchEntities = async () => {
    try {
      console.log('Fetching entities...');
      const response = await axios.get(`${API_URL}/details`);
      console.log('Fetched entities:', response.data);
      setEntities(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching entities:', error);
    }
  };

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        console.log('Updating entity:', { id: currentId, ...formData });
        const response = await axios.put(`${API_URL}/${currentId}`, formData);
        console.log('Update response:', response.data);
      } else {
      
      const newEntity = { ...formData };
      delete newEntity.id;
        console.log('Creating new entity:', newEntity);
        const response = await axios.post(`${API_URL}/details/create`, newEntity);
        console.log('Create response:', response.data);
      }

      // Clear form and refresh data
      setFormData({ id: '', name: '', password: '', occupation: '', country: '' });
      setIsEditing(false);
      setCurrentId(null);
      fetchEntities();
    } catch (error) {
      console.error('Error saving entity:', error);
    }
  };

  // Handle editing an entity
  const handleEdit = (id, entity) => {
    console.log('Editing entity:', entity);
    setIsEditing(true);
    setCurrentId(id);
    setFormData({
      name: entity.name,
      password: '', // Don't pre-fill password for security reasons
      occupation: entity.occupation,
      country: entity.country,
    });
  };

  // Handle deleting an entity
  const handleDelete = async (id) => {
    try {
      console.log('Deleting entity with ID:', id);
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log('Delete response:', response.data);
      fetchEntities(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting entity:', error);
    }
  };

  return (
    <center><div>
      <h1>{isEditing ? 'Edit Entity' : 'Add New Entity'}</h1>

      {/* Form */}
      <form onSubmit={handleSubmit}>
      
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div><br></br>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </label>
        </div><br></br>
        <div>
          <label>
            Occupation:
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleInputChange}
              required
            />
          </label>
        </div><br></br>
        <div>
          <label>
            Country:
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            />
          </label>
        </div><br></br>
        <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
      </form>

      {/* List of entities */}
      <h2>Entity List</h2>
      <ul>
        {entities.map((entity) => (
          <li key={entity.id}>
            <strong>{entity.name}</strong> | {entity.occupation} | {entity.country}
            <button onClick={() => handleEdit(entity.id, entity)}>Edit</button>
            <button onClick={() => handleDelete(entity.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
      </center>
  );
};

export default EntityForm;



import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
 
  app.enableCors({
  origin: ['*'],         // Allow only requests from localhost:3000
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'], // Allowed headers
   exposedHeaders: ['X-Custom-Header'],
   maxAge: 3600, // Cache preflight requests for 1 hour
   preflightContinue: false, // Automatically handle preflight request
   });
   await app.listen(process.env.PORT ?? 3001);
//   var http = require('http');

// http.createServer(function (request, response) {
// response.writeHead(200, {
//     'Content-Type': 'text/plain',
//     'Access-Control-Allow-Origin' : '*',
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
// });

// }).listen(3001);
}
bootstrap();