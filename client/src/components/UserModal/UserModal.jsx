import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebaseConfig';
import './UserModal.css';

const UserModal = ({ isOpen, onClose, user }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    navigate('/login');
    onClose();
  };

  const handleRegister = () => {
    navigate('/register');
    onClose();
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      onClose();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="user-modal-overlay" onClick={onClose}>
      <div className="user-modal-content" onClick={e => e.stopPropagation()}>
        {user ? (
          <>
            <div className="user-info">
              <div className="user-avatar">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    {user.email ? user.email[0].toUpperCase() : 'U'}
                  </div>
                )}
              </div>
              <div className="user-details">
                <h3>{user.displayName || 'Usuario'}</h3>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="user-actions">
              <button 
                className="logout-button"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          </>
        ) : (
          <div className="auth-buttons">
            <button 
              className="login-button"
              onClick={handleLogin}
            >
              Iniciar Sesión
            </button>
            <button 
              className="register-button"
              onClick={handleRegister}
            >
              Registrarse
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserModal;
