import axios from 'axios';
import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
} from '../constants/productConstants';

// Action to fetch products from the API
export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    try {
        const { data } = await axios.get('/api/products');
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: FETCH_PRODUCTS_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Action to create a new product
export const createProduct = (productData) => async (dispatch) => {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    try {
        const { data } = await axios.post('/api/products', productData);
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Action to update an existing product
export const updateProduct = (id, productData) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    try {
        const { data } = await axios.put(`/api/products/${id}`, productData);
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Action to delete a product
export const deleteProduct = (id) => async (dispatch) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    try {
        await axios.delete(`/api/products/${id}`);
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
