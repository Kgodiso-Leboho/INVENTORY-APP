// src/components/ProductForm.js
import React, { useState } from 'react';

const ProductForm = ({ onSubmit, initialData = {}, isEditing = false, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    category: initialData.category || '',
    price: initialData.price || '',
    stock_quantity: initialData.stock_quantity || '',
    description: initialData.description || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!isEditing) {
      setFormData({
        name: '',
        category: '',
        price: '',
        stock_quantity: '',
        description: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>{isEditing ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
      
      <div className="form-group">
        <label htmlFor="name">📋 Product Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">🏷️ Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">📱 Electronics</option>
          <option value="Clothing">👕 Clothing</option>
          <option value="Books">📚 Books</option>
          <option value="Home & Garden">🏠 Home & Garden</option>
          <option value="Sports">⚽ Sports</option>
          <option value="Food & Beverages">🍎 Food & Beverages</option>
          <option value="Health & Beauty">💄 Health & Beauty</option>
          <option value="Other">📦 Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="price">💰 Price (ZAR)</label>
        <input
          type="number"
          id="price"
          name="price"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={handleChange}
          placeholder="0.00"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="stock_quantity">📊 Stock Quantity</label>
        <input
          type="number"
          id="stock_quantity"
          name="stock_quantity"
          min="0"
          value={formData.stock_quantity}
          onChange={handleChange}
          placeholder="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">📝 Description (Optional)</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description..."
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="submit" className="btn btn-primary">
          {isEditing ? '💾 Update Product' : '➕ Add Product'}
        </button>
        {isEditing && (
          <button type="button" onClick={onCancel} className="btn btn-outline">
            ❌ Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;