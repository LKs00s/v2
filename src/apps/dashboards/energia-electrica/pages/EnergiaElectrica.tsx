import React from 'react';

export interface EnergiaElectricaProps {
  darkMode: boolean;
}

export const EnergiaElectrica: React.FC<EnergiaElectricaProps> = ({ darkMode }) => {
  return (
    <div className="w-full h-screen">
      <iframe 
        title="Energía Eléctrica" 
        width="100%" 
        height="100%" 
        src="https://app.powerbi.com/reportEmbed?reportId=b762a8f8-aa06-4924-b748-7829cb4f71b7&autoAuth=true&ctid=9c18a033-1567-4bb1-9a27-a31df11675fd" 
        frameBorder="0" 
        allowFullScreen={true}
      />
    </div>
  );
};