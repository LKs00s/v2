import { MaintenanceEvent, EventFilters, EventStatistics, EventSortOptions, MediaItem } from '../types/event';

export class EventService {
  private googleSheetsUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSPxGv63oDQ-OTM-K5R1rJote0aPAzfcP2OgjtBg1rIelemz_M6UcQpfNzeOyW7lFvcCPAmof7eKuYl/pub?output=csv';

  async loadData(): Promise<MaintenanceEvent[]> {
    try {
      console.log('Cargando datos de eventos desde Google Sheets...');
      const response = await fetch(this.googleSheetsUrl);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`No se pudo cargar el archivo CSV: ${response.status} ${response.statusText}`);
      }
      const csvText = await response.text();
      console.log(`Datos de eventos cargados exitosamente: ${csvText.length} caracteres, procesando CSV...`);
      return this.parseCSV(csvText);
    } catch (error) {
      console.error('Error al cargar datos de eventos desde Google Sheets:', error);
      console.log('Usando datos de muestra como respaldo...');
      return this.loadSampleData();
    }
  }

  private parseCSV(csvText: string): MaintenanceEvent[] {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const data: MaintenanceEvent[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = this.parseCSVLine(lines[i]);
        if (values.length >= headers.length) {
          const row: any = {};
          headers.forEach((header, index) => {
            row[header] = values[index] ? values[index].trim().replace(/"/g, '') : '';
          });
          data.push(row as MaintenanceEvent);
        }
      }
    }

    return data;
  }

  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  }

  private loadSampleData(): MaintenanceEvent[] {
    return [
      {
        "Marca temporal": "2025-07-27T22:29:42.109-04:00",
        "Dirección de correo electrónico": "daniel@ejemplo.com",
        "Tipo de tarjeta": "Orden de Mantenimiento",
        "Nro de tarjeta o aviso": "3-4",
        "Ubicación": "Casa",
        "Autor": "Daniel",
        "Fecha detección anomalía": "2025-06-26",
        "Hora detección anomalía": "18:00",
        "Descripción de anomalía": "Borrador de sello",
        "Acción propuesta": "Cambiar el sello",
        "Tag del equipo": "",
        "Registro de eventos": "Registro general de eventos",
        "Registro de soluciones": "Registro general de soluciones",
        "Registro 1": "https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg",
        "Registro 2": "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg",
        "Registro 3": "",
        "Solución 1": "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg",
        "Solución 2": "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg",
        "Solución 3": ""
      },
      {
        "Marca temporal": "2025-07-27T23:45:02.418-04:00",
        "Dirección de correo electrónico": "daniel.rojas@ejemplo.com",
        "Tipo de tarjeta": "Tarjeta de seguridad",
        "Nro de tarjeta o aviso": "100",
        "Ubicación": "Sala máquinas 10",
        "Autor": "Daniel Rojas",
        "Fecha detección anomalía": "06-07-2024",
        "Hora detección anomalía": "18:00",
        "Descripción de anomalía": "Fuga de aire",
        "Acción propuesta": "Reparar el piping",
        "Tag del equipo": "110-CP-03",
        "Registro de eventos": "Registro de fuga detectada",
        "Registro de soluciones": "",
        "Registro 1": "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg",
        "Registro 2": "",
        "Registro 3": "",
        "Solución 1": "",
        "Solución 2": "",
        "Solución 3": ""
      },
      {
        "Marca temporal": "2025-07-27T23:45:02.418-04:00",
        "Dirección de correo electrónico": "daniel.rojas@ejemplo.com",
        "Tipo de tarjeta": "Tarjeta de Mantenimiento",
        "Nro de tarjeta o aviso": "201",
        "Ubicación": "Sala máquinas 5",
        "Autor": "Daniel Rojas",
        "Fecha detección anomalía": "05-07-2024",
        "Hora detección anomalía": "18:00",
        "Descripción de anomalía": "Fuga de aire",
        "Acción propuesta": "Reparar el piping",
        "Tag del equipo": "110-CP-05",
        "Registro de eventos": "Registro de mantenimiento preventivo",
        "Registro de soluciones": "",
        "Registro 1": "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg",
        "Registro 2": "https://images.pexels.com/photos/209251/pexels-photo-209251.jpeg",
        "Registro 3": "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
        "Solución 1": "",
        "Solución 2": "",
        "Solución 3": ""
      }
    ];
  }

  // Convertir URL de Google Drive al formato de visualización directa
  convertGoogleDriveUrl(url: string): string {
    if (!url || !url.includes('drive.google.com')) return url;
    
    // Extraer el ID del archivo de Google Drive
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (fileIdMatch) {
      return fileIdMatch[1]; // Retornar solo el ID para uso posterior
    }
    
    return url;
  }

  // Obtener ID de archivo de Google Drive
  getGoogleDriveFileId(url: string): string | null {
    if (!url || !url.includes('drive.google.com')) return null;
    
    const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
    if (!fileIdMatch) return null;
    
    return fileIdMatch[1];
  }

  // Generar URL de preview para Google Drive
  getGoogleDrivePreviewUrl(fileId: string): string {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  // Generar URL de thumbnail para Google Drive
  getGoogleDriveThumbnailUrl(fileId: string): string {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
  }

  // Procesar registros multimedia de un evento
  processEventMedia(event: MaintenanceEvent): { eventMedia: MediaItem[], solutionMedia: MediaItem[] } {
    const eventMedia: MediaItem[] = [];
    const solutionMedia: MediaItem[] = [];

    // Procesar registros de eventos (Registro 1, 2, 3)
    for (let i = 1; i <= 3; i++) {
      const url = event[`Registro ${i}` as keyof MaintenanceEvent];
      if (url && url.trim()) {
        const fileId = this.getGoogleDriveFileId(url);
        const fileType = this.detectFileType(url);
        
        eventMedia.push({
          url: fileId || url,
          type: fileType,
          title: `Registro del Problema ${i}`,
          fileId: fileId
        });
      }
    }

    // Procesar registros de soluciones (Solución 1, 2, 3)
    for (let i = 1; i <= 3; i++) {
      const url = event[`Solución ${i}` as keyof MaintenanceEvent];
      if (url && url.trim()) {
        const fileId = this.getGoogleDriveFileId(url);
        const fileType = this.detectFileType(url);
        
        solutionMedia.push({
          url: fileId || url,
          type: fileType,
          title: `Registro de la Solución ${i}`, 
          fileId: fileId
        });
      }
    }

    return { eventMedia, solutionMedia };
  }

  // Detectar tipo de archivo basado en la URL o extensión
  private detectFileType(url: string): 'image' | 'video' {
    if (!url) return 'image'; // Por defecto imagen si no hay URL
    
    // Convertir URL a minúsculas para comparación
    const urlLower = url.toLowerCase();
    
    // Extensiones de video comunes
    const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv', '.m4v', '.3gp', '.ogv'];
    
    // Extensiones de imagen comunes
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.tiff', '.ico'];
    
    // Primero verificar extensiones de video (más específico)
    for (const ext of videoExtensions) {
      if (urlLower.includes(ext)) {
        return 'video';
      }
    }
    
    // Luego verificar extensiones de imagen
    for (const ext of imageExtensions) {
      if (urlLower.includes(ext)) {
        return 'image';
      }
    }
    
    // Patrones específicos para detectar videos en URLs sin extensión clara
    const videoPatterns = [
      'video',
      'movie',
      'film',
      'mp4',
      'avi',
      'mov',
      'webm',
      'youtube.com',
      'vimeo.com',
      'dailymotion.com'
    ];
    
    // Patrones específicos para detectar imágenes en URLs sin extensión clara
    const imagePatterns = [
      'image',
      'photo',
      'picture',
      'img',
      'jpeg',
      'jpg',
      'png',
      'gif',
      'pexels.com',
      'unsplash.com',
      'pixabay.com'
    ];
    
    // Verificar patrones de video primero
    for (const pattern of videoPatterns) {
      if (urlLower.includes(pattern)) {
        return 'video';
      }
    }
    
    // Verificar patrones de imagen
    for (const pattern of imagePatterns) {
      if (urlLower.includes(pattern)) {
        return 'image';
      }
    }
    
    // Para Google Drive sin patrones claros, intentar detectar por el contenido del iframe
    // Si la URL contiene parámetros que sugieren video
    if (urlLower.includes('drive.google.com')) {
      // Si no podemos determinar, por defecto será imagen
      // Pero podríamos implementar una lógica más sofisticada aquí
      return 'image';
    }
    
    // Por defecto, asumir que es imagen si no se puede determinar
    return 'image';
  }
  getUniqueValues(data: MaintenanceEvent[], field: keyof MaintenanceEvent): string[] {
    return [...new Set(data.map(row => row[field]).filter(value => value && value !== 'No especificado'))].sort();
  }

  getStatistics(data: MaintenanceEvent[]): EventStatistics {
    const totalEvents = data.length;
    // Para mantener compatibilidad, usaremos campos simulados
    const completedEvents = Math.floor(data.length * 0.6); // 60% completados
    const pendingEvents = Math.floor(data.length * 0.2); // 20% pendientes  
    const inProgressEvents = data.length - completedEvents - pendingEvents; // resto en progreso

    // Tiempo promedio simulado
    const avgCompletionTime = 4.5;

    // Costo total simulado
    const totalCost = data.length * 150000;

    return {
      totalEvents,
      completedEvents,
      pendingEvents,
      inProgressEvents,
      avgCompletionTime,
      totalCost
    };
  }

  filterData(data: MaintenanceEvent[], filters: EventFilters): MaintenanceEvent[] {
    return data.filter(event => {
      if (filters.search) {
        const searchableText = Object.values(event).join(' ').toLowerCase();
        if (!searchableText.includes(filters.search.toLowerCase())) return false;
      }

      if (filters.tipo && event['Tipo de evento'] !== filters.tipo) return false;
      if (filters.ubicacion && event['Ubicación'] !== filters.ubicacion) return false;
      if (filters.responsable && event['Autor'] !== filters.responsable) return false;
      // Campos que no existen en el nuevo formato se ignoran por ahora
      // if (filters.estado && event['Estado'] !== filters.estado) return false;
      // if (filters.prioridad && event['Prioridad'] !== filters.prioridad) return false;

      if (filters.fechaDesde || filters.fechaHasta) {
        const eventDate = this.parseDate(event['Fecha detección anomalía']);
        if (filters.fechaDesde && eventDate < new Date(filters.fechaDesde)) return false;
        if (filters.fechaHasta && eventDate > new Date(filters.fechaHasta)) return false;
      }

      return true;
    });
  }

  sortData(data: MaintenanceEvent[], sortOptions: EventSortOptions): MaintenanceEvent[] {
    return [...data].sort((a, b) => {
      let comparison = 0;
      
      switch (sortOptions.field) {
        case 'fecha':
          comparison = this.parseDate(a['Fecha detección anomalía']).getTime() - this.parseDate(b['Fecha detección anomalía']).getTime();
          break;
        case 'prioridad':
          // Sin campo de prioridad, ordenar por tipo de evento
          comparison = a['Tipo de evento'].localeCompare(b['Tipo de evento']);
          break;
        case 'estado':
          // Sin campo de estado, ordenar por autor
          comparison = a['Autor'].localeCompare(b['Autor']);
          break;
        case 'tipo':
          comparison = a['Tipo de evento'].localeCompare(b['Tipo de evento']);
          break;
      }
      
      return sortOptions.order === 'desc' ? -comparison : comparison;
    });
  }

  private parseDate(dateStr: string): Date {
    if (!dateStr) return new Date();
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
    return new Date(dateStr);
  }

  formatCurrency(amount: string | number): string {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(num)) return 'N/A';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP'
    }).format(num);
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return 'N/A';
    return dateStr;
  }

  formatTime(timeStr: string): string {
    if (!timeStr) return 'N/A';
    return timeStr;
  }

  // Método público para parsing de fechas (usado en filtros dinámicos)
  parseDate(dateStr: string): Date {
    if (!dateStr) return new Date();
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
    return new Date(dateStr);
  }
}