import React, { useEffect, useState } from 'react';
import { getCategories, createCategory } from '../services/api';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCategory(newCategory);
    fetchCategories();
  };

  return (
    <div className="container mt-4">
      <h2>Category Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Category Name"
          onChange={(e) => setNewCategory({ name: e.target.value })}
        />
        <button className="btn btn-primary" type="submit">Add Category</button>
      </form>

      <ul className="mt-4">
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
