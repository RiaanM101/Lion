import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { addItemToCart } from '../../redux/cartSlice';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Dispatch action to add item to cart
    dispatch(addItemToCart(product));
  };

  return (
    <div className="card">
      <img src={product.imageUrl} className="card-img-top" alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price.toFixed(2)}</p>
        <button className="btn btn-primary" onClick={handleAddToCart}>
          <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
