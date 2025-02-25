import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCarrito } from '../../context/CartContext';
import './CartButton.css';

const CartButton = () => {
  const { obtenerCantidadDeItems } = useCarrito();
  const itemCount = obtenerCantidadDeItems();

  return (
    <Link to="/carrito" className="cart-button">
      <FaShoppingCart />
      {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
    </Link>
  );
};

export default CartButton;
