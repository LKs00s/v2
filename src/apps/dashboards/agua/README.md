# 💧 Agua Dashboard

Dashboard interactivo de gestión y seguimiento de agua desarrollado con Power BI.

## 📁 Estructura de la App

```
agua/
├── pages/              # Páginas principales
│   └── Agua.tsx        # Dashboard principal
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
- **URL**: `https://app.powerbi.com/reportEmbed?reportId=914b0b6e-904f-47ee-a2b1-643b4acaca28&autoAuth=true&ctid=9c18a033-1567-4bb1-9a27-a31df11675fd`
- **Título**: "Agua"
- **Permisos**: Acceso configurado

## 🎯 Uso

```tsx
import { Agua } from './apps/dashboards/agua/pages/Agua';

<Agua darkMode={darkMode} />
```

## 📈 Métricas y KPIs

El dashboard incluye visualizaciones para:
- Consumo de agua por área y proceso
- Análisis de calidad del agua
- Indicadores de eficiencia hídrica
- Reportes de costos de agua
- Monitoreo de tratamiento de agua