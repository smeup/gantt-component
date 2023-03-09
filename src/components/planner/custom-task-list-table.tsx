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
      key={id}
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
          key={id + "_valuesToShow_" + index}
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
      key={id}
      className={styles.subrow}
      style={customStyle}
      onClick={() => {
        setSelectedTask(id);
        onclickTaskList(id);
      }}
    >
      <span
        key={id + "_valuesToShow_color"}
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
          key={id + "_valuesToShow_" + index}
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
  task: { id, name },
  rowHeight,
  rowWidth,
  fontFamily,
  fontSize,
}) => {
  return (
    <div
      key={id}
      className={styles.timelineWrapper}
      style={{
        height: rowHeight,
        width: rowWidth,
        fontFamily,
        fontSize,
      }}
    >
      <div
        className={styles.timeline}
        style={{
          height: rowHeight - 5,
        }}
      >
        <span key={id + "_valuesToShow_0"}>{name}</span>
        <span key={id + "_valuesToShow_1"}>A</span>
        <span key={id + "_valuesToShow_2"}>A</span>
      </div>
    </div>
  );
};

export const CustomTaskListTableHOC = (
  onclickTaskList: (id: string) => void
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
    <div className={styles.container}>
      {tasks.map(task => (
        <React.Fragment>
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
