# 🧮 Analizador de Cotizaciones

Sistema profesional de análisis y gestión de cotizaciones empresariales.

## 📁 Estructura de la App

```
quotations-analyzer/
├── components/          # Componentes específicos de cotizaciones
│   ├── QuotationCards.tsx      # Vista de tarjetas
│   ├── QuotationDetailModal.tsx # Modal de detalles
│   ├── QuotationFilters.tsx    # Filtros avanzados
│   ├── QuotationStats.tsx      # Estadísticas y KPIs
│   └── QuotationTable.tsx      # Vista de tabla
├── services/           # Lógica de negocio
│   └── quotationService.ts     # Servicio principal
├── types/              # Definiciones TypeScript
│   └── quotation.ts            # Interfaces y tipos
├── pages/              # Páginas principales
│   └── QuotationsAnalyzer.tsx  # Página principal
└── README.md           # Documentación
```

## 🚀 Funcionalidades

### ✅ **Carga de Datos**
- Integración directa con Google Sheets
- Fallback a datos de muestra
- Parsing automático de CSV

### ✅ **Filtros Avanzados**
- Búsqueda general en todos los campos
- Filtros por proveedor, marca, tipo, modelo
- Filtros por diámetro y año
- Filtros dinámicos que se actualizan

### ✅ **Visualización**
- Vista de tarjetas con imágenes
- Vista de tabla detallada
- Modal de detalles con PDF
- Estadísticas y KPIs

### ✅ **Análisis**
- Top proveedores y marcas
- Distribución de precios
- Estadísticas automáticas
- Exportación a CSV

## 🔗 Integración

### Google Sheets
- URL: `https://docs.google.com/spreadsheets/d/e/2PACX-1vTnf4Sm6V9ZWNHbHKDtC10sXRmxtdvO66SMFeIGIGE7SYeUgqbqeod010MNeGV0p3KIVcPOVmhBwpFI/pub?output=csv`
- Formato: CSV público
- Actualización: Tiempo real

### Campos Requeridos
- Fecha y hora
- Descripción del Producto
- Nombre del Proveedor
- Marca del Componente
- Precio Unitario Neto en CLP
- Cantidad
- Plazo de entrega

## 🎯 Uso

```tsx
import { QuotationsAnalyzer } from './apps/quotations-analyzer/pages/QuotationsAnalyzer';

<QuotationsAnalyzer darkMode={darkMode} />
```