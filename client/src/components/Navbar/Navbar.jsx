import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCarrito } from '../../context/CartContext';
import CartModal from '../CartModal/CartModal';
import UserModal from '../UserModal/UserModal';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { carrito = [] } = useCarrito();
  const { user } = useAuth();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Asegurarnos de que carrito existe antes de usar reduce
  const totalItems = Array.isArray(carrito) 
    ? carrito.reduce((total, item) => total + (item?.cantidad || 0), 0)
    : 0;

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Brincolines Franquillo</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/contacto">Contacto</Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <button 
            className="cart-button"
            onClick={() => setIsCartModalOpen(true)}
          >
            <FaShoppingCart />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </button>
          <button 
            className="user-button"
            onClick={() => setIsUserModalOpen(true)}
          >
            <FaUser />
          </button>
        </div>
      </div>
      <CartModal 
        isOpen={isCartModalOpen} 
        onClose={() => setIsCartModalOpen(false)} 
      />
      <UserModal 
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={user}
      />
    </nav>
  );
};

export default Navbar;
