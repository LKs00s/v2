# Registro de Proyecto y Memoria de la IA (Última actualización: Enero 2025)

## 📋 Descripción del Proyecto

**Sistema Industrial del Área Técnica** es una plataforma profesional multi-aplicación desarrollada con React y TypeScript. El sistema está diseñado con una arquitectura modular que permite múltiples aplicaciones independientes dentro de un mismo ecosistema, optimizado para ser embebido en otras páginas web y proporcionar herramientas avanzadas de análisis de datos empresariales.

### 🎯 Propósito Principal
- **Plataforma multi-aplicación**: Sistema modular con apps independientes
- **Análisis completo de cotizaciones**: Gestión empresarial avanzada
- **Registro de eventos de mantenimiento**: Seguimiento industrial completo
- **Gestión de proveedores y productos**: Base de datos centralizada
- **Visualización de datos en tiempo real**: Integración con Google Sheets
- **Sistema embebible**: Configurado para iframe con seguridad completa

## 🏗️ Arquitectura Modular del Proyecto

### **📁 Estructura Organizacional**

```
src/
├── apps/                   # 🎯 APLICACIONES INDEPENDIENTES
│   ├── quotations-analyzer/       # 🧮 Analizador de Cotizaciones
│   │   ├── components/             # Componentes específicos
│   │   │   ├── QuotationCards.tsx
│   │   │   ├── QuotationDetailModal.tsx
│   │   │   ├── QuotationFilters.tsx
│   │   │   ├── QuotationStats.tsx
│   │   │   └── QuotationTable.tsx
│   │   ├── services/               # Lógica de negocio
│   │   │   └── quotationService.ts
│   │   ├── types/                  # Tipos TypeScript
│   │   │   └── quotation.ts
│   │   ├── pages/                  # Páginas principales
│   │   │   └── QuotationsAnalyzer.tsx
│   │   └── README.md               # Documentación específica
│   │
│   ├── events-registry/            # 📅 Registro de Eventos
│   │   ├── components/             # Componentes específicos
│   │   │   ├── EventComparison.tsx
│   │   │   ├── EventDetail.tsx
│   │   │   ├── EventFilters.tsx
│   │   │   ├── EventList.tsx
│   │   │   └── EventStats.tsx
│   │   ├── services/               # Lógica de negocio
│   │   │   └── eventService.ts
│   │   ├── types/                  # Tipos TypeScript
│   │   │   └── event.ts
│   │   ├── pages/                  # Páginas principales
│   │   │   └── EventsRegistry.tsx
│   │   └── README.md               # Documentación específica
│   │
│   └── index.ts                    # 📦 Exportaciones centralizadas
│
├── shared/                 # 🔧 RECURSOS COMPARTIDOS
│   ├── components/                 # Componentes reutilizables
│   │   ├── Navbar.tsx              # Navegación principal
│   │   ├── ProtectedRoute.tsx      # Protección de rutas
│   │   └── ViewToggle.tsx          # Toggle tabla/tarjetas
│   ├── hooks/                      # Hooks personalizados
│   │   └── useAuth.ts              # Hook de autenticación
│   ├── lib/                        # Configuraciones
│   │   └── supabase.ts             # Cliente Supabase
│   ├── types/                      # Tipos compartidos
│   └── README.md                   # Documentación compartida
│
├── pages/                  # 📄 PÁGINAS PRINCIPALES
│   ├── Login.tsx                   # Autenticación
│   ├── Register.tsx                # Registro de usuarios
│   └── ForgotPassword.tsx          # Recuperación de contraseña
│
└── App.tsx                 # 🚀 Componente principal
```

### **🎯 Principios de Organización**
- **Apps Independientes**: Cada aplicación tiene su carpeta completa con todos sus archivos
- **Recursos Compartidos**: Componentes, hooks y servicios reutilizables en `/shared`
- **Separación Clara**: Cada app es autónoma y puede desarrollarse independientemente
- **Escalabilidad**: Fácil agregar nuevas apps sin afectar las existentes
- **Documentación**: Cada app tiene su propio README con documentación específica

## 🚀 Capacidades Desarrolladas

### 1. **🧮 Sistema de Cotizaciones (quotations-analyzer)**

#### **Funcionalidades Principales:**
- **Carga de datos en tiempo real**: Integración directa con Google Sheets
- **Filtros avanzados y dinámicos**: 
  - Búsqueda general en todos los campos
  - Filtros por proveedor, marca, tipo, modelo, diámetro
  - Filtros por año y tipo de cotización
  - Filtros que se actualizan dinámicamente según selección
- **Ordenamiento inteligente**: 
  - Por precio (mayor/menor)
  - Alfabético (A-Z/Z-A)
  - Por fecha y relevancia
- **Visualización dual**: 
  - Vista de tabla detallada con paginación
  - Vista de tarjetas visuales con imágenes
  - Toggle instantáneo entre vistas
- **Modal de detalles avanzado**:
  - Previsualización completa de PDFs
  - Galería de imágenes integrada
  - Controles de zoom y rotación
  - Información técnica detallada
- **Estadísticas automáticas**: 
  - KPIs en tiempo real
  - Top proveedores y marcas
  - Distribución de precios
  - Análisis de tendencias
- **Exportación de datos**: Descarga de datos filtrados en formato CSV

#### **Componentes Específicos:**
- `QuotationCards.tsx` - Vista de tarjetas con imágenes
- `QuotationDetailModal.tsx` - Modal completo con PDF y detalles
- `QuotationFilters.tsx` - Sistema de filtros avanzados
- `QuotationStats.tsx` - Estadísticas y KPIs
- `QuotationTable.tsx` - Vista de tabla profesional

### 2. **📅 Sistema de Registro de Eventos (events-registry)**

#### **Funcionalidades Principales:**
- **Gestión completa de eventos**:
  - Tarjetas de mantenimiento
  - Órdenes de trabajo
  - Tarjetas de seguridad
  - Seguimiento de anomalías
- **Comparación visual antes/después**:
  - Sistema de galería multimedia
  - Navegación por thumbnails
  - Controles de zoom y rotación
  - Soporte completo para Google Drive
- **Filtros específicos de mantenimiento**:
  - Por tipo de evento y tarjeta
  - Por ubicación y responsable
  - Por fechas de detección
  - Búsqueda general en descripciones
- **Estadísticas de mantenimiento**:
  - Eventos completados vs pendientes
  - Tiempo promedio de resolución
  - Costos totales por período
  - Distribución por estado y prioridad
- **Multimedia avanzada**:
  - Detección automática de tipo (imagen/video)
  - Conversión de URLs de Google Drive
  - Previsualización en iframe
  - Thumbnails automáticos

#### **Componentes Específicos:**
- `EventComparison.tsx` - Comparación visual antes/después
- `EventDetail.tsx` - Detalles completos del evento
- `EventFilters.tsx` - Filtros específicos de eventos
- `EventList.tsx` - Lista compacta de eventos
- `EventStats.tsx` - Estadísticas de mantenimiento

### 3. **🔐 Sistema de Autenticación Completo**

#### **Funcionalidades de Autenticación:**
- **Registro de usuarios**:
  - Validación completa de formularios
  - Indicador de fortaleza de contraseña
  - Confirmación por email
  - Manejo de errores detallado
- **Inicio de sesión múltiple**:
  - Email/contraseña con validación
  - OAuth con Google (configuración automática)
  - Redirección inteligente post-login
  - Manejo de estados de carga
- **Recuperación de contraseña**:
  - Sistema de reset por email
  - Validación de formularios
  - Confirmación visual de envío
  - Manejo de errores específicos
- **Protección de rutas**:
  - Middleware de autenticación
  - Redirección automática
  - Estados de carga profesionales
  - Soporte para modo demo
- **Modo demo inteligente**:
  - Funcionalidad completa sin autenticación
  - Detección automática de configuración
  - Ideal para desarrollo y testing

### 4. **🎨 Interfaz de Usuario Avanzada**

#### **Sistema de Diseño:**
- **Modo oscuro/claro completo**:
  - Toggle instantáneo en navbar
  - Persistencia de preferencia
  - Transiciones suaves
  - Consistencia en todas las apps
- **Diseño completamente responsivo**:
  - Optimizado para desktop, tablet y móvil
  - Breakpoints inteligentes
  - Navegación adaptativa
  - Componentes flexibles
- **Navegación profesional**:
  - Navbar con dropdowns organizados
  - Menú móvil completo
  - Estados activos visuales
  - Breadcrumbs automáticos
- **Animaciones y micro-interacciones**:
  - Transiciones suaves entre estados
  - Hover effects profesionales
  - Loading states animados
  - Feedback visual inmediato
- **Sistema embebible**:
  - Headers de seguridad configurados
  - Soporte completo para iframe
  - Detección automática de embedding
  - Ejemplo de integración incluido

### 5. **⚙️ Arquitectura Técnica Avanzada**

#### **Stack Tecnológico:**
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Routing**: React Router DOM con rutas protegidas
- **Estado**: Hooks personalizados y Context API
- **Build**: Vite para desarrollo y producción optimizada
- **Deployment**: Netlify con Functions serverless

#### **Servicios y APIs:**
- **Clases de servicio modulares**: Una por cada app
- **Manejo de errores centralizado**: Try/catch con fallbacks
- **Caching inteligente**: Optimización de requests
- **TypeScript completo**: Tipado estricto en todo el proyecto

### 6. **🌐 Integración con APIs Externas**

#### **Google Sheets Integration:**
- **Carga automática**: Datos CSV en tiempo real
- **Parsing inteligente**: Manejo de comillas y caracteres especiales
- **Fallback a datos de muestra**: Continuidad garantizada
- **Validación de datos**: Verificación de integridad

#### **Google Drive Integration:**
- **Conversión automática de URLs**: Detección de IDs de archivo
- **Previsualización universal**: Soporte para imágenes y videos
- **Thumbnails automáticos**: Generación de previsualizaciones
- **Detección de tipo**: Clasificación automática de archivos

#### **Netlify Functions:**
- **Proxy para APIs**: Evitar problemas de CORS
- **Serverless functions**: Escalabilidad automática
- **Headers de seguridad**: Configuración profesional

### 7. **📊 Funcionalidades de Análisis Avanzado**

#### **Estadísticas en Tiempo Real:**
- **KPIs automáticos**: Cálculos dinámicos
- **Visualización de datos**: Gráficos y distribuciones
- **Rankings dinámicos**: Top proveedores y marcas
- **Análisis de tendencias**: Patrones temporales

#### **Filtros Inteligentes:**
- **Filtros dinámicos**: Opciones que se actualizan
- **Búsqueda global**: En todos los campos simultáneamente
- **Combinación de filtros**: Lógica AND avanzada
- **Persistencia de filtros**: Mantiene selección

#### **Exportación y Reportes:**
- **CSV personalizado**: Solo datos filtrados
- **Formato profesional**: Headers y encoding correcto
- **Descarga instantánea**: Sin procesamiento servidor

## 🔑 Claves API y Variables de Entorno

### **Variables de Entorno Principales**

```env
# 🔐 Supabase Configuration (Opcional - para autenticación)
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima-de-supabase

# 📊 Google Sheets URLs (Configuradas en servicios)
# Cotizaciones: https://docs.google.com/spreadsheets/d/e/2PACX-1vTnf4Sm6V9ZWNHbHKDtC10sXRmxtdvO66SMFeIGIGE7SYeUgqbqeod010MNeGV0p3KIVcPOVmhBwpFI/pub?output=csv
# Eventos: https://docs.google.com/spreadsheets/d/e/2PACX-1vSPxGv63oDQ-OTM-K5R1rJote0aPAzfcP2OgjtBg1rIelemz_M6UcQpfNzeOyW7lFvcCPAmof7eKuYl/pub?output=csv
```

### **🔧 Configuración de Supabase (Opcional)**

#### **Para habilitar autenticación completa:**

1. **Crear proyecto en Supabase**:
   - Ir a [supabase.com](https://supabase.com)
   - Crear nuevo proyecto
   - Obtener URL y clave anónima del dashboard

2. **Configurar OAuth con Google**:
   - En Supabase Dashboard → Authentication → Providers
   - Habilitar Google OAuth
   - Configurar redirect URLs:
     - `http://localhost:5173` (desarrollo)
     - `https://tu-dominio.com` (producción)
   - Obtener Client ID y Secret de Google Console

3. **Variables de entorno**:
   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...tu-clave-anonima
   ```

### **📊 Configuración de Google Sheets**

#### **Para cada aplicación:**

1. **Preparar Google Sheets**:
   - Crear hoja de cálculo con estructura específica
   - Publicar como CSV: Archivo → Compartir → Publicar en la web → CSV
   - Copiar URL generada (formato: `/pub?output=csv`)

2. **Actualizar URLs en servicios**:
   - **Cotizaciones**: `src/apps/quotations-analyzer/services/quotationService.ts`
   - **Eventos**: `src/apps/events-registry/services/eventService.ts`

3. **Estructura de datos requerida**:
   - **Cotizaciones**: Fecha, Descripción, Proveedor, Marca, Precio, etc.
   - **Eventos**: Timestamp, Tipo de tarjeta, Ubicación, Autor, Registros multimedia, etc.

### **🌐 Configuración de Google Drive**

#### **Para multimedia en eventos:**

1. **Preparar archivos**:
   - Subir imágenes/videos a Google Drive
   - Configurar permisos: "Cualquier persona con el enlace"
   - Copiar enlaces de compartir

2. **Formato de URLs soportado**:
   - `https://drive.google.com/file/d/FILE_ID/view`
   - Conversión automática a preview y thumbnail

## 🌐 Deployment y Embedding

### **📦 Configuración de Netlify**

```toml
[build]
  publish = "dist"
  command = "npm run build"
  functions = "netlify/functions"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "frame-ancestors 'self' *;"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[redirects]]
  from = "/#access_token=*"
  to = "/index.html"
  status = 200
```

### **🖼️ Sistema de Embedding**

#### **Código básico para iframe:**
```html
<iframe 
    src="https://frolicking-fox-f0ca05.netlify.app"
    width="100%" 
    height="800"
    frameborder="0"
    title="Sistema Industrial del Área Técnica">
</iframe>
```

#### **Configuración responsiva:**
```html
<div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%;">
    <iframe 
        src="https://frolicking-fox-f0ca05.netlify.app"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        frameborder="0"
        title="Sistema Industrial"
        loading="lazy">
    </iframe>
</div>
```

#### **Tamaños recomendados:**
- **Mínimo**: 800x600px
- **Recomendado**: 100% x 800px
- **Completo**: 100% x 1000px

## 🔧 Comandos de Desarrollo

### **📋 Scripts Principales**

```bash
# 📦 Instalar dependencias
npm install

# 🚀 Desarrollo local
npm run dev

# 🏗️ Build para producción
npm run build

# 👀 Preview del build
npm run preview

# 🔍 Linting
npm run lint
```

### **🛠️ Desarrollo por Apps**

```bash
# Trabajar en app específica
cd src/apps/quotations-analyzer/
# o
cd src/apps/events-registry/

# Cada app tiene su estructura independiente
# components/, services/, types/, pages/
```

## 📊 Funcionalidades por Módulo

### **🧮 Módulo de Cotizaciones**
- ✅ Carga desde Google Sheets con fallback
- ✅ Filtros avanzados y dinámicos
- ✅ Vista tabla y tarjetas con toggle
- ✅ Modal de detalles con PDF y zoom
- ✅ Estadísticas y KPIs automáticos
- ✅ Exportación CSV personalizada
- ✅ Búsqueda global en tiempo real
- ✅ Ordenamiento múltiple

### **📅 Módulo de Eventos**
- ✅ Registro completo de mantenimiento
- ✅ Comparación visual antes/después
- ✅ Galería multimedia con Google Drive
- ✅ Filtros específicos por tipo y fecha
- ✅ Estadísticas de eventos y costos
- ✅ Navegación por thumbnails
- ✅ Detección automática de archivos

### **🔐 Sistema de Autenticación**
- ✅ Registro con validación completa
- ✅ Login con Google OAuth
- ✅ Recuperación de contraseña
- ✅ Rutas protegidas con middleware
- ✅ Modo demo sin autenticación
- ✅ Estados de carga profesionales

### **🎨 Interfaz de Usuario**
- ✅ Modo oscuro/claro persistente
- ✅ Diseño completamente responsivo
- ✅ Navegación con dropdowns organizados
- ✅ Animaciones y micro-interacciones
- ✅ Soporte completo para embedding
- ✅ Estados de error y carga

### **🏗️ Arquitectura Técnica**
- ✅ Apps independientes y modulares
- ✅ Recursos compartidos optimizados
- ✅ TypeScript estricto en todo el proyecto
- ✅ Servicios con manejo de errores
- ✅ Hooks personalizados reutilizables
- ✅ Build optimizado con Vite

## 🚀 Estado Actual del Proyecto

**Versión**: 2.0.0 (Enero 2025)  
**Estado**: Producción - Arquitectura Modular Completa  
**URL**: https://frolicking-fox-f0ca05.netlify.app

### **✅ Características Implementadas**
- [x] **Arquitectura modular**: Apps independientes con recursos compartidos
- [x] **Sistema completo de cotizaciones**: Con análisis avanzado
- [x] **Registro de eventos de mantenimiento**: Con comparación visual
- [x] **Autenticación completa**: Con Supabase y modo demo
- [x] **Interfaz responsiva**: Con modo oscuro y animaciones
- [x] **Integración Google Sheets**: Datos en tiempo real
- [x] **Sistema de embedding**: Headers de seguridad configurados
- [x] **Netlify Functions**: Para APIs serverless
- [x] **Documentación completa**: README por cada app
- [x] **Navegación organizada**: Dropdown "Apps" en navbar

### **🔄 Próximas Mejoras Sugeridas**
- [ ] **Dashboard de analytics**: Métricas cruzadas entre apps
- [ ] **Notificaciones push**: Sistema de alertas
- [ ] **Exportación Excel**: Formato avanzado con gráficos
- [ ] **API REST propia**: Backend independiente
- [ ] **Módulo de reportes**: Generación automática
- [ ] **Integración con más proveedores**: APIs adicionales
- [ ] **Sistema de roles**: Permisos granulares
- [ ] **Audit trail**: Registro de cambios
- [ ] **Backup automático**: Respaldo de configuraciones

### **🎯 Roadmap de Nuevas Apps**
- [ ] **Gestión de Inventario**: Control de stock y materiales
- [ ] **Planificación de Mantenimiento**: Calendario y programación
- [ ] **Dashboard Ejecutivo**: KPIs y métricas de alto nivel
- [ ] **Gestión de Proveedores**: CRM especializado
- [ ] **Control de Calidad**: Inspecciones y certificaciones
- [ ] **Gestión Documental**: Archivo y versionado

## 🏆 Beneficios de la Arquitectura Actual

### **✅ Para Desarrollo**
- **Independencia**: Cada app se desarrolla sin afectar otras
- **Escalabilidad**: Agregar apps es simple y ordenado
- **Mantenimiento**: Cambios localizados y seguros
- **Testing**: Pruebas independientes por app
- **Colaboración**: Equipos pueden trabajar en paralelo

### **✅ Para Usuarios**
- **Navegación intuitiva**: Apps organizadas en dropdown
- **Rendimiento**: Carga solo lo necesario
- **Consistencia**: Experiencia unificada
- **Flexibilidad**: Acceso modular a funcionalidades
- **Embedding**: Integración fácil en otros sistemas

### **✅ Para el Negocio**
- **ROI optimizado**: Desarrollo eficiente
- **Tiempo al mercado**: Nuevas apps más rápidas
- **Mantenimiento reducido**: Código organizado
- **Escalabilidad**: Crecimiento sostenible
- **Integración**: Ecosistema cohesivo

---

**Desarrollado con React 18, TypeScript y Tailwind CSS**  
**Arquitectura Modular - Apps Independientes - Recursos Compartidos**