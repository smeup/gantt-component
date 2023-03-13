import { TimeUnit } from "../../types/time-unit";
import { useEffect, useMemo, useState } from "react";
import {
  convertProjectToTasks,
  isDetail,
  mergeTaskIntoPhases,
  mergeTaskIntoProjects,
  toViewMode,
} from "../../helpers/adapter";
import { Detail, GanttTask, Phase } from "../../types/domain";
import { ganttDateTimeFormatters } from "../../helpers/time-formatters";
import React from "react";
import { Task } from "../../types/public-types";
import { Gantt } from "../gantt/gantt";
import { GanttByTaskProps } from "../../types/adapted-types";
import { DateTime } from "luxon";

const locale = "it-IT";

export const GanttByTask: React.FC<GanttByTaskProps> = ({
  projects = [],
  mainGanttStartDate,
  mainGanttEndDate,
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
    const tasks: Task[] = [];
    for (let i = 0; i < currentProjects.length; i++) {
      tasks.push(
        ...convertProjectToTasks(
          currentProjects[i],
          mainGanttStartDate,
          mainGanttEndDate
        )
      );
    }
    return tasks;
  }, [currentProjects, mainGanttEndDate, mainGanttStartDate]);

  const getProjectById = (id: string): GanttTask | Detail | undefined => {
    for (let i = 0; i < currentProjects.length; i++) {
      if (currentProjects[i].id === id) {
        return currentProjects[i];
      }
    }
    return undefined;
  };

  const getPhaseById = (id: string): Phase | undefined => {
    for (let i = 0; i < currentProjects.length; i++) {
      if (isDetail(currentProjects[i])) {
        continue;
      }
      const currentProject = currentProjects[i] as GanttTask;
      if (!currentProject.phases) {
        continue;
      }
      for (let j = 0; j < currentProject.phases.length; j++)
        if (currentProject.phases[j].id === id) {
          return currentProject.phases[j];
        }
    }
    return undefined;
  };

  const handleClick = (task: Task) => {
    const id = task?.id;
    const type = task?.type;
    console.log("gantt-by-task.tsx onClick", id, type);
    const project = getProjectById(id);
    if (project) {
      onClick?.(project);
    }
    const phase = getPhaseById(id);
    if (phase) {
      onClick?.(phase);
    }
  };

  const handleDateChange = (task: Task) => {
    const id = task?.id;
    const type = task?.type;
    console.log("gantt-by-task.tsx onDateChange", id, type);

    /** per il timeline, ha senso gestire il dateChange???? per adesso non gestito */
    if (type === "timeline") {
      console.log(
        "gantt-by-task.tsx onDateChange for timeline not managed yet",
        id,
        type
      );
      return;
    }
    const project = getProjectById(id);
    if (project) {
      const result = mergeTaskIntoProjects(
        currentProjects as GanttTask[],
        task
      );
      setCurrentProjects(result);
      const project = result.find(p => p.id === id);
      if (project) onDateChange?.(project);
      return;
    }
    const parentOfClickedPhase: GanttTask | undefined = (
      currentProjects as GanttTask[]
    ).find(p => p.phases?.some(ph => ph?.id === id));
    if (parentOfClickedPhase) {
      const phases = mergeTaskIntoPhases(parentOfClickedPhase.phases, task);
      const updatedProjects = (currentProjects as GanttTask[]).map(p =>
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
  } else {
    return <div></div>;
  }
};
