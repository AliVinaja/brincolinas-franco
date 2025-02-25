import React, { useState } from 'react';
import MapSelector from './MapSelector';
import './DireccionConfirmacion.css';

const DireccionConfirmacion = ({ onDireccionConfirm, direccionInicial }) => {
  const [direccion, setDireccion] = useState(direccionInicial || {
    calle: '',
    numero: '',
    colonia: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    referencias: '',
    coordenadas: null
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDireccion(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLocationSelect = (addressComponents) => {
    setDireccion(prev => ({
      ...prev,
      ...addressComponents
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!direccion.calle.trim()) newErrors.calle = 'La calle es requerida';
    if (!direccion.numero.trim()) newErrors.numero = 'El número es requerido';
    if (!direccion.colonia.trim()) newErrors.colonia = 'La colonia es requerida';
    if (!direccion.codigoPostal.trim()) newErrors.codigoPostal = 'El código postal es requerido';
    if (!direccion.ciudad.trim()) newErrors.ciudad = 'La ciudad es requerida';
    if (!direccion.estado.trim()) newErrors.estado = 'El estado es requerido';
    if (!direccion.coordenadas) newErrors.coordenadas = 'Por favor selecciona una ubicación en el mapa';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onDireccionConfirm(direccion);
    }
  };

  return (
    <div className="direccion-form space-y-6">
      <h3 className="form-title text-lg font-semibold mb-4">
        Confirma la dirección de entrega
      </h3>

      <MapSelector
        onLocationSelect={handleLocationSelect}
        initialLocation={direccion.coordenadas}
      />

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="calle" className="form-label block text-sm font-medium text-gray-700">
              Calle
            </label>
            <input
              type="text"
              id="calle"
              name="calle"
              value={direccion.calle}
              onChange={handleInputChange}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
            {errors.calle && <span className="form-error">{errors.calle}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="numero" className="form-label block text-sm font-medium text-gray-700">
              Número
            </label>
            <input
              type="text"
              id="numero"
              name="numero"
              value={direccion.numero}
              onChange={handleInputChange}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
            {errors.numero && <span className="form-error">{errors.numero}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="colonia" className="form-label block text-sm font-medium text-gray-700">
              Colonia
            </label>
            <input
              type="text"
              id="colonia"
              name="colonia"
              value={direccion.colonia}
              onChange={handleInputChange}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
            {errors.colonia && <span className="form-error">{errors.colonia}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="ciudad" className="form-label block text-sm font-medium text-gray-700">
              Ciudad
            </label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              value={direccion.ciudad}
              onChange={handleInputChange}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
            {errors.ciudad && <span className="form-error">{errors.ciudad}</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="estado" className="form-label block text-sm font-medium text-gray-700">
              Estado
            </label>
            <input
              type="text"
              id="estado"
              name="estado"
              value={direccion.estado}
              onChange={handleInputChange}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
            {errors.estado && <span className="form-error">{errors.estado}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="codigoPostal" className="form-label block text-sm font-medium text-gray-700">
              Código Postal
            </label>
            <input
              type="text"
              id="codigoPostal"
              name="codigoPostal"
              value={direccion.codigoPostal}
              onChange={handleInputChange}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
            {errors.codigoPostal && <span className="form-error">{errors.codigoPostal}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="referencias" className="form-label block text-sm font-medium text-gray-700">
            Referencias para la entrega
          </label>
          <textarea
            id="referencias"
            name="referencias"
            value={direccion.referencias}
            onChange={handleInputChange}
            rows="3"
            className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="Ej: Casa blanca de dos pisos, portón negro, frente a una tienda..."
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Confirmar dirección
          </button>
        </div>
      </form>

      {/* Vista previa de la dirección */}
      {direccion.calle && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Dirección seleccionada:</h4>
          <p className="text-gray-700">
            {direccion.calle} {direccion.numero}<br />
            {direccion.colonia}<br />
            {direccion.ciudad}, {direccion.estado}<br />
            CP: {direccion.codigoPostal}
            {direccion.referencias && (
              <>
                <br />
                Referencias: {direccion.referencias}
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default DireccionConfirmacion;
