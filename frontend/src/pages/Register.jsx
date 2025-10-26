import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, cargando } = useAuth();

  // DEBUG - Ver variables de entorno
  console.log('🔧 ENV en Register:', import.meta.env.VITE_API_URL);
  console.log('🔧 Todas las ENV:', import.meta.env);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmarPassword: '',
    rol: 'estudiante',
    codigo: '',
    semestre: ''
  });

  const [error, setError] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const { nombre, apellido, email, password, confirmarPassword, rol, codigo, semestre } = formData;

  // Manejar cambios en inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // Validar formulario
  const validarFormulario = () => {
    if (!nombre || !apellido || !email || !password || !confirmarPassword) {
      setError('Por favor complete todos los campos obligatorios');
      return false;
    }

    if (!email.includes('@')) {
      setError('Por favor ingrese un email válido');
      return false;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    if (rol === 'estudiante' && !codigo) {
      setError('El código de estudiante es obligatorio');
      return false;
    }

    if (rol === 'estudiante' && semestre && (semestre < 1 || semestre > 10)) {
      setError('El semestre debe estar entre 1 y 10');
      return false;
    }

    return true;
  };

  // Manejar submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log('🟢 handleSubmit ejecutado');
    console.log('🟢 formData:', formData);

    if (!validarFormulario()) {
      console.log('❌ Validación falló');
      return;
    }

    console.log('✅ Validación pasó');

    try {
      const userData = {
        nombre,
        apellido,
        email,
        password,
        rol,
        ...(rol === 'estudiante' && { codigo, semestre: parseInt(semestre) || undefined })
      };

      console.log('📤 Enviando userData:', userData);
      console.log('📤 Función register:', typeof register);

      await register(userData);

      console.log('✅ Register exitoso, navegando al dashboard...');
      navigate('/dashboard');
    } catch (error) {
      console.error('❌ Error en handleSubmit:', error);
      setError(error.mensaje || 'Error al registrar usuario');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl w-full space-y-8">
        {/* Logo y título */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16  rounded-lg flex items-center justify-center">
              <img className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" src='public/Logo.png'/>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Crear Cuenta Nueva
          </h2>          
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Error general */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Nombre y Apellido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  value={nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
                  placeholder="Juan"
                />
              </div>

              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  required
                  value={apellido}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
                  placeholder="Pérez"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
                placeholder="tu.email@ejemplo.com"
              />
            </div>

            {/* Rol */}
            <div>
              <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-2">
                Rol <span className="text-red-500">*</span>
              </label>
              <select
                id="rol"
                name="rol"
                value={rol}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
              >
                <option value="estudiante">Estudiante</option>
                <option value="docente">Docente</option>
                <option value="auxiliar">Auxiliar</option>
              </select>
            </div>

            {/* Campos específicos para estudiantes */}
            {rol === 'estudiante' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="codigo" className="block text-sm font-medium text-gray-700 mb-2">
                    Ru <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="codigo"
                    name="codigo"
                    type="text"
                    value={codigo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
                    placeholder="202012345"
                  />
                </div>

                <div>
                  <label htmlFor="semestre" className="block text-sm font-medium text-gray-700 mb-2">
                    Semestre
                  </label>
                  <input
                    id="semestre"
                    name="semestre"
                    type="number"
                    min="1"
                    max="10"
                    value={semestre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
                    placeholder="5"
                  />
                </div>
              </div>
            )}

            {/* Contraseñas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={mostrarPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {mostrarPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">Mínimo 6 caracteres</p>
              </div>

              <div>
                <label htmlFor="confirmarPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar contraseña <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmarPassword"
                  name="confirmarPassword"
                  type={mostrarPassword ? 'text' : 'password'}
                  required
                  value={confirmarPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Términos y condiciones */}
            <div className="flex items-start">
              <input
                id="terminos"
                name="terminos"
                type="checkbox"
                required
                className="h-4 w-4 mt-1 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="terminos" className="ml-2 block text-sm text-gray-700">
                Acepto los{' '}
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  términos y condiciones
                </a>{' '}
                y la{' '}
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  política de privacidad
                </a>
              </label>
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              disabled={cargando}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
            >
              {cargando ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registrando...
                </div>
              ) : (
                'Crear Cuenta'
              )}
            </button>

            {/* Link a login */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          © 2025 Universidad Autónoma Tomás Frías
        </p>
      </div>
    </div>
  );
};

export default Register;