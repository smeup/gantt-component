// Probably dead code not used

const cachedFormats = {};

const getOrBuildCachedFormat = (locale: string, options: any) => {
  const key = locale + "#" + JSON.stringify(options);
  const fmt = cachedFormats[key] ?? new Intl.DateTimeFormat(locale, options);
  return (cachedFormats[key] = fmt);
};

const format = (date: Date, locale: string, options: object) => {
  try {
    const format1 = getOrBuildCachedFormat(locale, options).format(date);
    return format1;
  } catch (e) {
    console.log("Format", date, locale, options);
    console.log(e);
  }
};

/** E.g. Monday 3 december 2023 => M 3, lunedì 3 dicembre 2023 => L 3 */
const dayFormatter = (date: Date, locale: string) => {
  const dayName = format(date, locale, { weekday: "narrow" })?.toUpperCase();
  const dayNumber = format(date, locale, { day: "numeric" });
  return `${dayName} ${dayNumber}`;
};

const monthFormatter = (date: Date, locale: string) => {
  return format(date, locale, { month: "short" });
};

export const ganttDateTimeFormatters = {
  day: dayFormatter,
  month: monthFormatter,
};
