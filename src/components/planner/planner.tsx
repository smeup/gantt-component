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
import { Switcher } from "./switcher";

export interface PlannerProps {
  onDateChange?: (row: GanttTask | Phase | GanttRow) => void;
  onClick?: (row: GanttRow) => void;
  isPhase?: boolean;
  taskListHeaderProject?: TaskListHeaderComponent;
  taskListTableProject?: TaskListTableComponent;
  tooltipContent?: TooltipContentComponent;
  stylingOptions?: any;
  hideLabel?: boolean;
  showSecondaryDates?: boolean;
  ganttHeight?: number;
  hideDependencies?: boolean;
  items: Phase[] | GanttTask[];
  title: string;
}

export const Planner: React.FC<PlannerProps> = props => {
  const [timeUnit, setTimeUnit] = useState(TimeUnit.MONTH);
  const [doubleView, setDoubleView] = useState(
    props.showSecondaryDates ?? false
  );
  const commonProps = {
    hideLabel: props.hideLabel,
    showSecondaryDates: doubleView,
    ganttHeight: props.ganttHeight,
    hideDependencies: props.hideDependencies,
  };

  console.log("planner.tsx commonProps", commonProps);

  return (
    <div style={{ maxWidth: "90vw" }}>
      <Switcher onTimeUnitChange={timeUnit => setTimeUnit(timeUnit)} />

      <GanttByTask
        {...commonProps}
        projects={props.items as GanttTask[]}
        timeUnit={timeUnit}
        stylingOptions={props.stylingOptions}
        onClick={(row: GanttRow) => props.onClick?.(row)}
        onDateChange={(row: GanttRow | Phase | GanttTask) =>
          props.onDateChange?.(row)
        }
        TaskListHeader={
          props.taskListHeaderProject ??
          CustomTaskListHeaderHOC(
            props.title,
            doubleView ?? true,
            setDoubleView
          )
        }
        TaskListTable={
          props.taskListTableProject ??
          CustomTaskListTableHOC(id => {
            console.log("planner.tsx Clicked on " + id);
          })
        }
        TooltipContent={props.tooltipContent ?? CustomTooltipHOC()}
      />
    </div>
  );
};

export default Planner;
