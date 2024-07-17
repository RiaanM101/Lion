import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: product.id || '',
    name: product.name || '',
    price: product.price || '',
    description: product.description || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          className="form-control"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </div>
      <button type="submit" className="btn btn-primary mr-2">
        <FontAwesomeIcon icon={faSave} className="mr-1" /> Save
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        <FontAwesomeIcon icon={faTimes} className="mr-1" /> Cancel
      </button>
    </form>
  );
};

export default ProductForm;
