import React, { useState } from 'react';

const DireccionConfirmacion = ({ onConfirm }) => {
  const [direccion, setDireccion] = useState({
    calle: '',
    numero: '',
    colonia: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    referencias: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDireccion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(direccion);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Confirma la dirección de entrega</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Calle
            <input
              type="text"
              name="calle"
              value={direccion.calle}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Número
              <input
                type="text"
                name="numero"
                value={direccion.numero}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Colonia
              <input
                type="text"
                name="colonia"
                value={direccion.colonia}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ciudad
              <input
                type="text"
                name="ciudad"
                value={direccion.ciudad}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estado
              <input
                type="text"
                name="estado"
                value={direccion.estado}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Código Postal
              <input
                type="text"
                name="codigoPostal"
                value={direccion.codigoPostal}
                onChange={handleChange}
                required
                pattern="[0-9]{5}"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Referencias
            <textarea
              name="referencias"
              value={direccion.referencias}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Puntos de referencia, color de la casa, etc."
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Confirmar Dirección
          </button>
        </div>
      </form>
    </div>
  );
};

export default DireccionConfirmacion;
