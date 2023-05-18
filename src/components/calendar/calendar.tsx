import React, { ReactElement } from "react";
import {
  CurrentDateIndicator,
  DateTimeFormatters,
  ViewMode,
} from "../../types/public-types";
import { TopPartOfCalendar } from "./top-part-of-calendar";
import { SinglePartOfCalendar } from "./single-part-of-calendar";
import {
  defaultDateTimeFormatters,
  getDaysInMonth,
} from "../../helpers/date-helper";
import { DateSetup } from "../../types/date-setup";
import styles from "./calendar.module.css";

export type CalendarProps = {
  dateSetup: DateSetup;
  locale: string;
  viewMode: ViewMode;
  rtl: boolean;
  headerHeight: number;
  columnWidth: number;
  fontFamily: string;
  fontSize: string;
  dateTimeFormatters?: DateTimeFormatters;
  singleLineHeader: boolean;
  currentDateIndicator?: CurrentDateIndicator;
};

export const Calendar: React.FC<CalendarProps> = ({
  dateSetup,
  locale,
  rtl,
  headerHeight,
  columnWidth,
  fontFamily,
  fontSize,
  dateTimeFormatters,
  singleLineHeader = false,
  currentDateIndicator,
}) => {
  const simplifiedHeader = singleLineHeader && dateSetup.viewMode !== "year";
  const TopCal = simplifiedHeader ? SinglePartOfCalendar : TopPartOfCalendar;

  const formatYear = dateTimeFormatters?.year ?? defaultDateTimeFormatters.year;
  const formatMonth =
    dateTimeFormatters?.month ?? defaultDateTimeFormatters.month;
  const formatMonthAndYear =
    dateTimeFormatters?.monthAndYear ?? defaultDateTimeFormatters.monthAndYear;
  const formatWeek = dateTimeFormatters?.week ?? defaultDateTimeFormatters.week;
  const formatDay = dateTimeFormatters?.day ?? defaultDateTimeFormatters.day;
  /*
  const formatHour = dateTimeFormatters?.hour ?? defaultDateTimeFormatters.hour;
  const formatDayAndMonth =
    dateTimeFormatters?.dayAndMonth ?? defaultDateTimeFormatters.dayAndMonth;
    */
  const getCalendarValuesForYear = () => {
    const topValues: ReactElement[] = [];
    const bottomValues: ReactElement[] = [];
    const topDefaultHeight = headerHeight * 0.5;
    for (let i = 0; i < dateSetup.dates.length; i++) {
      const date = dateSetup.dates[i];
      const bottomValue = formatYear(date, locale);
      bottomValues.push(
        <text
          key={bottomValue}
          y={headerHeight * 0.8}
          x={columnWidth * i + columnWidth * 0.5}
          className={styles.calendarBottomText}
        >
          {bottomValue}
        </text>
      );
      // FIXME DAMIANO it's not visible (it's around x="-705250")... could it be removed?
      if (
        i === 0 ||
        date.getFullYear() !== dateSetup.dates[i - 1].getFullYear()
      ) {
        const topValue = date.getFullYear().toString();
        let xText: number;
        if (rtl) {
          xText = (6 + i + date.getFullYear() + 1) * columnWidth;
        } else {
          xText = (6 + i - date.getFullYear()) * columnWidth;
        }
        topValues.push(
          <TopCal
            key={topValue}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={headerHeight}
            xText={xText}
            yText={topDefaultHeight * 0.9}
          />
        );
      }
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForMonth = () => {
    const topValues: ReactElement[] = [];
    const bottomValues: ReactElement[] = [];
    const topDefaultHeight = headerHeight * 0.5;
    for (let i = 0; i < dateSetup.dates.length; i++) {
      const date = dateSetup.dates[i];
      const bottomValue = formatMonth(date, locale);
      bottomValues.push(
        <text
          key={bottomValue + date.getFullYear()}
          y={headerHeight * 0.8}
          x={columnWidth * i + columnWidth * 0.5}
          className={styles.calendarBottomText}
        >
          {bottomValue}
        </text>
      );
      if (
        i === 0 ||
        date.getFullYear() !== dateSetup.dates[i - 1].getFullYear()
      ) {
        const topValue = formatYear(date, locale);
        let xText: number;
        if (rtl) {
          xText = (6 + i + date.getMonth() + 1) * columnWidth;
        } else {
          xText = (6 + i - date.getMonth()) * columnWidth;
        }
        topValues.push(
          <TopCal
            key={topValue}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={xText}
            yText={topDefaultHeight * 0.9}
          />
        );
      }
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForWeek = () => {
    const topValues: ReactElement[] = [];
    const bottomValues: ReactElement[] = [];
    let weeksCount: number = 1;
    const topDefaultHeight = headerHeight * 0.5;
    const dates = dateSetup.dates;
    for (let i = dates.length - 1; i >= 0; i--) {
      const date = dates[i];
      let topValue = "";
      if (i === 0 || date.getMonth() !== dates[i - 1].getMonth()) {
        // top
        topValue = formatMonthAndYear(date, locale);
      }
      // bottom
      const bottomValue = formatWeek(date, locale);

      bottomValues.push(
        <text
          key={date.getTime()}
          y={headerHeight * 0.8}
          x={columnWidth * (i + +rtl)}
          className={styles.calendarBottomText}
        >
          {bottomValue}
        </text>
      );

      if (topValue) {
        // if last day is new month
        if (i !== dates.length - 1) {
          topValues.push(
            <TopCal
              key={topValue}
              value={topValue}
              x1Line={columnWidth * i + weeksCount * columnWidth}
              y1Line={0}
              y2Line={topDefaultHeight}
              xText={columnWidth * i + columnWidth * weeksCount * 0.5}
              yText={topDefaultHeight * 0.9}
            />
          );
        }
        weeksCount = 0;
      }
      weeksCount++;
    }
    return [topValues, bottomValues];
  };

  const getCalendarValuesForDay = () => {
    const topValues: ReactElement[] = [];
    const bottomValues: ReactElement[] = [];
    const topDefaultHeight = headerHeight * 0.5;
    const dates = dateSetup.dates;
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const bottomValue = formatDay(date, locale);

      bottomValues.push(
        <text
          key={date.getTime()}
          y={headerHeight * 0.8}
          x={columnWidth * i + columnWidth * 0.5}
          className={styles.calendarBottomText}
        >
          {bottomValue}
        </text>
      );
      if (
        i + 1 !== dates.length &&
        date.getMonth() !== dates[i + 1].getMonth()
      ) {
        const topValue = formatMonth(date, locale);

        topValues.push(
          <TopCal
            key={topValue + date.getFullYear()}
            value={topValue}
            x1Line={columnWidth * (i + 1)}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={
              columnWidth * (i + 1) -
              getDaysInMonth(date.getMonth(), date.getFullYear()) *
                columnWidth *
                0.5
            }
            yText={topDefaultHeight * 0.9}
          />
        );
      }
    }
    return [topValues, bottomValues];
  };
  /*
  const getCalendarValuesForPartOfDay = () => {
    const topValues: ReactElement[] = [];
    const bottomValues: ReactElement[] = [];
    // const ticks = viewMode === ViewMode.HalfDay ? 2 : 4;
    const ticks = 4;
    const topDefaultHeight = headerHeight * 0.5;
    const dates = dateSetup.dates;
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const bottomValue = formatHour(date, locale);

      bottomValues.push(
        <text
          key={date.getTime()}
          y={headerHeight * 0.8}
          x={columnWidth * (i + +rtl)}
          className={styles.calendarBottomText}
          fontFamily={fontFamily}
        >
          {bottomValue}
        </text>
      );
      if (i === 0 || date.getDate() !== dates[i - 1].getDate()) {
        const topValue = formatDayAndMonth(date, locale);
        topValues.push(
          <TopCal
            key={date.toISOString()}
            value={topValue}
            x1Line={columnWidth * i + ticks * columnWidth}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={columnWidth * i + ticks * columnWidth * 0.5}
            yText={topDefaultHeight * 0.9}
          />
        );
      }
    }

    return [topValues, bottomValues];
  };

  const getCalendarValuesForHour = () => {
    const topValues: ReactElement[] = [];
    const bottomValues: ReactElement[] = [];
    const topDefaultHeight = headerHeight * 0.5;
    const dates = dateSetup.dates;
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      const bottomValue = formatHour(date, locale);

      bottomValues.push(
        <text
          key={date.getTime()}
          y={headerHeight * 0.8}
          x={columnWidth * (i + +rtl)}
          className={styles.calendarBottomText}
          fontFamily={fontFamily}
        >
          {bottomValue}
        </text>
      );
      if (i !== 0 && date.getDate() !== dates[i - 1].getDate()) {
        const displayDate = dates[i - 1];
        const topValue = formatDayAndMonth(date, locale);
        const topPosition = (date.getHours() - 24) / 2;
        topValues.push(
          <TopCal
            key={topValue + displayDate.getFullYear()}
            value={topValue}
            x1Line={columnWidth * i}
            y1Line={0}
            y2Line={topDefaultHeight}
            xText={columnWidth * (i + topPosition)}
            yText={topDefaultHeight * 0.9}
          />
        );
      }
    }

    return [topValues, bottomValues];
  };
*/
  const getters = {
    year: getCalendarValuesForYear,
    month: getCalendarValuesForMonth,
    week: getCalendarValuesForWeek,
    day: getCalendarValuesForDay,
    /*
    [ViewMode.QuarterDay]: getCalendarValuesForPartOfDay,
    [ViewMode.HalfDay]: getCalendarValuesForPartOfDay,
    [ViewMode.Hour]: getCalendarValuesForHour,
    */
  };
  const [topValues, bottomValues] = getters[dateSetup.viewMode]();

  return (
    <g className="calendar" fontSize={fontSize} fontFamily={fontFamily}>
      <rect
        x={0}
        y={0}
        width={columnWidth * dateSetup.dates.length}
        height={headerHeight}
        className={styles.calendarHeader}
      />
      {simplifiedHeader ? null : bottomValues} {topValues}
      {currentDateIndicator && (
        // current date indicator
        <circle
          fill={currentDateIndicator.color}
          cx={currentDateIndicator.x + 2.5}
          cy={headerHeight - 8}
          r="8"
        />
      )}
    </g>
  );
};
