import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
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
      <h1 className="text-center mb-5">Store</h1>
      <div className="row">
        {categories.map(category => (
          <div key={category.categoryID} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{category.categoryDescription}</h5>
                <Link to={`/products/${category.categoryID}`} className="btn btn-primary">
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
