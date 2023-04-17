import { hexToCSSFilter } from "hex-to-css-filter";
import React from "react";

interface TaskIconProps {
  color: string;
  url: string;
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
}

/**
 * Return an icon incapsulated into <image> svg tag
 * @param param0
 * @returns
 */
export const TaskIcon: React.FC<TaskIconProps> = ({
  color = "#000000",
  url,
  height,
  width,
  x,
  y,
}) => {
  const cssFilter = hexToCSSFilter(color);
  return (
    <image
      href={url}
      filter={cssFilter.filter.replace(";", "")}
      x={x}
      y={y}
      width={width}
      height={height}
    ></image>
  );
};
