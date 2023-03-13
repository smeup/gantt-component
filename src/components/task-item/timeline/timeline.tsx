import React, { FC } from "react";
import { TaskItemProps } from "../task-item";

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
      {task.barChildren.map(bar => (
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
      ))}
    </g>
  );
};
