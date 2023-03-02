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
    <div className="switcher">
      <button onClick={day}>Day</button>
      <button onClick={week}>Week</button>
      <button onClick={month}>Month</button>
      <button onClick={year}>Year</button>
    </div>
  );
};
