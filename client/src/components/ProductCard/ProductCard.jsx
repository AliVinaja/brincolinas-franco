import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRuler, FaUsers, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useCarrito } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ producto }) => {
  const { id, nombre, descripcion, precio, imagenes, dimensiones, capacidad } = producto;
  const { agregarAlCarrito, eliminarDelCarrito, carrito } = useCarrito();
  const [addedToCart, setAddedToCart] = useState(false);

  // Verificar si el producto está en el carrito
  useEffect(() => {
    const isInCart = carrito.some(item => item.id === id);
    setAddedToCart(isInCart);
  }, [carrito, id]);

  const handleCartAction = (e) => {
    e.preventDefault(); // Evita la navegación al detalle del producto
    
    if (addedToCart) {
      eliminarDelCarrito(id);
      setAddedToCart(false);
    } else {
      const productoParaCarrito = {
        ...producto,
        cantidad: 1
      };
      agregarAlCarrito(productoParaCarrito);
      setAddedToCart(true);
    }
  };

  return (
    <Link to={`/producto/${id}`} className="product-card">
      <div className="product-image">
        {imagenes && imagenes.length > 0 && (
          <img src={imagenes[0].url} alt={nombre} />
        )}
      </div>
      <div className="product-info">
        <h3>{nombre}</h3>
        <p className="description">{descripcion}</p>
        
        <div className="specs">
          {dimensiones && (
            <div className="spec">
              <FaRuler className="spec-icon" />
              <span>
                {dimensiones.largo}x{dimensiones.ancho}x{dimensiones.alto}m
              </span>
            </div>
          )}
          
          {capacidad && (
            <div className="spec">
              <FaUsers className="spec-icon" />
              <span>{`Capacidad: ${capacidad} personas`}</span>
            </div>
          )}
        </div>

        <div className="price-cart-container">
          <div className="price">${Number(precio).toLocaleString('es-MX')}</div>
          <button 
            onClick={handleCartAction}
            className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
          >
            {addedToCart ? (
              <>
                <FaCheck /> Agregado
              </>
            ) : (
              <>
                <FaShoppingCart /> Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
