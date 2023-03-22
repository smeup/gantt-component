import { TimeUnit } from "../../types/time-unit";
import { useEffect, useMemo, useState } from "react";
import {
  convertProjectToTasks,
  getPhaseById,
  getProjectById,
  mergeTaskIntoPhases,
  mergeTaskIntoProjects,
  toViewMode,
} from "../../helpers/adapter";
import { GanttTask } from "../../types/domain";
import { ganttDateTimeFormatters } from "../../helpers/time-formatters";
import React from "react";
import { Task } from "../../types/public-types";
import { Gantt } from "../gantt/gantt";
import { GanttByTaskProps } from "../../types/adapted-types";
import { formatToIsoDate } from "../../helpers/time-converters";

const locale = "it-IT";

export const GanttByTask: React.FC<GanttByTaskProps> = ({
  items: projects = [],
  displayedStartDate: mainGanttStartDate,
  displayedEndDate: mainGanttEndDate,
  timeUnit = TimeUnit.DAY,
  TooltipContent,
  TaskListHeader,
  TaskListTable,
  stylingOptions = {},
  onDateChange,
  onClick,
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
          formatToIsoDate(mainGanttStartDate),
          formatToIsoDate(mainGanttEndDate)
        )
      );
    }
    return tasks;
  }, [currentProjects, mainGanttEndDate, mainGanttStartDate]);

  const handleClick = (task: Task) => {
    const id = task?.id;
    const project = getProjectById(id, currentProjects);
    if (project) {
      onClick?.(project);
    }
    const phase = getPhaseById(id, currentProjects);
    if (phase) {
      onClick?.(phase);
    }
  };

  const handleDateChange = (task: Task) => {
    const id = task?.id;
    const type = task?.type;

    /** per il timeline, ha senso gestire il dateChange???? per adesso non gestito */
    if (type === "timeline") {
      console.log(
        "gantt-by-task.tsx onDateChange for timeline not managed yet",
        id,
        type
      );
      return;
    }
    const project = getProjectById(id, currentProjects);
    if (project) {
      const result = mergeTaskIntoProjects(
        currentProjects as GanttTask[],
        task
      );
      // currentProjects.splice(0);
      // result.forEach(element => (currentProjects as GanttTask[]).push(element));
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
      // if (phases) {
      //   if (!parentOfClickedPhase.phases) {
      //     parentOfClickedPhase.phases = [];
      //   }
      //   parentOfClickedPhase.phases.splice(0);
      //   phases.forEach(element => parentOfClickedPhase.phases?.push(element));
      // }
      // const phase = (currentProjects as GanttTask[])
      //   .flatMap(p => p.phases)
      //   .find(ph => ph?.id === id);
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

  const returnElement = tasks?.length > 0 && (
    <Gantt
      key={key}
      tasks={tasks}
      locale={locale}
      viewMode={toViewMode(timeUnit)}
      onClick={handleClick}
      onDateChange={handleDateChange}
      TooltipContent={TooltipContent}
      TaskListHeader={TaskListHeader}
      TaskListTable={TaskListTable}
      dateTimeFormatters={ganttDateTimeFormatters}
      {...stylingOptions}
      {...props}
      displayedStartDate={mainGanttStartDate}
      displayedEndDate={mainGanttEndDate}
    />
  );
  if (returnElement) {
    return returnElement;
  } else {
    return <div></div>;
  }
};
