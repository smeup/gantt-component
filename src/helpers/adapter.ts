import { TimeUnit } from "../types/time-unit";
import {
  Detail,
  Phase,
  GanttTask,
  GanttRow,
  ScheduleItem,
} from "../types/domain";
import {
  formatToIsoDate,
  formatToLocaleSimple,
  validDates,
  parseToDayStart,
  parseToDayEnd,
} from "./time-converters";
import { Task, Timeframe, ViewMode } from "../types/public-types";

export const DAY_MILLIS = 24 * 60 * 60 * 1000;

export const MAIN_GANTT_ID = "main";
export const SECONDARY_GANTT_ID = "secondary";

export const toViewMode = (timeUnit: TimeUnit): ViewMode => {
  switch (timeUnit) {
    case TimeUnit.DAY:
      return ViewMode.Day;
    case TimeUnit.WEEK:
      return ViewMode.Week;
    case TimeUnit.MONTH:
      return ViewMode.Month;
    case TimeUnit.YEAR:
      return ViewMode.Year;
  }
};

export const convertPhaseToTask = (item: Phase): Task => {
  const mapPhase = ({
    startDate: phaseStart,
    endDate: phaseEnd,
    secondaryStartDate,
    secondaryEndDate,
    name: phaseName,
    id: phaseId,
    color,
    selectedColor,
    dependencies,
    iconUrl,
  }: Phase): Task => {
    const { start, end } = validDates(phaseStart, phaseEnd, phaseName);
    const { start: phaseStart2, end: phaseEnd2 } = validDates(
      secondaryStartDate,
      secondaryEndDate,
      phaseName
    );
    return {
      start,
      end,
      secondaryStart: phaseStart2,
      secondaryEnd: phaseEnd2,
      name: phaseName,
      valuesToShow: item.valuesToShow,
      id: phaseId,
      type: "task",
      progress: 100,
      dependencies,
      /**
       * Colori custom per specifico task - ci serve per distinguere le fasi
       */
      styles: color
        ? {
            backgroundColor: color,
            progressColor: color,
            backgroundSelectedColor: selectedColor,
            progressSelectedColor: selectedColor,
          }
        : {},
      iconUrl: iconUrl ?? undefined,
    };
  };

  return mapPhase(item);
};

const convertDetailToTimeline = (
  item: Detail,
  mainGanttStartDate?: string,
  mainGanttEndDate?: string
): Task => {
  const { id, name, schedule } = item;

  const getDatesForTask = (item: Detail): { start: Date; end: Date } => {
    let start = mainGanttStartDate ?? "";
    let end = mainGanttEndDate ?? "";

    for (let i = 0; i < item.schedule.length; i++) {
      const lstart = item.schedule[i].startDate;
      const lend = item.schedule[i].endDate;
      if (!start || lstart.localeCompare(start) < 0) {
        start = lstart;
      }
      if (!end || lend.localeCompare(end) > 0) {
        end = lend;
      }
    }

    return validDates(start, end, "detail item");
  };

  const { start, end } = getDatesForTask(item);

  const convertToFrame = (x: ScheduleItem): Timeframe => {
    const { startDate, endDate, color, selectedColor, iconUrl } = x;
    const { start, end } = validDates(startDate, endDate, "time frame");
    return {
      start,
      end,
      backgroundColor: color ?? "0xffffff",
      backgroundSelectedColor: selectedColor ?? color,
      iconUrl: iconUrl ?? undefined,
    };
  };

  const defaultColor = "#595959";
  return {
    id,
    type: "timeline",
    timeline: schedule.map(convertToFrame),
    name,
    valuesToShow: item.valuesToShow,
    start: start,
    end: end,
    progress: 100,
    styles: {
      backgroundColor: defaultColor,
      progressColor: defaultColor,
      backgroundSelectedColor: defaultColor,
      progressSelectedColor: defaultColor,
    },
  };
};

export const isDetail = (row: GanttTask | Detail): row is Detail => {
  return (
    row && (row as Detail).schedule && (row as Detail).schedule.length !== 0
  );
};

export const convertProjectToTasks = (
  item: GanttTask | Detail,
  mainGanttStartDate?: string,
  mainGanttEndDate?: string
): Task[] => {
  if (!isDetail(item)) {
    const row: GanttTask = item as GanttTask;
    const { start, end } = validDates(row.startDate, row.endDate, row.name);
    const { start: start2, end: end2 } = validDates(
      row.secondaryStartDate,
      row.secondaryEndDate,
      row.name
    );
    const mainTask: Task = {
      /**
       * La libreria lo intende come le ore 00:00, che non è coerente
       *  con come vorremmo ragionare noi. Es.: se un task finisce il 9 luglio,
       *  la libreria colora le celle fino all'8 luglio compreso, ma non il 9;
       *  noi invece vorremmo colorare anche il 9.
       * Possibili workaround: gestirsi ovunque il giorno di differenza (😱);
       *  impostare le conversioni dell'intervallo di fine come orario 23:59.
       * In ogni caso va a cozzare con il calcolo delle durate
       *  (es.: dall'1 al 5 luglio => risulta 4 giorni ma dovrebbe
       *  essere 5 perché includiamo gli estremi; se sommiamo 23:59 ore
       *  risulta ancora 4 per la libreria, e 4.99.. se calcolato a mano, e
       *  ci vuole un Math.round come minimo)
       */
      start: start,
      end: end,
      id: row.id,
      name: row.name,
      type: row.type,
      valuesToShow: row.valuesToShow,
      secondaryStart: start2,
      secondaryEnd: end2,
      progress: 100,
      /** Non disabilita clic nè select, ma solo il resize/move */
      isDisabled: false,
      hideChildren: false,
      iconUrl: row.iconUrl,
    };
    const children1 = (row.phases ?? []).map(convertPhaseToTask);
    return [mainTask, ...children1];
  } else {
    const row: Detail = item as Detail;
    return [
      { ...convertDetailToTimeline(row, mainGanttStartDate, mainGanttEndDate) },
    ];
  }
};

export const mergeTaskIntoProjects = (
  projects: GanttTask[],
  { id, start, end }: Task
): GanttTask[] =>
  projects.map(project =>
    project.id === id ? withNewDates(project, start, end) : project
  );

export const mergeTaskIntoPhases = (
  phases: Phase[] | undefined,
  { id, start, end }: Task
): Phase[] | undefined => {
  if (phases) {
    return phases.map(phase =>
      phase.id === id ? withNewDates(phase, start, end) : phase
    );
  }
  return undefined;
};

/** Return a shallow copy, with the dates updated */
const withNewDates = <P extends Phase | GanttTask>(
  p: P,
  start: Date,
  end: Date
): P => {
  const startDate = formatToIsoDate(start);
  const endDate = formatToIsoDate(end);
  const extra = { startDate, endDate };
  return { ...p, ...extra };
};

export const getProjectById = (
  id: string,
  items: GanttTask[] | Detail[]
): GanttTask | Detail | undefined => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return items[i];
    }
  }
  return undefined;
};

export const getPhaseById = (
  id: string,
  items: GanttTask[] | Detail[]
): Phase | undefined => {
  for (let i = 0; i < items.length; i++) {
    if (isDetail(items[i])) {
      continue;
    }
    const item = items[i] as GanttTask;
    if (!item.phases) {
      continue;
    }
    for (let j = 0; j < item.phases.length; j++)
      if (item.phases[j].id === id) {
        return item.phases[j];
      }
  }
  return undefined;
};

export const filterItems = (
  items: GanttRow[] | undefined,
  filter: string
): GanttRow[] | undefined => {
  if (!filter || !items) {
    return items;
  }
  const ris: GanttRow[] = [];
  items.forEach(element => {
    if (element.valuesToShow) {
      for (let i = 0; i < element.valuesToShow.length; i++) {
        let value = element.valuesToShow[i];
        value =
          value === "#START#"
            ? formatToLocaleSimple(
                parseToDayStart((element as GanttTask).startDate)
              )
            : value === "#END#"
            ? formatToLocaleSimple(
                parseToDayEnd((element as GanttTask).endDate)
              )
            : value;
        if (value.toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
          ris.push(element);
          break;
        }
      }
    }
  });
  return ris;
};
