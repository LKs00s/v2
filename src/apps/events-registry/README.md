# 📅 Registro de Eventos de Mantenimiento

Sistema integral de gestión y seguimiento de eventos de mantenimiento industrial.

## 📁 Estructura de la App

```
events-registry/
├── components/          # Componentes específicos de eventos
│   ├── EventComparison.tsx     # Comparación antes/después
│   ├── EventDetail.tsx         # Detalles del evento
│   ├── EventFilters.tsx        # Filtros de eventos
│   ├── EventList.tsx           # Lista de eventos
│   └── EventStats.tsx          # Estadísticas de eventos
├── services/           # Lógica de negocio
│   └── eventService.ts         # Servicio principal
├── types/              # Definiciones TypeScript
│   └── event.ts                # Interfaces y tipos
├── pages/              # Páginas principales
│   └── EventsRegistry.tsx      # Página principal
└── README.md           # Documentación
```

## 🚀 Funcionalidades

### ✅ **Gestión de Eventos**
- Tarjetas de mantenimiento
- Órdenes de trabajo
- Tarjetas de seguridad
- Seguimiento de anomalías

### ✅ **Comparación Visual**
- Sistema antes/después
- Galería multimedia
- Navegación por thumbnails
- Soporte para Google Drive

### ✅ **Filtros Específicos**
- Por tipo de evento
- Por ubicación y responsable
- Por fechas de detección
- Búsqueda general

### ✅ **Estadísticas**
- Eventos completados/pendientes
- Tiempo promedio de resolución
- Costos totales
- Distribución por estado

## 🔗 Integración

### Google Sheets
- URL: `https://docs.google.com/spreadsheets/d/e/2PACX-1vSPxGv63oDQ-OTM-K5R1rJote0aPAzfcP2OgjtBg1rIelemz_M6UcQpfNzeOyW7lFvcCPAmof7eKuYl/pub?output=csv`
- Formato: CSV público
- Multimedia: URLs de Google Drive

### Campos Requeridos
- Tipo de tarjeta
- Nro de tarjeta o aviso
- Ubicación
- Autor
- Fecha detección anomalía
- Descripción anomalía
- Registros multimedia (evento y solución)

## 🎯 Uso

```tsx
import { EventsRegistry } from './apps/events-registry/pages/EventsRegistry';

<EventsRegistry darkMode={darkMode} />
```

## 📸 Multimedia

### Soporte para Google Drive
- Conversión automática de URLs
- Previsualización en iframe
- Thumbnails automáticos
- Detección de tipo (imagen/video)