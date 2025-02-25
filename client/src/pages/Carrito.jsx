import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useCarrito } from '../context/CartContext';
import './Carrito.css';

const Carrito = () => {
  const { carrito = [], eliminarDelCarrito, actualizarCantidad, calcularTotal } = useCarrito();

  const handleQuantityChange = (productoId, newQuantity) => {
    if (newQuantity > 0) {
      actualizarCantidad(productoId, newQuantity);
    }
  };

  if (!carrito || carrito.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Tu carrito está vacío</h2>
        <Link to="/productos" className="continue-shopping">
          <FaArrowLeft /> Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Tu Carrito</h1>
      <div className="cart-items">
        {carrito.map((item) => (
          <div key={item.producto.id} className="cart-item">
            <div className="item-image">
              {item.producto.imagenes && item.producto.imagenes[0] && (
                <img 
                  src={item.producto.imagenes[0].url} 
                  alt={item.producto.nombre} 
                />
              )}
            </div>
            <div className="item-details">
              <h3>{item.producto.nombre}</h3>
              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(item.producto.id, item.cantidad - 1)}
                  disabled={item.cantidad <= 1}
                >
                  -
                </button>
                <span>{item.cantidad}</span>
                <button
                  onClick={() => handleQuantityChange(item.producto.id, item.cantidad + 1)}
                >
                  +
                </button>
              </div>
              <p className="item-price">
                ${(item.producto.precio * item.cantidad).toFixed(2)}
              </p>
              <button
                className="remove-item"
                onClick={() => eliminarDelCarrito(item.producto.id)}
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="total">
          <span>Total:</span>
          <span>${calcularTotal().toFixed(2)}</span>
        </div>
        <Link to="/checkout" className="checkout-button">
          Proceder al pago
        </Link>
        <Link to="/productos" className="continue-shopping">
          <FaArrowLeft /> Continuar comprando
        </Link>
      </div>
    </div>
  );
};

export default Carrito;
