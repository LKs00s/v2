import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FileSpreadsheet, 
  Moon, 
  Sun, 
  ChevronDown, 
  LogOut, 
  User, 
  Menu,
  X,
  Calculator,
  Calendar
} from 'lucide-react';
import { supabase, signOut, isSupabaseConfigured } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: SupabaseUser | null;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBasesDeDatosOpen, setIsBasesDeDatosOpen] = useState(false);
  const [isMantenimientoOpen, setIsMantenimientoOpen] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const basesDeDatosRef = useRef<HTMLDivElement>(null);
  const mantenimientoRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (basesDeDatosRef.current && !basesDeDatosRef.current.contains(event.target as Node)) {
        setIsBasesDeDatosOpen(false);
      }
      if (mantenimientoRef.current && !mantenimientoRef.current.contains(event.target as Node)) {
        setIsMantenimientoOpen(false);
      }
      if (appsRef.current && !appsRef.current.contains(event.target as Node)) {
        setIsAppsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const NavLink: React.FC<{ to: string; children: React.ReactNode; className?: string }> = ({ 
    to, 
    children, 
    className = '' 
  }) => (
    <Link
      to={to}
      className={`text-base font-medium transition-colors duration-200 ${
        isActivePath(to)
          ? darkMode 
            ? 'text-blue-400 border-b-2 border-blue-400' 
            : 'text-blue-600 border-b-2 border-blue-600'
          : darkMode 
            ? 'text-gray-300 hover:text-white' 
            : 'text-gray-600 hover:text-gray-900'
      } ${className}`}
    >
      {children}
    </Link>
  );

  const DropdownMenu: React.FC<{
    title: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    ref: React.RefObject<HTMLDivElement>;
    children: React.ReactNode;
  }> = ({ title, isOpen, setIsOpen, ref, children }) => (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center text-base font-medium transition-colors duration-200 ${
          darkMode 
            ? 'text-gray-300 hover:text-white' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {title}
        <ChevronDown 
          className={`ml-1 w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      {isOpen && (
        <div className={`absolute left-0 mt-2 w-56 rounded-xl shadow-lg ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}>
          <div className="py-2" role="menu" aria-orientation="vertical">
            {children}
          </div>
        </div>
      )}
    </div>
  );

  const DropdownItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 text-sm transition-colors duration-200 ${
        isActivePath(to)
          ? darkMode
            ? 'bg-blue-900/50 text-blue-300'
            : 'bg-blue-50 text-blue-700'
          : darkMode 
            ? 'text-gray-200 hover:bg-gray-700 hover:text-white' 
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
      }`}
      role="menuitem"
      onClick={() => {
        setIsBasesDeDatosOpen(false);
        setIsMantenimientoOpen(false);
        setIsAppsOpen(false);
        setIsMobileMenuOpen(false);
      }}
    >
      {children}
    </Link>
  );

  return (
    <header className={`sticky top-0 ${
      darkMode 
        ? 'bg-gray-900/95 border-gray-700' 
        : 'bg-white/95 border-gray-200'
    } backdrop-blur-sm shadow-lg border-b z-40`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-700 to-blue-800 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <div className="relative">
                  <div className="w-3 h-3 bg-white rounded-full absolute top-0 left-0"></div>
                  <div className="w-2 h-2 bg-blue-300 rounded-full absolute top-1 left-2"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full absolute top-2 left-3.5"></div>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Operations Analytics Platform
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Área Técnica
                </p>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavLink to="/">Inicio</NavLink>
            
            <DropdownMenu
              title="Apps"
              isOpen={isAppsOpen}
              setIsOpen={setIsAppsOpen}
              ref={appsRef}
            >
              <DropdownItem to="/cotizaciones">
                <Calculator className="w-4 h-4 mr-2" />
                Analizador de Cotizaciones
              </DropdownItem>
              <DropdownItem to="/registro-eventos">
                <Calendar className="w-4 h-4 mr-2" />
                Registro de Eventos
              </DropdownItem>
            </DropdownMenu>
            
            <NavLink to="/planillas">Planillas de Registro</NavLink>
            
            <DropdownMenu
              title="Suministros y Serv."
              isOpen={isBasesDeDatosOpen}
              setIsOpen={setIsBasesDeDatosOpen}
              ref={basesDeDatosRef}
            >
              <DropdownItem to="/dashboards/riles-as">
                🏭 RILes y A.S.
              </DropdownItem>
              <DropdownItem to="/dashboards/energia-electrica">
                ⚡ Energía Eléctrica
              </DropdownItem>
              <DropdownItem to="/dashboards/agua">
                💧 Agua
              </DropdownItem>
              <DropdownItem to="/dashboards/vapor">
                🌫️ Vapor
              </DropdownItem>
              <DropdownItem to="/dashboards/nitrogeno">
                🧪 Nitrógeno
              </DropdownItem>
            </DropdownMenu>

            <DropdownMenu
              title="Mantenimiento"
              isOpen={isMantenimientoOpen}
              setIsOpen={setIsMantenimientoOpen}
              ref={mantenimientoRef}
            >
              <DropdownItem to="/dashboards/plan-mantenimiento">
                📊 Plan de Mantenimiento
              </DropdownItem>
              <DropdownItem to="/dashboards/gestion-presupuesto">
                💰 Gestión de Presupuesto
              </DropdownItem>
            </DropdownMenu>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-xl transition-all duration-200 ${
                darkMode 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
              aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User authentication */}
            {user && isSupabaseConfigured() ? (
              <div className="flex items-center space-x-3">
                <span className={`hidden sm:block text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Cerrar Sesión</span>
                </button>
              </div>
            ) : isSupabaseConfigured() ? (
              <Link
                to="/login"
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <User className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Iniciar Sesión</span>
              </Link>
            ) : (
              <div className="px-3 py-2 bg-yellow-100 border border-yellow-300 rounded-xl text-yellow-800 text-xs">
                Modo Demo
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all duration-200 ${
                darkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label="Abrir menú de navegación"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className={`lg:hidden border-t ${
            darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActivePath('/')
                    ? darkMode 
                      ? 'bg-blue-900/50 text-blue-300' 
                      : 'bg-blue-50 text-blue-700'
                    : darkMode 
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </Link>
              
              {/* Mobile Apps */}
              <div className="space-y-1">
                <div className={`px-3 py-2 text-base font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Apps
                </div>
                <Link
                  to="/cotizaciones"
                  className={`block px-6 py-2 rounded-md text-sm ${
                    isActivePath('/cotizaciones')
                      ? darkMode 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-50 text-blue-700'
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Calculator className="w-4 h-4 inline mr-2" />
                  Analizador de Cotizaciones
                </Link>
                <Link
                  to="/registro-eventos"
                  className={`block px-6 py-2 rounded-md text-sm ${
                    isActivePath('/registro-eventos')
                      ? darkMode 
                        ? 'bg-orange-900/50 text-orange-300' 
                        : 'bg-orange-50 text-orange-700'
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Registro de Eventos
                </Link>
              </div>
              
              <Link
                to="/planillas"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActivePath('/planillas')
                    ? darkMode 
                      ? 'bg-blue-900/50 text-blue-300' 
                      : 'bg-blue-50 text-blue-700'
                    : darkMode 
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Planillas de Registro
              </Link>
              
              {/* Mobile Bases de Datos */}
              <div className="space-y-1">
                <div className={`px-3 py-2 text-base font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Suministros y Serv.
                </div>
                <Link
                  to="/dashboards/riles-as"
                  className={`block px-6 py-2 rounded-md text-sm ${
                    isActivePath('/dashboards/riles-as')
                      ? darkMode 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-50 text-blue-700'
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🏭 RILes y A.S.
                </Link>
                <Link
                  to="/dashboards/energia-electrica"
                  className={`block px-6 py-2 rounded-md text-sm ${
                    isActivePath('/dashboards/energia-electrica')
                      ? darkMode 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-50 text-blue-700'
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ⚡ Energía Eléctrica
                </Link>
                <Link
                  to="/dashboards/agua"
                  className={`block px-6 py-2 rounded-md text-sm ${
                    isActivePath('/dashboards/agua')
                      ? darkMode 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-50 text-blue-700'
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  💧 Agua
                </Link>
                <Link
                  to="/dashboards/vapor"
                  className={`block px-6 py-2 rounded-md text-sm ${
                    isActivePath('/dashboards/vapor')
                      ? darkMode 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-50 text-blue-700'
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🌡️ Vapor
                </Link>
                <Link
                  to="/dashboards/nitrogeno"
                  className={`block px-6 py-2 rounded-md text-sm ${
                    isActivePath('/dashboards/nitrogeno')
                      ? darkMode 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-50 text-blue-700'
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🧪 Nitrógeno
                </Link>
                <Link
                  to="/dashboards/energia-electrica"
                  className={`block px-6 py-2 rounded-md text-sm ${
                    isActivePath('/dashboards/energia-electrica')
                      ? darkMode 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-50 text-blue-700'
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ⚡ Energía Eléctrica
                </Link>
                <Link
                  to="/dashboards/agua"
                  className={`block px-6 py-2 rounded-md text-sm ${
                    isActivePath('/dashboards/agua')
                      ? darkMode 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-50 text-blue-700'
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  💧 Agua
                </Link>
                <Link
                  to="/dashboards/vapor"
                  className={`block px-6 py-2 rounded-md text-sm ${
                    isActivePath('/dashboards/vapor')
                      ? darkMode 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-50 text-blue-700'
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🌡️ Vapor
                </Link>
                <Link
                  to="/dashboards/nitrogeno"
                  className={`block px-6 py-2 rounded-md text-sm ${
                    isActivePath('/dashboards/nitrogeno')
                      ? darkMode 
                        ? 'bg-blue-900/50 text-blue-300' 
                        : 'bg-blue-50 text-blue-700'
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  🧪 Nitrógeno
                </Link>
              </div>

              {/* Mobile Mantenimiento */}
              <div className="space-y-1">
                <div className={`px-3 py-2 text-base font-medium ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Mantenimiento
                </div>
                <Link
                  to="/dashboards/plan-mantenimiento"
                  className={`block px-6 py-2 rounded-md text-sm ${
                    isActivePath('/dashboards/plan-mantenimiento')
                      ? darkMode 
                        ? 'bg-green-900/50 text-green-300' 
                        : 'bg-green-50 text-green-700'
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  📊 Plan de Mantenimiento
                </Link>
                <Link
                  to="/dashboards/gestion-presupuesto"
                  className={`block px-6 py-2 rounded-md text-sm ${
                    isActivePath('/dashboards/gestion-presupuesto')
                      ? darkMode 
                        ? 'bg-green-900/50 text-green-300' 
                        : 'bg-green-50 text-green-700'
                      : darkMode 
                        ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  💰 Gestión de Presupuesto
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};