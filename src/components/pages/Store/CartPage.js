import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeItemFromCart, clearCart } from '../../redux/cartSlice';
import '../../styles/CartPage.css';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);

  const handleRemoveFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    // Logic for handling checkout process (e.g., redirect to checkout page, integrate with payment gateway, etc.)
    alert('Redirecting to checkout page...');
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>${item.totalPrice.toFixed(2)} (x{item.quantity})</p>
                </div>
                <button className="remove-button" onClick={() => handleRemoveFromCart(item.id)}>
                  <FontAwesomeIcon icon={faTrash} /> Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <p>Total: ${totalAmount.toFixed(2)}</p>
            <div className="cart-buttons">
              <button className="clear-cart-button" onClick={handleClearCart}>
                Clear Cart
              </button>
              <button className="checkout-button" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
