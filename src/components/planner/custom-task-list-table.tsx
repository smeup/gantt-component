import styles from "./gantt-table.module.scss";
import { FC } from "react";
import { Task } from "../../types/public-types";
import React from "react";
import {
  TaskListTableComponent,
  TooltipContentComponent,
} from "../../types/adapted-types";
import { formatToLocaleSimple } from "../../helpers/time-converters";

type RowProps = {
  task: Task;
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  setSelectedTask: (taskId: string) => void;
  onclickTaskList: (id: string) => void;
};

const ProjectRow: FC<RowProps> = ({
  task: { id, start, end, valuesToShow },
  rowHeight,
  rowWidth,
  fontFamily,
  fontSize,
  setSelectedTask,
  onclickTaskList,
}) => {
  let str = "";
  for (let i = 0; i < valuesToShow.length; i++) {
    str += "1fr ";
  }
  const customStyle = {
    height: rowHeight,
    width: rowWidth,
    fontFamily,
    fontSize,
    "--grid-project-columns": str,
  };
  return (
    <div
      key={"task_" + id}
      className={styles.project}
      style={customStyle}
      onClick={() => {
        setSelectedTask(id);
        onclickTaskList(id);
      }}
    >
      {valuesToShow?.map((v, index) => (
        <span
          className={index === 0 ? styles.main : undefined}
          title={v.length > 10 ? v : undefined}
          key={"task_" + id + "_valuesToShow_" + index}
        >
          {v === "#START#"
            ? formatToLocaleSimple(start)
            : v === "#END#"
            ? formatToLocaleSimple(end)
            : v}
        </span>
      ))}
    </div>
  );
};

const SubRow: FC<RowProps> = ({
  task: { id, start, end, valuesToShow, styles: taskStyles },
  rowHeight,
  rowWidth,
  fontFamily,
  fontSize,
  setSelectedTask,
  onclickTaskList,
}) => {
  let str = "";
  for (let i = 0; i < valuesToShow.length + 1; i++) {
    str += "1fr ";
  }
  const customStyle = {
    height: rowHeight,
    width: rowWidth,
    fontFamily,
    fontSize,
    "--grid-fasi-columns": str,
  };
  return (
    <div
      key={"phase_" + id}
      className={styles.subrow}
      style={customStyle}
      onClick={() => {
        setSelectedTask(id);
        onclickTaskList(id);
      }}
    >
      <span
        key={"phase_" + id + "_valuesToShow_color"}
        style={{
          height: 16,
          width: 16,
          backgroundColor: taskStyles?.backgroundColor,
        }}
      />
      {valuesToShow?.map((v, index) => (
        <span
          className={index === 0 ? styles.main : undefined}
          title={v.length > 10 ? v : undefined}
          key={"phase_" + id + "_valuesToShow_" + index}
        >
          {v === "#START#"
            ? formatToLocaleSimple(start)
            : v === "#END#"
            ? formatToLocaleSimple(end)
            : v}
        </span>
      ))}
    </div>
  );
};

const TimelineSubRow: FC<RowProps> = ({
  task: { id, valuesToShow },
  rowHeight,
  rowWidth,
  fontFamily,
  fontSize,
}) => {
  let str = "";
  for (let i = 0; i < valuesToShow.length; i++) {
    str += "1fr ";
  }
  const customStyle = {
    height: rowHeight,
    width: rowWidth,
    fontFamily,
    fontSize,
    "--grid-fasi-columns": str,
  };
  return (
    <div key={"detail_" + id} className={styles.timeline} style={customStyle}>
      {valuesToShow?.map((v, index) => (
        <span
          className={index === 0 ? styles.main : undefined}
          title={v.length > 10 ? v : undefined}
          key={"detail_" + id + "_valuesToShow_" + index}
        >
          {v}
        </span>
      ))}
    </div>
  );
};

export const CustomTaskListTableHOC = (
  onclickTaskList: (id: string) => void,
  id: string
): TaskListTableComponent => {
  // noinspection UnnecessaryLocalVariableJS
  const CustomTaskListTable: TaskListTableComponent = ({
    rowHeight,
    rowWidth,
    fontFamily,
    fontSize,
    tasks,
    setSelectedTask,
  }) => (
    <div className={styles.container} key={"tasks_container_" + id}>
      {tasks.map(task => (
        <React.Fragment key={task.id}>
          {task.type === "project" && (
            <ProjectRow
              key={task.id + "_" + task.type}
              task={task}
              rowHeight={rowHeight}
              rowWidth={rowWidth}
              fontFamily={fontFamily}
              fontSize={fontSize}
              setSelectedTask={setSelectedTask}
              onclickTaskList={onclickTaskList}
            />
          )}
          {task.type === "task" && (
            <SubRow
              key={task.id + "_" + task.type}
              task={task}
              rowHeight={rowHeight}
              rowWidth={rowWidth}
              fontFamily={fontFamily}
              fontSize={fontSize}
              setSelectedTask={setSelectedTask}
              onclickTaskList={onclickTaskList}
            />
          )}
          {task.type === "timeline" && (
            <TimelineSubRow
              key={task.id + "_" + task.type}
              task={task}
              rowHeight={rowHeight}
              rowWidth={rowWidth}
              fontFamily={fontFamily}
              fontSize={fontSize}
              setSelectedTask={setSelectedTask}
              onclickTaskList={onclickTaskList}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
  return CustomTaskListTable;
};

export const CustomTooltipHOC = (): TooltipContentComponent => {
  const CustomTooltip: TooltipContentComponent = () => <div></div>;
  return CustomTooltip;
};
