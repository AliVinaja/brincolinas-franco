import React from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook } from 'react-icons/fa';
import { WHATSAPP_NUMBER, FACEBOOK_URL } from '../config/constants';

const Contacto = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Contáctanos</h1>
      
      {/* Cambia la proporción de las columnas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Formulario de contacto - Ocupa 2/3 del espacio y está a la izquierda */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Envíanos un Mensaje</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre completo
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo electrónico
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Teléfono
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mensaje
                <textarea
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                ></textarea>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>

        {/* Información de contacto - Ocupa 1/3 del espacio y está a la derecha */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Información de Contacto</h2>
          
          <div className="flex items-center space-x-4">
            <FaPhone className="text-blue-600 text-xl" />
            <div>
              <h3 className="font-medium">Teléfono</h3>
              <p>{process.env.REACT_APP_PHONE_NUMBER}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaWhatsapp className="text-green-500 text-xl" />
            <div>
              <h3 className="font-medium">WhatsApp</h3>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                +52 686 589 8160
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-blue-600 text-xl" />
            <div>
              <h3 className="font-medium">Correo Electrónico</h3>
              <a 
                href="mailto:info@brincolinasfranco.com"
                className="text-blue-600 hover:text-blue-800"
              >
                info@brincolinasfranco.com
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-red-500 text-xl" />
            <div>
              <h3 className="font-medium">Ubicación</h3>
              <p>Tijuana, Baja California</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <FaFacebook className="text-blue-600 text-xl" />
            <div>
              <h3 className="font-medium">Facebook</h3>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Brincolinas Franco
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;