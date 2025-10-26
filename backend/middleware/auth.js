const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware para proteger rutas - verifica JWT
 */
const proteger = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extraer token del header
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Obtener usuario del token (sin la contraseña)
      req.usuario = await User.findById(decoded.id).select('-password');

      if (!req.usuario) {
        return res.status(404).json({
          success: false,
          mensaje: 'Usuario no encontrado'
        });
      }

      if (!req.usuario.activo) {
        return res.status(403).json({
          success: false,
          mensaje: 'Usuario inactivo'
        });
      }

      // Actualizar último acceso
      req.usuario.ultimoAcceso = Date.now();
      await req.usuario.save();

      next();
    } catch (error) {
      console.error('Error en middleware de autenticación:', error);
      return res.status(401).json({
        success: false,
        mensaje: 'No autorizado, token inválido'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      mensaje: 'No autorizado, no hay token'
    });
  }
};

/**
 * Middleware para autorizar roles específicos
 * @param  {...String} roles - Roles permitidos
 */
const autorizarRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({
        success: false,
        mensaje: `El rol ${req.usuario.rol} no tiene permiso para acceder a este recurso`
      });
    }
    next();
  };
};

module.exports = { proteger, autorizarRoles };