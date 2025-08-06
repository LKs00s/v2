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
        src="https://app.powerbi.com/view?r=eyJrIjoiY2U5MTMyZDctZDM4Ny00MjgzLWFhZDQtNDQxM2Y3ZjFjYTIwIiwidCI6IjM2MDBmOGJiLWQ4NDMtNDg4OS1iYjk0LTJkNmUxYjAyMTZmMyIsImMiOjR9" 
        frameBorder="0" 
        allowFullScreen={true}
      />
    </div>
  );
};