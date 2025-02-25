import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importar páginas
import Home from '../pages/Home';
import Productos from '../pages/Productos';
import ProductDetails from '../pages/ProductDetails';
import Nosotros from '../pages/Nosotros';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Carrito from '../pages/Carrito';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/productos/categoria/:categoria" element={<Productos />} />
      <Route path="/producto/:id" element={<ProductDetails />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/carrito" element={<Carrito />} />
    </Routes>
  );
};

export default AppRoutes;
