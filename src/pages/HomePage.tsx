import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Calendar, 
  BarChart3, 
  DollarSign,
  Zap,
  Droplets,
  Wind,
  Beaker,
  Factory,
  ArrowRight,
  TrendingUp,
  Settings,
  FileSpreadsheet
} from 'lucide-react';

interface HomePageProps {
  darkMode: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ darkMode }) => {
  const apps = [
    {
      title: 'Analizador de Cotizaciones',
      description: 'Sistema profesional de análisis y gestión de cotizaciones empresariales',
      icon: Calculator,
      path: '/cotizaciones',
      gradient: 'from-blue-600 to-purple-600',
      bgGradient: 'from-blue-50 to-purple-50',
      darkBgGradient: 'from-blue-900/20 to-purple-900/20'
    },
    {
      title: 'Registro de Eventos',
      description: 'Sistema integral de gestión y seguimiento de eventos de mantenimiento',
      icon: Calendar,
      path: '/registro-eventos',
      gradient: 'from-orange-600 to-red-600',
      bgGradient: 'from-orange-50 to-red-50',
      darkBgGradient: 'from-orange-900/20 to-red-900/20'
    }
  ];

  const maintenanceDashboards = [
    {
      title: 'Plan de Mantenimiento',
      description: 'Dashboard interactivo de planificación y seguimiento de mantenimiento',
      icon: BarChart3,
      path: '/dashboards/plan-mantenimiento',
      gradient: 'from-green-600 to-emerald-600'
    },
    {
      title: 'Gestión de Presupuesto',
      description: 'Dashboard de gestión y seguimiento de presupuestos',
      icon: DollarSign,
      path: '/dashboards/gestion-presupuesto',
      gradient: 'from-emerald-600 to-teal-600'
    }
  ];

  const supplyDashboards = [
    {
      title: 'RILes y A.S.',
      description: 'Dashboard de RILes y Aguas Servidas',
      icon: Factory,
      path: '/dashboards/riles-as',
      gradient: 'from-slate-600 to-gray-600'
    },
    {
      title: 'Energía Eléctrica',
      description: 'Dashboard de seguimiento y análisis de energía eléctrica',
      icon: Zap,
      path: '/dashboards/energia-electrica',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Agua',
      description: 'Dashboard de gestión y seguimiento de agua',
      icon: Droplets,
      path: '/dashboards/agua',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Vapor',
      description: 'Dashboard de gestión y seguimiento de vapor',
      icon: Wind,
      path: '/dashboards/vapor',
      gradient: 'from-gray-500 to-slate-500'
    },
    {
      title: 'Nitrógeno',
      description: 'Dashboard de gestión y seguimiento de nitrógeno',
      icon: Beaker,
      path: '/dashboards/nitrogeno',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const DashboardCard: React.FC<{
    title: string;
    description: string;
    icon: React.ElementType;
    path: string;
    gradient: string;
  }> = ({ title, description, icon: Icon, path, gradient }) => (
    <Link
      to={path}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl p-6 ${
        darkMode 
          ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
          : 'bg-white/80 border-gray-200 hover:bg-white'
      } backdrop-blur-sm border shadow-xl`}
    >
      <div className="relative z-10">
        <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <h3 className={`text-lg font-bold ${
          darkMode ? 'text-white' : 'text-gray-900'
        } mb-3 group-hover:text-blue-600 transition-colors duration-300`}>
          {title}
        </h3>
        
        <p className={`text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        } mb-4 line-clamp-2`}>
          {description}
        </p>
        
        <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
          <span className="text-sm">Abrir Dashboard</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
      
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-r ${gradient} opacity-10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500`}></div>
    </Link>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-gradient-to-r from-slate-700 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <div className="relative">
            <div className="w-4 h-4 bg-white rounded-full absolute top-0 left-0"></div>
            <div className="w-3 h-3 bg-blue-300 rounded-full absolute top-1 left-2"></div>
            <div className="w-2 h-2 bg-slate-300 rounded-full absolute top-2 left-4"></div>
          </div>
        </div>
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
          Operations Analytics Platform
        </h1>
        <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
          Área Técnica - Sistema integral de análisis y gestión operacional
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center">
            <TrendingUp className={`w-5 h-5 mr-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Analytics en Tiempo Real</span>
          </div>
          <div className="flex items-center">
            <Settings className={`w-5 h-5 mr-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Gestión Operacional</span>
          </div>
          <div className="flex items-center">
            <FileSpreadsheet className={`w-5 h-5 mr-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Reportes Avanzados</span>
          </div>
        </div>
      </div>

      {/* Apps Section */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
            <Calculator className="w-4 h-4 text-white" />
          </div>
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Aplicaciones
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => (
            <DashboardCard key={index} {...app} />
          ))}
        </div>
      </section>

      {/* Maintenance Dashboards Section */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
            <BarChart3 className="w-4 h-4 text-white" />
          </div>
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Dashboards de Mantenimiento
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {maintenanceDashboards.map((dashboard, index) => (
            <DashboardCard key={index} {...dashboard} />
          ))}
        </div>
      </section>

      {/* Supply Dashboards Section */}
      <section>
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
            <Factory className="w-4 h-4 text-white" />
          </div>
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Dashboards de Suministros y Servicios
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supplyDashboards.map((dashboard, index) => (
            <DashboardCard key={index} {...dashboard} />
          ))}
        </div>
      </section>
    </main>
  );
};