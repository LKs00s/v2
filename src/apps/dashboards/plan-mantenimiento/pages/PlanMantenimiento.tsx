import React, { useState, useEffect } from 'react';
import { Calendar, BarChart3, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';

interface PlanMantenimientoProps {
  darkMode: boolean;
}

export const PlanMantenimiento: React.FC<PlanMantenimientoProps> = ({ darkMode }) => {
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    // Check if running in iframe (embedded)
    try {
      setIsEmbedded(window.self !== window.top);
    } catch (e) {
      // If we can't access window.top due to cross-origin restrictions, assume embedded
      setIsEmbedded(true);
    }

    // Simulate loading time for Power BI
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const refreshDashboard = () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <RefreshCw className="w-8 h-8 text-white animate-spin" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl blur opacity-25 animate-pulse"></div>
          </div>
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Cargando Dashboard
          </h3>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            Conectando con Power BI...
          </p>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} ${
      darkMode 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Header - Solo mostrar si no está en fullscreen */}
      {!isFullscreen && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
              Plan de Mantenimiento
            </h1>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Dashboard interactivo de planificación y seguimiento
            </p>
          </div>

          {/* Controls */}
          <div className="mb-6 flex justify-end space-x-3">
            <button
              onClick={refreshDashboard}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualizar
            </button>
            <button
              onClick={toggleFullscreen}
              className={`flex items-center px-4 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                darkMode 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Maximize2 className="w-4 h-4 mr-2" />
              Pantalla Completa
            </button>
          </div>
        </div>
      )}

      {/* Dashboard Container */}
      <div className={`${
        isFullscreen 
          ? 'w-full h-full' 
          : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8'
      }`}>
        <div className={`${
          darkMode 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        } backdrop-blur-sm rounded-2xl shadow-xl border overflow-hidden ${
          isFullscreen ? 'h-full' : 'h-[95vh]'
        }`}>
          
          {/* Fullscreen Controls */}
          {isFullscreen && (
            <div className={`flex justify-between items-center px-6 py-3 border-b ${
              darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
            }`}>
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Plan de Mantenimiento - Dashboard
              </h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={refreshDashboard}
                  className="flex items-center px-3 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualizar
                </button>
                <button
                  onClick={toggleFullscreen}
                  className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
                    darkMode 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Minimize2 className="w-4 h-4 mr-2" />
                  Salir
                </button>
              </div>
            </div>
          )}

          {/* Power BI Iframe */}
          <div className={`w-full ${
            isFullscreen 
              ? 'h-[calc(100%-4rem)]' 
              : 'h-full'
          }`}>
            <iframe 
              title="Dashboard Base de Datos online v1 - copia" 
              width="100%" 
              height="100%" 
              src="https://app.powerbi.com/view?r=eyJrIjoiY2U5MTMyZDctZDM4Ny00MjgzLWFhZDQtNDQxM2Y3ZjFjYTIwIiwidCI6IjM2MDBmOGJiLWQ4NDMtNDg4OS1iYjk0LTJkNmUxYjAyMTZmMyIsImMiOjR9" 
              frameBorder="0" 
              allowFullScreen={true}
              style={{ border: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};