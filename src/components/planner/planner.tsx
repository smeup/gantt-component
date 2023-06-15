import React, { useEffect, useRef, useState } from "react";
import {
  columnWidthForTimeUnit,
  convertProjectToTasks,
  getPhaseById,
  getProjectById,
  MAIN_GANTT_ID,
  mergeTaskIntoPhases,
  mergeTaskIntoProjects,
  SECONDARY_GANTT_ID,
} from "../../helpers/adapter";
import { calculateDisplayedDateRange } from "../../helpers/date-helper";
import { formatToIsoDate } from "../../helpers/time-converters";
import { ganttDateTimeFormatters } from "../../helpers/time-formatters";
import {
  TaskListHeaderComponent,
  TaskListTableComponent,
  TooltipContentComponent,
} from "../../types/adapted-types";
import {
  GanttTask,
  GanttRow,
  Detail,
  GanttPhaseProjection,
  Phase,
} from "../../types/domain";
import { StylingOption, Task, ViewMode } from "../../types/public-types";
import { Gantt } from "../gantt/gantt";
import { CustomTaskListHeaderHOC } from "./custom-task-list-header";
import {
  CustomTaskListTableHOC,
  CustomTooltipHOC,
} from "./custom-task-list-table";
import { Switcher } from "./switcher";

/**
 * Available props for each Gantt
 */
export interface GanttPlannerProps {
  items: GanttTask[] | Detail[];
  taskListHeaderProject?: TaskListHeaderComponent;
  taskListTableProject?: TaskListTableComponent;
  tooltipContent?: TooltipContentComponent;
  stylingOptions?: StylingOption;
  hideLabel?: boolean;
  showSecondaryDates?: boolean;
  ganttHeight?: number;
  hideDependencies?: boolean;
  title: string;
  filter: HTMLElement;
  initialScrollX?: number;
  initialScrollY?: number;
  readOnly?: boolean;

  /** Events */
  onDateChange?: (row: GanttRow) => void;
  onClick?: (row: GanttRow) => void;
  onContextMenu?: (
    event: React.MouseEvent<Element, MouseEvent>,
    row: GanttRow
  ) => void;
  onScrollY?: (y: number) => void;
}
export interface GanttPlannerDetailsProps {
  items: Detail[];
  taskListHeaderProject?: TaskListHeaderComponent;
  taskListTableProject?: TaskListTableComponent;
  tooltipContent?: TooltipContentComponent;
  stylingOptions?: StylingOption;
  hideLabel?: boolean;
  ganttHeight?: number;
  hideDependencies?: boolean;
  title: string;
  filter: HTMLElement;
  initialScrollX?: number;
  initialScrollY?: number;
  readOnly?: boolean;

  /** Events */
  onDateChange?: (row: GanttRow) => void;
  onClick?: (row: GanttRow) => void;
  onContextMenu?: (
    event: React.MouseEvent<Element, MouseEvent>,
    row: GanttRow
  ) => void;
  onScrollY?: (y: number) => void;
}
export interface PlannerProps {
  mainGantt: GanttPlannerProps;
  secondaryGantt?: GanttPlannerDetailsProps;
  preStepsCount?: number;
  viewMode: ViewMode;
  onSetDoubleView?: (checked: boolean) => void;
  onSetViewMode?: (value: ViewMode) => void;
  onScrollX?: (x: number) => void;
}

export const Planner: React.FC<PlannerProps> = (props) => {
  const [timeUnit, setTimeUnit] = useState(props.viewMode);

  const currentTasks = useRef(props.mainGantt.items);
  const setCurrentTasks = (tasks: GanttTask[] | Detail[]) => {
    currentTasks.current = tasks;
  };
  const currentDetails = useRef(props.secondaryGantt?.items);
  const setCurrentDetails = (details: Detail[] | undefined) => {
    currentDetails.current = details;
  };

  const [scrollX, setScrollX] = useState<number>(props.mainGantt.initialScrollX ? props.mainGantt.initialScrollX : -1);

  // main gantt
  const [mainGanttDoubleView, setMainGanttDoubleView] = useState(
    props.mainGantt.showSecondaryDates ?? false
  );

  // date range
  const displayedDates = useRef<{
    displayedStartDate: Date;
    displayedEndDate: Date;
  }>(
    calculateDisplayedDateRange(
      currentTasks.current as GanttTask[],
      timeUnit,
      mainGanttDoubleView,
      currentDetails.current,
      props.preStepsCount
    )
  );

  const setDisplayedDates = (dates: {
    displayedStartDate: Date;
    displayedEndDate: Date;
  }) => {
    displayedDates.current = dates;
  };

  const [viewDate, setViewDate] = useState<Date>();

  // projections
  const [projection, setProjection] = useState<GanttPhaseProjection>();

  const locale = "it-IT";

  // handle click
  const handleClick = (row: GanttRow, onClick: any) => {
    if (!row) {
      return;
    }
    // create projections if phase is clicked
    if (row.type === "task" && props.secondaryGantt) {
      const phase = row as Phase;
      // set projection state
      setProjection({
        start: new Date(phase.startDate),
        end: new Date(phase.endDate),
        color: phase.color ?? "#ED7D31",
      });
    } else {
      setProjection(undefined);
    }
    onClick?.(row);
  };

  // handle onContextMenu
  const handleContextMenu = (
    event: React.MouseEvent<Element, MouseEvent>,
    row: GanttRow,
    onContextMenu: any
  ) => {
    if (!row) {
      return;
    }
    // create projections if phase is clicked
    if (row.type === "task" && props.secondaryGantt) {
      const phase = row as Phase;
      // set projection state
      setProjection({
        start: new Date(phase.startDate),
        end: new Date(phase.endDate),
        color: phase.color ?? "#ED7D31",
      });
    } else {
      setProjection(undefined);
    }
    onContextMenu?.(event, row);
  };

  const handleSetDoubleView = (checked: boolean) => {
    setMainGanttDoubleView(checked);
    props.onSetDoubleView?.(checked);
  };

  // handle progress change
  const handleDateChange = (
    task: Task,
    currentProjects: GanttTask[] | Detail[],
    onDateChange: any
  ) => {
    const id = task?.id;
    if (!id) {
      return;
    }
    let row = getProjectById(id, currentProjects);
    if (!row) {
      row = getPhaseById(id, currentProjects);
    }
    if (!row) {
      return;
    }
    /** per il timeline, ha senso gestire il dateChange???? per adesso non gestito */
    if (row.type === "timeline") {
      console.log(
        "planner.tsx onDateChange for timeline not managed yet",
        id,
        row.type
      );
      return;
    }
    if (row.type === "project") {
      const result = mergeTaskIntoProjects(
        currentProjects as GanttTask[],
        task
      );
      row = getProjectById(row.id, result);
      setViewDate(task.start);
      setCurrentTasks(result);
    } else if (row.type === "task") {
      const parentOfClickedPhase: GanttTask | undefined = (
        currentProjects as GanttTask[]
      ).find(p => p.phases?.some(ph => ph?.id === id));
      if (parentOfClickedPhase) {
        const phases = mergeTaskIntoPhases(parentOfClickedPhase.phases, task);
        const updatedProjects = (currentProjects as GanttTask[]).map(p =>
          p.id === parentOfClickedPhase.id ? { ...p, phases } : p
        );
        row = getPhaseById(row.id, updatedProjects);
        // update projections if phase date changed
        if (props.secondaryGantt && row) {
          // update projection state
          setProjection({
            start: new Date(row.startDate),
            end: new Date(row.endDate),
            color: (row as Phase).color ?? "#ED7D31",
          });
        }
        setViewDate(task.start);
        setCurrentTasks(updatedProjects);
      }
    }
    // invoke callback
    onDateChange?.(row);
    const getScrollX = () => {
      if (wrapperRef.current) {
        const x = wrapperRef.current.querySelector(
          '[data-scrollx="true"]'
        )?.scrollLeft;
        if (x !== undefined) {
          props.onScrollX?.(x);
        }
      }
    };
    setTimeout(getScrollX, 500);
  };

  useEffect(() => {
    setCurrentTasks(props.mainGantt.items);
    setCurrentDetails(props.secondaryGantt?.items);
    setProjection(undefined);
  }, [props]);

  useEffect(() => {
    const dates = calculateDisplayedDateRange(
      currentTasks.current as GanttTask[],
      timeUnit,
      mainGanttDoubleView,
      currentDetails.current,
      props.preStepsCount
    );
    setDisplayedDates(dates);
    if (!viewDate) {
      const now = new Date();
      if (dates.displayedStartDate <= now && dates.displayedEndDate >= now) {
        setViewDate(now);
      } else {
        setViewDate(dates.displayedStartDate);
      }
    }
  }, [timeUnit, mainGanttDoubleView, props.preStepsCount, viewDate]);

  const tasks: Task[] = [];
  for (let i = 0; i < currentTasks.current.length; i++) {
    tasks.push(
      ...convertProjectToTasks(
        currentTasks.current[i],
        formatToIsoDate(displayedDates.current.displayedStartDate),
        formatToIsoDate(displayedDates.current.displayedEndDate)
      )
    );
  }

  const details: Task[] = [];
  if (currentDetails.current) {
    for (let i = 0; i < currentDetails.current.length; i++) {
      details.push(
        ...convertProjectToTasks(
          currentDetails.current[i],
          formatToIsoDate(displayedDates.current.displayedStartDate),
          formatToIsoDate(displayedDates.current.displayedEndDate)
        )
      );
    }
  }
  console.log("PLANNER render");
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapperRef}>
      <Switcher
        onTimeUnitChange={timeUnit => {
          props.onSetViewMode?.(timeUnit);
          setTimeUnit(timeUnit);
          setViewDate(undefined);
          setScrollX(-1);
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Gantt
          id={MAIN_GANTT_ID}
          key={MAIN_GANTT_ID}
          filter={props.mainGantt.filter}
          hideLabel={props.mainGantt.hideLabel}
          showSecondaryDates={mainGanttDoubleView}
          hideDependencies={props.mainGantt.hideDependencies}
          ganttHeight={props.mainGantt.ganttHeight}
          displayedStartDate={displayedDates.current.displayedStartDate}
          displayedEndDate={displayedDates.current.displayedEndDate}
          viewDate={viewDate}
          tasks={tasks}
          columnWidth={columnWidthForTimeUnit(timeUnit)}
          viewMode={timeUnit}
          {...props.mainGantt.stylingOptions}
          TaskListHeader={
            props.mainGantt.taskListHeaderProject ??
            CustomTaskListHeaderHOC(
              props.mainGantt.title,
              mainGanttDoubleView ?? false,
              handleSetDoubleView
            )
          }
          TaskListTable={
            props.mainGantt.taskListTableProject ??
            CustomTaskListTableHOC(
              id => {
                let row = getProjectById(id, currentTasks.current);
                if (!row) {
                  row = getPhaseById(id, currentTasks.current);
                }
                if (row) {
                  handleClick(row, props.mainGantt.onClick);
                }
              },
              (event, id) => {
                let row = getProjectById(id, currentTasks.current);
                if (!row) {
                  row = getPhaseById(id, currentTasks.current);
                }
                if (row) {
                  handleContextMenu(event, row, props.mainGantt.onContextMenu);
                }
              },
              MAIN_GANTT_ID
            )
          }
          // tooltip
          TooltipContent={props.mainGantt.tooltipContent ?? CustomTooltipHOC()}
          // events
          onClick={task => {
            let row = getProjectById(task.id, currentTasks.current);
            if (!row) {
              row = getPhaseById(task.id, currentTasks.current);
            }
            if (row) {
              handleClick(row, props.mainGantt.onClick);
            }
          }}
          onContextMenu={(event, task) => {
            let row = getProjectById(task.id, currentTasks.current);
            if (!row) {
              row = getPhaseById(task.id, currentTasks.current);
            }
            if (row) {
              handleContextMenu(event, row, props.mainGantt.onContextMenu);
            }
          }}
          onDateChange={task =>
            handleDateChange(
              task,
              currentTasks.current as GanttTask[],
              props.mainGantt.onDateChange
            )
          }
          locale={locale}
          dateTimeFormatters={ganttDateTimeFormatters}
          initialScrollX={scrollX}
          initialScrollY={props.mainGantt.initialScrollY}
          readOnly={props.mainGantt.readOnly}
          onScrollX={props.onScrollX}
          onScrollY={props.mainGantt.onScrollY}
        />

        {props.secondaryGantt && (
          <Gantt
            id={SECONDARY_GANTT_ID}
            key={SECONDARY_GANTT_ID}
            hideLabel={props.secondaryGantt.hideLabel}
            filter={props.secondaryGantt.filter}
            showSecondaryDates={mainGanttDoubleView}
            hideDependencies={props.secondaryGantt.hideDependencies}
            ganttHeight={props.secondaryGantt.ganttHeight}
            displayedStartDate={displayedDates.current.displayedStartDate}
            displayedEndDate={displayedDates.current.displayedEndDate}
            viewDate={viewDate}
            tasks={details}
            columnWidth={columnWidthForTimeUnit(timeUnit)}
            viewMode={timeUnit}
            {...props.mainGantt.stylingOptions}
            TaskListHeader={
              props.secondaryGantt.taskListHeaderProject ??
              CustomTaskListHeaderHOC(props.secondaryGantt.title)
            }
            TaskListTable={
              props.secondaryGantt?.taskListTableProject ??
              CustomTaskListTableHOC(
                id => {
                  console.log("planner.tsx secondaryGantt Clicked on " + id);
                },
                (event, id) => {
                  if (props.secondaryGantt) {
                    let row = getProjectById(
                      id,
                      currentDetails.current as Detail[]
                    );
                    if (row) {
                      handleContextMenu(
                        event,
                        row,
                        props.secondaryGantt.onContextMenu
                      );
                    }
                  }
                },
                SECONDARY_GANTT_ID
              )
            }
            // tooltip
            TooltipContent={
              props.secondaryGantt.tooltipContent ?? CustomTooltipHOC()
            }
            // projections
            projection={projection}
            // events
            onClick={task => {
              if (props.secondaryGantt) {
                let row = getProjectById(
                  task.id,
                  currentDetails.current as Detail[]
                );
                if (row) {
                  handleClick(row, props.secondaryGantt.onClick);
                }
              }
            }}
            onContextMenu={(event, task) => {
              if (props.secondaryGantt) {
                let row = getProjectById(
                  task.id,
                  currentDetails.current as Detail[]
                );
                if (row) {
                  handleContextMenu(
                    event,
                    row,
                    props.secondaryGantt.onContextMenu
                  );
                }
              }
            }}
            onDateChange={task =>
              handleDateChange(
                task,
                currentDetails.current as Detail[],
                props.secondaryGantt?.onDateChange
              )
            }
            locale={locale}
            dateTimeFormatters={ganttDateTimeFormatters}
            initialScrollX={scrollX}
            initialScrollY={props.secondaryGantt.initialScrollY}
            readOnly={props.secondaryGantt.readOnly}
            onScrollY={props.secondaryGantt.onScrollY}
          />
        )}
      </div>
    </div>
  );
};

export default Planner;
