import React from 'react';

interface PlanMantenimientoProps {
  darkMode: boolean;
}

export const PlanMantenimiento: React.FC<PlanMantenimientoProps> = ({ darkMode }) => {
  return (
    <div className="w-full h-screen">
      <iframe 
        title="Dashboard Base de Datos online v1 - copia" 
        width="100%" 
        height="100%" 
        src="https://app.powerbi.com/reportEmbed?reportId=c6ac4fba-8807-4142-9665-22846b685980&autoAuth=true&ctid=9c18a033-1567-4bb1-9a27-a31df11675fd" 
        frameBorder="0" 
        allowFullScreen={true}
      />
    </div>
  );
};