// /src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import cartReducer from './cartSlice'; // Import the cart reducer

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer, // Add the cart reducer
  },
});

export default store;
