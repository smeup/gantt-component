import React, { useState } from "react";
import {
  TaskListHeaderComponent,
  TaskListTableComponent,
  TooltipContentComponent,
} from "../../types/adapted-types";
import { GanttTask, Phase, GanttRow } from "../../types/domain";
import { TimeUnit } from "../../types/time-unit";
import { CustomTaskListHeaderHOC } from "./custom-task-list-header";
import {
  CustomTaskListTableHOC,
  CustomTooltipHOC,
} from "./custom-task-list-table";
import { GanttByTask } from "./gantt-by-task";
import { GanttTimelineCustomTaskList } from "./gantt-timeline-custom-task-list-header";
import { Switcher } from "./switcher";

/**
 * Available props for each Gantt
 */
export interface GanttPlannerProps {
  items: GanttTask[];
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
  onDateChange?: (row: GanttTask | Phase | GanttRow) => void;
  onClick?: (row: GanttRow) => void;
}

export interface PlannerProps {
  mainGantt: GanttPlannerProps;
  secondaryGantt?: GanttPlannerProps;
}

export const Planner: React.FC<PlannerProps> = props => {
  const [timeUnit, setTimeUnit] = useState(TimeUnit.MONTH);

  // main gantt
  const [mainGanttDoubleView, setMainGanttDoubleView] = useState(
    props.mainGantt.showSecondaryDates ?? false
  );
  // secondary gantt
  const [secondaryGanttDoubleView] = useState(
    props.secondaryGantt?.showSecondaryDates ?? false
  );

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
            })
          }
          // tooltip
          TooltipContent={props.mainGantt.tooltipContent ?? CustomTooltipHOC()}
          // events
          onClick={(row: GanttRow) => props.mainGantt.onClick?.(row)}
          onDateChange={(row: GanttRow | Phase | GanttTask) =>
            props.mainGantt.onDateChange?.(row)
          }
        />
        {props.secondaryGantt && (
          <GanttByTask
            id="secondary"
            key="secondary"
            hideLabel={props.secondaryGantt?.hideLabel}
            showSecondaryDates={secondaryGanttDoubleView}
            hideDependencies={props.secondaryGantt?.hideDependencies}
            ganttHeight={props.secondaryGantt?.ganttHeight}
            projects={
              props.secondaryGantt?.items ? props.secondaryGantt?.items : []
            }
            timeUnit={timeUnit}
            stylingOptions={props.secondaryGantt?.stylingOptions}
            TaskListHeader={
              props.mainGantt.taskListHeaderProject ??
              GanttTimelineCustomTaskList(
                props.secondaryGantt?.title ? props.secondaryGantt.title : ""
              )
            }
            TaskListTable={
              props.secondaryGantt?.taskListTableProject ??
              CustomTaskListTableHOC(id => {
                console.log("planner.tsx Clicked on " + id);
              })
            }
            // tooltip
            TooltipContent={
              props.secondaryGantt?.tooltipContent ?? CustomTooltipHOC()
            }
            // events
            onClick={(row: GanttRow) => props.secondaryGantt?.onClick?.(row)}
            onDateChange={(row: GanttRow | Phase | GanttTask) =>
              props.secondaryGantt?.onDateChange?.(row)
            }
          />
        )}
      </div>
    </div>
  );
};

export default Planner;
