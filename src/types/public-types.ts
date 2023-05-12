import { GanttPhaseProjection } from "./domain";
/*
export enum ViewMode {
  Hour = "Hour",
  QuarterDay = "Quarter Day",
  HalfDay = "Half Day",
  Day = "Day",
  Week = "Week",  // ISO-8601 week 
  Month = "Month",
  Year = "Year",
}
*/
export type TaskType = "task" | "project" | "timeline";
export interface Task {
  id: string;
  type: TaskType;
  name: string;
  valuesToShow: string[];
  start: Date;
  end: Date;
  secondaryStart?: Date;
  secondaryEnd?: Date;
  timeline?: Timeframe[];
  /**
   * From 0 to 100
   */
  progress: number;
  styles?: {
    backgroundColor?: string;
    backgroundSelectedColor?: string;
    progressColor?: string;
    progressSelectedColor?: string;
  };
  isDisabled?: boolean;
  project?: string;
  dependencies?: string[];
  hideChildren?: boolean;
  displayOrder?: number;
  icon?: TaskIcon;
}

export interface Timeframe {
  start: Date;
  end: Date;
  backgroundColor: string;
  backgroundSelectedColor?: string;
  icon?: TaskIcon;
}

export interface EventOption {
  /**
   * Time step value for date changes.
   */
  timeStep?: number;
  /**
   * Invokes on bar select on unselect.
   */
  onSelect?: (task: Task, isSelected: boolean) => void;
  /**
   * Invokes on bar double click.
   */
  onDoubleClick?: (task: Task) => void;
  /**
   * Invokes on bar click.
   */
  onClick?: (task: Task) => void;
  /**
   * Invokes on bar context menu click.
   */
  onContextMenu?: (
    event: React.MouseEvent<Element, MouseEvent>,
    task: Task
  ) => void;
  /**
   * Invokes on end and start time change. Chart undoes operation if method return false or error.
   */
  onDateChange?: (
    task: Task,
    children: Task[]
  ) => void | boolean | Promise<void> | Promise<boolean>;
  /**
   * Invokes on progress change. Chart undoes operation if method return false or error.
   */
  onProgressChange?: (
    task: Task,
    children: Task[]
  ) => void | boolean | Promise<void> | Promise<boolean>;
  /**
   * Invokes on delete selected task. Chart undoes operation if method return false or error.
   */
  onDelete?: (task: Task) => void | boolean | Promise<void> | Promise<boolean>;
  /**
   * Invokes on expander on task list
   */
  onExpanderClick?: (task: Task) => void;
}

export interface DisplayOption {
  viewMode?: ViewMode;
  viewDate?: Date;
  preStepsCount?: number;
  /**
   * Specifies the month name language. Able formats: ISO 639-2, Java Locale
   */
  locale?: string;
  rtl?: boolean;
  /** Gantt date range */
  displayedStartDate: Date;
  displayedEndDate: Date;
}

export interface StylingOption {
  headerHeight?: number;
  columnWidth?: number;
  listCellWidth?: string;
  rowHeight?: number;
  ganttHeight?: number;
  barCornerRadius?: number;
  handleWidth?: number;
  fontFamily?: string;
  fontSize?: string;
  barFill?: number;
  projectFill?: number;
  timelineFill?: number;
  barProgressColor?: string;
  barProgressSelectedColor?: string;
  barBackgroundColor?: string;
  barBackgroundSelectedColor?: string;
  projectProgressColor?: string;
  projectProgressSelectedColor?: string;
  projectBackgroundColor?: string;
  projectBackgroundSelectedColor?: string;
  arrowColor?: string;
  arrowIndent?: number;
  todayColor?: string;
  TooltipContent?: React.FC<{
    task: Task;
    fontSize: string;
    fontFamily: string;
  }>;
  TaskListHeader?: React.FC<{
    headerHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
  }>;
  TaskListTable?: React.FC<{
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
}

type DateTimeFormatter = (date: Date, locale: string) => string;
export type DateTimeFormatters = {
  /** For top row in ViewMode.Month, bottom row in ViewMode.Year */
  year?: DateTimeFormatter;
  /** For top row in ViewMode.Day, bottom row in ViewMode.Month */
  month?: DateTimeFormatter;
  /** For top row in ViewMode.Week */
  monthAndYear?: DateTimeFormatter;
  /** For bottom row in ViewMode.Week */
  week?: DateTimeFormatter;
  /** For bottom row in ViewMode.Day */
  day?: DateTimeFormatter;
  /** For bottom row in ViewMode.Hour / HalfDay / QuarterDay */
  hour?: DateTimeFormatter;
  /** For top row in ViewMode.Hour / HalfDay / QuarterDay */
  dayAndMonth?: DateTimeFormatter;
};

export interface CustomOptions {
  /** Custom formatters for calendar headers */
  dateTimeFormatters?: DateTimeFormatters;
  /** If true, show only one line of text in calendar headers */
  singleLineHeader?: boolean;
  /** If true, hide task labels in the diagram */
  hideLabel?: boolean;
  /** If true, show an additional box in the gantt for the secondary Task dates when available */
  showSecondaryDates?: boolean;
  /** If true, do not show dependency arrows */
  hideDependencies?: boolean;
}

export interface GanttProps
  extends EventOption,
    DisplayOption,
    StylingOption,
    CustomOptions {
  id: string;
  tasks: Task[];
  projection?: GanttPhaseProjection;
  filter: HTMLElement;
  initialScrollX?: number;
  initialScrollY?: number;
  readOnly?: boolean;
  viewMode?: ViewMode;
}

/**
 * Interface for current date indicator located into gantt content
 */
export interface CurrentDateIndicator {
  color: string;
  x: number;
}

/**
 * Define the inteface of icon located into bar and timeline task
 */
export interface TaskIcon {
  color: string;
  url: string;
}

export type ViewMode = "day" | "week" | "month" | "year";
