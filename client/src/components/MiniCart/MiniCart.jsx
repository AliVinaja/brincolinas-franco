import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './MiniCart.css';

const MiniCart = () => {
  const { items, removeFromCart, getTotal, getItemsCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className={`mini-cart ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <button
        className="flex items-center space-x-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaShoppingCart className="h-6 w-6" />
        {getItemsCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {getItemsCount()}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <FaShoppingCart className="empty-cart-icon" />
              <p className="empty-cart-text">Tu carrito está vacío</p>
              <Link to="/productos" className="continue-shopping" onClick={() => setIsOpen(false)}>
                Continuar comprando
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-96 overflow-auto">
                {items.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img
                      src={item.producto.imagenes[0]?.url}
                      alt={item.producto.nombre}
                      className="item-image"
                    />
                    
                    <div className="item-details">
                      <h3 className="item-name">{item.producto.nombre}</h3>
                      <p className="item-price">${item.producto.precio}/hr</p>
                      
                      <div className="item-actions">
                        <p className="quantity">{item.cantidad}</p>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="remove-button"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span className="total-label">Total:</span>
                  <span className="total-amount">${getTotal()}</span>
                </div>
                <Link
                  to="/carrito"
                  className="checkout-button"
                  onClick={() => setIsOpen(false)}
                >
                  Ver carrito
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniCart;
