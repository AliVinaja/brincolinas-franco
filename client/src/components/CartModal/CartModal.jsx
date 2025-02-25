import React from 'react';
import { useCarrito } from '../../context/CartContext';
import { FaTrash } from 'react-icons/fa';
import './CartModal.css';

const CartModal = ({ isOpen, onClose }) => {
  const { carrito, eliminarDelCarrito, calcularTotal } = useCarrito();

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal-content" onClick={e => e.stopPropagation()}>
        <div className="cart-modal-header">
          <h2>Carrito de Compras</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="cart-items">
          {carrito.length === 0 ? (
            <p className="empty-cart">Tu carrito está vacío</p>
          ) : (
            carrito.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  {item.imagenes && item.imagenes.length > 0 && (
                    <img src={item.imagenes[0].url} alt={item.nombre} />
                  )}
                </div>
                <div className="cart-item-details">
                  <h3>{item.nombre}</h3>
                  <p className="cart-item-price">${item.precio}</p>
                </div>
                <button 
                  className="remove-item" 
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        {carrito.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${calcularTotal()}</span>
            </div>
            <button className="checkout-button">
              Proceder al Pago
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
