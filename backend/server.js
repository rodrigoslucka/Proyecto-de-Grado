require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Importar rutas
const authRoutes = require('./routes/auth');

// Crear aplicación Express
const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger simple para desarrollo
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`📨 ${req.method} ${req.path}`);
    next();
  });
}

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true,
    mensaje: 'API funcionando correctamente' 
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'Servidor de Gestión de Proyectos - UATF',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      test: '/api/test'
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  console.log(`⚠️  Ruta no encontrada: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    mensaje: 'Ruta no encontrada',
    path: req.path,
    metodo: req.method
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    success: false,
    mensaje: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Puerto
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log('🚀 Servidor corriendo en puerto ' + PORT);
  console.log('📍 Modo: ' + (process.env.NODE_ENV || 'development'));
  console.log('═══════════════════════════════════════════════════');
  console.log('🔗 Rutas disponibles:');
  console.log('   GET  http://localhost:' + PORT + '/');
  console.log('   GET  http://localhost:' + PORT + '/api/test');
  console.log('   POST http://localhost:' + PORT + '/api/auth/register');
  console.log('   POST http://localhost:' + PORT + '/api/auth/login');
  console.log('   GET  http://localhost:' + PORT + '/api/auth/me');
  console.log('   POST http://localhost:' + PORT + '/api/auth/logout');
  console.log('═══════════════════════════════════════════════════');
  console.log('');
});