# 🌡️ Vapor Dashboard

Dashboard interactivo de gestión y seguimiento de vapor desarrollado con Power BI.

## 📁 Estructura de la App

```
vapor/
├── pages/              # Páginas principales
│   └── Vapor.tsx       # Dashboard principal
└── README.md           # Documentación
```

## 🚀 Funcionalidades

### ✅ **Dashboard Embebido**
- Integración completa con Power BI
- Iframe responsivo y seguro
- Carga optimizada

### ✅ **Interfaz Limpia**
- Solo navbar y contenido del dashboard
- Ocupa toda la pantalla disponible
- Sin elementos de distracción

## 🔗 Integración

### Power BI Dashboard
- **URL**: `https://app.powerbi.com/reportEmbed?reportId=16f566cf-e612-4050-9e08-02e25da8b68a&autoAuth=true&ctid=9c18a033-1567-4bb1-9a27-a31df11675fd`
- **Título**: "Vapor"
- **Permisos**: Acceso configurado

## 🎯 Uso

```tsx
import { Vapor } from './apps/dashboards/vapor/pages/Vapor';

<Vapor darkMode={darkMode} />
```

## 📈 Métricas y KPIs

El dashboard incluye visualizaciones para:
- Producción y consumo de vapor
- Análisis de presión y temperatura
- Indicadores de eficiencia de calderas
- Reportes de costos de vapor
- Monitoreo de distribución de vapor