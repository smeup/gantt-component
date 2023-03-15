import { DateTime } from "luxon";

export const parseToDate = (ymd: string) => DateTime.fromISO(ymd).toJSDate();

export const parseToDayStart = (ymd: string) =>
  DateTime.fromISO(ymd).toJSDate();

export const parseToDayEnd = (endDate: string) =>
  DateTime.fromISO(endDate)
    .plus({ seconds: 86400 - 1 })
    .toJSDate();

export const formatToIsoDate = (date: Date) =>
  DateTime.fromJSDate(date).toISODate();

export const formatToLocaleSimple = (date: Date) =>
  DateTime.fromJSDate(date).toFormat("dd/MM/yyyy");

export const formatToLocaleDate = (date: Date, locale: string = "it-IT") =>
  DateTime.fromJSDate(date).setLocale(locale).toLocaleString();

export function validDates(startDate: string, endDate: string, _name: string) {
  let start = parseToDayStart(startDate);
  const end = parseToDayEnd(endDate);
  if (start?.getTime() > end?.getTime()) {
    start = parseToDayStart(endDate);
  }
  return { start, end };
}
