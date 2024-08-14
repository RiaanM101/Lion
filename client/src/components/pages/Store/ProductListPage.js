import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';  
import productService from '../../services/productService';
import '../../styles/Modal.css';  // Import the CSS file

const ProductListPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await productService.fetchCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories.');
    }
  };

  const fetchProducts = async (categoryId) => {
    setLoading(true);
    try {
      const productsData = await productService.fetchItemsByCategory(categoryId);
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategoryId(categoryId);
    fetchProducts(categoryId);
  };

  const handleDelete = async (productId) => {
    console.log('Delete button clicked for product:', productId);
    try {
      await productService.deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId));
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Failed to delete product.');
    }
  };

  const handleEdit = (product) => {
    console.log('Edit button clicked for product:', product);
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    console.log('Add button clicked');
    setSelectedProduct(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };

  const handleProductSaved = (savedProduct) => {
    console.log('Product saved:', savedProduct);
    if (selectedCategoryId) {
      fetchProducts(selectedCategoryId);
    }
    closeForm();
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Product List</h2>

      <div className="mb-3">
        <label htmlFor="categorySelect" className="form-label">Select a Product Category:</label>
        <select
          id="categorySelect"
          className="form-select"
          value={selectedCategoryId || ''}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>Select a category</option>
          {categories.map(category => (
            <option key={category.categoryID} value={category.categoryID}>
              {category.categoryDescription}
            </option>
          ))}
        </select>
      </div>

      {selectedCategoryId && (
        <>
          <button className="btn btn-primary mb-3" onClick={handleAdd}>
            Add Product
          </button>

          {showForm && (
            <ProductForm
              product={selectedProduct}
              onClose={closeForm}
              onProductSaved={handleProductSaved}
              categoryId={selectedCategoryId}
            />
          )}

          {loading ? (
            <div>Loading products...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity on Hand</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.description}</td>
                    <td>R{product.price}</td>
                    <td>{product.quantityOnHand}</td>
                    <td>
                      <button 
                        className="btn btn-warning me-2" 
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default ProductListPage;