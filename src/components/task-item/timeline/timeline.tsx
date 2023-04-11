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
      {task.barChildren.map(bar => {
        let iconElem = undefined;
        if (bar.iconUrl) {
          console.log("timeline.tsx bar.iconUrl", bar.iconUrl);
          // let svg: string = `url('${bar.iconUrl}') no-repeat center`;
          // const iconStyle: {
          //   [key: string]: string;
          // } = {
          //   mask: svg,
          //   WebkitMask: svg,
          // };
          // iconElem = <span key={bar.id + ".icon"} style={iconStyle}></span>;
        }
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
            {iconElem}
          </React.Fragment>
        );
      })}
    </g>
  );
};
