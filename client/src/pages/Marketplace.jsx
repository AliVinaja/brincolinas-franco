import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard/ProductCard.jsx';
import { FaSearch } from 'react-icons/fa';

const Marketplace = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtros, setFiltros] = useState({
    categoria: '',
    precioMin: '',
    precioMax: '',
    capacidad: '',
    busqueda: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const [productosRes, categoriasRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_URL}/api/productos`),
          fetch(`${process.env.REACT_APP_API_URL}/api/categorias`)
        ]);

        if (!productosRes.ok || !categoriasRes.ok) {
          throw new Error('Error al cargar los datos');
        }

        const productosData = await productosRes.json();
        const categoriasData = await categoriasRes.json();

        setProductos(productosData);
        setCategorias(categoriasData);
        setError(null);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setError('Error al cargar los productos. Por favor, intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filtrarProductos = () => {
    return productos.filter(producto => {
      if (filtros.categoria && producto.categoria._id !== filtros.categoria) {
        return false;
      }
      if (filtros.precioMin && producto.precio < parseFloat(filtros.precioMin)) {
        return false;
      }
      if (filtros.precioMax && producto.precio > parseFloat(filtros.precioMax)) {
        return false;
      }
      if (filtros.capacidad && producto.capacidad < parseInt(filtros.capacidad)) {
        return false;
      }
      if (filtros.busqueda) {
        const busqueda = filtros.busqueda.toLowerCase();
        return (
          producto.nombre.toLowerCase().includes(busqueda) ||
          producto.descripcion.toLowerCase().includes(busqueda)
        );
      }
      return true;
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl text-red-600">{error}</h2>
      </div>
    );
  }

  const productosFiltrados = filtrarProductos();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Barra de búsqueda */}
      <div className="mb-8">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              name="busqueda"
              value={filtros.busqueda}
              onChange={handleFiltroChange}
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Panel de filtros */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Categoría */}
          <div>
            <h3 className="font-semibold mb-2">Categorías</h3>
            <select
              name="categoria"
              value={filtros.categoria}
              onChange={handleFiltroChange}
              className="w-full p-2 border rounded-lg"
            >
              <option key="todas" value="">Todas las categorías</option>
              {categorias.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Capacidad mínima */}
          <div>
            <h3 className="font-semibold mb-2">Capacidad mínima</h3>
            <input
              type="number"
              name="capacidad"
              value={filtros.capacidad}
              onChange={handleFiltroChange}
              placeholder="Número de personas"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          {/* Precio por hora */}
          <div>
            <h3 className="font-semibold mb-2">Precio por hora</h3>
            <div className="flex gap-2">
              <input
                type="number"
                name="precioMin"
                value={filtros.precioMin}
                onChange={handleFiltroChange}
                placeholder="Min"
                className="w-1/2 p-2 border rounded-lg"
              />
              <input
                type="number"
                name="precioMax"
                value={filtros.precioMax}
                onChange={handleFiltroChange}
                placeholder="Max"
                className="w-1/2 p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="md:col-span-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosFiltrados.map((producto, index) => (
            <ProductCard key={index} producto={producto} />
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <div className="text-center py-10">
            <h2 className="text-2xl text-gray-600">
              No se encontraron productos que coincidan con los filtros
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;