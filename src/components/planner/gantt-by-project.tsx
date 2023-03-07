import { TimeUnit } from "../../types/time-unit";
import { useEffect, useMemo, useState } from "react";
import {
  convertProjectToTasks,
  mergeTaskIntoPhases,
  mergeTaskIntoProjects,
  toViewMode,
} from "../../helpers/adapter";
//import { GanttByProjectProps } from "./adapted-types";
import { Project } from "../../types/domain";
import { ganttDateTimeFormatters } from "../../helpers/time-formatters";
import React from "react";
import { Task } from "../../types/public-types";
import { Gantt } from "../gantt/gantt";
import { GanttByProjectProps } from "../../types/adapted-types";
import { DateTime } from "luxon";

const locale = "it-IT";

export const GanttByProject: React.FC<GanttByProjectProps> = ({
  projects = [],
  timeUnit = TimeUnit.DAY,
  TooltipContent,
  TaskListHeader,
  TaskListTable,
  onDateChange,
  onClick,
  stylingOptions = {},
  ...props
}) => {
  const [currentProjects, setCurrentProjects] = useState(projects);

  useEffect(() => {
    if (projects) setCurrentProjects(projects);
  }, [projects]);

  const [key, setKey] = useState(1);

  const tasks: Task[] = useMemo(() => {
    setKey(k => k + 1);
    return currentProjects.flatMap(convertProjectToTasks);
  }, [currentProjects]);

  const getProjectById = (id: string) => currentProjects.find(p => p.id === id);

  const handleClick = (task: Task) => {
    const id = task?.id;
    console.log("onClick", id);
    const project = getProjectById(id);
    if (project) onClick?.(project);
    const phase = currentProjects
      .flatMap(p => p.phases)
      .find(ph => ph?.id === id);
    if (phase) onClick?.(phase);
  };

  const handleDateChange = (task: Task) => {
    const id = task?.id;
    console.log("onDateChange", id);
    const project = getProjectById(id);
    if (project) {
      const result = mergeTaskIntoProjects(currentProjects, task);
      setCurrentProjects(result);
      const project = result.find(p => p.id === id);
      if (project) onDateChange?.(project);
      return;
    }
    const parentOfClickedPhase: Project | undefined = currentProjects.find(p =>
      p.phases?.some(ph => ph?.id === id)
    );
    if (parentOfClickedPhase) {
      const phases = mergeTaskIntoPhases(parentOfClickedPhase.phases, task);
      const updatedProjects = currentProjects.map(p =>
        p.id === parentOfClickedPhase.id ? { ...p, phases } : p
      );
      setCurrentProjects(updatedProjects);
      const phase = updatedProjects
        .flatMap(p => p.phases)
        .find(ph => ph?.id === id);
      if (phase) onDateChange?.(phase);
    }
  };

  const viewDate = DateTime.now()
    .minus({ [timeUnit]: stylingOptions?.preStepsCount ?? 2 })
    .toJSDate();
    
  const returnElement = tasks?.length > 0 && (
      <Gantt
        key={key}
        tasks={tasks}
        locale={locale}
        viewMode={toViewMode(timeUnit)}
        viewDate={viewDate}
        onClick={handleClick}
        onDateChange={handleDateChange}
        TooltipContent={TooltipContent}
        TaskListHeader={TaskListHeader}
        TaskListTable={TaskListTable}
        dateTimeFormatters={ganttDateTimeFormatters}
        {...stylingOptions}
        {...props}
      />    
  );
  if (returnElement) {
    return returnElement;
  }  
  else {
    return <div></div>
  }
};
