import { ViewMode } from "../../types/public-types";
import classes from "./switcher.module.scss";
import React, { FC } from "react";

type Props = {
  onTimeUnitChange: (timeUnit: ViewMode) => void;
};

export const Switcher: FC<Props> = ({ onTimeUnitChange }) => {
  const day = () => onTimeUnitChange("day");
  const week = () => onTimeUnitChange("week");
  const month = () => onTimeUnitChange("month");
  const year = () => onTimeUnitChange("year");

  return (
    <div className={classes.switcher}>
      <button type="button" className={classes.button} onClick={day}>
        <span className={classes.label}>Day</span>
      </button>
      <button type="button" className={classes.button} onClick={week}>
        <span className={classes.label}>Week</span>
      </button>
      <button type="button" className={classes.button} onClick={month}>
        <span className={classes.label}>Month</span>
      </button>
      <button type="button" className={classes.button} onClick={year}>
        <span className={classes.label}>Year</span>
      </button>
    </div>
  );
};
