import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Image, Video, Eye, EyeOff, FileText, File, Calendar, MapPin, User, AlertTriangle, Clock, Hash, Tag } from 'lucide-react';
import { MaintenanceEvent, MediaItem } from '../types/event';
import { EventService } from '../services/eventService';

interface EventComparisonProps {
  darkMode: boolean;
  event: MaintenanceEvent | null;
}

export const EventComparison: React.FC<EventComparisonProps> = ({ darkMode, event }) => {
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const [selectedSolutionIndex, setSelectedSolutionIndex] = useState(0);
  const [showComparison, setShowComparison] = useState(true);

  const eventService = new EventService();

  if (!event) {
    return (
      <div className={`${
        darkMode 
          ? 'bg-gray-800/50 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      } backdrop-blur-sm rounded-2xl shadow-xl border p-8 text-center`}>
        <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Image className="w-8 h-8 text-white" />
        </div>
        <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
          Comparación Visual
        </h3>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Selecciona un evento para ver la comparación antes/después
        </p>
      </div>
    );
  }

  const { eventMedia, solutionMedia } = eventService.processEventMedia(event);

  // Component for file type icons
  const FileTypeIcon: React.FC<{ media: MediaItem; className?: string }> = ({ media, className = "w-4 h-4" }) => {
    if (media.type === 'video') {
      return <Video className={className} />;
    } else if (media.type === 'image') {
      return <Image className={className} />;
    } else {
      return <File className={className} />;
    }
  };

  // Thumbnail component for navigation
  const ThumbnailNavigation: React.FC<{
    media: MediaItem[];
    selectedIndex: number;
    onIndexChange: (index: number) => void;
  }> = ({ media, selectedIndex, onIndexChange }) => {
    if (media.length === 0) return null;

    return (
      <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
        {media.map((item, index) => {
          const isSelected = index === selectedIndex;

          return (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 shadow-lg scale-105'
                  : darkMode 
                    ? 'border-gray-600 hover:border-gray-500' 
                    : 'border-gray-300 hover:border-gray-400'
              }`}
              title={item.title}
            >
              {/* Thumbnail content */}
              <div className={`w-full h-full flex items-center justify-center ${
                darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                {item.fileId ? (
                  <img
                    src={eventService.getGoogleDriveThumbnailUrl(item.fileId)}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      // Si falla el thumbnail, mostrar ícono
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <FileTypeIcon 
                      media={item} 
                      className={`w-6 h-6 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} 
                    />
                  </div>
                )}
              </div>

              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                </div>
              )}

              {/* File type indicator */}
              <div className={`absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                item.type === 'video' 
                  ? 'bg-red-500' 
                  : item.type === 'image' 
                    ? 'bg-green-500' 
                    : 'bg-blue-500'
              }`}>
                <FileTypeIcon media={item} className="w-2 h-2 text-white" />
              </div>

            </button>
          );
        })}
      </div>
    );
  };

  const MediaViewer: React.FC<{
    media: MediaItem[];
    selectedIndex: number;
    onIndexChange: (index: number) => void;
    title: string;
    color: string;
  }> = ({ media, selectedIndex, onIndexChange, title, color }) => {
    if (media.length === 0) {
      return (
        <div className={`flex-1 ${
          darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
        } rounded-xl p-8 flex items-center justify-center`}>
          <div className="text-center">
            <Image className={`w-16 h-16 mx-auto mb-4 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              No hay registros multimedia disponibles
            </p>
          </div>
        </div>
      );
    }

    const currentMedia = media[selectedIndex];

    return (
      <div className="flex-1 space-y-4">
        {/* Header con título y controles */}
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          } flex items-center`}>
            <div className={`w-4 h-4 ${color} rounded mr-2`}></div>
            {title}
          </h3>
          <div className="flex items-center space-x-2">
            <span className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {selectedIndex + 1} de {media.length}
            </span>
            {media.length > 1 && (
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => onIndexChange(Math.max(0, selectedIndex - 1))}
                  disabled={selectedIndex === 0}
                  className={`p-1 rounded transition-colors ${
                    selectedIndex === 0
                      ? darkMode ? 'text-gray-600' : 'text-gray-400'
                      : darkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onIndexChange(Math.min(media.length - 1, selectedIndex + 1))}
                  disabled={selectedIndex === media.length - 1}
                  className={`p-1 rounded transition-colors ${
                    selectedIndex === media.length - 1
                      ? darkMode ? 'text-gray-600' : 'text-gray-400'
                      : darkMode 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Visor de medios */}
        <div className={`aspect-video ${
          darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
        } rounded-xl overflow-hidden flex items-center justify-center`}>
          {currentMedia && currentMedia.fileId ? (
            <iframe
              key={`iframe-${selectedIndex}-${currentMedia.fileId}`}
              src={eventService.getGoogleDrivePreviewUrl(currentMedia.fileId)}
              className="w-full h-full border-0"
              allow="autoplay"
              allowFullScreen
              title={currentMedia.title}
              onError={() => {
                console.error('Error loading media:', currentMedia.fileId);
              }}
            />
          ) : (
            <div className="text-center">
              <div className="flex flex-col items-center">
                <Image className={`w-12 h-12 mx-auto mb-2 ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <p className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  No se pudo cargar el archivo
                </p>
                {currentMedia && currentMedia.url && (
                  <p className={`text-xs mt-1 ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    URL: {currentMedia.url.substring(0, 50)}...
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Título del archivo actual */}
        {currentMedia && (
          <div className="text-center">
            <p className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {currentMedia.title}
            </p>
          </div>
        )}

        {/* Thumbnail Navigation */}
        <ThumbnailNavigation
          media={media}
          selectedIndex={selectedIndex}
          onIndexChange={onIndexChange}
        />
      </div>
    );
  };

  // Event Information Component
  const EventInformation: React.FC = () => {
    if (!event) return null;

    const formatDate = (dateStr: string) => {
      if (!dateStr) return 'No especificado';
      return dateStr;
    };

    const formatTime = (timeStr: string) => {
      if (!timeStr) return 'No especificado';
      return timeStr;
    };

    return (
      <div className={`mt-6 ${
        darkMode 
          ? 'bg-gray-800/30 border-gray-700' 
          : 'bg-gray-50/50 border-gray-200'
      } border rounded-xl p-6`}>
        <h3 className={`text-lg font-semibold ${
          darkMode ? 'text-white' : 'text-gray-900'
        } mb-4 flex items-center`}>
          <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <FileText className="w-3 h-3 text-white" />
          </div>
          Información Completa del Evento
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <h4 className={`text-sm font-semibold ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            } border-b pb-2 ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              Información Básica
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <Calendar className={`w-4 h-4 mr-2 mt-0.5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <div>
                  <div className={`text-xs font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Fecha de Detección
                  </div>
                  <div className={`text-sm ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {formatDate(event['Fecha detección anomalía'])}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className={`w-4 h-4 mr-2 mt-0.5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <div>
                  <div className={`text-xs font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Hora de Detección
                  </div>
                  <div className={`text-sm ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {formatTime(event['Hora detección anomalía'])}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <AlertTriangle className={`w-4 h-4 mr-2 mt-0.5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <div>
                  <div className={`text-xs font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Tipo de Evento
                  </div>
                  <div className={`text-sm ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {event['Tipo de evento'] || 'No especificado'}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <Hash className={`w-4 h-4 mr-2 mt-0.5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <div>
                  <div className={`text-xs font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Nro de Tarjeta/Aviso
                  </div>
                  <div className={`text-sm ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {event['Nro de tarjeta o aviso'] || 'No especificado'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ubicación y Responsables */}
          <div className="space-y-4">
            <h4 className={`text-sm font-semibold ${
              darkMode ? 'text-green-400' : 'text-green-600'
            } border-b pb-2 ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              Ubicación y Responsables
            </h4>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className={`w-4 h-4 mr-2 mt-0.5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <div>
                  <div className={`text-xs font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Ubicación
                  </div>
                  <div className={`text-sm ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {event['Ubicación'] || 'No especificado'}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <User className={`w-4 h-4 mr-2 mt-0.5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <div>
                  <div className={`text-xs font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Autor
                  </div>
                  <div className={`text-sm ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {event['Autor'] || 'No especificado'}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <Tag className={`w-4 h-4 mr-2 mt-0.5 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <div>
                  <div className={`text-xs font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Tag del Equipo
                  </div>
                  <div className={`text-sm ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {event['Tag del equipo'] || 'No especificado'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Descripción y Acciones */}
          <div className="space-y-4">
            <h4 className={`text-sm font-semibold ${
              darkMode ? 'text-orange-400' : 'text-orange-600'
            } border-b pb-2 ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              Descripción y Acciones
            </h4>
            
            <div className="space-y-3">
              <div>
                <div className={`text-xs font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Descripción de Anomalía
                </div>
                <div className={`text-sm p-3 rounded-lg ${
                  darkMode ? 'bg-gray-700/50 text-white' : 'bg-white text-gray-900'
                } border ${
                  darkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  {event['Descripción de anomalía'] || 'No especificado'}
                </div>
              </div>

              <div>
                <div className={`text-xs font-medium mb-1 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Acción Propuesta
                </div>
                <div className={`text-sm p-3 rounded-lg ${
                  darkMode ? 'bg-gray-700/50 text-white' : 'bg-white text-gray-900'
                } border ${
                  darkMode ? 'border-gray-600' : 'border-gray-200'
                }`}>
                  {event['Acción propuesta'] || 'No especificado'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Registros de Eventos y Soluciones */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className={`text-sm font-semibold ${
              darkMode ? 'text-red-400' : 'text-red-600'
            } mb-2`}>
              Registro de Eventos
            </h4>
            <div className={`text-sm p-3 rounded-lg ${
              darkMode ? 'bg-red-900/20 text-red-300 border border-red-700/50' : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {event['Registro de eventos'] || 'No especificado'}
            </div>
          </div>

          <div>
            <h4 className={`text-sm font-semibold ${
              darkMode ? 'text-green-400' : 'text-green-600'
            } mb-2`}>
              Registro de Soluciones
            </h4>
            <div className={`text-sm p-3 rounded-lg ${
              darkMode ? 'bg-green-900/20 text-green-300 border border-green-700/50' : 'bg-green-50 text-green-800 border border-green-200'
            }`}>
              {event['Registro de soluciones'] || 'No especificado'}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className={`${
      darkMode 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/80 border-gray-200'
    } backdrop-blur-sm rounded-2xl shadow-xl border overflow-hidden`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b ${
        darkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-gray-50/50'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className={`text-lg font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          } flex items-center`}>
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-3 shadow-lg">
              <Eye className="w-4 h-4 text-white" />
            </div>
            Comparación Visual
          </h2>
          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              darkMode 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            {showComparison ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showComparison ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
      </div>

      {/* Content */}
      {showComparison && (
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Registro del Problema (Antes) */}
            <MediaViewer
              media={eventMedia}
              selectedIndex={selectedEventIndex}
              onIndexChange={setSelectedEventIndex}
              title="ANTES: Registro del Problema"
              color="bg-red-500"
            />

            {/* Separador */}
            <div className="flex lg:flex-col items-center justify-center lg:justify-center">
              <div className={`w-full lg:w-px h-px lg:h-full ${
                darkMode ? 'bg-gray-600' : 'bg-gray-300'
              }`}></div>
              <div className={`px-4 py-2 lg:px-2 lg:py-4 ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-full`}>
                <ChevronRight className={`w-5 h-5 lg:rotate-90 ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
              <div className={`w-full lg:w-px h-px lg:h-full ${
                darkMode ? 'bg-gray-600' : 'bg-gray-300'
              }`}></div>
            </div>

            {/* Registro de la Solución (Después) */}
            <MediaViewer
              media={solutionMedia}
              selectedIndex={selectedSolutionIndex}
              onIndexChange={setSelectedSolutionIndex}
              title="DESPUÉS: Registro de la Solución"
              color="bg-green-500"
            />
          </div>

        </div>

        {/* Event Information Section */}
        <EventInformation />
      )}
    </div>
  );
};