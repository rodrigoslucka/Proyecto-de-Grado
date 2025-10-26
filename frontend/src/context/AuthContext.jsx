import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  console.log('🔧 AuthProvider montado');

  // Cargar usuario al iniciar
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        if (authService.isAuthenticated()) {
          const user = authService.getLocalUser();
          setUsuario(user);
          console.log('✅ Usuario cargado del localStorage:', user);
        }
      } catch (error) {
        console.error('❌ Error al cargar usuario:', error);
        setError('Error al cargar sesión');
      } finally {
        setCargando(false);
      }
    };

    cargarUsuario();
  }, []);

  /**
   * Login
   */
  const login = async (email, password) => {
    try {
      setError(null);
      setCargando(true);
      console.log('🔐 Intentando login:', email);
      
      const data = await authService.login(email, password);
      setUsuario(data.usuario);
      
      console.log('✅ Login exitoso');
      return data;
    } catch (error) {
      console.error('❌ Error en login:', error);
      setError(error.mensaje || 'Error al iniciar sesión');
      throw error;
    } finally {
      setCargando(false);
    }
  };

  /**
   * Register
   */
  const register = async (userData) => {
    try {
      setError(null);
      setCargando(true);
      console.log('📝 AuthContext: Intentando registrar:', userData);
      
      const data = await authService.register(userData);
      setUsuario(data.usuario);
      
      console.log('✅ AuthContext: Registro exitoso');
      return data;
    } catch (error) {
      console.error('❌ AuthContext: Error en register:', error);
      setError(error.mensaje || 'Error al registrar usuario');
      throw error;
    } finally {
      setCargando(false);
    }
  };

  /**
   * Logout
   */
  const logout = async () => {
    try {
      console.log('👋 Cerrando sesión');
      await authService.logout();
      setUsuario(null);
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
    }
  };

  /**
   * Actualizar usuario
   */
  const actualizarUsuario = (nuevosDatos) => {
    const usuarioActualizado = { ...usuario, ...nuevosDatos };
    setUsuario(usuarioActualizado);
    localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
    console.log('✅ Usuario actualizado');
  };

  const value = {
    usuario,
    cargando,
    error,
    login,
    register,
    logout,
    actualizarUsuario,
    isAuthenticated: !!usuario
  };

  console.log('🔧 AuthContext value:', {
    usuario: usuario?.email,
    cargando,
    hasRegister: typeof register === 'function',
    hasLogin: typeof login === 'function'
  });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  console.log('🔧 useAuth llamado, context:', {
    exists: !!context,
    hasRegister: typeof context?.register === 'function'
  });
  
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  
  return context;
};

export default AuthContext;