# 🔧 Componentes y Servicios Compartidos

Recursos reutilizables entre todas las aplicaciones del sistema.

## 📁 Estructura

```
shared/
├── components/          # Componentes reutilizables
│   ├── Navbar.tsx              # Navegación principal
│   ├── ProtectedRoute.tsx      # Protección de rutas
│   └── ViewToggle.tsx          # Toggle tabla/tarjetas
├── hooks/              # Hooks personalizados
│   └── useAuth.ts              # Hook de autenticación
├── lib/                # Configuraciones
│   └── supabase.ts             # Cliente Supabase
├── types/              # Tipos compartidos
└── README.md           # Documentación
```

## 🧩 Componentes

### **Navbar**
- Navegación principal del sistema
- Dropdown para Apps, Bases de Datos, Dashboards
- Toggle de modo oscuro/claro
- Autenticación de usuario
- Responsive design

### **ProtectedRoute**
- Middleware de autenticación
- Redirección automática
- Soporte para modo demo
- Loading states

### **ViewToggle**
- Cambio entre vista tabla/tarjetas
- Diseño consistente
- Estados activos

## 🔐 Autenticación

### **useAuth Hook**
- Estado de usuario
- Manejo de sesiones
- Configuración automática
- Modo demo sin Supabase

### **Supabase Client**
- Configuración centralizada
- Funciones de auth
- OAuth con Google
- Recuperación de contraseña

## 🎯 Uso

```tsx
// Importar componentes compartidos
import { Navbar } from '../../shared/components/Navbar';
import { useAuth } from '../../shared/hooks/useAuth';
import { isSupabaseConfigured } from '../../shared/lib/supabase';
```

## 🔧 Configuración

### Variables de Entorno
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anonima
```

### Modo Demo
- Funciona sin Supabase configurado
- Acceso completo a funcionalidades
- Ideal para desarrollo y testing