import React, { useState, useEffect } from 'react';
import { useCarrito } from '../../context/CarritoContext';

const CartView = ({ userId }) => {
    const { cart } = useCarrito(userId); // Asegúrate de que useCarrito devuelva el carrito
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulando una carga
        if (cart) {
            setLoading(false);
        }
    }, [cart]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Tu Carrito</h2>
            <ul>
                {cart.map(item => (
                    <li key={item.productoId}>{item.productoId} - Cantidad: {item.cantidad}</li>
                ))}
            </ul>
        </div>
    );
};

export default CartView;