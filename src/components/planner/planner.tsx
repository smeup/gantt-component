import React, { useState } from "react";
import { TaskListHeaderComponent, TaskListTableComponent } from "../../types/adapted-types";
import { Project, Phase, GanttRow } from "../../types/domain";
import { TimeUnit } from "../../types/time-unit";
import { GanttByPhase } from "./gantt-by-phase";
import { GanttByProject } from "./gantt-by-project";
import { Switcher } from "./switcher";

export interface PlannerProps {
  onDateChange?: (row: Project | Phase | GanttRow) => void;
  onClick?: (row: GanttRow) => void;
  isPhase?: boolean;
  taskListHeaderPhase?: TaskListHeaderComponent;
  taskListTablePhase?: TaskListTableComponent;
  taskListHeaderProject?: TaskListHeaderComponent;
  taskListTableProject?: TaskListTableComponent;
  commonProps: any;
}

export const Planner: React.FC<PlannerProps> = props => {
  const [timeUnit, setTimeUnit] = useState(TimeUnit.MONTH);

  return (
    <div style={{ maxWidth: "90vw" }}>
      <Switcher onTimeUnitChange={timeUnit => setTimeUnit(timeUnit)} />
      {props.isPhase ? (
        <GanttByPhase
          {...props.commonProps}
          timeUnit={timeUnit}
          onDateChange={(row: GanttRow | Phase | Project) =>
            props.onDateChange?.(row)
          }
          TaskListHeader={props.taskListHeaderPhase}
          TaskListTable={props.taskListTablePhase}
        />
      ) : (
        <GanttByProject
          {...props.commonProps}
          timeUnit={timeUnit}
          onClick={(row: GanttRow) => props.onClick?.(row)}
          onDateChange={(row: GanttRow | Phase | Project) =>
            props.onDateChange?.(row)
          }
          TaskListHeader={props.taskListHeaderProject}
          TaskListTable={props.taskListTableProject}
        />
      )}
    </div>
  );
};

export default Planner;
