import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../config/firebaseConfig';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';

const CarritoContext = createContext();

export const useCarrito = () => {
  return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const carritoRef = doc(db, 'carritos', user.uid);
      
      unsubscribe = onSnapshot(carritoRef, 
        (doc) => {
          if (doc.exists()) {
            setCarrito(doc.data().items || []);
          } else {
            setCarrito([]);
          }
          setLoading(false);
        },
        (error) => {
          console.error('Error al obtener el carrito:', error);
          toast.error('Error al cargar el carrito');
          setLoading(false);
        }
      );
    } else {
      setCarrito([]);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const guardarCarrito = async (nuevoCarrito) => {
    if (!user) return;

    try {
      const carritoRef = doc(db, 'carritos', user.uid);
      await setDoc(carritoRef, { items: nuevoCarrito }, { merge: true });
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
      toast.error('Error al guardar los cambios en el carrito');
      throw error;
    }
  };

  const agregarAlCarrito = async (producto, cantidadNueva = 1) => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    try {
      const nuevoCarrito = [...carrito];
      const productoExistente = nuevoCarrito.find(item => item.id === producto.id);
      
      if (productoExistente) {
        productoExistente.cantidad = (productoExistente.cantidad || 1) + cantidadNueva;
      } else {
        nuevoCarrito.push({ ...producto, cantidad: cantidadNueva });
      }

      await guardarCarrito(nuevoCarrito);
      toast.success('Producto agregado al carrito'); 
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      toast.error('Error al agregar al carrito');
    }
  };

  const actualizarCantidad = async (productoId, nuevaCantidad) => {
    if (!user) return;

    try {
      const nuevoCarrito = [...carrito];
      const producto = nuevoCarrito.find(item => item.id === productoId);
      
      if (producto) {
        if (nuevaCantidad <= 0) {
          await eliminarDelCarrito(productoId);
          return;
        }
        producto.cantidad = nuevaCantidad;
        await guardarCarrito(nuevoCarrito);
      }
    } catch (error) {
      console.error('Error al actualizar la cantidad:', error);
      toast.error('Error al actualizar la cantidad');
    }
  };

  const eliminarDelCarrito = async (productoId) => {
    if (!user) return;

    try {
      const nuevoCarrito = carrito.filter(item => item.id !== productoId);
      await guardarCarrito(nuevoCarrito);
      toast.success('Producto eliminado del carrito');
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      toast.error('Error al eliminar del carrito');
    }
  };

  const limpiarCarrito = async () => {
    if (!user) return;

    try {
      await guardarCarrito([]);
      toast.success('Carrito vaciado');
    } catch (error) {
      console.error('Error al limpiar el carrito:', error);
      toast.error('Error al limpiar el carrito');
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => {
      return total + (item.precio * (item.cantidad || 1));
    }, 0);
  };

  const value = {
    carrito,
    loading,
    agregarAlCarrito,
    eliminarDelCarrito,
    limpiarCarrito,
    calcularTotal,
    actualizarCantidad
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

export default CarritoContext;
