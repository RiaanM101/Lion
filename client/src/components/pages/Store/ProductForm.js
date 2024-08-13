import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onClose, onProductSaved, apiBaseUrl }) => {
  const [formData, setFormData] = useState({
    itemDescription: '',
    categoryID: '',
    price: '',
    quantityOnHand: '',
    productPhoto: null,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        itemDescription: product.description || '',
        categoryID: product.categoryID || '',
        price: product.price || '',
        quantityOnHand: product.quantityOnHand || '',
        productPhoto: null,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      let response;
      if (product) {
        response = await fetch(`${apiBaseUrl}/UpdateItem/${product.id}`, {
          method: 'PUT',
          body: formDataToSend,
        });
      } else {
        response = await fetch(`${apiBaseUrl}/AddItem`, {
          method: 'POST',
          body: formDataToSend,
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      onProductSaved();
    } catch (error) {
      console.error('Error saving product:', error);
      // Consider adding user-facing error handling here
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label>
            Description:
            <input 
              type="text" 
              name="itemDescription" 
              value={formData.itemDescription} 
              onChange={handleChange} 
              required
            />
          </label>
          <label>
            Category ID:
            <input 
              type="number" 
              name="categoryID" 
              value={formData.categoryID} 
              onChange={handleChange} 
              required
            />
          </label>
          <label>
            Price:
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              step="0.01" 
              required
            />
          </label>
          <label>
            Quantity On Hand:
            <input 
              type="number" 
              name="quantityOnHand" 
              value={formData.quantityOnHand} 
              onChange={handleChange} 
              required
            />
          </label>
          <label>
            Product Photo:
            <input 
              type="file" 
              name="productPhoto" 
              onChange={handleChange} 
            />
          </label>
          <button type="submit">{product ? 'Update' : 'Add'} Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;