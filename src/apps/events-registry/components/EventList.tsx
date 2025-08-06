import React from 'react';
import { Calendar, MapPin, User, AlertTriangle, Clock, Eye, CheckCircle2, FileX } from 'lucide-react';
import { MaintenanceEvent } from '../types/event';
import { EventService } from '../services/eventService';

interface EventListProps {
  darkMode: boolean;
  events: MaintenanceEvent[];
  selectedEvent: MaintenanceEvent | null;
  onEventSelect: (event: MaintenanceEvent) => void;
}

export const EventList: React.FC<EventListProps> = ({
  darkMode,
  events,
  selectedEvent,
  onEventSelect
}) => {
  const eventService = new EventService();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Crítica':
        return darkMode 
          ? 'bg-red-900/50 text-red-300 border-red-700' 
          : 'bg-red-100 text-red-800 border-red-200';
      case 'Alta':
        return darkMode 
          ? 'bg-orange-900/50 text-orange-300 border-orange-700' 
          : 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Media':
        return darkMode 
          ? 'bg-yellow-900/50 text-yellow-300 border-yellow-700' 
          : 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Baja':
        return darkMode 
          ? 'bg-green-900/50 text-green-300 border-green-700' 
          : 'bg-green-100 text-green-800 border-green-200';
      default:
        return darkMode 
          ? 'bg-gray-900/50 text-gray-300 border-gray-700' 
          : 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado':
        return darkMode 
          ? 'bg-green-900/50 text-green-300 border-green-700' 
          : 'bg-green-100 text-green-800 border-green-200';
      case 'En Progreso':
        return darkMode 
          ? 'bg-blue-900/50 text-blue-300 border-blue-700' 
          : 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pendiente':
        return darkMode 
          ? 'bg-gray-900/50 text-gray-300 border-gray-700' 
          : 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return darkMode 
          ? 'bg-gray-900/50 text-gray-300 border-gray-700' 
          : 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventStatusColor = (event: MaintenanceEvent) => {
    const { solutionMedia } = eventService.processEventMedia(event);
    const hasSolution = solutionMedia.length > 0;
    
    if (hasSolution) {
      return {
        bg: darkMode ? 'bg-green-900/30 border-green-700/50' : 'bg-green-50 border-green-200',
        indicator: 'bg-green-500',
        icon: <CheckCircle2 className="w-3 h-3 text-green-500" />
      };
    } else {
      return {
        bg: darkMode ? 'bg-yellow-900/30 border-yellow-700/50' : 'bg-yellow-50 border-yellow-200',
        indicator: 'bg-yellow-500',
        icon: <FileX className="w-3 h-3 text-yellow-500" />
      };
    }
  };

  if (events.length === 0) {
    return (
      <div className={`${
        darkMode 
          ? 'bg-gray-800/50 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      } backdrop-blur-sm rounded-2xl shadow-xl border p-8 text-center`}>
        <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          No se encontraron eventos
        </h3>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Intenta ajustar los filtros de búsqueda
        </p>
      </div>
    );
  }

  return (
    <div className={`${
      darkMode 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/80 border-gray-200'
    } backdrop-blur-sm rounded-2xl shadow-xl border overflow-hidden`}>
      <div className={`px-6 py-4 border-b flex justify-between items-center ${
        darkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        <h2 className={`text-base font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Eventos ({events.length})
        </h2>
      </div>

      <div className="max-h-[500px] overflow-y-auto">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {events.map((event, index) => {
            const statusColors = getEventStatusColor(event);
            
            return (
              <div
                key={index}
                onClick={() => onEventSelect(event)}
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg border-l-4 ${
                  selectedEvent === event
                    ? `${statusColors.bg} border-l-blue-500 shadow-lg`
                    : darkMode 
                      ? 'bg-gray-800/30 border-l-gray-600 hover:bg-gray-700/50' 
                      : 'bg-white border-l-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                      getPriorityColor(event.Prioridad)
                    }`}>
                      <AlertTriangle className="w-2 h-2 mr-1" />
                      {event.Prioridad}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                      getStatusColor(event.Estado)
                    }`}>
                      <Clock className="w-2 h-2 mr-1" />
                      {event.Estado}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {statusColors.icon}
                  </div>
                </div>

                <div className="space-y-2">
                  {/* Tipo de Tarjeta */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Tipo de tarjeta:</span>
                    <span className={`text-xs font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {event['Tipo de tarjeta'] || 'No especificado'}
                    </span>
                  </div>

                  {/* Número de Tarjeta o Aviso */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Nro de tarjeta:</span>
                    <span className={`text-xs font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {event['Nro de tarjeta o aviso'] || 'No especificado'}
                    </span>
                  </div>

                  {/* Ubicación */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <MapPin className="w-2 h-2 inline mr-1" />
                      Ubicación:
                    </span>
                    <span className={`text-xs font-semibold text-right truncate ml-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {event['Ubicación'] || 'No especificado'}
                    </span>
                  </div>

                  {/* Autor */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <User className="w-2 h-2 inline mr-1" />
                      Autor:
                    </span>
                    <span className={`text-xs font-semibold text-right truncate ml-2 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {event['Autor'] || 'No especificado'}
                    </span>
                  </div>

                  {/* Fecha de Detección */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <Calendar className="w-2 h-2 inline mr-1" />
                      Fecha detección:
                    </span>
                    <span className={`text-xs font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {event['Fecha detección anomalía'] || 'No especificado'}
                    </span>
                  </div>

                  {/* Descripción del problema como título */}
                  <div className={`mt-3 pt-2 border-t ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    <h3 className={`text-xs font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                    } line-clamp-2`}>
                      {event['Descripción anomalía']}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};