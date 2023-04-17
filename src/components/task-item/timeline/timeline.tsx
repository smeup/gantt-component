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
            {bar.icon && bar.icon.url && (
              <TaskIcon
                color={bar.icon.color}
                url={bar.icon.url as string}
                width={bar.height + "px"}
                height={bar.height + "px"}
                x={bar.x1 + (bar.x2 - bar.x1) - bar.height / 2}
                y={bar.y - bar.height / 2 / 2}
              ></TaskIcon>
            )}
          </React.Fragment>
        );
      })}
    </g>
  );
};
