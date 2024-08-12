import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/ProductActions';
import Table from '../common/Table';
import Button from '../common/Button';

// ProductList Component: Displays a table of products with options to edit or delete.
const ProductList = ({ onEdit }) => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);

    // Fetch products when the component is mounted
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Handle delete action
    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    return (
        <Table className="table table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.category}</td>
                        <td>
                            {/* Edit Button */}
                            <Button 
                                className="btn btn-primary btn-sm mr-2" 
                                onClick={() => onEdit(product)}
                            >
                                <i className="fa fa-pencil"></i> Edit
                            </Button>
                            {/* Delete Button */}
                            <Button 
                                className="btn btn-danger btn-sm" 
                                onClick={() => handleDelete(product.id)}
                            >
                                <i className="fa fa-trash"></i> Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ProductList;
