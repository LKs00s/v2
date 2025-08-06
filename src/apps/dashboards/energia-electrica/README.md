# ⚡ Energía Eléctrica Dashboard

Dashboard interactivo de seguimiento y análisis de energía eléctrica desarrollado con Power BI.

## 📁 Estructura de la App

```
energia-electrica/
├── pages/              # Páginas principales
│   └── EnergiaElectrica.tsx  # Dashboard principal
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
- **URL**: `https://app.powerbi.com/reportEmbed?reportId=b762a8f8-aa06-4924-b748-7829cb4f71b7&autoAuth=true&ctid=9c18a033-1567-4bb1-9a27-a31df11675fd`
- **Título**: "Energía Eléctrica"
- **Permisos**: Acceso configurado

## 🎯 Uso

```tsx
import { EnergiaElectrica } from './apps/dashboards/energia-electrica/pages/EnergiaElectrica';

<EnergiaElectrica darkMode={darkMode} />
```

## 📈 Métricas y KPIs

El dashboard incluye visualizaciones para:
- Consumo de energía eléctrica por área
- Análisis de demanda y picos de consumo
- Indicadores de eficiencia energética
- Reportes de costos eléctricos
- Monitoreo de calidad de energía