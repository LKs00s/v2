# 🧪 Nitrógeno Dashboard

Dashboard interactivo de gestión y seguimiento de nitrógeno desarrollado con Power BI.

## 📁 Estructura de la App

```
nitrogeno/
├── pages/              # Páginas principales
│   └── Nitrogeno.tsx   # Dashboard principal
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
- **URL**: `https://app.powerbi.com/reportEmbed?reportId=12551b8c-3bd8-45e0-99cb-52440b75aae3&autoAuth=true&ctid=9c18a033-1567-4bb1-9a27-a31df11675fd`
- **Título**: "Nitrógeno"
- **Permisos**: Acceso configurado

## 🎯 Uso

```tsx
import { Nitrogeno } from './apps/dashboards/nitrogeno/pages/Nitrogeno';

<Nitrogeno darkMode={darkMode} />
```

## 📈 Métricas y KPIs

El dashboard incluye visualizaciones para:
- Producción y consumo de nitrógeno
- Análisis de pureza y calidad
- Indicadores de eficiencia de generadores
- Reportes de costos de nitrógeno
- Monitoreo de distribución y presión