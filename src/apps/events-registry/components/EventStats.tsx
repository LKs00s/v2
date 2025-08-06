import React from 'react';
import { Calendar, CheckCircle, Clock, AlertTriangle, DollarSign, TrendingUp } from 'lucide-react';
import { EventStatistics } from '../types/event';

interface EventStatsProps {
  darkMode: boolean;
  statistics: EventStatistics;
}

export const EventStats: React.FC<EventStatsProps> = ({ darkMode, statistics }) => {
  const StatCard: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    value: string; 
    subtitle?: string;
    color: string;
  }> = ({ icon, title, value, subtitle, color }) => (
    <div className={`${
      darkMode 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/80 border-gray-200'
    } backdrop-blur-sm rounded-2xl shadow-xl border p-6`}>
      <div className="flex items-center">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </p>
          {subtitle && (
            <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const completionRate = statistics.totalEvents > 0 
    ? Math.round((statistics.completedEvents / statistics.totalEvents) * 100) 
    : 0;

  return (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        icon={<Calendar className="w-6 h-6 text-white" />}
        title="Total de Eventos"
        value={statistics.totalEvents.toString()}
        color="bg-gradient-to-r from-blue-600 to-blue-700"
      />
      
      <StatCard
        icon={<CheckCircle className="w-6 h-6 text-white" />}
        title="Completados"
        value={statistics.completedEvents.toString()}
        subtitle={`${completionRate}% del total`}
        color="bg-gradient-to-r from-green-600 to-green-700"
      />
      
      <StatCard
        icon={<AlertTriangle className="w-6 h-6 text-white" />}
        title="Pendientes"
        value={statistics.pendingEvents.toString()}
        color="bg-gradient-to-r from-red-600 to-red-700"
      />
    </div>
  );
};