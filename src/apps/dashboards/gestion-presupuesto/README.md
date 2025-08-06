# 💰 Gestión de Presupuesto Dashboard

Dashboard interactivo de gestión y seguimiento de presupuestos desarrollado con Power BI.

## 📁 Estructura de la App

```
gestion-presupuesto/
├── pages/              # Páginas principales
│   └── GestionPresupuesto.tsx  # Dashboard principal
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
- **URL**: `https://app.powerbi.com/reportEmbed?reportId=b7bfa21f-1a01-40bb-bc23-fa04a399a6c0&autoAuth=true&ctid=9c18a033-1567-4bb1-9a27-a31df11675fd`
- **Título**: "Gestión de Presupuesto"
- **Permisos**: Acceso configurado

## 🎯 Uso

```tsx
import { GestionPresupuesto } from './apps/dashboards/gestion-presupuesto/pages/GestionPresupuesto';

<GestionPresupuesto darkMode={darkMode} />
```

## 📈 Métricas y KPIs

El dashboard incluye visualizaciones para:
- Seguimiento de presupuestos por departamento
- Análisis de gastos vs presupuesto asignado
- Proyecciones financieras
- Indicadores de desviación presupuestaria
- Reportes de ejecución presupuestaria