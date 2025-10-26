import React from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/dashboard/Sidebar';

const Dashboard = () => {
  const { usuario } = useAuth();

  // Datos de ejemplo (después se traerán del backend)
  const stats = [
    {
      title: 'Proyectos Activos',
      value: '3',
      change: '+2 este mes',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Tareas Pendientes',
      value: '12',
      change: '4 vencen pronto',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Completadas',
      value: '28',
      change: '+8 esta semana',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Miembros del Equipo',
      value: '5',
      change: 'Activos',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  const proyectosRecientes = [
    {
      id: 1,
      nombre: 'Sistema de Inventario',
      descripcion: 'Desarrollo de sistema web para control de inventarios',
      progreso: 65,
      estado: 'En Progreso',
      miembros: 4,
      tareasPendientes: 8
    },
    {
      id: 2,
      nombre: 'App Móvil Educativa',
      descripcion: 'Aplicación móvil para gestión de tareas estudiantiles',
      progreso: 30,
      estado: 'En Progreso',
      miembros: 3,
      tareasPendientes: 15
    },
    {
      id: 3,
      nombre: 'Portal Web Universitario',
      descripcion: 'Rediseño del portal web institucional',
      progreso: 90,
      estado: 'Por Finalizar',
      miembros: 5,
      tareasPendientes: 2
    }
  ];

  const actividadReciente = [
    {
      id: 1,
      usuario: 'María González',
      accion: 'completó la tarea',
      detalle: 'Diseño de interfaz de usuario',
      tiempo: 'Hace 2 horas',
      tipo: 'completado'
    },
    {
      id: 2,
      usuario: 'Carlos Pérez',
      accion: 'comentó en',
      detalle: 'Sistema de Inventario',
      tiempo: 'Hace 3 horas',
      tipo: 'comentario'
    },
    {
      id: 3,
      usuario: 'Ana Martínez',
      accion: 'creó una nueva tarea',
      detalle: 'Implementar módulo de reportes',
      tiempo: 'Hace 5 horas',
      tipo: 'nueva'
    },
    {
      id: 4,
      usuario: usuario?.nombre + ' ' + usuario?.apellido,
      accion: 'actualizó el estado de',
      detalle: 'App Móvil Educativa',
      tiempo: 'Hace 1 día',
      tipo: 'actualizado'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Bienvenido, {usuario?.nombre}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Aquí tienes un resumen de tus proyectos y tareas
              </p>
            </div>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Nuevo Proyecto</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} bg-opacity-10 p-3 rounded-lg`}>
                    <div className={`${stat.color.replace('bg-', 'text-')}`}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Proyectos Recientes */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Proyectos Recientes</h2>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Ver todos →
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  {proyectosRecientes.map((proyecto) => (
                    <div key={proyecto.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{proyecto.nombre}</h3>
                          <p className="text-sm text-gray-600">{proyecto.descripcion}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          proyecto.estado === 'En Progreso' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {proyecto.estado}
                        </span>
                      </div>
                      
                      {/* Barra de progreso */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progreso</span>
                          <span className="font-medium text-gray-900">{proyecto.progreso}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${proyecto.progreso}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            {proyecto.miembros} miembros
                          </div>
                          <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            {proyecto.tareasPendientes} tareas
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actividad Reciente */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Actividad Reciente</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {actividadReciente.map((actividad) => (
                      <div key={actividad.id} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          actividad.tipo === 'completado' ? 'bg-green-500' :
                          actividad.tipo === 'comentario' ? 'bg-blue-500' :
                          actividad.tipo === 'nueva' ? 'bg-purple-500' :
                          'bg-gray-400'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">{actividad.usuario}</span>{' '}
                            <span className="text-gray-600">{actividad.accion}</span>
                          </p>
                          <p className="text-sm text-gray-600 truncate">{actividad.detalle}</p>
                          <p className="text-xs text-gray-500 mt-1">{actividad.tiempo}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Accesos Rápidos */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Accesos Rápidos</h2>
                </div>
                <div className="p-6 space-y-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-medium">Crear Proyecto</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span className="font-medium">Nueva Tarea</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span className="font-medium">Invitar Miembro</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="font-medium">Ver Reportes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;