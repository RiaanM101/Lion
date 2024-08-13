import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import productService from '../../services/productService';

const ProductItems = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [categoryDescription, setCategoryDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsData, categoryData] = await Promise.all([
          productService.fetchItemsByCategory(categoryId),
          productService.fetchCategoryById(categoryId)
        ]);
        setItems(itemsData);
        setCategoryDescription(categoryData.categoryDescription);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) {
    return <div className="text-center my-5"><FontAwesomeIcon icon={faSpinner} spin size="3x" /></div>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Products in {categoryDescription}</h1>
      <div className="row justify-content-center">
        {items.map(item => (
          <div key={item.itemID} className="col-md-4 mb-4 d-flex align-items-stretch">
            <div 
              className="card" 
              style={{
                width: '100%',
                height: 'auto',
                margin: '0 auto',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              <img 
                src={`data:image/jpeg;base64,${item.product_Photo}`} 
                alt={item.description} 
                className="card-img-top"
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{item.description}</h5>
                <p className="card-text">Price: R{item.price}</p>
                <p className="card-text">Quantity on Hand: {item.quantityOnHand}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductItems;