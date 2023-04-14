import React, { FC } from "react";
import { TaskItemProps } from "../task-item";
import { TaskIcon } from "../task-icon";

export const Timeline: FC<TaskItemProps> = ({
  task,
  isSelected,
  onEventStart,
}) => {
  const { styles } = task;
  const col = isSelected
    ? styles.backgroundSelectedColor
    : styles.backgroundColor;

  console.log("task icon timeline", task.icon);

  return (
    <g tabIndex={0} onMouseDown={e => onEventStart("move", task, e)}>
      <rect
        fill={col}
        x="0"
        width="100%"
        y={task.y}
        height={task.height}
        rx={0}
        ry={0}
      />
      {task.barChildren.map(bar => {
        return (
          <React.Fragment key={bar.id + ".rf"}>
            <rect
              style={{ cursor: "pointer" }}
              key={bar.id}
              fill={bar.styles.backgroundColor}
              x={bar.x1}
              width={bar.x2 - bar.x1}
              y={bar.y}
              height={bar.height}
              rx={bar.barCornerRadius}
              ry={bar.barCornerRadius}
            />
            {task.icon && (
              <TaskIcon
                color={task.icon.color}
                url={task.icon.url as string}
                width={bar.height + "px"}
                height={bar.height + "px"}
                x={bar.x1 + (bar.x2 - bar.x1) - bar.height}
                y={bar.y / 2}
              ></TaskIcon>
            )}
          </React.Fragment>
        );
      })}
    </g>
  );
};
