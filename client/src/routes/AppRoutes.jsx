import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importar páginas
import Home from '../pages/Home';
import Marketplace from '../pages/Marketplace';
import ProductDetails from '../pages/ProductDetails';
import Contacto from '../pages/Contacto';
import Nosotros from '../pages/Nosotros';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Marketplace />} />
      <Route path="/producto/:id" element={<ProductDetails />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
