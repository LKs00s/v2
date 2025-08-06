import React from 'react';

export interface RilesASProps {
  darkMode: boolean;
}

export const RilesAS: React.FC<RilesASProps> = ({ darkMode }) => {
  return (
    <div className="w-full h-screen">
      <iframe 
        title="RILes y A.S." 
        width="100%" 
        height="100%" 
        src="https://app.powerbi.com/reportEmbed?reportId=5dc95bfd-56e2-4e8b-a095-9afbf272c625&autoAuth=true&ctid=9c18a033-1567-4bb1-9a27-a31df11675fd" 
        frameBorder="0" 
        allowFullScreen={true}
      />
    </div>
  );
};