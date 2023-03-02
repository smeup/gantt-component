import React from "react";
import styles from "./gantt-table.module.scss";
import { TaskListHeaderComponent } from "../../types/adapted-types";
export const CustomTaskListHeaderHOC = (
  label: string,
  doubleView: boolean,
  setDoubleView: any,
): TaskListHeaderComponent => {
  // noinspection UnnecessaryLocalVariableJS
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
      <div>
        <label htmlFor="ch2" className={styles.switch}>
          <input
            id="ch2"
            type="checkbox"
            defaultChecked={doubleView}
            onClick={() => setDoubleView(!doubleView)}
          />
          <span className={styles.slider}></span>
        </label>
        <span className={styles.switchLabel}>Mostra previsioni</span>
      </div>
    </div>
  );
  return CustomTaskListHeader;
};
