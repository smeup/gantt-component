import React from "react";
import styles from "./calendar.module.css";

type SinglePartOfCalendarProps = {
  value: string;
  x1Line: number;
  y1Line: number;
  y2Line: number;
  xText: number;
  yText: number;
};

export const SinglePartOfCalendar: React.FC<SinglePartOfCalendarProps> = ({
  value,
  x1Line,
  y2Line,
  xText,
  yText,
}) =>
  (
    <g className="calendarTop">
      <line
        x1={x1Line}
        y1={y2Line * 2}
        x2={x1Line}
        y2={y2Line}
        className={styles.calendarTopTick}
        key={value + 'line'}
      />
      <text
        key={value + 'text'}
        y={yText}
        x={xText}
        className={styles.calendarTopText}
      >
        {value}
      </text>
    </g>
  );
