import React from "react";
import classes from "./custom-task-list-header.module.scss";
import { TaskListHeaderComponent } from "../../types/adapted-types";

export const CustomTaskListHeaderHOC = (
  label: string,
  name: string,
  filter: string,
  doubleView?: boolean,
  setDoubleView?: (checked: boolean) => void,
  onFilterInput?: (e: React.FormEvent<HTMLInputElement>, name: string) => void
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
          <span className={classes.label}>Previsioni</span>
        </div>
      )}
      <div className={classes.filter}>
        <input
          type="text"
          name="filter"
          size={10}
          maxLength={30}
          title="Filter"
          onKeyUp={e => {
            if (e.key == "Enter") {
              console.log(
                "CUSTOM-TASK-LIST-HEADER onKeyUp filter field for: " + name,
                e
              );
              onFilterInput?.(e, name);
            }
          }}
          defaultValue={filter}
        />
      </div>
    </div>
  );
  return CustomTaskListHeader;
};
