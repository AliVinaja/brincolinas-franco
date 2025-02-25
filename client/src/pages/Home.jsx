import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_NUMBER } from '../config/constants';

const Home = () => {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ¡Haz tu fiesta inolvidable!
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Renta los mejores brincolines y mobiliario para tu evento
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/productos"
                className="btn btn-primary bg-white text-blue-600 hover:bg-gray-100"
              >
                Ver Productos
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary flex items-center"
              >
                <FaWhatsapp className="mr-2" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 50C480 60 600 60 720 50C840 40 960 20 1080 15C1200 10 1320 20 1380 25L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Características */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6">
              <FaCheckCircle className="text-blue-600 text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
              <p className="text-gray-600">
                Todos nuestros productos son de la más alta calidad y reciben
                mantenimiento constante.
              </p>
            </div>
            <div className="card p-6">
              <FaCheckCircle className="text-blue-600 text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Entrega Puntual</h3>
              <p className="text-gray-600">
                Nos aseguramos de entregar e instalar todo a tiempo para tu evento.
              </p>
            </div>
            <div className="card p-6">
              <FaCheckCircle className="text-blue-600 text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">Precios Competitivos</h3>
              <p className="text-gray-600">
                Ofrecemos los mejores precios del mercado sin comprometer la
                calidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías Populares */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Categorías Populares
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Link
              to="/productos?categoria=brincolines"
              className="card overflow-hidden group"
            >
              <img
                src="/images/brincolines.jpg"
                alt="Brincolines"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Brincolines</h3>
              </div>
            </Link>
            <Link
              to="/productos?categoria=mesas"
              className="card overflow-hidden group"
            >
              <img
                src="/images/mesas.jpg"
                alt="Mesas"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Mesas</h3>
              </div>
            </Link>
            <Link
              to="/productos?categoria=sillas"
              className="card overflow-hidden group"
            >
              <img
                src="/images/sillas.jpg"
                alt="Sillas"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Sillas</h3>
              </div>
            </Link>
            <Link
              to="/productos?categoria=toldos"
              className="card overflow-hidden group"
            >
              <img
                src="/images/toldos.jpg"
                alt="Toldos"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Toldos</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Home;
