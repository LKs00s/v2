import React from 'react';

export interface NitrognoProps {
  darkMode: boolean;
}

export const Nitrogeno: React.FC<NitrognoProps> = ({ darkMode }) => {
  return (
    <div className="w-full h-screen">
      <iframe 
        title="Nitrógeno" 
        width="100%" 
        height="100%" 
        src="https://app.powerbi.com/reportEmbed?reportId=12551b8c-3bd8-45e0-99cb-52440b75aae3&autoAuth=true&ctid=9c18a033-1567-4bb1-9a27-a31df11675fd" 
        frameBorder="0" 
        allowFullScreen={true}
      />
    </div>
  );
};