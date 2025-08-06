import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, RefreshCw } from 'lucide-react';
import { EventService } from '../services/eventService';
import { EventFilters } from '../components/EventFilters';
import { EventStats } from '../components/EventStats';
import { EventList } from '../components/EventList';
import { EventDetail } from '../components/EventDetail';
import { EventComparison } from '../components/EventComparison';
import { MaintenanceEvent, EventFilters as Filters, EventSortOptions } from '../types/event';

interface EventsRegistryProps {
  darkMode: boolean;
}

export const EventsRegistry: React.FC<EventsRegistryProps> = ({ darkMode }) => {
  const [data, setData] = useState<MaintenanceEvent[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [sortOptions, setSortOptions] = useState<EventSortOptions>({ field: 'fecha', order: 'desc' });
  const [selectedEvent, setSelectedEvent] = useState<MaintenanceEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const eventService = new EventService();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Iniciando carga de datos de eventos...');
      const events = await eventService.loadData();
      console.log(`Datos de eventos cargados: ${events.length} eventos`);
      setData(events);
      
      // Seleccionar el primer evento por defecto
      if (events.length > 0 && !selectedEvent) {
        setSelectedEvent(events[0]);
      }
    } catch (err) {
      setError('Error al cargar los datos de eventos desde Google Sheets');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    const filtered = eventService.filterData(data, filters);
    return eventService.sortData(filtered, sortOptions);
  }, [data, filters, sortOptions]);

  const statistics = useMemo(() => {
    return eventService.getStatistics(filteredData);
  }, [filteredData]);

  // Valores únicos para filtros
  const uniqueTypes = useMemo(() => {
    return eventService.getUniqueValues(data, 'Tipo de evento');
  }, [data]);

  const uniqueLocations = useMemo(() => {
    return eventService.getUniqueValues(data, 'Ubicación');
  }, [data]);

  const uniqueResponsibles = useMemo(() => {
    return eventService.getUniqueValues(data, 'Autor');
  }, [data]);

  const uniqueStates = useMemo(() => {
    return eventService.getUniqueValues(data, 'Autor'); // Usar Autor como estado por ahora
  }, [data]);

  const uniquePriorities = useMemo(() => {
    return ['Alta', 'Media', 'Baja']; // Valores simulados
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <RefreshCw className="w-8 h-8 text-white animate-spin" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur opacity-25 animate-pulse"></div>
          </div>
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Cargando Eventos de Mantenimiento
          </h3>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
            Conectando con Google Sheets...
          </p>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-red-50 via-white to-orange-50'} flex items-center justify-center`}>
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Error de Conexión
          </h3>
          <div className={`${darkMode ? 'bg-red-900/50 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-700'} border rounded-xl px-6 py-4 mb-6`}>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={loadData}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <RefreshCw className="w-4 h-4 inline mr-2" />
            Reintentar Conexión
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          Registro de Eventos de Mantenimiento
        </h1>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Sistema integral de gestión y seguimiento de eventos de mantenimiento
        </p>
      </div>

      {/* Refresh Button */}
      <div className="mb-6 flex justify-end space-x-3">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSdkmoOiQIG61G3cc9ygOSZT0YqOWMOSI6XJAD3bNxrNBfDoqg/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
          Formulario de Registro
        </a>
        <a
          href="https://docs.google.com/spreadsheets/d/1RHmUt3Wezd0r0jBFDTrLFxtdlfdgsX5l9FgoTQnSJoU/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19,3H5C3.9,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.9 20.1,3 19,3M9,17H7V10H9V17M13,17H11V7H13V17M17,17H15V13H17V17Z" />
          </svg>
          Ver Planilla
        </a>
        <button
          onClick={loadData}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualizar Datos
        </button>
      </div>

      {/* Statistics */}
      <EventStats darkMode={darkMode} statistics={statistics} />

      {/* Filters */}
      <EventFilters
        darkMode={darkMode}
        filters={filters}
        onFiltersChange={setFilters}
        sortOptions={sortOptions}
        onSortChange={setSortOptions}
        data={data}
        uniqueTypes={uniqueTypes}
        uniqueLocations={uniqueLocations}
        uniqueResponsibles={uniqueResponsibles}
        uniqueStates={uniqueStates}
        uniquePriorities={uniquePriorities}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Event List - Left Side */}
        <div className="lg:col-span-1">
          <EventList
            darkMode={darkMode}
            events={filteredData}
            selectedEvent={selectedEvent}
            onEventSelect={setSelectedEvent}
          />
        </div>

        {/* Media Comparison - Right Side */}
        <div className="lg:col-span-3">
          <EventDetail
            darkMode={darkMode}
            event={selectedEvent}
          />
        </div>
      </div>

    </main>
  );
};