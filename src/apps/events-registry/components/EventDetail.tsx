import React from 'react';
import { EventComparison } from './EventComparison';
import { MaintenanceEvent } from '../types/event';

interface EventDetailProps {
  darkMode: boolean;
  event: MaintenanceEvent | null;
}

export const EventDetail: React.FC<EventDetailProps> = ({ darkMode, event }) => {
  return (
    <EventComparison darkMode={darkMode} event={event} />
  );
};