export type GanttRowType = "project" | "phase"  | "employee";

export interface GanttRow {
  id: string;
  name: string;
  type: GanttRowType;
}

/** Commessa */
export interface Project extends GanttRow {
  customerCountry: string;
  startDate: string;
  endDate: string;
  secondaryStartDate: string;
  secondaryEndDate: string;
  phases?: Phase[];
  employees?: Employee[];
}

/** Fase */
export interface Phase extends GanttRow {
  startDate: string;
  endDate: string;
  secondaryStartDate: string;
  secondaryEndDate: string;
  color?: string;
  selectedColor?: string;
  dependencies?: string[];
}

/** Risorsa */
export interface Employee extends GanttRow {
  schedule: ScheduleItem[]
}

export interface ScheduleItem {
  startDate: string;
  endDate: string;
  color?: string;
  selectedColor?: string;
}


