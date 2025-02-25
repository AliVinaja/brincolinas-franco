import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../config/firebaseConfig';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      toast.success('¡Bienvenido!');
      navigate('/');
      return { success: true };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Mapeamos los códigos de error de Firebase a mensajes personalizados
      let errorMessage;
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
          errorMessage = 'Credenciales incorrectas';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No existe una cuenta con este correo electrónico';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos fallidos. Por favor, intenta más tarde';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El formato del correo electrónico no es válido';
          break;
        default:
          errorMessage = 'Error al iniciar sesión. Por favor, intenta de nuevo';
      }
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success('¡Hasta pronto!');
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
    }
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
