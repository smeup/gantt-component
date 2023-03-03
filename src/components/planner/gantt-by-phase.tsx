import { TimeUnit } from "../../types/time-unit";
import React, { FC, useState } from "react";
import { convertPhaseToTask, mergeTaskIntoPhases, toViewMode } from "../../helpers/adapter";
import { GanttByPhaseProps } from "../../types/adapted-types";
import { DateTime } from "luxon";
import { ganttDateTimeFormatters } from "../../helpers/time-formatters";
import { Task } from "../../types/public-types";
import { Gantt } from "../gantt/gantt";


const locale = "it-IT";

export const GanttByPhase: FC<GanttByPhaseProps> = ({
  phases = [],
  timeUnit = TimeUnit.DAY,
  TooltipContent,
  TaskListHeader,
  TaskListTable,
  onDateChange,
  stylingOptions = {},  
}) => {
  const [currentPhases, setCurrentPhases] = useState(phases);
  const tasks = currentPhases?.map(convertPhaseToTask) ?? [];

  const handleDateChange = (task: Task) => {
    console.log("onDateChange", task?.id);
    const result = mergeTaskIntoPhases(currentPhases, task);
    if (result) setCurrentPhases(result);
    const updatedPhase = result?.find(p => p.id === task.id);
    if (updatedPhase) onDateChange?.(updatedPhase);
  };

  const viewDate = DateTime.now()
    .minus({ [timeUnit]: stylingOptions?.preStepsCount ?? 11 })
    .toJSDate();

  console.log("TASKS", tasks);

  const returnElement = tasks?.length > 0 && (
    <Gantt
      tasks={tasks}
      locale={locale}
      viewMode={toViewMode(timeUnit)}
      viewDate={viewDate}
      onDateChange={onDateChange ? handleDateChange : undefined}
      TooltipContent={TooltipContent}
      TaskListHeader={TaskListHeader}
      TaskListTable={TaskListTable}
      dateTimeFormatters={ganttDateTimeFormatters}
      {...stylingOptions}      
    />
  );

  if (returnElement) {
    return returnElement;
  }
  else {
    return <div></div>
  };

  
};
