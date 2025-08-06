# 🏭 RILes y A.S. Dashboard

Dashboard interactivo de RILes y Aguas Servidas desarrollado con Power BI.

## 📁 Estructura de la App

```
riles-as/
├── pages/              # Páginas principales
│   └── RilesAS.tsx     # Dashboard principal
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
- **URL**: `https://app.powerbi.com/reportEmbed?reportId=5dc95bfd-56e2-4e8b-a095-9afbf272c625&autoAuth=true&ctid=9c18a033-1567-4bb1-9a27-a31df11675fd`
- **Título**: "RILes y A.S."
- **Permisos**: Acceso configurado

## 🎯 Uso

```tsx
import { RilesAS } from './apps/dashboards/riles-as/pages/RilesAS';

<RilesAS darkMode={darkMode} />
```

## 📈 Métricas y KPIs

El dashboard incluye visualizaciones para:
- Seguimiento de RILes (Residuos Industriales Líquidos)
- Análisis de Aguas Servidas
- Indicadores ambientales
- Reportes de cumplimiento normativo
- Monitoreo de tratamiento de aguas