// Exportaciones centralizadas de todas las apps
export { QuotationsAnalyzer } from './quotations-analyzer/pages/QuotationsAnalyzer';
export { EventsRegistry } from './events-registry/pages/EventsRegistry';
export { PlanMantenimiento } from './dashboards/plan-mantenimiento/pages/PlanMantenimiento';
export { GestionPresupuesto } from './dashboards/gestion-presupuesto/pages/GestionPresupuesto';
export { RilesAS } from './dashboards/riles-as/pages/RilesAS';
export { EnergiaElectrica } from './dashboards/energia-electrica/pages/EnergiaElectrica';
export { Agua } from './dashboards/agua/pages/Agua';
export { Vapor } from './dashboards/vapor/pages/Vapor';
export { Nitrogeno } from './dashboards/nitrogeno/pages/Nitrogeno';

// Tipos de apps
export type { Quotation, QuotationFilters, SortOptions } from './quotations-analyzer/types/quotation';
export type { MaintenanceEvent, EventFilters, EventSortOptions } from './events-registry/types/event';

// Servicios de apps
export { QuotationService } from './quotations-analyzer/services/quotationService';
export { EventService } from './events-registry/services/eventService';