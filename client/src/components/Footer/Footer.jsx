import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { WHATSAPP_NUMBER, FACEBOOK_URL } from '../../config/constants';
import './Footer.css';
import ScrollToTopButton from '../ScrollToTopButton';

const Footer = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path); // Cambia a la nueva ruta
    window.scrollTo(0, 0); // Desplazarse a la parte superior de la página
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          {/* Información de la empresa */}
          <div className="section">
            <img
              src="/logo.png"
              alt="Brincolinas Franco"
              className="logo"
            />
            <p className="description">
              Renta de brincolines y mobiliario para tus eventos especiales.
              Servicio de calidad y atención personalizada.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="section">
            <h3 className="title">Enlaces Rápidos</h3>
            <ul>
              <li>
                <span
                  onClick={() => handleButtonClick('/productos')}
                  className="link"
                >
                  Productos
                </span>
              </li>
              <li>
                <span
                  onClick={() => handleButtonClick('/nosotros')}
                  className="link"
                >
                  Nosotros
                </span>
              </li>
              <li>
                <span
                  onClick={() => handleButtonClick('/contacto')}
                  className="link"
                >
                  Contacto
                </span>
              </li>
              <li>
                <span
                  onClick={() => handleButtonClick('/preguntas-frecuentes')}
                  className="link"
                >
                  Preguntas Frecuentes
                </span>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="section">
            <h3 className="title">Contacto</h3>
            <div className="contact-info">
              <FaMapMarkerAlt className="icon" />
              <span>Dirección del negocio, Ciudad, Estado</span>
            </div>
            <div className="contact-info">
              <FaPhone className="icon" />
              <a href="tel:+1234567890" className="link">
                (123) 456-7890
              </a>
            </div>
            <div className="contact-info">
              <FaEnvelope className="icon" />
              <a href="mailto:info@brincolinasfranco.com" className="link">
                info@brincolinasfranco.com
              </a>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="section">
            <h3 className="title">Síguenos</h3>
            <div className="social">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaFacebook className="icon" />
                <span>Facebook</span>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaWhatsapp className="icon" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} Brincolinas Franco. Todos los derechos reservados.
          </p>
        </div>
      </div>
      <ScrollToTopButton />
    </footer>
  );
};

export default Footer;