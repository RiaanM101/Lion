import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import productService from '../../services/productService';

const Store = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await productService.fetchCategories();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center my-5"><FontAwesomeIcon icon={faSpinner} spin size="3x" /></div>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">
        <FontAwesomeIcon icon={faShoppingCart} className="me-3" />
        Our Store Categories
      </h1>
      <div className="row justify-content-center">
        {categories.map(category => (
          <div key={category.categoryID} className="col-md-4 mb-4">
            <div 
              className="card h-100" 
              style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-center mb-4">{category.categoryDescription}</h5>
                <Link 
                  to={`/products/${category.categoryID}`} 
                  className="btn btn-dark btn-block mt-auto"
                  style={{
                    backgroundColor: '#000',
                    borderColor: '#000',
                    color: '#fff',
                    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#333';
                    e.currentTarget.style.borderColor = '#333';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#000';
                    e.currentTarget.style.borderColor = '#000';
                  }}
                >
                  View Products
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;