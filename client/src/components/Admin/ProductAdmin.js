import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import Modal from '../common/modal';
import Button from '../common/button';

// ProductAdmin Component: The main page for managing products, integrating the list, form, and modal.
const ProductAdmin = () => {
    // State to track the currently selected product for editing
    const [selectedProduct, setSelectedProduct] = useState(null);
    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle the edit action by setting the selected product and opening the modal
    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // Handle the add action by clearing the selected product and opening the modal
    const handleAdd = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    // Close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Product Management</h1>
            {/* Add New Product Button */}
            <Button onClick={handleAdd} className="btn btn-success mb-3">
                <i className="fa fa-plus"></i> Add New Product
            </Button>
            {/* Product List Table */}
            <ProductList onEdit={handleEdit} />
            {/* Conditional rendering of the Modal with the ProductForm inside */}
            {isModalOpen && (
                <Modal title={selectedProduct ? "Edit Product" : "Add New Product"} onClose={handleCloseModal}>
                    <ProductForm product={selectedProduct} onClose={handleCloseModal} />
                </Modal>
            )}
        </div>
    );
};

export default ProductAdmin;
