import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRuler, FaUsers, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useCarrito } from '../../context/CartContext';
import { toast } from 'react-toastify';
import './ProductCard.css';

const ProductCard = ({ producto }) => {
  const { id, nombre, descripcion, precio, imagenes, dimensiones, capacidad } = producto;
  const { agregarAlCarrito, carrito } = useCarrito();
  const [addedToCart, setAddedToCart] = useState(false);

  // Verificar si el producto está en el carrito
  useEffect(() => {
    const isInCart = carrito.some(item => item.id === id);
    setAddedToCart(isInCart);
  }, [carrito, id]);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Evita la navegación al detalle del producto
    agregarAlCarrito(producto, 1);
    setAddedToCart(true);
    toast.success('Producto agregado al carrito');
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
                {Object.entries(dimensiones)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(', ')}
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
            onClick={handleAddToCart}
            className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
            disabled={addedToCart}
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
