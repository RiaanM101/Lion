import React, { useState, useEffect } from 'react';
import Product from './Product';
import ProductForm from './ProductForm'; // For creating/editing products
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error);
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
        Error fetching products: {error.message}
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">Product List</h2>
      <ProductForm onProductAdded={fetchProducts} />
      {products.length > 0 ? (
        <ul className="list-group">
          {products.map(product => (
            <Product
              key={product.id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      ) : (
        <div>No products found.</div>
      )}
    </div>
  );
};

export default ProductListPage;
