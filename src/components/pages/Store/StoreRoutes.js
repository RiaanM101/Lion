// src/components/pages/Store/StoreRoutes.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Store from './Store';
import Product from './Product';

const StoreRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Store />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  );
};

export default StoreRoutes;
