import classes from "./switcher.module.scss";
import React, { FC } from "react";
import { TimeUnit } from "../../types/time-unit";

type Props = {
  onTimeUnitChange: (timeUnit: TimeUnit) => void;
};

export const Switcher: FC<Props> = ({ onTimeUnitChange }) => {
  const day = () => onTimeUnitChange(TimeUnit.DAY);
  const week = () => onTimeUnitChange(TimeUnit.WEEK);
  const month = () => onTimeUnitChange(TimeUnit.MONTH);
  const year = () => onTimeUnitChange(TimeUnit.YEAR);

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
