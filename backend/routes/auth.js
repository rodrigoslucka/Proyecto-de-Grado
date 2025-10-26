const express = require('express');
const router = express.Router();
const {
  registrarUsuario,
  loginUsuario,
  obtenerUsuarioActual,
  logoutUsuario
} = require('../controllers/authController');
const { proteger } = require('../middleware/auth');

// Rutas públicas
router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);

// Rutas protegidas
router.get('/me', proteger, obtenerUsuarioActual);
router.post('/logout', proteger, logoutUsuario);

module.exports = router;