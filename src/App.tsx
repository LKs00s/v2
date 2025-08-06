import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FileSpreadsheet, RefreshCw } from 'lucide-react';
import { Navbar } from './shared/components/Navbar';
import { QuotationsAnalyzer } from './apps/quotations-analyzer/pages/QuotationsAnalyzer';
import { EventsRegistry } from './apps/events-registry/pages/EventsRegistry';
import { PlanMantenimiento } from './apps/dashboards/plan-mantenimiento/pages/PlanMantenimiento';
import { GestionPresupuesto } from './apps/dashboards/gestion-presupuesto/pages/GestionPresupuesto';
import { RilesAS } from './apps/dashboards/riles-as/pages/RilesAS';
import { EnergiaElectrica } from './apps/dashboards/energia-electrica/pages/EnergiaElectrica';
import { Agua } from './apps/dashboards/agua/pages/Agua';
import { Vapor } from './apps/dashboards/vapor/pages/Vapor';
import { Nitrogeno } from './apps/dashboards/nitrogeno/pages/Nitrogeno';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { useAuth } from './shared/hooks/useAuth';
import { isSupabaseConfigured } from './shared/lib/supabase';

// OAuth Redirect Handler Component
const OAuthRedirectHandler: React.FC = () => {
  useEffect(() => {
    // Check if we're on localhost with OAuth tokens
    if (window.location.hostname === 'localhost' && window.location.hash.includes('access_token')) {
      // Extract the hash and redirect to production URL
      const hash = window.location.hash;
      const productionUrl = 'https://frolicking-fox-f0ca05.netlify.app';
      window.location.href = `${productionUrl}/${hash}`;
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <RefreshCw className="w-8 h-8 text-white animate-spin" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Redirigiendo...
        </h3>
        <p className="text-gray-300">
          Completando autenticación con Google
        </p>
      </div>
    </div>
  );
};

// Placeholder components for other routes
const PlaceholderPage: React.FC<{ title: string; darkMode: boolean }> = ({ title, darkMode }) => (
  <div className={`min-h-screen ${
    darkMode 
      ? 'bg-gray-900' 
      : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
  } flex items-center justify-center`}>
    <div className={`${
      darkMode 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/80 border-gray-200'
    } backdrop-blur-sm rounded-2xl shadow-xl border p-8 text-center max-w-md`}>
      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
        <FileSpreadsheet className="w-8 h-8 text-white" />
      </div>
      <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
        {title}
      </h1>
      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Esta página está en desarrollo. Próximamente estará disponible.
      </p>
    </div>
  </div>
);

function App() {
  const { user, loading } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [defaultFilters] = useState<Filters>({ tipoCotizacion: 'Componente' });

  // Handle OAuth redirect from localhost
  useEffect(() => {
    if (window.location.hostname === 'localhost' && window.location.hash.includes('access_token')) {
      // We're on localhost with OAuth tokens, redirect to production
      const hash = window.location.hash;
      const productionUrl = 'https://frolicking-fox-f0ca05.netlify.app';
      window.location.href = `${productionUrl}/${hash}`;
      return;
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Apply dark mode class on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={
            (user || !isSupabaseConfigured()) ? <Navigate to="/" replace /> : <Login darkMode={darkMode} />
          } 
        />
        <Route 
          path="/register" 
          element={
            (user || !isSupabaseConfigured()) ? <Navigate to="/" replace /> : <Register darkMode={darkMode} />
          } 
        />
        <Route 
          path="/forgot-password" 
          element={
            (user || !isSupabaseConfigured()) ? <Navigate to="/" replace /> : <ForgotPassword darkMode={darkMode} />
          } 
        />
        
        {/* Protected routes */}
        <Route 
          path="/*" 
          element={
            <ProtectedRoute user={user} loading={loading} darkMode={darkMode}>
              <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} />
              <Routes>
                <Route 
                  path="/" 
                  element={<QuotationsAnalyzer darkMode={darkMode} />} 
                />
                <Route 
                  path="/planillas" 
                  element={<PlaceholderPage title="Planillas de Registro" darkMode={darkMode} />} 
                />
                <Route 
                  path="/registro-eventos" 
                  element={<EventsRegistry darkMode={darkMode} />} 
                />
                <Route 
                  path="/dashboards/plan-mantenimiento" 
                  element={<PlanMantenimiento darkMode={darkMode} />} 
                />
                <Route 
                  path="/dashboards/gestion-presupuesto" 
                  element={<GestionPresupuesto darkMode={darkMode} />} 
                />
                <Route 
                  path="/dashboards/riles-as" 
                  element={<RilesAS darkMode={darkMode} />} 
                />
              </Routes>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;