import React, {
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CurrentDateIndicator,
  GanttProps,
  Task,
} from "../../types/public-types";
import { GridProps } from "../grid/grid";
import { ganttDateRangeFromTask, seedDates } from "../../helpers/date-helper";
import { CalendarProps } from "../calendar/calendar";
import { TaskGanttContentProps } from "./task-gantt-content";
import { TaskListHeaderDefault } from "../task-list/task-list-header";
import { TaskListTableDefault } from "../task-list/task-list-table";
import { StandardTooltipContent, Tooltip } from "../other/tooltip";
import { VerticalScroll } from "../other/vertical-scroll";
import { TaskList, TaskListProps } from "../task-list/task-list";
import { TaskGantt } from "./task-gantt";
import { BarTask } from "../../types/bar-task";
import {
  calculateCurrentDateCalculator,
  calculateProjection,
  convertToBarTasks,
} from "../../helpers/bar-helper";
import { GanttEvent } from "../../types/gantt-task-actions";
import { DateSetup } from "../../types/date-setup";
import { HorizontalScroll } from "../other/horizontal-scroll";
import { removeHiddenTasks, sortTasks } from "../../helpers/other-helper";
import styles from "./gantt.module.css";
import { GanttSyncScrollEvent } from "../../types/domain";

export const Gantt: React.FunctionComponent<GanttProps> = ({
  id,
  tasks,
  headerHeight = 114,
  columnWidth = 60,
  listCellWidth = "297px",
  rowHeight = 50,
  filter,
  ganttHeight = 0,
  preStepsCount = 1,
  locale = "en-GB",
  barFill = 60,
  projectFill = 80,
  timelineFill = 40,
  barCornerRadius = 3,
  barProgressColor = "#a3a3ff",
  barProgressSelectedColor = "#8282f5",
  barBackgroundColor = "#b8c2cc",
  barBackgroundSelectedColor = "#aeb8c2",
  projectProgressColor = "#7db59a",
  projectProgressSelectedColor = "#59a985",
  projectBackgroundColor = "#fac465",
  projectBackgroundSelectedColor = "#f7bb53",
  rtl = false,
  handleWidth = 8,
  timeStep = 300000,
  arrowColor = "grey",
  fontFamily = "Arial, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue",
  fontSize = "14px",
  arrowIndent = 20,
  todayColor = "#ff0000",
  viewDate,
  TooltipContent = StandardTooltipContent,
  TaskListHeader = TaskListHeaderDefault,
  TaskListTable = TaskListTableDefault,
  dateTimeFormatters,
  singleLineHeader = false,
  hideLabel = false,
  showSecondaryDates = false,
  hideDependencies = false,
  projection,
  displayedStartDate,
  displayedEndDate,
  initialScrollX = -1,
  initialScrollY = 0,
  readOnly = false,
  onDateChange,
  onProgressChange,
  onDoubleClick,
  onClick,
  onContextMenu,
  onDelete,
  onSelect,
  onExpanderClick,
  viewMode = "month",
  onScrollX,
  onScrollY,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const taskGanttRef = useRef<HTMLDivElement>(null);
  const taskListRef = useRef<HTMLDivElement>(null);
  const [dateSetup, setDateSetup] = useState<DateSetup>(() => {
    const [startDate, endDate] = ganttDateRangeFromTask(
      tasks,
      viewMode,
      preStepsCount,
      showSecondaryDates,
      displayedStartDate,
      displayedEndDate
    );
    return { viewMode, dates: seedDates(startDate, endDate, viewMode) };
  });

  const taskListWidth = useRef(0);
  const setTaskListWidth = (width: number) => {
    taskListWidth.current = width;
  };
  const svgContainerWidth = useRef(0);
  const setSvgContainerWidth = (width: number) => {
    svgContainerWidth.current = width;
  };
  const svgContainerHeight = useRef(ganttHeight);
  const setSvgContainerHeight = (height: number) => {
    svgContainerHeight.current = height;
  };
  const [barTasks, setBarTasks] = useState<BarTask[]>([]);
  const [ganttEvent, setGanttEvent] = useState<GanttEvent>({
    action: "",
  });
  const taskHeight = useMemo(
    () => (rowHeight * barFill) / 100,
    [rowHeight, barFill]
  );
  const projectHeight = useMemo(
    () => (rowHeight * projectFill) / 100,
    [rowHeight, projectFill]
  );
  const timelineHeight = useMemo(
    () => (rowHeight * timelineFill) / 100,
    [rowHeight, timelineFill]
  );

  const [selectedTask, setSelectedTask] = useState<BarTask>();
  const [failedTask, setFailedTask] = useState<BarTask | null>(null);

  const svgWidth = dateSetup.dates.length * columnWidth;
  const ganttFullHeight = barTasks.length * rowHeight;

  const [scrollX, setScrollX] = useState(initialScrollX);
  const [scrollY, setScrollY] = useState(initialScrollY);
  const ignoreScrollEvent = useRef(false);
  const setIgnoreScrollEvent = (value: boolean) => {
    ignoreScrollEvent.current = value;
  };

  const [currentDateIndicatorContent, setCurrentDateIndicatorContent] =
    useState<CurrentDateIndicator>();

  const [projectionContent, setProjectionContent] = useState<{
    x0: number;
    xf: number;
    color: string;
  }>();

  // sync scroll event
  useEffect(() => {
    // create event listener
    window.addEventListener("gantt-sync-scroll-event", function (e: any) {
      if (e.detail.id !== id) {
        setScrollX(e.detail.scrollX);
        // execute scroll x event
        if (onScrollX) {
          onScrollX(e.detail.scrollX);
        }
      }
    });
  }, [id, onScrollX]);

  // task change events
  useEffect(() => {
    let filteredTasks: Task[];
    if (onExpanderClick) {
      filteredTasks = removeHiddenTasks(tasks);
    } else {
      filteredTasks = tasks;
    }
    filteredTasks = filteredTasks.sort(sortTasks);
    const [startDate, endDate] = ganttDateRangeFromTask(
      filteredTasks,
      viewMode,
      preStepsCount,
      showSecondaryDates,
      displayedStartDate,
      displayedEndDate
    );
    let newDates = seedDates(startDate, endDate, viewMode);
    if (rtl) {
      newDates = newDates.reverse();
      if (scrollX === -1) {
        setScrollX(newDates.length * columnWidth);
      }
    }
    let set: boolean = false;
    if (dateSetup && dateSetup.dates) {
      const old = dateSetup.dates;
      if (old.length !== newDates.length) {
        set = true;
      } else {
        for (let i = 0; i < old.length; i++) {
          if (old[i].valueOf() !== newDates[i].valueOf()) {
            set = true;
            break;
          }
        }
      }
    }
    if (set) {
      setDateSetup({ dates: newDates, viewMode });
    }
    setBarTasks(
      convertToBarTasks(
        filteredTasks,
        newDates,
        columnWidth,
        rowHeight,
        taskHeight,
        projectHeight,
        timelineHeight,
        barCornerRadius,
        handleWidth,
        rtl,
        barProgressColor,
        barProgressSelectedColor,
        barBackgroundColor,
        barBackgroundSelectedColor,
        projectProgressColor,
        projectProgressSelectedColor,
        projectBackgroundColor,
        projectBackgroundSelectedColor,
        showSecondaryDates
      )
    );
  }, [
    tasks,
    viewMode,
    preStepsCount,
    rowHeight,
    barCornerRadius,
    columnWidth,
    taskHeight,
    handleWidth,
    barProgressColor,
    barProgressSelectedColor,
    barBackgroundColor,
    barBackgroundSelectedColor,
    projectProgressColor,
    projectProgressSelectedColor,
    projectBackgroundColor,
    projectBackgroundSelectedColor,
    rtl,
    scrollX,
    onExpanderClick,
    showSecondaryDates,
    projectHeight,
    timelineHeight,
    displayedStartDate,
    displayedEndDate,
  ]);

  useEffect(() => {
    if (viewMode === dateSetup.viewMode && viewDate) {
      const dates = dateSetup.dates;
      const index = dates.findIndex(
        (d, i) =>
          viewDate.valueOf() >= d.valueOf() &&
          i + 1 !== dates.length &&
          viewDate.valueOf() < dates[i + 1].valueOf()
      );
      if (index === -1) {
        return;
      }
      setIgnoreScrollEvent(true);
      setScrollX(columnWidth * index);
    }
  }, [viewDate, columnWidth, dateSetup.dates, dateSetup.viewMode, viewMode]);

  useEffect(() => {
    const { changedTask, action } = ganttEvent;
    if (changedTask) {
      if (action === "delete") {
        setGanttEvent({ action: "" });
        setBarTasks(barTasks.filter(t => t.id !== changedTask.id));
      } else if (
        action === "move" ||
        action === "end" ||
        action === "start" ||
        action === "progress"
      ) {
        const prevStateTask = barTasks.find(t => t.id === changedTask.id);
        if (
          prevStateTask &&
          (prevStateTask.start.getTime() !== changedTask.start.getTime() ||
            prevStateTask.end.getTime() !== changedTask.end.getTime() ||
            prevStateTask.progress !== changedTask.progress)
        ) {
          // actions for change
          const newTaskList = barTasks.map(t =>
            t.id === changedTask.id ? changedTask : t
          );
          setBarTasks(newTaskList);
        }
      }
    }
  }, [ganttEvent, barTasks]);

  useEffect(() => {
    if (failedTask) {
      setBarTasks(barTasks.map(t => (t.id !== failedTask.id ? t : failedTask)));
      setFailedTask(null);
    }
  }, [failedTask, barTasks]);

  useEffect(() => {
    if (!listCellWidth) {
      setTaskListWidth(0);
    }
    if (taskListRef.current) {
      setTaskListWidth(taskListRef.current.offsetWidth);
    }
  }, [taskListRef, listCellWidth]);

  useEffect(() => {
    if (wrapperRef.current) {
      if (scrollX !== -1) {
        const wrap = wrapperRef.current;
        const setScrollLeft = () => {
          wrap.scrollLeft = scrollX;
        };
        setTimeout(setScrollLeft, 125);
      }
      if (scrollY !== 0) {
        const wrap = wrapperRef.current;
        const setScrollTop = () => {
          wrap.scrollTop = scrollY;
        };
        setTimeout(setScrollTop, 125);
      }
    }
  }, []);

  useEffect(() => {
    if (wrapperRef.current) {
      setSvgContainerWidth(
        wrapperRef.current.offsetWidth - taskListWidth.current
      );
    }
  }, [wrapperRef]);

  useEffect(() => {
    if (ganttHeight) {
      setSvgContainerHeight(ganttHeight + headerHeight);
    } else {
      setSvgContainerHeight(tasks.length * rowHeight + headerHeight);
    }
  }, [ganttHeight, tasks, headerHeight, rowHeight]);

  // scroll events
  useEffect(() => {
    const wrapperRefLocal = wrapperRef.current;
    const handleWheel = (event: WheelEvent) => {
      if (event.shiftKey || event.deltaX) {
        const scrollMove = event.deltaX ? event.deltaX : event.deltaY;
        let newScrollX = scrollX + scrollMove;
        if (newScrollX < 0) {
          newScrollX = 0;
        } else if (newScrollX > svgWidth) {
          newScrollX = svgWidth;
        }
        setScrollX(newScrollX);
        event.preventDefault();
      } else if (ganttHeight) {
        let newScrollY = scrollY + event.deltaY;
        if (newScrollY < 0) {
          newScrollY = 0;
        } else if (newScrollY > ganttFullHeight - ganttHeight) {
          newScrollY = ganttFullHeight - ganttHeight;
        }
        if (newScrollY !== scrollY) {
          setScrollY(newScrollY);
          event.preventDefault();
        }
      }
      setIgnoreScrollEvent(true);
    };

    // subscribe if scroll is necessary
    wrapperRefLocal?.addEventListener("wheel", handleWheel, {
      passive: false,
    });
    return () => {
      wrapperRefLocal?.removeEventListener("wheel", handleWheel);
    };
  }, [
    wrapperRef,
    scrollY,
    scrollX,
    ganttHeight,
    svgWidth,
    rtl,
    ganttFullHeight,
  ]);

  const handleScrollY = (event: SyntheticEvent<HTMLDivElement>) => {
    if (scrollY !== event.currentTarget.scrollTop) {
      // execute scroll y event
      if (onScrollY) {
        onScrollY(event.currentTarget.scrollTop);
      }
      if (!ignoreScrollEvent.current) {
        setScrollY(event.currentTarget.scrollTop);
        setIgnoreScrollEvent(true);
      } else {
        setIgnoreScrollEvent(false);
      }
    } else {
      setIgnoreScrollEvent(false);
    }
  };

  const handleScrollX = (event: SyntheticEvent<HTMLDivElement>) => {
    if (
      scrollX !== event.currentTarget.scrollLeft &&
      !ignoreScrollEvent.current
    ) {
      setScrollX(event.currentTarget.scrollLeft);
      setIgnoreScrollEvent(true);
      // emit event to sync scroll
      window.dispatchEvent(
        new CustomEvent<GanttSyncScrollEvent>("gantt-sync-scroll-event", {
          detail: {
            componentId: id,
            scrollX: event.currentTarget.scrollLeft,
          },
        })
      );
    } else {
      setIgnoreScrollEvent(false);
    }
  };

  /**
   * Handles arrow keys events and transform it to new scroll
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).tagName === "INPUT") {
      return;
    }
    event.preventDefault();
    let newScrollY = scrollY;
    let newScrollX = scrollX;
    let isX = true;
    switch (event.key) {
      case "Down": // IE/Edge specific value
      case "ArrowDown":
        newScrollY += rowHeight;
        isX = false;
        break;
      case "Up": // IE/Edge specific value
      case "ArrowUp":
        newScrollY -= rowHeight;
        isX = false;
        break;
      case "Left":
      case "ArrowLeft":
        newScrollX -= columnWidth;
        break;
      case "Right": // IE/Edge specific value
      case "ArrowRight":
        newScrollX += columnWidth;
        break;
    }
    if (isX) {
      if (newScrollX < 0) {
        newScrollX = 0;
      } else if (newScrollX > svgWidth) {
        newScrollX = svgWidth;
      }
      setScrollX(newScrollX);
      // emit event to sync scroll
      window.dispatchEvent(
        new CustomEvent<GanttSyncScrollEvent>("gantt-sync-scroll-event", {
          detail: {
            componentId: id,
            scrollX: newScrollX,
          },
        })
      );
    } else {
      if (newScrollY < 0) {
        newScrollY = 0;
      } else if (newScrollY > ganttFullHeight - ganttHeight) {
        newScrollY = ganttFullHeight - ganttHeight;
      }
      // execute scroll y event
      if (onScrollY) {
        onScrollY(event.currentTarget.scrollTop);
      }
      setScrollY(newScrollY);
    }
    setIgnoreScrollEvent(true);
  };

  /**
   * Current date calculator hook
   */
  useEffect(() => {
    const x = calculateCurrentDateCalculator(dateSetup.dates, columnWidth);
    if (x !== 0) {
      setCurrentDateIndicatorContent({
        color: todayColor,
        x,
      });
    }
  }, [columnWidth, dateSetup.dates, todayColor]);

  /**
   * Projections hook
   */
  useEffect(() => {
    // convert init date and final date to coordinate
    if (projection) {
      const { x0, xf } = calculateProjection(
        projection.start,
        projection.end,
        dateSetup.dates,
        columnWidth
      );
      setProjectionContent({
        x0,
        xf,
        color: projection.color,
      });
    } else {
      setProjectionContent(undefined);
    }
  }, [columnWidth, dateSetup.dates, projection]);

  /**
   * Task select event
   */
  const handleSelectedTask = (taskId: string) => {
    const newSelectedTask = barTasks.find(t => t.id === taskId);
    const oldSelectedTask = barTasks.find(
      t => !!selectedTask && t.id === selectedTask.id
    );
    if (onSelect) {
      if (oldSelectedTask) {
        onSelect(oldSelectedTask, false);
      }
      if (newSelectedTask) {
        onSelect(newSelectedTask, true);
      }
    }
    setSelectedTask(newSelectedTask);
  };

  const handleExpanderClick = (task: Task) => {
    if (onExpanderClick && task.hideChildren !== undefined) {
      onExpanderClick({ ...task, hideChildren: !task.hideChildren });
    }
  };

  const gridProps: GridProps = {
    columnWidth,
    svgWidth,
    tasks: tasks,
    rowHeight,
    dates: dateSetup.dates,
    todayColor,
    rtl,
  };

  const calendarProps: CalendarProps = {
    dateSetup,
    locale,
    viewMode,
    headerHeight,
    columnWidth,
    fontFamily,
    fontSize,
    rtl,
    dateTimeFormatters,
    singleLineHeader,
    currentDateIndicator: currentDateIndicatorContent,
  };

  const barProps: TaskGanttContentProps = {
    tasks: barTasks,
    dates: dateSetup.dates,
    ganttEvent,
    selectedTask,
    rowHeight,
    taskHeight,
    columnWidth,
    arrowColor: hideDependencies ? "transparent" : arrowColor,
    timeStep,
    fontFamily,
    fontSize,
    arrowIndent,
    svgWidth,
    rtl,
    hideLabel,
    showSecondaryDates,
    ganttHeight,
    currentDateIndicator: currentDateIndicatorContent,
    projection: projectionContent,
    readOnly,
    setGanttEvent,
    setFailedTask,
    setSelectedTask: handleSelectedTask,
    onDateChange,
    onProgressChange,
    onDoubleClick,
    onClick,
    onContextMenu,
    onDelete,
  };

  const tableProps: TaskListProps = {
    rowHeight,
    rowWidth: listCellWidth,
    fontFamily,
    fontSize,
    tasks: barTasks,
    locale,
    headerHeight,
    scrollY,
    ganttHeight,
    filter,
    horizontalContainerClass: styles.horizontalContainer,
    selectedTask,
    taskListRef,
    setSelectedTask: handleSelectedTask,
    onExpanderClick: handleExpanderClick,
    TaskListHeader,
    TaskListTable,
  };

  console.log("SCROLL X", scrollX);

  return (
    <div>
      <div
        className={`${styles.wrapper}`}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        ref={wrapperRef}
      >
        {listCellWidth && <TaskList {...tableProps} />}
        <TaskGantt
          gridProps={gridProps}
          calendarProps={calendarProps}
          barProps={barProps}
          ganttHeight={ganttHeight}
          taskGanttRef={taskGanttRef}
          scrollY={scrollY}
          scrollX={scrollX}
        />
        {ganttEvent.changedTask && (
          <Tooltip
            arrowIndent={arrowIndent}
            rowHeight={rowHeight}
            svgContainerHeight={svgContainerHeight.current}
            svgContainerWidth={svgContainerWidth.current}
            fontFamily={fontFamily}
            fontSize={fontSize}
            scrollX={scrollX}
            scrollY={scrollY}
            task={ganttEvent.changedTask}
            headerHeight={headerHeight}
            taskListWidth={taskListWidth.current}
            TooltipContent={TooltipContent}
            rtl={rtl}
            svgWidth={svgWidth}
          />
        )}
        <VerticalScroll
          ganttFullHeight={ganttFullHeight}
          ganttHeight={ganttHeight}
          headerHeight={headerHeight}
          scroll={scrollY}
          onScroll={handleScrollY}
          rtl={rtl}
        />
      </div>
      <HorizontalScroll
        svgWidth={svgWidth}
        taskGanttRef={taskGanttRef}
        taskListWidth={taskListWidth.current}
        scroll={scrollX}
        rtl={rtl}
        onScroll={handleScrollX}
      />
    </div>
  );
};
