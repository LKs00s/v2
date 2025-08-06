import React from 'react';

export interface VaporProps {
  darkMode: boolean;
}

export const Vapor: React.FC<VaporProps> = ({ darkMode }) => {
  return (
    <div className="w-full h-screen">
      <iframe 
        title="Vapor" 
        width="100%" 
        height="100%" 
        src="https://app.powerbi.com/reportEmbed?reportId=16f566cf-e612-4050-9e08-02e25da8b68a&autoAuth=true&ctid=9c18a033-1567-4bb1-9a27-a31df11675fd" 
        frameBorder="0" 
        allowFullScreen={true}
      />
    </div>
  );
};