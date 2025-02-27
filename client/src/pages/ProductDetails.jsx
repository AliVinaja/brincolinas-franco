import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCarrito } from '../context/CartContext';
import { FaWhatsapp, FaShoppingCart, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WHATSAPP_NUMBER } from '../config/constants';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useCarrito();

  const [state, setState] = useState({
    producto: null,
    loading: true,
    error: null
  });

  const [cantidad, setCantidad] = useState(1);
  const [selectedDate, setSelectedDate] = useState(''); // Se usará para la fecha de reserva
  const [selectedTime, setSelectedTime] = useState(''); // Se usará para la hora de reserva
  const [duration, setDuration] = useState(1); // Se usará para la duración del alquiler
  const [addedToCart, setAddedToCart] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchProducto = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/productos/${id}`);
      if (!response.ok) {
        throw new Error('Error al cargar el producto');
      }
      const data = await response.json();
      
      // Procesar las imágenes y dimensiones si vienen como strings
      if (typeof data.imagenes === 'string') {
        data.imagenes = JSON.parse(data.imagenes);
      }
      if (typeof data.dimensiones === 'string') {
        data.dimensiones = JSON.parse(data.dimensiones);
      }
      
      setState({ producto: data, loading: false, error: null });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false, error: error.message }));
      toast.error('Error al cargar el producto');
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProducto();
    }
  }, [id, fetchProducto]);

  const handleNextImage = useCallback(() => {
    if (state.producto?.imagenes) {
      setCurrentImageIndex(prev => 
        prev === state.producto.imagenes.length - 1 ? 0 : prev + 1
      );
    }
  }, [state.producto]);

  const handlePrevImage = useCallback(() => {
    if (state.producto?.imagenes) {
      setCurrentImageIndex(prev => 
        prev === 0 ? state.producto.imagenes.length - 1 : prev - 1
      );
    }
  }, [state.producto]);

  const openModal = useCallback((index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleModalClick = useCallback((e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  }, [closeModal]);

  const handleQuantityChange = useCallback((newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= state.producto.stock) {
      setCantidad(newQuantity);
    }
  }, [state.producto]);

  const handleAddToCart = useCallback(() => {
    if (cantidad <= state.producto.stock) {
      const productoParaCarrito = {
        ...state.producto,
        cantidad
      };
      
      agregarAlCarrito(productoParaCarrito);
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } else {
      toast.error('No hay suficiente stock disponible');
    }
  }, [state.producto, cantidad, agregarAlCarrito]);

  const handleWhatsApp = useCallback(() => {
    const message = `¡Hola! Me interesa el producto "${state.producto.nombre}" que vi en su página web. ¿Podrían darme más información?`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, [state.producto]);

  if (state.loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="error-container">
        <p className="error-message">{state.error}</p>
      </div>
    );
  }

  const { producto } = state;
  if (!producto) return null;

  const imagenesArray = Array.isArray(producto.imagenes) ? producto.imagenes : [];

  return (
    <div className="product-details">
      <div className="product-images">
        <div className="main-image-container" onClick={() => openModal(currentImageIndex)}>
          <img
            src={imagenesArray[currentImageIndex]?.url}
            alt={producto.nombre}
            className="main-image"
            loading="lazy"
          />
        </div>

        <div className="thumbnails-carousel">
          <button
            className="carousel-nav prev"
            onClick={handlePrevImage}
            aria-label="Imagen anterior"
          >
            <FaChevronLeft />
          </button>

          <div className="thumbnails-container">
            {imagenesArray.map((imagen, index) => (
              <div
                key={index}
                className={`thumbnail-wrapper ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={imagen.url}
                  alt={`${producto.nombre} ${index + 1}`}
                  className="thumbnail-image"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <button
            className="carousel-nav next"
            onClick={handleNextImage}
            aria-label="Siguiente imagen"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="product-info">
        <h1 className="product-title">{producto.nombre}</h1>
        <p className="product-description">{producto.descripcion}</p>

        <div className="product-specs">
          <div className="spec-item">
            <span>Dimensiones:</span>
            <span>
              {producto.dimensiones.largo}x{producto.dimensiones.ancho}x{producto.dimensiones.alto}m
            </span>
          </div>
          <div className="spec-item">
            <span>Capacidad:</span>
            <span>{producto.capacidad} personas</span>
          </div>
          <div className="spec-item">
            <span>Categoría:</span>
            <span>{producto.categoria?.nombre}</span>
          </div>
        </div>

        <div className="product-price">
          ${producto.precio} MXN
        </div>

        <div className="product-quantity">
          <button 
            onClick={() => handleQuantityChange(cantidad - 1)}
            disabled={cantidad <= 1}
          >
            -
          </button>
          <span>{cantidad}</span>
          <button 
            onClick={() => handleQuantityChange(cantidad + 1)}
            disabled={cantidad >= producto.stock}
          >
            +
          </button>
          <span className="stock-info">
            Stock disponible: {producto.stock}
          </span>
        </div>

        <div className="action-buttons">
          <button
            className={`action-btn add-to-cart ${addedToCart ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={addedToCart}
          >
            <FaShoppingCart />
            {addedToCart ? 'Agregado' : 'Agregar al carrito'}
          </button>
          <button className="action-btn contact-whatsapp" onClick={handleWhatsApp}>
            <FaWhatsapp />
            Contactar por WhatsApp
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={handleModalClick}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            <div className="modal-image-container">
              <img
                src={imagenesArray[currentImageIndex]?.url}
                alt={producto.nombre}
                className="modal-image"
              />
            </div>
            <button
              className="modal-nav prev"
              onClick={handlePrevImage}
              aria-label="Imagen anterior"
            >
              <FaChevronLeft />
            </button>
            <button
              className="modal-nav next"
              onClick={handleNextImage}
              aria-label="Siguiente imagen"
            >
              <FaChevronRight />
            </button>
            <div className="modal-counter">
              {currentImageIndex + 1} / {imagenesArray.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProductDetails);