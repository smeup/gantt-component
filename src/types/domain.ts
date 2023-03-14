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
export interface Detail extends GanttRow {
  schedule: ScheduleItem[];
}

export interface ScheduleItem {
  startDate: string;
  endDate: string;
  color?: string;
  selectedColor?: string;
  valueToShow?: [];
}

/**
 * Event payload for gantt-sync-scroll-event
 */
export interface GanttSyncScrollEvent {
  componentId: string;
  scrollX: number;
}

/**
 * Interface for current date indicator located into gantt content
 */
export interface CurrentDateIndicator {
  color: string;
}

/**
 * Interface for phase projection
 */
export interface GanttPhaseProjection {
  start: Date;
  end: Date;
  color: string;
}
