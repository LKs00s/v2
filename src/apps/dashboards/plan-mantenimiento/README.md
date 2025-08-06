# 📊 Plan de Mantenimiento Dashboard

Dashboard interactivo de planificación y seguimiento de mantenimiento desarrollado con Power BI.

## 📁 Estructura de la App

```
plan-mantenimiento/
├── components/          # Componentes específicos (futuro)
├── pages/              # Páginas principales
│   └── PlanMantenimiento.tsx  # Dashboard principal
└── README.md           # Documentación
```

## 🚀 Funcionalidades

### ✅ **Dashboard Embebido**
- Integración completa con Power BI
- Iframe responsivo y seguro
- Carga optimizada con estados de loading

### ✅ **Controles Avanzados**
- Botón de actualización de datos
- Modo pantalla completa
- Controles de navegación intuitivos

### ✅ **Interfaz Profesional**
- Diseño consistente con el sistema
- Soporte para modo oscuro/claro
- Animaciones y transiciones suaves

### ✅ **Responsive Design**
- Optimizado para desktop y móvil
- Detección automática de embedding
- Controles adaptativos según el contexto

## 🔗 Integración

### Power BI Dashboard
- **URL**: `https://app.powerbi.com/view?r=eyJrIjoiY2U5MTMyZDctZDM4Ny00MjgzLWFhZDQtNDQxM2Y3ZjFjYTIwIiwidCI6IjM2MDBmOGJiLWQ4NDMtNDg4OS1iYjk0LTJkNmUxYjAyMTZmMyIsImMiOjR9`
- **Título**: "Dashboard Base de Datos online v1 - copia"
- **Permisos**: Acceso público configurado

### Configuración de Seguridad
- `allowFullScreen` habilitado
- `frameBorder="0"` para diseño limpio
- Headers de seguridad configurados en Netlify

## 🎯 Uso

```tsx
import { PlanMantenimiento } from './apps/dashboards/plan-mantenimiento/pages/PlanMantenimiento';

<PlanMantenimiento darkMode={darkMode} />
```

## 🔧 Características Técnicas

### **Estados de Carga**
- Loading spinner durante la carga inicial
- Simulación de refresh con feedback visual
- Detección de estado de embedding

### **Modo Pantalla Completa**
- Toggle entre vista normal y fullscreen
- Controles contextuales según el modo
- Optimización de espacio para el dashboard

### **Integración con Sistema**
- Consistencia con el diseño general
- Soporte completo para modo oscuro
- Navegación integrada con el navbar principal

## 📈 Métricas y KPIs

El dashboard incluye visualizaciones para:
- Planificación de mantenimiento preventivo
- Seguimiento de órdenes de trabajo
- Análisis de costos y recursos
- Indicadores de rendimiento (KPIs)
- Cronogramas y calendarios

## 🚀 Futuras Mejoras

- [ ] **Filtros personalizados**: Controles adicionales
- [ ] **Exportación**: Reportes en PDF/Excel
- [ ] **Notificaciones**: Alertas de mantenimiento
- [ ] **Integración**: Conexión con otras apps del sistema