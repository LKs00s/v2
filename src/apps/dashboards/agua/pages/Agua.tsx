import React from 'react';

export interface AguaProps {
  darkMode: boolean;
}

export const Agua: React.FC<AguaProps> = ({ darkMode }) => {
  return (
    <div className="w-full h-screen">
      <iframe 
        title="Agua" 
        width="100%" 
        height="100%" 
        src="https://app.powerbi.com/reportEmbed?reportId=914b0b6e-904f-47ee-a2b1-643b4acaca28&autoAuth=true&ctid=9c18a033-1567-4bb1-9a27-a31df11675fd" 
        frameBorder="0" 
        allowFullScreen={true}
      />
    </div>
  );
};