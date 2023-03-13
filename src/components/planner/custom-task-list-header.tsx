import React from "react";
import classes from "./custom-task-list-header.module.scss";
import { TaskListHeaderComponent } from "../../types/adapted-types";

export const CustomTaskListHeaderHOC = (
  label: string,
  doubleView?: boolean,
  setDoubleView?: (checked: boolean) => void
): TaskListHeaderComponent => {
  const CustomTaskListHeader: TaskListHeaderComponent = ({
    headerHeight,
    fontFamily,
    fontSize,
  }) => (
    <div
      style={{
        fontFamily,
        fontSize,
        height: headerHeight,
      }}
      className={classes.wrapper}
    >
      <div className={classes.title}>
        <span>{label}</span>
      </div>
      {setDoubleView && (
        <div className={classes.toggler}>
          <label htmlFor="ch2" className={classes.switch}>
            <input
              className={classes.input}
              id="ch2"
              type="checkbox"
              defaultChecked={doubleView}
              onClick={() => {
                setDoubleView(!doubleView);
              }}
            />
            <span className={classes.slider}></span>
          </label>
          <span className={classes.label}>Mostra previsioni</span>
        </div>
      )}
    </div>
  );
  return CustomTaskListHeader;
};
