import React from 'react';
import { Search, Filter, Calendar, ArrowUpDown, MapPin, User, AlertTriangle, Tag } from 'lucide-react';
import { EventFilters as Filters, MaintenanceEvent, EventSortOptions } from '../types/event';

interface EventFiltersProps {
  darkMode: boolean;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  sortOptions: EventSortOptions;
  onSortChange: (sort: EventSortOptions) => void;
  data: MaintenanceEvent[];
  uniqueTypes: string[];
  uniqueLocations: string[];
  uniqueResponsibles: string[];
  uniqueTags: string[];
}

export const EventFilters: React.FC<EventFiltersProps> = ({
  darkMode,
  filters,
  onFiltersChange,
  sortOptions,
  onSortChange,
  uniqueTypes,
  uniqueLocations,
  uniqueResponsibles,
  uniqueTags
}) => {
  const handleFilterChange = (key: keyof Filters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined
    });
  };

  const handleSortChange = (field: EventSortOptions['field'], order: 'asc' | 'desc') => {
    onSortChange({ field, order });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className={`${
      darkMode 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/80 border-gray-200'
    } backdrop-blur-sm rounded-2xl shadow-xl border p-6 mb-6 space-y-6`}>
      {/* Header con filtros y ordenamiento */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center`}>
            <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
              <Filter className="w-4 h-4 text-white" />
            </div>
            Filtros de Eventos
          </h2>
          
          {/* Controles de ordenamiento */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Ordenar por:
            </span>
            
            <select
              value={`${sortOptions.field}-${sortOptions.order}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-') as [EventSortOptions['field'], 'asc' | 'desc'];
                handleSortChange(field, order);
              }}
              className={`text-sm px-3 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="fecha-desc">Fecha: Más Reciente</option>
              <option value="fecha-asc">Fecha: Más Antigua</option>
              <option value="tipo-asc">Tipo: A-Z</option>
              <option value="tipo-desc">Tipo: Z-A</option>
              <option value="autor-asc">Autor: A-Z</option>
              <option value="autor-desc">Autor: Z-A</option>
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>
        
        <button
          onClick={clearFilters}
          className={`text-sm px-4 py-2 rounded-xl transition-all duration-200 ${
            darkMode 
              ? 'text-orange-400 hover:text-orange-300 hover:bg-gray-700' 
              : 'text-orange-600 hover:text-orange-800 hover:bg-orange-50'
          }`}
        >
          Limpiar Filtros
        </button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Búsqueda general */}
        <div className="relative">
          <label className={`block text-xs font-medium mb-1 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Búsqueda General
          </label>
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Buscar eventos..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        {/* Año/Mes */}
        <div className="relative">
          <label className={`block text-xs font-medium mb-1 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Año/Mes
          </label>
          <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
          <select
            value={filters.anoMes || ''}
            onChange={(e) => handleFilterChange('anoMes', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="">Todos los períodos</option>
            <option value="2025-07">Julio 2025</option>
            <option value="2025-06">Junio 2025</option>
            <option value="2025-05">Mayo 2025</option>
            <option value="2025-04">Abril 2025</option>
            <option value="2025-03">Marzo 2025</option>
            <option value="2025-02">Febrero 2025</option>
            <option value="2025-01">Enero 2025</option>
            <option value="2024">Todo 2024</option>
          </select>
        </div>

        {/* Tipo de tarjeta */}
        <div className="relative">
          <label className={`block text-xs font-medium mb-1 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Tipo de Evento
          </label>
          <AlertTriangle className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
          <select
            value={filters.tipoEvento || ''}
            onChange={(e) => handleFilterChange('tipoEvento', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="">Todos los tipos</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Autor */}
        <div className="relative">
          <label className={`block text-xs font-medium mb-1 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Autor
          </label>
          <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
          <select
            value={filters.autor || ''}
            onChange={(e) => handleFilterChange('autor', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="">Todos los autores</option>
            {uniqueResponsibles.map(author => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
        </div>

        {/* Ubicación */}
        <div className="relative">
          <label className={`block text-xs font-medium mb-1 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Ubicación
          </label>
          <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
          <select
            value={filters.ubicacion || ''}
            onChange={(e) => handleFilterChange('ubicacion', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="">Todas las ubicaciones</option>
            {uniqueLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Tag del equipo */}
        <div className="relative">
          <label className={`block text-xs font-medium mb-1 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Tag del Equipo
          </label>
          <Tag className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
          <select
            value={filters.tag || ''}
            onChange={(e) => handleFilterChange('tag', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="">Todos los tags</option>
            {uniqueTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};