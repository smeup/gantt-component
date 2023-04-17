import React, { useEffect, useState } from "react";
import {
  convertProjectToTasks,
  getPhaseById,
  getProjectById,
  MAIN_GANTT_ID,
  mergeTaskIntoPhases,
  mergeTaskIntoProjects,
  SECONDARY_GANTT_ID,
  toViewMode,
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
import { StylingOption, Task } from "../../types/public-types";
import { TimeUnit } from "../../types/time-unit";
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

  /** Events */
  onDateChange?: (row: GanttRow) => void;
  onClick?: (row: GanttRow) => void;
  onContextMenu?: (
    event: React.MouseEvent<Element, MouseEvent>,
    row: GanttRow
  ) => void;
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

  /** Events */
  onDateChange?: (row: GanttRow) => void;
  onClick?: (row: GanttRow) => void;
  onContextMenu?: (
    event: React.MouseEvent<Element, MouseEvent>,
    row: GanttRow
  ) => void;
}
export interface PlannerProps {
  mainGantt: GanttPlannerProps;
  secondaryGantt?: GanttPlannerDetailsProps;
  preStepsCount?: number;
}

export const Planner: React.FC<PlannerProps> = props => {
  const [timeUnit, setTimeUnit] = useState(TimeUnit.MONTH);

  const [currentTasks, setCurrentTasks] = useState(props.mainGantt.items);
  const [currentDetails, setCurrentDetails] = useState(
    props.secondaryGantt?.items
  );

  // main gantt
  const [mainGanttDoubleView, setMainGanttDoubleView] = useState(
    props.mainGantt.showSecondaryDates ?? false
  );

  // date range
  const [displayedDates, setDisplayedDates] = useState<{
    displayedStartDate: Date;
    displayedEndDate: Date;
  }>(
    calculateDisplayedDateRange(
      currentTasks as GanttTask[],
      timeUnit,
      mainGanttDoubleView,
      currentDetails,
      props.preStepsCount
    )
  );

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
  };

  useEffect(() => {
    setCurrentTasks(props.mainGantt.items);
    setCurrentDetails(props.secondaryGantt?.items);
    setProjection(undefined);
  }, [props]);

  useEffect(() => {
    const dates = calculateDisplayedDateRange(
      currentTasks as GanttTask[],
      timeUnit,
      mainGanttDoubleView,
      currentDetails,
      props.preStepsCount
    );
    setDisplayedDates(dates);
    if (!viewDate) {
      setViewDate(dates.displayedStartDate);
    }
  }, [
    currentTasks,
    currentDetails,
    timeUnit,
    mainGanttDoubleView,
    props.preStepsCount,
    viewDate,
  ]);

  const tasks: Task[] = [];
  for (let i = 0; i < currentTasks.length; i++) {
    tasks.push(
      ...convertProjectToTasks(
        currentTasks[i],
        formatToIsoDate(displayedDates.displayedStartDate),
        formatToIsoDate(displayedDates.displayedEndDate)
      )
    );
  }

  const details: Task[] = [];
  if (currentDetails) {
    for (let i = 0; i < currentDetails.length; i++) {
      details.push(
        ...convertProjectToTasks(
          currentDetails[i],
          formatToIsoDate(displayedDates.displayedStartDate),
          formatToIsoDate(displayedDates.displayedEndDate)
        )
      );
    }
  }
  console.log("PLANNER render");

  return (
    <div>
      <Switcher onTimeUnitChange={timeUnit => setTimeUnit(timeUnit)} />
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
          displayedStartDate={displayedDates.displayedStartDate}
          displayedEndDate={displayedDates.displayedEndDate}
          viewDate={viewDate}
          tasks={tasks}
          viewMode={toViewMode(timeUnit)}
          {...props.mainGantt.stylingOptions}
          TaskListHeader={
            props.mainGantt.taskListHeaderProject ??
            CustomTaskListHeaderHOC(
              props.mainGantt.title,
              mainGanttDoubleView ?? false,
              setMainGanttDoubleView
            )
          }
          TaskListTable={
            props.mainGantt.taskListTableProject ??
            CustomTaskListTableHOC(
              id => {
                let row = getProjectById(id, currentTasks);
                if (!row) {
                  row = getPhaseById(id, currentTasks);
                }
                if (row) {
                  handleClick(row, props.mainGantt.onClick);
                }
              },
              (event, id) => {
                let row = getProjectById(id, currentTasks);
                if (!row) {
                  row = getPhaseById(id, currentTasks);
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
            let row = getProjectById(task.id, currentTasks);
            if (!row) {
              row = getPhaseById(task.id, currentTasks);
            }
            if (row) {
              handleClick(row, props.mainGantt.onClick);
            }
          }}
          onContextMenu={(event, task) => {
            let row = getProjectById(task.id, currentTasks);
            if (!row) {
              row = getPhaseById(task.id, currentTasks);
            }
            if (row) {
              handleContextMenu(event, row, props.mainGantt.onContextMenu);
            }
          }}
          onDateChange={task =>
            handleDateChange(
              task,
              currentTasks as GanttTask[],
              props.mainGantt.onDateChange
            )
          }
          locale={locale}
          dateTimeFormatters={ganttDateTimeFormatters}
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
            displayedStartDate={displayedDates.displayedStartDate}
            displayedEndDate={displayedDates.displayedEndDate}
            viewDate={viewDate}
            tasks={details}
            viewMode={toViewMode(timeUnit)}
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
                    let row = getProjectById(id, currentDetails as Detail[]);
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
                let row = getProjectById(task.id, currentDetails as Detail[]);
                if (row) {
                  handleClick(row, props.secondaryGantt.onClick);
                }
              }
            }}
            onContextMenu={(event, task) => {
              if (props.secondaryGantt) {
                let row = getProjectById(task.id, currentDetails as Detail[]);
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
                currentDetails as Detail[],
                props.secondaryGantt?.onDateChange
              )
            }
            locale={locale}
            dateTimeFormatters={ganttDateTimeFormatters}
          />
        )}
      </div>
    </div>
  );
};

export default Planner;
