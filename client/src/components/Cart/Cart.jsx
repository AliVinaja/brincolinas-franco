import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const message = items.map(item => {
      return `${item.producto.nombre} - Cantidad: ${item.cantidad} - Fecha: ${item.fecha} - Hora: ${item.hora} - Duración: ${item.duracion}h`;
    }).join('\n');

    const total = getTotal();
    const whatsappMessage = `¡Hola! Me gustaría rentar los siguientes productos:\n\n${message}\n\nTotal: $${total}`;
    
    window.open(`https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p>¿Por qué no agregas algunos productos?</p>
        <button onClick={() => navigate('/productos')} className="continue-shopping">
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      
      <div className="cart-items">
        {items.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="item-image">
              <img 
                src={item.producto.imagenes[0].url} 
                alt={item.producto.nombre}
              />
            </div>
            
            <div className="item-details">
              <h3>{item.producto.nombre}</h3>
              <p className="item-price">${item.producto.precio * item.cantidad * item.duracion}</p>
              
              <div className="item-meta">
                <p>Fecha: {item.fecha}</p>
                <p>Hora: {item.hora}</p>
                <p>Duración: {item.duracion}h</p>
              </div>

              <div className="item-controls">
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(index, Math.max(1, item.cantidad - 1))}
                    disabled={item.cantidad <= 1}
                  >
                    -
                  </button>
                  <span>{item.cantidad}</span>
                  <button 
                    onClick={() => updateQuantity(index, item.cantidad + 1)}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  className="remove-item" 
                  onClick={() => removeFromCart(index)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Total:</span>
          <span>${getTotal()}</span>
        </div>

        <div className="cart-actions">
          <button className="clear-cart" onClick={clearCart}>
            Vaciar carrito
          </button>
          <button className="checkout" onClick={handleCheckout}>
            <FaWhatsapp /> Finalizar pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
