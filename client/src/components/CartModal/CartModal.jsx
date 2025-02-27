import React from 'react';
import { useCarrito } from '../../context/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './CartModal.css';

const CartModal = ({ isOpen, onClose }) => {
  const { carrito, eliminarDelCarrito, calcularTotal, actualizarCantidad } = useCarrito();
  const { user } = useAuth();
  const navigate = useNavigate();
  const total = calcularTotal();

  if (!isOpen) return null;

  const handleProductClick = (id) => {
    navigate(`/producto/${id}`);
    onClose(); // Cerrar el modal después de navegar
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error('Debes iniciar sesión para continuar con la compra');
      navigate('/login');
    } else {
      navigate('/carrito');
    }
    onClose();
  };

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
                <div 
                  className="cart-item-image"
                  onClick={() => handleProductClick(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {item.imagenes && item.imagenes.length > 0 && (
                    <img src={item.imagenes[0].url} alt={item.nombre} />
                  )}
                </div>
                <div 
                  className="cart-item-details"
                  onClick={() => handleProductClick(item.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <h3>{item.nombre}</h3>
                  <p className="cart-item-price">${item.precio}</p>
                  <div className="quantity-controls" onClick={e => e.stopPropagation()}>
                    <button 
                      onClick={() => actualizarCantidad(item.id, (item.cantidad || 1) - 1)}
                      className="quantity-button"
                    >
                      <FaMinus />
                    </button>
                    <span className="quantity">{item.cantidad || 1}</span>
                    <button 
                      onClick={() => actualizarCantidad(item.id, (item.cantidad || 1) + 1)}
                      className="quantity-button"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  <p className="item-subtotal">
                    Subtotal: ${(item.precio * (item.cantidad || 1)).toFixed(2)}
                  </p>
                </div>
                <button 
                  className="remove-item" 
                  onClick={(e) => {
                    e.stopPropagation();
                    eliminarDelCarrito(item.id);
                  }}
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
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceder al Pago
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
