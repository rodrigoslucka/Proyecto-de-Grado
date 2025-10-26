const User = require('../models/User');
const { generarToken } = require('../utils/jwt');

/**
 * @desc    Registrar nuevo usuario
 * @route   POST /api/auth/register
 * @access  Público
 */
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, password, rol, codigo, semestre } = req.body;

    console.log('📝 Intento de registro:', { nombre, apellido, email, rol });

    // Validaciones básicas
    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({
        success: false,
        mensaje: 'Por favor complete todos los campos obligatorios'
      });
    }

    // Verificar si el usuario ya existe
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({
        success: false,
        mensaje: 'El email ya está registrado'
      });
    }

    // Si es estudiante, validar código
    if (rol === 'estudiante' && !codigo) {
      return res.status(400).json({
        success: false,
        mensaje: 'El código de estudiante es obligatorio'
      });
    }

    // Crear usuario
    const usuario = await User.create({
      nombre,
      apellido,
      email,
      password,
      rol: rol || 'estudiante',
      codigo,
      semestre
    });

    // Generar token
    const token = generarToken(usuario._id);

    console.log('✅ Usuario registrado exitosamente:', email);

    res.status(201).json({
      success: true,
      mensaje: 'Usuario registrado exitosamente',
      token,
      usuario: usuario.obtenerDatosPublicos()
    });
  } catch (error) {
    console.error('❌ Error en registrarUsuario:', error);
    
    if (error.name === 'ValidationError') {
      const mensajes = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        mensaje: mensajes.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      mensaje: 'Error del servidor al registrar usuario'
    });
  }
};

/**
 * @desc    Login de usuario
 * @route   POST /api/auth/login
 * @access  Público
 */
const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Intento de login:', email);

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        mensaje: 'Por favor ingrese email y contraseña'
      });
    }

    // Buscar usuario con password
    const usuario = await User.findOne({ email }).select('+password');

    if (!usuario) {
      return res.status(401).json({
        success: false,
        mensaje: 'Credenciales inválidas'
      });
    }

    // Verificar si el usuario está activo
    if (!usuario.activo) {
      return res.status(403).json({
        success: false,
        mensaje: 'Usuario inactivo. Contacte al administrador'
      });
    }

    // Verificar contraseña
    const passwordCorrecto = await usuario.compararPassword(password);

    if (!passwordCorrecto) {
      return res.status(401).json({
        success: false,
        mensaje: 'Credenciales inválidas'
      });
    }

    // Actualizar último acceso
    usuario.ultimoAcceso = Date.now();
    await usuario.save();

    // Generar token
    const token = generarToken(usuario._id);

    console.log('✅ Login exitoso:', email);

    res.status(200).json({
      success: true,
      mensaje: 'Login exitoso',
      token,
      usuario: usuario.obtenerDatosPublicos()
    });
  } catch (error) {
    console.error('❌ Error en loginUsuario:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error del servidor al hacer login'
    });
  }
};

/**
 * @desc    Obtener usuario actual
 * @route   GET /api/auth/me
 * @access  Privado
 */
const obtenerUsuarioActual = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id);

    res.status(200).json({
      success: true,
      usuario: usuario.obtenerDatosPublicos()
    });
  } catch (error) {
    console.error('❌ Error en obtenerUsuarioActual:', error);
    res.status(500).json({
      success: false,
      mensaje: 'Error del servidor'
    });
  }
};

/**
 * @desc    Logout
 * @route   POST /api/auth/logout
 * @access  Privado
 */
const logoutUsuario = async (req, res) => {
  res.status(200).json({
    success: true,
    mensaje: 'Logout exitoso'
  });
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  obtenerUsuarioActual,
  logoutUsuario
};