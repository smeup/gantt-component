import { TaskType } from "./public-types";

export interface GanttRow {
  id: string;
  name: string;
  type: TaskType;
  valuesToShow: string[];
}

/** Commessa */
export interface GanttTask extends GanttRow {
  startDate: string;
  endDate: string;
  secondaryStartDate: string;
  secondaryEndDate: string;
  phases?: Phase[];
  details?: Detail[];
  iconUrl?: string;
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
  iconUrl?: string;
}

/** Risorsa */
export interface Detail extends GanttRow {
  schedule: ScheduleItem[];
}

export interface ScheduleItem {
  startDate: string;
  endDate: string;
  color?: string;
  selectedColor?: string;
  iconUrl?: string;
}

/**
 * Event payload for gantt-sync-scroll-event
 */
export interface GanttSyncScrollEvent {
  componentId: string;
  scrollX: number;
}
/**
 * Interface for phase projection
 */
export interface GanttPhaseProjection {
  start: Date;
  end: Date;
  color: string;
}
