import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';

const ProductForm = ({ product, onClose, onProductSaved, categories, categoryId }) => {
  const [formData, setFormData] = useState({
    itemDescription: '',
    categoryID: categoryId,  // Initially use the categoryId passed from props
    price: '',
    quantityOnHand: '',
    productPhoto: null,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        itemDescription: product.description || '',
        categoryID: product.categoryID || categoryId,
        price: product.price || '',
        quantityOnHand: product.quantityOnHand || '',
        productPhoto: null,
      });
    }
  }, [product, categoryId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryID = categories.find(cat => cat.categoryDescription === e.target.value)?.categoryID;
    setFormData(prevData => ({
      ...prevData,
      categoryID: selectedCategoryID || '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      let savedProduct;
      if (product) {
        savedProduct = await productService.updateProduct(product.id, formDataToSend);
      } else {
        savedProduct = await productService.addProduct(formDataToSend);
      }
      onProductSaved(savedProduct);
    } catch (error) {
      console.error('Error saving product:', error);
      // Consider adding user-facing error handling here
    }
  };

  return (
    <>
      <h2>{product ? 'Edit' : 'Add'} Product</h2>
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
          Category:
          <select
            name="categoryDescription"
            value={categories.find(cat => cat.categoryID === formData.categoryID)?.categoryDescription || ''}
            onChange={handleCategoryChange}
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map(category => (
              <option key={category.categoryID} value={category.categoryDescription}>
                {category.categoryDescription}
              </option>
            ))}
          </select>
        </label>
        <label>
          Price:
          <input 
            type="number" 
            name="price" 
            value={formData.price} 
            onChange={handleChange} 
            step="1" 
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
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </>
  );
};

export default ProductForm;
