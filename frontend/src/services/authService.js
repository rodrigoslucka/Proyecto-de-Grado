import api from './api';

const authService = {
  /**
   * Registrar nuevo usuario
   */
  register: async (userData) => {
    try {
      console.log('🔵 Intentando registrar usuario:', userData);
      console.log('🔵 URL de API:', api.defaults.baseURL);
      
      const response = await api.post('/auth/register', userData);
      
      console.log('✅ Respuesta exitosa:', response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      }
      
      return response.data;
    } catch (error) {
      console.error('❌ Error en register:', error);
      console.error('❌ Detalles:', error.response?.data);
      throw error.response?.data || { mensaje: 'Error de conexión' };
    }
  },

  /**
   * Login de usuario
   */
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error de conexión' };
    }
  },

  /**
   * Logout de usuario
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
  },

  /**
   * Obtener usuario actual
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data.usuario;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error de conexión' };
    }
  },

  /**
   * Verificar si hay usuario autenticado
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Obtener token
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Obtener usuario del localStorage
   */
  getLocalUser: () => {
    const user = localStorage.getItem('usuario');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;