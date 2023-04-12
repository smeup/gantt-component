import React from "react";
import { getProgressPoint } from "../../../helpers/bar-helper";
import { BarDisplay } from "./bar-display";
import { BarDateHandle } from "./bar-date-handle";
import { BarProgressHandle } from "./bar-progress-handle";
import { TaskItemProps } from "../task-item";
import styles from "./bar.module.css";

export const Bar: React.FC<TaskItemProps> = ({
  task,
  isProgressChangeable,
  isDateMovable,
  isDateResizable,
  rtl,
  onEventStart,
  isSelected,
  showSecondaryDates = false,
}) => {
  const progressPoint = getProgressPoint(
    +!rtl * task.progressWidth + task.progressX,
    task.y,
    task.height
  );
  const handleHeight = task.height - 2;

  let iconElem = undefined;
  if (task.iconUrl) {
    console.log("bar.tsx task.iconUrl", task.iconUrl);
    iconElem = (
      <svg
        className={styles.pippo}
        width={task.height / 2 + "px"}
        height={task.height / 2 + "px"}
        y={task.y}
        x={task.x1 + (task.x2 - task.x1) - task.height / 2}
      >
        {/* <use xlinkHref={task.iconUrl} /> */}
        <image
          href={task.iconUrl}
          height={task.height / 2 + "px"}
          width={task.height / 2 + "px"}
          fill="blue"
        />
      </svg>
    );
    // iconElem = (
    //   <React.Fragment>
    //     <image
    //       href={task.iconUrl}
    //       y={task.y}
    //       x={task.x1 + (task.x2 - task.x1) - task.height / 2}
    //       width={task.height / 2 + "px"}
    //       height={task.height / 2 + "px"}
    //       className={styles.pippo}
    //     />
    //   </React.Fragment>
    // );
  }

  return (
    <g className={styles.barWrapper} tabIndex={0}>
      <BarDisplay
        x={task.x1}
        y={task.y}
        width={task.x2 - task.x1}
        height={task.height}
        progressX={task.progressX}
        progressWidth={task.progressWidth}
        barCornerRadius={task.barCornerRadius}
        styles={task.styles}
        isSelected={isSelected}
        onMouseDown={e => {
          isDateMovable && onEventStart("move", task, e);
        }}
        xSecondary={task.x1secondary}
        widthSecondary={(task.x2secondary ?? 0) - (task.x1secondary ?? 0)}
        showSecondaryDates={showSecondaryDates}
      />
      <g className="handleGroup">
        {isDateResizable && (
          <g>
            {/* left */}
            <BarDateHandle
              x={task.x1 + 1}
              y={task.y + 1}
              width={task.handleWidth}
              height={handleHeight}
              barCornerRadius={task.barCornerRadius}
              onMouseDown={e => {
                onEventStart("start", task, e);
              }}
            />
            {/* right */}
            <BarDateHandle
              x={task.x2 - task.handleWidth - 1}
              y={task.y + 1}
              width={task.handleWidth}
              height={handleHeight}
              barCornerRadius={task.barCornerRadius}
              onMouseDown={e => {
                onEventStart("end", task, e);
              }}
            />
          </g>
        )}
        {isProgressChangeable && (
          <BarProgressHandle
            progressPoint={progressPoint}
            onMouseDown={e => {
              onEventStart("progress", task, e);
            }}
          />
        )}
      </g>
      {iconElem}
    </g>
  );
};
