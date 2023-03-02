import { FC } from "react";
import { GanttRow, Phase, Project } from "./domain";
import { Task } from "./public-types";
import { TimeUnit } from "./time-unit";

export interface GanttCommonProps {
  /** Resolution of time intervals */
  timeUnit?: TimeUnit;
  /** Optional renderer for tooltips */
  TooltipContent?: TooltipContentComponent;
  /** Optional renderer for header in left-side table */
  TaskListHeader?: TaskListHeaderComponent;
  /** Optional renderer for body rows in left-side table */
  TaskListTable?: TaskListTableComponent;
  stylingOptions?: StylingOptions;
}

export interface GanttByProjectProps extends GanttCommonProps {
  /** Rows to display in chart */
  projects: Project[];
  /** Invoked on bar click. */
  onClick?: (row: GanttRow) => void;
  onDateChange?: (row: GanttRow) => void;
}

export interface GanttByPhaseProps extends GanttCommonProps {
  /** Rows to display in chart */
  phases: Phase[];
  /**
   * Invoked on start/end time change.
   * Return false or error to undo operation.
   * If not specified, the drag and resize operations are disabled
   */
  onDateChange?: (phase: Phase) => void | boolean;
}

export type TooltipContentComponent = FC<{
  task: Task;
  fontSize: string;
  fontFamily: string;
}>;

export type TaskListHeaderComponent = FC<{
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
}>;

export type TaskListTableComponent = FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  /**
   * Sets selected task by id
   */
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
}>;

/**
 * Color properties support all CSS color formats, e.g.:
 * red, #ff0000, rgb(255, 0, 0), hsl(0, 100%, 50%).
 */
export interface StylingOptions {
  /** This style is set inline, CSS override must use !important */
  headerHeight?: number;
  fontFamily?: string;
  fontSize?: string;
  rowHeight?: number;
  columnWidth?: number;
  listCellWidth?: string;
  barFill?: number;
  todayColor?: string;
  arrowColor?: string;
  /**
   * Min.length oh horizontal line for incoming arrows.
   * (If it's too long, arrows for tasks that are close will draw an "S" shape)
   */
  arrowIndent?: number;
  barBackgroundColor?: string;
  barBackgroundSelectedColor?: string;
  barProgressColor?: string;
  barProgressSelectedColor?: string;
  /**
   * Can be used on all kind of tasks (task, project, milestone).
   * May corrupt layout for elements of type "project".
   */
  barCornerRadius?: number;
  /**
   * Cosmetic setting: how many empty cells should be added before first task
   *  begins (e.g. 7 with viewMode=DAY => starts a week prior)
   */
  preStepsCount?: number;
}
