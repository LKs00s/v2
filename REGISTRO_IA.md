# Registro de Proyecto y Memoria de la IA (Última actualización: Enero 2025)

## 📋 Descripción del Proyecto

**Analizador de Cotizaciones** es un sistema profesional de análisis y gestión de cotizaciones desarrollado con React y TypeScript. La aplicación está diseñada para ser embebida en otras páginas web y proporciona herramientas avanzadas de análisis de datos empresariales.

### 🎯 Propósito Principal
- Análisis completo de cotizaciones empresariales
- Gestión de proveedores y productos
- Registro y seguimiento de eventos de mantenimiento
- Visualización de datos en tiempo real desde Google Sheets

## 🚀 Capacidades Desarrolladas

### 1. **Sistema de Cotizaciones**
- **Carga de datos**: Integración directa con Google Sheets para datos en tiempo real
- **Filtros avanzados**: Búsqueda por proveedor, marca, tipo, modelo, diámetro, año
- **Ordenamiento**: Por precio (mayor/menor) y alfabético (A-Z/Z-A)
- **Visualización dual**: Vista de tabla detallada y vista de tarjetas visuales
- **Estadísticas**: KPIs automáticos, top proveedores, distribución de precios
- **Exportación**: Descarga de datos filtrados en formato CSV
- **Modal de detalles**: Vista completa con previsualización de PDFs e imágenes

### 2. **Registro de Eventos de Mantenimiento**
- **Gestión de eventos**: Tarjetas de mantenimiento, órdenes de trabajo, tarjetas de seguridad
- **Comparación visual**: Sistema antes/después con galería multimedia
- **Filtros específicos**: Por tipo, ubicación, responsable, fechas
- **Estadísticas de mantenimiento**: Eventos completados, en progreso, pendientes
- **Multimedia**: Soporte para imágenes y videos desde Google Drive
- **Navegación intuitiva**: Thumbnails y controles de navegación

### 3. **Sistema de Autenticación (Supabase)**
- **Registro de usuarios**: Con validación de contraseñas y confirmación por email
- **Inicio de sesión**: Email/contraseña y OAuth con Google
- **Recuperación de contraseña**: Sistema de reset por email
- **Protección de rutas**: Middleware de autenticación
- **Modo demo**: Funcionalidad completa sin autenticación cuando Supabase no está configurado

### 4. **Interfaz de Usuario Avanzada**
- **Modo oscuro/claro**: Toggle completo con persistencia
- **Diseño responsivo**: Optimizado para desktop, tablet y móvil
- **Navegación intuitiva**: Navbar con dropdowns y menú móvil
- **Animaciones**: Micro-interacciones y transiciones suaves
- **Embedding**: Configurado para iframe con headers de seguridad

### 5. **Arquitectura Técnica**
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Routing**: React Router DOM con rutas protegidas
- **Estado**: Hooks personalizados para autenticación
- **Servicios**: Clases de servicio para manejo de datos
- **Componentes**: Arquitectura modular y reutilizable
- **Build**: Vite para desarrollo y producción

### 6. **Integración con APIs Externas**
- **Google Sheets**: Carga automática de datos CSV
- **Google Drive**: Previsualización de archivos multimedia
- **Netlify Functions**: Proxy para APIs externas
- **Supabase**: Backend como servicio para autenticación

### 7. **Funcionalidades de Análisis**
- **Estadísticas en tiempo real**: Cálculos automáticos de KPIs
- **Filtros dinámicos**: Opciones que se actualizan según selección
- **Visualización de datos**: Gráficos de distribución y rankings
- **Exportación de reportes**: Datos filtrados en CSV

## 🔑 Claves API y Variables de Entorno

### Variables de Entorno Requeridas

```env
# Supabase Configuration (Opcional - para autenticación)
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-de-supabase

# Google Sheets URLs (Configuradas en servicios)
# Cotizaciones: https://docs.google.com/spreadsheets/d/e/2PACX-1vTnf4Sm6V9ZWNHbHKDtC10sXRmxtdvO66SMFeIGIGE7SYeUgqbqeod010MNeGV0p3KIVcPOVmhBwpFI/pub?output=csv
# Eventos: https://docs.google.com/spreadsheets/d/e/2PACX-1vSPxGv63oDQ-OTM-K5R1rJote0aPAzfcP2OgjtBg1rIelemz_M6UcQpfNzeOyW7lFvcCPAmof7eKuYl/pub?output=csv
```

### Configuración de Supabase (Opcional)

Si deseas habilitar la autenticación:

1. **Crear proyecto en Supabase**:
   - Ve a [supabase.com](https://supabase.com)
   - Crea un nuevo proyecto
   - Obtén la URL y la clave anónima

2. **Configurar OAuth con Google**:
   - En Supabase Dashboard → Authentication → Providers
   - Habilitar Google OAuth
   - Configurar redirect URLs:
     - `http://localhost:5173` (desarrollo)
     - `https://tu-dominio.com` (producción)

3. **Variables de entorno**:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...tu-clave-anonima
   ```

### Configuración de Google Sheets

1. **Preparar Google Sheets**:
   - Crear hoja de cálculo con datos
   - Publicar como CSV: Archivo → Compartir → Publicar en la web → CSV
   - Copiar URL generada

2. **Actualizar URLs en servicios**:
   - `src/services/quotationService.ts` - línea del googleSheetsUrl
   - `src/services/eventService.ts` - línea del googleSheetsUrl

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── EventComparison.tsx
│   ├── EventFilters.tsx
│   ├── EventList.tsx
│   ├── Navbar.tsx
│   ├── QuotationCards.tsx
│   ├── QuotationFilters.tsx
│   └── QuotationTable.tsx
├── hooks/              # Hooks personalizados
│   └── useAuth.ts
├── lib/                # Configuraciones
│   └── supabase.ts
├── pages/              # Páginas principales
│   ├── EventsRegistry.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   └── ForgotPassword.tsx
├── services/           # Lógica de negocio
│   ├── eventService.ts
│   └── quotationService.ts
├── types/              # Definiciones TypeScript
│   ├── event.ts
│   └── quotation.ts
└── App.tsx             # Componente principal
```

## 🌐 Deployment y Embedding

### Netlify Configuration
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Functions**: `netlify/functions`

### Headers de Seguridad
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    Content-Security-Policy = "frame-ancestors 'self' *;"
```

### Embedding en Iframe
```html
<iframe 
    src="https://frolicking-fox-f0ca05.netlify.app"
    width="100%" 
    height="800"
    frameborder="0"
    title="Analizador de Cotizaciones">
</iframe>
```

## 🔧 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 📊 Funcionalidades por Módulo

### Módulo de Cotizaciones
- ✅ Carga desde Google Sheets
- ✅ Filtros avanzados y dinámicos
- ✅ Vista tabla y tarjetas
- ✅ Modal de detalles con PDF
- ✅ Estadísticas y KPIs
- ✅ Exportación CSV

### Módulo de Eventos
- ✅ Registro de mantenimiento
- ✅ Comparación antes/después
- ✅ Galería multimedia
- ✅ Filtros por tipo y fecha
- ✅ Estadísticas de eventos

### Sistema de Autenticación
- ✅ Registro con email
- ✅ Login con Google OAuth
- ✅ Recuperación de contraseña
- ✅ Rutas protegidas
- ✅ Modo demo sin auth

### Interfaz de Usuario
- ✅ Modo oscuro/claro
- ✅ Diseño responsivo
- ✅ Navegación intuitiva
- ✅ Animaciones suaves
- ✅ Soporte para embedding

## 🚀 Estado Actual del Proyecto

**Versión**: 1.0.0 (Enero 2025)
**Estado**: Producción - Completamente funcional
**URL**: https://frolicking-fox-f0ca05.netlify.app

### Características Implementadas
- [x] Sistema completo de cotizaciones
- [x] Registro de eventos de mantenimiento
- [x] Autenticación con Supabase
- [x] Interfaz responsiva con modo oscuro
- [x] Integración con Google Sheets
- [x] Sistema de embedding
- [x] Netlify Functions para APIs

### Próximas Mejoras Sugeridas
- [ ] Dashboard de analytics avanzado
- [ ] Notificaciones push
- [ ] Exportación a Excel
- [ ] API REST propia
- [ ] Módulo de reportes personalizados
- [ ] Integración con más proveedores de datos

---

**Desarrollado usando React, TypeScript y Tailwind CSS**