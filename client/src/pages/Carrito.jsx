import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaWhatsapp, FaPlus } from 'react-icons/fa';
import { useCarrito } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Carrito.css';
import { WHATSAPP_NUMBER } from '../config/constants';

const Carrito = () => {
  const { carrito = [], eliminarDelCarrito, actualizarCantidad, calcularTotal, limpiarCarrito } = useCarrito();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.displayName || '',
    telefono: '',
    email: user?.email || '',
    direccion: '',
    fechaEvento: '',
    horaInicio: '',
    duracion: '4',
    notasAdicionales: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (productoId, newQuantity) => {
    if (newQuantity > 0) {
      actualizarCantidad(productoId, newQuantity);
    }
  };

  const formatWhatsAppMessage = () => {
    const items = carrito.map(item => 
      `- ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`
    ).join('\\n');

    const message = 
      `¡Hola! Me interesa rentar los siguientes productos:\\n\\n` +
      `${items}\\n\\n` +
      `Total: $${calcularTotal().toFixed(2)}\\n\\n` +
      `Datos para la renta:\\n` +
      `Nombre: ${formData.nombre}\\n` +
      `Teléfono: ${formData.telefono}\\n` +
      `Email: ${formData.email}\\n` +
      `Dirección del evento: ${formData.direccion}\\n` +
      `Fecha del evento: ${formData.fechaEvento}\\n` +
      `Hora de inicio: ${formData.horaInicio}\\n` +
      `Duración aproximada: ${formData.duracion} horas\\n` +
      `Notas adicionales: ${formData.notasAdicionales}\\n\\n` +
      `¿Podrían confirmarme la disponibilidad y proceder con la renta?`;

    return encodeURIComponent(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar campos requeridos
    const requiredFields = ['nombre', 'telefono', 'email', 'direccion', 'fechaEvento', 'horaInicio'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error('Por favor, completa todos los campos requeridos');
      return;
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${formatWhatsAppMessage()}`;
    window.open(whatsappUrl, '_blank');
    
    // Limpiar el carrito después de enviar
    limpiarCarrito();
  };

  const scrollToElement = (element) => {
    const startPosition = window.pageYOffset;
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - 80; // Ajuste para el navbar
    const distance = targetPosition - startPosition;
    const duration = 700; // Reducido de 1000ms a 700ms
    let start = null;

    const animation = (currentTime) => {
      if (!start) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      // Función de easing para un movimiento más suave
      const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      
      window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      // Esperar a que comience la animación de despliegue
      setTimeout(() => {
        const formContainer = document.querySelector('.rental-form-container');
        scrollToElement(formContainer);
      }, 200);
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
      <div className="cart-header">
        <h1>Tu Carrito</h1>
      </div>

      <div className="cart-items">
        {carrito.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              {item.imagenes && item.imagenes.length > 0 && (
                <img src={item.imagenes[0].url} alt={item.nombre} />
              )}
            </div>
            <div className="item-details">
              <h3>{item.nombre}</h3>
              <div className="quantity-controls">
                <button
                  onClick={() => handleQuantityChange(item.id, (item.cantidad || 1) - 1)}
                  disabled={item.cantidad <= 1}
                >
                  -
                </button>
                <span>{item.cantidad || 1}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, (item.cantidad || 1) + 1)}
                >
                  +
                </button>
              </div>
              <p className="item-price">
                ${(item.precio * (item.cantidad || 1)).toFixed(2)}
              </p>
              <button
                className="remove-item"
                onClick={() => eliminarDelCarrito(item.id)}
              >
                <FaTrash /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span>Total estimado:</span>
          <span>${calcularTotal().toFixed(2)}</span>
        </div>
        <button onClick={handleShowForm} className="checkout-button">
          {showForm ? 'Ocultar formulario' : 'Continuar con la cotización'}
        </button>
        <Link to="/productos" className="continue-shopping">
          <FaArrowLeft /> Agregar más productos
        </Link>
      </div>

      <div className={`rental-form-container ${showForm ? 'show' : ''}`}>
        <div className="form-header">
          <h2>Información para tu Renta</h2>
          <p className="form-notice">
            Esta cotización es una herramienta para facilitar el proceso de renta. 
            Al enviar el formulario, se generará un mensaje de WhatsApp con los detalles 
            de tu pedido. La disponibilidad y confirmación final serán acordadas 
            directamente con nuestro equipo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rental-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono *</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="direccion">Dirección del evento *</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              required
              placeholder="Calle, número, colonia, ciudad"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fechaEvento">Fecha del evento *</label>
              <input
                type="date"
                id="fechaEvento"
                name="fechaEvento"
                value={formData.fechaEvento}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="horaInicio">Hora de inicio *</label>
              <input
                type="time"
                id="horaInicio"
                name="horaInicio"
                value={formData.horaInicio}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="duracion">Duración aproximada (horas)</label>
              <select
                id="duracion"
                name="duracion"
                value={formData.duracion}
                onChange={handleInputChange}
              >
                <option value="4">4 horas</option>
                <option value="6">6 horas</option>
                <option value="8">8 horas</option>
                <option value="12">12 horas</option>
                <option value="24">24 horas</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="notasAdicionales">Notas adicionales</label>
            <textarea
              id="notasAdicionales"
              name="notasAdicionales"
              value={formData.notasAdicionales}
              onChange={handleInputChange}
              rows="4"
              placeholder="Instrucciones especiales, preferencias de entrega, etc."
            />
          </div>

          <div className="form-summary">
            <h3>Resumen de tu pedido</h3>
            {carrito.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.nombre} x{item.cantidad}</span>
                <span>${(item.precio * item.cantidad).toFixed(2)}</span>
              </div>
            ))}
            <div className="summary-total">
              <strong>Total:</strong>
              <strong>${calcularTotal().toFixed(2)}</strong>
            </div>
          </div>

          <div className="form-actions">
            <Link to="/productos" className="back-button">
              <FaArrowLeft /> Agregar más productos
            </Link>
            <button type="submit" className="submit-button">
              <FaWhatsapp /> Enviar cotización por WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Carrito;
