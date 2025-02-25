import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import axios from 'axios';

const Productos = () => {
  const [state, setState] = useState({ productos: [], categorias: [], loading: true, error: null });
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const { categoria } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prevState => ({ ...prevState, loading: true }));
        
        // Obtener categorías
        const categoriasRes = await fetch(`${process.env.REACT_APP_API_URL}/api/categorias`);
        const categoriasData = await categoriasRes.json();

        // Obtener productos
        const url = categoria
          ? `${process.env.REACT_APP_API_URL}/api/productos/categoria/${categoria}`
          : `${process.env.REACT_APP_API_URL}/api/productos`;
        
        const productosRes = await fetch(url);
        const productosData = await productosRes.json();
        
        setState({ 
          productos: productosData.map(p => ({
            ...p,
            _id: p.id,  // Mapear id de Sequelize
            categoria: p.Categoria ? p.Categoria.nombre : null
          })), 
          categorias: categoriasData.map(c => ({
            ...c,
            _id: c.id  // Mapear id de Sequelize
          })), 
          loading: false, 
          error: null 
        });
      } catch (err) {
        setState(prevState => ({ ...prevState, loading: false, error: 'Error al cargar los productos' }));
        console.error(err);
      }
    };

    fetchData();
  }, [categoria]);

  const agregarProducto = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/productos/${idEditar}`, { nombre, precio });
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/productos`, { nombre, precio });
      }
      setNombre('');
      setPrecio('');
      setEditando(false);
      setIdEditar(null);
      obtenerProductos();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const editarProducto = (producto) => {
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setEditando(true);
    setIdEditar(producto.id);  // Cambiar de _id a id
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/productos/${id}`);
      obtenerProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/productos`);
      setState(prevState => ({ 
        ...prevState, 
        productos: response.data.map(p => ({
          ...p,
          _id: p.id,  // Mapear id de Sequelize
          categoria: p.Categoria ? p.Categoria.nombre : null
        }))
      }));
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  if (state.loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl text-red-600">{state.error}</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filtro de categorías */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
        {state.categorias.map((cat) => (
          <a
            key={cat._id}
            href={`/productos/${cat.slug}`}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              categoria === cat.slug
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat.nombre}
          </a>
        ))}
      </div>

      {/* Listado de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {state.productos.map((producto) => (
          <ProductCard 
            key={producto._id} 
            producto={producto} 
            onEditar={editarProducto}
            onEliminar={eliminarProducto}
          />
        ))}
      </div>

      {/* Formulario de agregar/editar producto */}
      <form onSubmit={agregarProducto} className="mt-8 max-w-md mx-auto">
        <div className="mb-4">
          <input 
            type="text" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del producto" 
            className="w-full px-3 py-2 border rounded"
            required 
          />
        </div>
        <div className="mb-4">
          <input 
            type="number" 
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio" 
            className="w-full px-3 py-2 border rounded"
            required 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
        >
          {editando ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </form>
    </div>
  );
};

export default Productos;
