import React from "react";
import { TaskListHeaderComponent } from "../../types/adapted-types";

/**
 * Custom header for timeline Gantt
 * @param label
 * @param doubleView
 * @param setDoubleView
 * @returns
 */
export const GanttTimelineCustomTaskList = (
  label: string
): TaskListHeaderComponent => {
  const CustomTaskListHeader: TaskListHeaderComponent = ({
    headerHeight,
    fontFamily,
    fontSize,
  }) => (
    <div
      style={{
        display: "flex",
        placeItems: "center",
        textAlign: "center",
        fontFamily,
        fontSize,
        height: headerHeight,
        justifyContent: "space-around",
      }}
    >
      <div>
        <span style={{ flex: 1, fontWeight: "bold" }}>{label}</span>
      </div>
    </div>
  );
  return CustomTaskListHeader;
};
