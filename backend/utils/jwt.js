const jwt = require('jsonwebtoken');

/**
 * Genera un token JWT
 * @param {String} userId - ID del usuario
 * @returns {String} Token JWT firmado
 */
const generarToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

/**
 * Verifica un token JWT
 * @param {String} token - Token a verificar
 * @returns {Object} Payload del token decodificado
 */
const verificarToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};

module.exports = {
  generarToken,
  verificarToken
};