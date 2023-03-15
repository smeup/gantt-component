import React, { useState } from "react";
import { toViewMode } from "../../helpers/adapter";
import {
  ganttDateRangeFromDetail,
  ganttDateRangeFromGanttTask,
} from "../../helpers/date-helper";
import { formatToIsoDate } from "../../helpers/time-converters";
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
  stylingOptions?: any;
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
  stylingOptions?: any;
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
}

export const Planner: React.FC<PlannerProps> = props => {
  const [timeUnit, setTimeUnit] = useState(TimeUnit.MONTH);

  // projections
  const [projection, setProjection] = useState<GanttPhaseProjection>();

  // main gantt
  const [mainGanttDoubleView, setMainGanttDoubleView] = useState(
    props.mainGantt.showSecondaryDates ?? false
  );

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

  const [{ displayedStartDate, displayedEndDate }] = useState(() => {
    const dates: Date[] = ganttDateRangeFromGanttTask(
      props.mainGantt.items as GanttTask[],
      toViewMode(timeUnit),
      props.mainGantt.stylingOptions?.preStepsCount ?? 1,
      mainGanttDoubleView
    );
    if (props.secondaryGantt?.items) {
      const dates2: Date[] = ganttDateRangeFromDetail(
        props.secondaryGantt.items,
        toViewMode(timeUnit),
        props.mainGantt.stylingOptions?.preStepsCount ?? 1,
        mainGanttDoubleView
      );
      if (dates2[0] < dates[0]) {
        dates[0] = dates2[0];
      }
      if (dates2[1] > dates[1]) {
        dates[1] = dates2[1];
      }
    }
    return {
      displayedStartDate: formatToIsoDate(dates[0]),
      displayedEndDate: formatToIsoDate(dates[1]),
    };
  });

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
          displayedStartDate={displayedStartDate}
          displayedEndDate={displayedEndDate}
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
          onDateChange={props.mainGantt.onDateChange}
        />
        {props.secondaryGantt && (
          <GanttByTask
            id="secondary"
            key="secondary"
            hideLabel={props.secondaryGantt.hideLabel}
            showSecondaryDates={mainGanttDoubleView}
            hideDependencies={props.secondaryGantt.hideDependencies}
            ganttHeight={props.secondaryGantt.ganttHeight}
            displayedStartDate={displayedStartDate}
            displayedEndDate={displayedEndDate}
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
