import React from 'react';

export interface GestionPresupuestoProps {
  darkMode: boolean;
}

export const GestionPresupuesto: React.FC<GestionPresupuestoProps> = ({ darkMode }) => {
  return (
    <div className="w-full h-screen">
      <iframe 
        title="Gestión de Presupuesto" 
        width="100%" 
        height="100%" 
        src="https://app.powerbi.com/reportEmbed?reportId=b7bfa21f-1a01-40bb-bc23-fa04a399a6c0&autoAuth=true&ctid=9c18a033-1567-4bb1-9a27-a31df11675fd" 
        frameBorder="0" 
        allowFullScreen={true}
      />
    </div>
  );
};