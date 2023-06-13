import React, { useRef, useEffect, createRef } from "react";
import { GridProps, Grid } from "../grid/grid";
import { CalendarProps, Calendar } from "../calendar/calendar";
import { TaskGanttContentProps, TaskGanttContent } from "./task-gantt-content";
import styles from "./gantt.module.css";

export type TaskGanttProps = {
  gridProps: GridProps;
  calendarProps: CalendarProps;
  barProps: TaskGanttContentProps;
  ganttHeight: number;
  taskGanttRef: React.RefObject<HTMLDivElement>;
  scrollY: number;
  scrollX: number;
};
export const TaskGantt: React.FC<TaskGanttProps> = ({
  gridProps,
  calendarProps,
  barProps,
  ganttHeight,
  taskGanttRef,
  scrollY,
  scrollX,
}) => {
  const ganttSVGRef = useRef<SVGSVGElement>(null);
  const horizontalContainerRef = createRef<HTMLDivElement>();
  const verticalGanttContainerRef = createRef<HTMLDivElement>();
  const newBarProps = { ...barProps, svg: ganttSVGRef };

  useEffect(() => {
    if (horizontalContainerRef.current) {
      horizontalContainerRef.current.scrollTop = scrollY;
    }
  }, [horizontalContainerRef, scrollY]);

  useEffect(() => {
    if (verticalGanttContainerRef.current) {
      verticalGanttContainerRef.current.scrollLeft = scrollX;
    }
  }, [scrollX, verticalGanttContainerRef]);

  return (
    <div className={styles.ganttContainer} ref={taskGanttRef}>
      <div
        className={styles.ganttVerticalContainer}
        ref={verticalGanttContainerRef}
        dir="ltr"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={gridProps.svgWidth}
          height={calendarProps.headerHeight}
          fontFamily={barProps.fontFamily}
        >
          <Calendar {...calendarProps} />
        </svg>
        <div
          ref={horizontalContainerRef}
          className={styles.horizontalContainer}
          style={
            ganttHeight
              ? { height: ganttHeight, width: gridProps.svgWidth }
              : { width: gridProps.svgWidth }
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={gridProps.svgWidth}
            height={barProps.rowHeight * barProps.tasks.length}
            fontFamily={barProps.fontFamily}
            ref={ganttSVGRef}
          >
            <Grid {...gridProps} />
            <TaskGanttContent {...newBarProps} />
          </svg>
        </div>
      </div>
    </div>
  );
};
