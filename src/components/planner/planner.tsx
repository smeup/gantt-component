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
 * Main Gantt specified props
 */
export interface MainGanttProps {
  items: GanttTask[];
  title: string;
  taskListHeaderPhase?: TaskListHeaderComponent;
  taskListTablePhase?: TaskListTableComponent;
  taskListHeaderProject?: TaskListHeaderComponent;
  taskListTableProject?: TaskListTableComponent;
  tooltipContent?: TooltipContentComponent;
  stylingOptions?: any;
  ganttHeight?: number;
  onDateChange?: (row: GanttTask | Phase | GanttRow) => void;
  onClick?: (row: GanttRow) => void;
}

/**
 * Secondary Gantt specified props
 */
export interface SecondaryGanttProps {
  items: GanttTask[];
  title: string;
  taskListHeaderPhase?: TaskListHeaderComponent;
  taskListTablePhase?: TaskListTableComponent;
  taskListHeaderProject?: TaskListHeaderComponent;
  taskListTableProject?: TaskListTableComponent;
  stylingOptions?: any;
  ganttHeight?: number;
}

export interface PlannerProps {
  mainGantt: MainGanttProps;
  secondaryGantt?: SecondaryGanttProps;
  showSecondaryDates?: boolean;
  hideLabel?: boolean;
  hideDependencies?: boolean;
}

export const Planner: React.FC<PlannerProps> = props => {
  const [timeUnit, setTimeUnit] = useState(TimeUnit.MONTH);
  const [doubleView, setDoubleView] = useState(
    props.showSecondaryDates ?? false
  );

  /**
   * Common props for each Gantt
   */
  const commonProps = {
    hideLabel: props.hideLabel,
    showSecondaryDates: doubleView,
    hideDependencies: props.hideDependencies,
  };

  return (
    <div style={{ maxWidth: "90vw" }}>
      <Switcher onTimeUnitChange={timeUnit => setTimeUnit(timeUnit)} />
      <GanttByTask
        key="main"
        {...commonProps}
        ganttHeight={props.mainGantt.ganttHeight}
        projects={props.mainGantt.items}
        timeUnit={timeUnit}
        stylingOptions={props.mainGantt.stylingOptions}
        onClick={(row: GanttRow) => props.mainGantt.onClick?.(row)}
        onDateChange={(row: GanttRow | Phase | GanttTask) =>
          props.mainGantt.onDateChange?.(row)
        }
        TaskListHeader={
          props.mainGantt.taskListHeaderProject ??
          CustomTaskListHeaderHOC(
            props.mainGantt.title,
            doubleView ?? true,
            setDoubleView
          )
        }
        TaskListTable={
          props.mainGantt.taskListTableProject ??
          CustomTaskListTableHOC(id => {
            console.log("planner.tsx Clicked on " + id);
          })
        }
        TooltipContent={props.mainGantt.tooltipContent ?? CustomTooltipHOC()}
      />
      <GanttByTask
        key="secondary"
        {...commonProps}
        ganttHeight={props.secondaryGantt?.ganttHeight}
        projects={
          props.secondaryGantt?.items ? props.secondaryGantt?.items : []
        }
        timeUnit={timeUnit}
        stylingOptions={props.secondaryGantt?.stylingOptions}
        TaskListHeader={
          props.secondaryGantt?.taskListHeaderProject ??
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
      />
    </div>
  );
};

export default Planner;
