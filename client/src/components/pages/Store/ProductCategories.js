import React from 'react';
import { Link } from 'react-router-dom';

const ProductCategories = ({ categories }) => {
  return (
    <div className="row">
      {categories.map(category => (
        <div key={category.id} className="col-md-4 mb-4">
          <div className="card">
            <img src={category.image} className="card-img-top" alt={category.name} />
            <div className="card-body">
              <h5 className="card-title">{category.name}</h5>
              <Link to={`/category/${category.id}`} className="btn btn-primary">
                View Products
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCategories;