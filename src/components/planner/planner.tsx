import React, { useState } from "react";
import { toViewMode } from "../../helpers/adapter";
import { ganttDateRangeFromGanttTask } from "../../helpers/date-helper";
import { formatToIsoDate } from "../../helpers/time-converters";
import {
  TaskListHeaderComponent,
  TaskListTableComponent,
  TooltipContentComponent,
} from "../../types/adapted-types";
import { GanttTask, GanttRow, Detail } from "../../types/domain";
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

  // main gantt
  const [mainGanttDoubleView, setMainGanttDoubleView] = useState(
    props.mainGantt.showSecondaryDates ?? false
  );

  const [
    { mainGanttStartDate, mainGanttEndDate } /*, setMainGanttStartEndDate*/,
  ] = useState(() => {
    const dates: Date[] = ganttDateRangeFromGanttTask(
      props.mainGantt.items as GanttTask[],
      toViewMode(timeUnit),
      props.mainGantt.stylingOptions?.preStepsCount ?? 1,
      mainGanttDoubleView
    );
    return {
      mainGanttStartDate: formatToIsoDate(dates[0]),
      mainGanttEndDate: formatToIsoDate(dates[1]),
    };
  });

  return (
    <div
      style={{
        maxWidth: "90vw",
      }}
    >
      <Switcher onTimeUnitChange={timeUnit => setTimeUnit(timeUnit)} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 50,
        }}
      >
        <GanttByTask
          id="main"
          key="main"
          hideLabel={props.mainGantt.hideLabel}
          showSecondaryDates={mainGanttDoubleView}
          hideDependencies={props.mainGantt.hideDependencies}
          ganttHeight={props.mainGantt.ganttHeight}
          projects={props.mainGantt.items}
          timeUnit={timeUnit}
          stylingOptions={props.mainGantt.stylingOptions}
          TaskListHeader={
            props.mainGantt.taskListHeaderProject ??
            CustomTaskListHeaderHOC(
              props.mainGantt.title,
              mainGanttDoubleView ?? true,
              setMainGanttDoubleView
            )
          }
          TaskListTable={
            props.mainGantt.taskListTableProject ??
            CustomTaskListTableHOC(id => {
              console.log("planner.tsx Clicked on " + id);
            }, "main")
          }
          // tooltip
          TooltipContent={props.mainGantt.tooltipContent ?? CustomTooltipHOC()}
          // events
          onClick={(row: GanttRow) => props.mainGantt.onClick?.(row)}
          onDateChange={(row: GanttRow) => props.mainGantt.onDateChange?.(row)}
        />
        {props.secondaryGantt && (
          <GanttByTask
            id="secondary"
            key="secondary"
            hideLabel={props.secondaryGantt?.hideLabel}
            showSecondaryDates={mainGanttDoubleView}
            hideDependencies={props.secondaryGantt?.hideDependencies}
            ganttHeight={props.secondaryGantt?.ganttHeight}
            mainGanttStartDate={mainGanttStartDate}
            mainGanttEndDate={mainGanttEndDate}
            projects={
              props.secondaryGantt?.items ? props.secondaryGantt?.items : []
            }
            timeUnit={timeUnit}
            stylingOptions={props.secondaryGantt?.stylingOptions}
            TaskListHeader={
              props.mainGantt.taskListHeaderProject ??
              CustomTaskListHeaderHOC(
                props.secondaryGantt?.title ? props.secondaryGantt.title : ""
              )
            }
            TaskListTable={
              props.secondaryGantt?.taskListTableProject ??
              CustomTaskListTableHOC(id => {
                console.log("planner.tsx Clicked on " + id);
              }, "secondary")
            }
            // tooltip
            TooltipContent={
              props.secondaryGantt?.tooltipContent ?? CustomTooltipHOC()
            }
            // events
            onClick={(row: GanttRow) => props.secondaryGantt?.onClick?.(row)}
            onDateChange={(row: GanttRow) =>
              props.secondaryGantt?.onDateChange?.(row)
            }
          />
        )}
      </div>
    </div>
  );
};

export default Planner;
