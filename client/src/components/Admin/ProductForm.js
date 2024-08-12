import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../redux/actions/productActions';
import Button from '../common/button';

// ProductForm Component: Handles the creation and editing of a product.
const ProductForm = ({ product, onClose }) => {
    // Local state to manage form fields
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const dispatch = useDispatch();

    // Populate form fields when editing an existing product
    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setCategory(product.category);
        }
    }, [product]);

    // Handle form submission for both creating and updating a product
    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = { name, price, category };

        // If a product is provided, update it; otherwise, create a new one
        if (product) {
            dispatch(updateProduct(product.id, productData));
        } else {
            dispatch(createProduct(productData));
        }

        // Close the modal after saving
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required 
                />
            </div>
            <div className="form-group">
                <label>Category</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    required 
                />
            </div>
            {/* Save Button */}
            <Button type="submit" className="btn btn-success">
                <i className="fa fa-save"></i> Save
            </Button>
        </form>
    );
};

export default ProductForm;
