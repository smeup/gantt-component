import React, { useEffect, useState } from "react";
import { calculateDislayedDateRange } from "../../helpers/date-helper";
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
import { StylingOption } from "../../types/public-types";
import { TimeUnit } from "../../types/time-unit";
import { CustomTaskListHeaderHOC } from "./custom-task-list-header";
import {
  CustomTaskListTableHOC,
  CustomTooltipHOC,
} from "./custom-task-list-table";
import { GanttByTask } from "./gantt-by-task";
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

  /** Events */
  onDateChange?: (row: GanttRow) => void;
  onClick?: (row: GanttRow) => void;
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

  /** Events */
  onDateChange?: (row: GanttRow) => void;
  onClick?: (row: GanttRow) => void;
}

export interface PlannerProps {
  mainGantt: GanttPlannerProps;
  secondaryGantt?: GanttPlannerDetailsProps;
  preStepsCount?: number;
}

export const Planner: React.FC<PlannerProps> = props => {
  const [timeUnit, setTimeUnit] = useState(TimeUnit.MONTH);

  // main gantt
  const [mainGanttDoubleView, setMainGanttDoubleView] = useState(
    props.mainGantt.showSecondaryDates ?? false
  );

  // date range
  const [displayedDates, setDisplayedDates] = useState<{
    displayedStartDate: Date;
    displayedEndDate: Date;
  }>(
    calculateDislayedDateRange(
      props.mainGantt.items as GanttTask[],
      timeUnit,
      mainGanttDoubleView,
      props.secondaryGantt?.items,
      props.preStepsCount
    )
  );

  // projections
  const [projection, setProjection] = useState<GanttPhaseProjection>();

  // handle click
  const handleClick = (row: GanttRow) => {
    // create projections if phase is clicked
    if (row.type === "task" && props.secondaryGantt) {
      const phase = row as Phase;
      // set projection state
      setProjection({
        start: new Date(phase.startDate),
        end: new Date(phase.endDate),
        color: phase.color ? phase.color : "#ED7D31",
      });
    }
    props.mainGantt.onClick?.(row);
  };

  // handle progress change
  const handleDateChange = (row: GanttRow) => {
    // update projections if phase date changed
    if (row.type === "task" && props.secondaryGantt) {
      const phase = row as Phase;
      // update projection state
      setProjection({
        start: new Date(phase.startDate),
        end: new Date(phase.endDate),
        color: phase.color ? phase.color : "#ED7D31",
      });
    }
    // invoke callback
    props.mainGantt.onDateChange?.(row);
  };

  useEffect(() => {
    const dates = calculateDislayedDateRange(
      props.mainGantt.items as GanttTask[],
      timeUnit,
      mainGanttDoubleView,
      props.secondaryGantt?.items,
      props.preStepsCount
    );
    // console.log("planner.tsx recalculated dates ", dates);
    setDisplayedDates(dates);
  }, [
    mainGanttDoubleView,
    props.mainGantt.items,
    props.preStepsCount,
    props.secondaryGantt?.items,
    timeUnit,
  ]);

  return (
    <div>
      <Switcher onTimeUnitChange={timeUnit => setTimeUnit(timeUnit)} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <GanttByTask
          id="main"
          key="main"
          hideLabel={props.mainGantt.hideLabel}
          showSecondaryDates={mainGanttDoubleView}
          hideDependencies={props.mainGantt.hideDependencies}
          ganttHeight={props.mainGantt.ganttHeight}
          displayedStartDate={displayedDates.displayedStartDate}
          displayedEndDate={displayedDates.displayedEndDate}
          items={props.mainGantt.items}
          timeUnit={timeUnit}
          stylingOptions={props.mainGantt.stylingOptions}
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
            CustomTaskListTableHOC(id => {
              const row = (props.mainGantt.items as GanttRow[]).find(
                row => row.id === id
              );
              if (row) {
                props.mainGantt.onClick?.(row);
              }
            }, "main")
          }
          // tooltip
          TooltipContent={props.mainGantt.tooltipContent ?? CustomTooltipHOC()}
          // events
          onClick={handleClick}
          onDateChange={handleDateChange}
        />
        {props.secondaryGantt && (
          <GanttByTask
            id="secondary"
            key="secondary"
            hideLabel={props.secondaryGantt.hideLabel}
            showSecondaryDates={mainGanttDoubleView}
            hideDependencies={props.secondaryGantt.hideDependencies}
            ganttHeight={props.secondaryGantt.ganttHeight}
            displayedStartDate={displayedDates.displayedStartDate}
            displayedEndDate={displayedDates.displayedEndDate}
            items={props.secondaryGantt.items}
            timeUnit={timeUnit}
            stylingOptions={props.secondaryGantt.stylingOptions}
            TaskListHeader={
              props.mainGantt.taskListHeaderProject ??
              CustomTaskListHeaderHOC(props.secondaryGantt.title)
            }
            TaskListTable={
              props.secondaryGantt?.taskListTableProject ??
              CustomTaskListTableHOC(id => {
                console.log("planner.tsx Clicked on " + id);
              }, "secondary")
            }
            // tooltip
            TooltipContent={
              props.secondaryGantt.tooltipContent ?? CustomTooltipHOC()
            }
            // projections
            projection={projection}
            // events
            onClick={props.secondaryGantt.onClick}
            onDateChange={props.secondaryGantt.onDateChange}
          />
        )}
      </div>
    </div>
  );
};

export default Planner;
