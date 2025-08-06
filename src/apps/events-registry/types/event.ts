export interface MaintenanceEvent {
  "Marca temporal": string;
  "Dirección de correo electrónico": string;
  "Tipo de evento": string;
  "Nro de tarjeta o aviso": string;
  "Ubicación": string;
  "Autor": string;
  "Fecha detección anomalía": string;
  "Hora detección anomalía": string;
  "Descripción de anomalía": string;
  "Acción propuesta": string;
  "Tag del equipo": string;
  "Registro de eventos": string;
  "Registro de soluciones": string;
  "Registro 1": string;
  "Registro 2": string;
  "Registro 3": string;
  "Solución 1": string;
  "Solución 2": string;
  "Solución 3": string;
}

// Mantener compatibilidad con campos anteriores
export interface MaintenanceEventLegacy {
  "Fecha": string;
  "Hora": string;
  "Tipo de evento": string;
  // ... otros campos legacy
}

export interface EventFilters {
  search?: string;
  anoMes?: string;
  tipoEvento?: string;
  autor?: string;
  ubicacion?: string;
  tag?: string;
}

export interface EventSortOptions {
  field: 'fecha' | 'tipo' | 'autor';
  order: 'asc' | 'desc';
}

export interface EventStatistics {
  totalEvents: number;
  completedEvents: number;
  pendingEvents: number;
}

export interface MediaItem {
  url: string;
  type: 'image' | 'video';
  title: string;
  fileId?: string | null;
}

export interface EventComparison {
  eventMedia: MediaItem[];
  solutionMedia: MediaItem[];
  selectedEventIndex: number;
  selectedSolutionIndex: number;
}