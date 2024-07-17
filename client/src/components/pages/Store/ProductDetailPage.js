import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../../redux/productSlice';
import { addItemToCart } from '../../redux/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector(state => state.products);
  const product = products.find(product => product.id === parseInt(id));

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    }
  }, [dispatch, product]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(addItemToCart(product));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={product.imageUrl} className="img-fluid" alt={product.name} />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="font-weight-bold">${product.price}</p>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
