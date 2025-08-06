export interface MaintenanceEvent {
  "Timestamp": string;
  "Tipo de tarjeta": string;
  "Nro de tarjeta o aviso": string;
  "Ubicación": string;
  "Autor": string;
  "Responsable de solución": string;
  "Fecha detección anomalía": string;
  "Hora de detección": string;
  "Descripción anomalía": string;
  "Acción propuesta": string;
  "Tag del equipo": string;
  "Registro evento 1": string;
  "Registro evento 2": string;
  "Registro evento 3": string;
  "Registro solución 1": string;
  "Registro solución 2": string;
  "Registro solución 3": string;
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
  tipo?: string;
  ubicacion?: string;
  responsable?: string;
  estado?: string;
  prioridad?: string;
  fechaDesde?: string;
  fechaHasta?: string;
}

export interface EventSortOptions {
  field: 'fecha' | 'prioridad' | 'estado' | 'tipo';
  order: 'asc' | 'desc';
}

export interface EventStatistics {
  totalEvents: number;
  completedEvents: number;
  pendingEvents: number;
  inProgressEvents: number;
  avgCompletionTime: number;
  totalCost: number;
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