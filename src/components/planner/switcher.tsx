import React, { FC } from "react";
import { TimeUnit } from "../../types/time-unit";
import styles from "./gantt-table.module.scss";

type Props = {
  onTimeUnitChange: (timeUnit: TimeUnit) => void;
};
export const Switcher: FC<Props> = ({ onTimeUnitChange }) => {
  const day = () => onTimeUnitChange(TimeUnit.DAY);
  const week = () => onTimeUnitChange(TimeUnit.WEEK);
  const month = () => onTimeUnitChange(TimeUnit.MONTH);
  const year = () => onTimeUnitChange(TimeUnit.YEAR);
  return (
    <div className={styles.switcher}>
      <div className={styles.f_button}>
        <button type="button" className={styles.button} onClick={day}>
          <span className={styles.buttonLabel}>Day</span>
        </button>
      </div>
      <div className={styles.f_button}>
        <button type="button" className={styles.button} onClick={week}>
          <span className={styles.buttonLabel}>Week</span>
        </button>
      </div>
      <div className={styles.f_button}>
        <button type="button" className={styles.button} onClick={month}>
          <span className={styles.buttonLabel}>Month</span>
        </button>
      </div>
      <div className={styles.f_button}>
        <button type="button" className={styles.button} onClick={year}>
          <span className={styles.buttonLabel}>Year</span>
        </button>
      </div>
    </div>
  );
};
