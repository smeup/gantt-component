import { Task } from "../../dist/types/public-types";

export function initTasks() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const tasks: Task[] = [
    {
      start: new Date(year, month - 1, 20),
      end: new Date(year, month - 1, 35),
      secondaryStart: new Date(year, month - 1, 15),
      secondaryEnd: new Date(year, month - 1, 29),
      name: "Project One",
      id: "ProjectSample1",
      progress: 25,
      type: "project",
      displayOrder: 0.1,
      hideChildren: false,
      valuesToShow: ["Project One", "#START#", "#END#"],
      styles: {
        backgroundColor: "#888888",
        backgroundSelectedColor: "#bbbbbb",
        progressColor: "#888888",
        progressSelectedColor: "#bbbbbb",
      },
    },
    {
      start: new Date(year, month, 10),
      end: new Date(year, month, 20),
      secondaryStart: new Date(year, month, 10),
      secondaryEnd: new Date(year, month, 20),
      name: "Project Two",
      id: "ProjectSample2",
      progress: 25,
      type: "project",
      displayOrder: 0.2,
      hideChildren: false,
      valuesToShow: ["Project Two", "#START#", "#END#"],
      styles: {
        backgroundColor: "#888888",
        backgroundSelectedColor: "#bbbbbb",
        progressColor: "#888888",
        progressSelectedColor: "#bbbbbb",
      },
    },
    {
      start: new Date(year, month, 1),
      end: new Date(year, month, 15),
      secondaryStart: new Date(year, month, 1),
      secondaryEnd: new Date(year, month, 14),
      name: "Some Project",
      id: "ProjectSample",
      progress: 25,
      type: "project",
      hideChildren: false,
      displayOrder: 1,
      valuesToShow: ["Some Project", "#START#", "#END#"],
      styles: {
        backgroundColor: "#888888",
        backgroundSelectedColor: "#bbbbbb",
        progressColor: "#888888",
        progressSelectedColor: "#bbbbbb",
      },
    },
    {
      start: new Date(year, month, 1),
      end: new Date(year, month, 2, 12, 28),
      secondaryStart: new Date(year, month, 2),
      secondaryEnd: new Date(year, month, 7),
      name: "Idea",
      id: "Task 0",
      progress: 45,
      type: "task",
      project: "ProjectSample",
      displayOrder: 2,
      valuesToShow: ["Idea", "#START#", "#END#"],
    },
    {
      start: new Date(year, month, 2),
      end: new Date(year, month, 4),
      secondaryStart: new Date(year, month, 1),
      secondaryEnd: new Date(year, month, 3),
      name: "Research",
      id: "Task 1",
      progress: 25,
      dependencies: ["Task 0"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 3,
      valuesToShow: ["Research", "#START#", "#END#"],
      styles: {
        backgroundColor: "#00aa00",
        backgroundSelectedColor: "#02aa44",
        progressColor: "#00aa00",
        progressSelectedColor: "#02aa44",
      },
    },
    {
      start: new Date(year, month, 4),
      end: new Date(year, month, 8),
      secondaryStart: new Date(year, month, 6),
      secondaryEnd: new Date(year, month, 8),
      name: "Discussion with team",
      id: "Task 2",
      progress: 10,
      dependencies: ["Task 1"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 4,
      valuesToShow: ["Disccussion with team", "#START#", "#END#"],
      styles: {
        backgroundColor: "#ff0000",
        backgroundSelectedColor: "#ff2222",
        progressColor: "#ff0000",
        progressSelectedColor: "#ff2222",
      },
    },
    {
      start: new Date(year, month, 8),
      end: new Date(year, month, 9),
      secondaryStart: new Date(year, month, 5),
      secondaryEnd: new Date(year, month, 10),
      name: "Developing",
      id: "Task 3",
      progress: 2,
      dependencies: ["Task 2"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 5,
      valuesToShow: ["Developing", "#START#", "#END#"],
      styles: {
        backgroundColor: "#861a08",
        backgroundSelectedColor: "#b3240b",
        progressColor: "#861a08",
        progressSelectedColor: "#b3240b",
      },
    },
    {
      start: new Date(year, month, 8),
      end: new Date(year, month, 10),
      secondaryStart: new Date(year, month, 5),
      secondaryEnd: new Date(year, month, 10),
      name: "Review",
      id: "Task 4",
      type: "task",
      progress: 70,
      dependencies: ["Task 2"],
      project: "ProjectSample",
      displayOrder: 6,
      valuesToShow: ["Review", "#START#", "#END#"],
    },
    {
      start: new Date(year, month, 1),
      end: new Date(year, month, 31),
      name: "Mario Rossi",
      id: "Mario Rossi",
      progress: month,
      type: "timeline",
      project: "ProjectSample",
      displayOrder: 7,
      valuesToShow: ["Mario Rossi", "#START#", "#END#"],
      styles: {
        backgroundColor: "#D9D9D8",
        backgroundSelectedColor: "#ffda3a",
        progressColor: "#D9D9D8",
        progressSelectedColor: "#ffda3a",
      },
      timeline: [
        {
          start: new Date(year, month, 1),
          end: new Date(year, month, 5),
          backgroundColor: "#595959",
        },
        {
          start: new Date(year, month, 5),
          end: new Date(year, month, 8),
          backgroundColor: "#8DB3E2",
        },
        {
          start: new Date(year, month, 8),
          end: new Date(year, month, 15),
          backgroundColor: "#595959",
        },
      ],
    },
    {
      start: new Date(year, month, 1),
      end: new Date(year, month, 31),
      name: "Luigi Bianchi",
      id: "Luigi Bianchi",
      progress: month,
      type: "timeline",
      project: "ProjectSample",
      displayOrder: 8,
      valuesToShow: ["Luigi Bianchi", "#START#", "#END#"],
      styles: {
        backgroundColor: "#D9D9D8",
        backgroundSelectedColor: "#ffda3a",
        progressColor: "#D9D9D8",
        progressSelectedColor: "#ffda3a",
      },
      timeline: [
        {
          start: new Date(year, month, 5),
          end: new Date(year, month, 8),
          backgroundColor: "#8DB3E2",
        },
        {
          start: new Date(year, month, 8),
          end: new Date(year, month, 30),
          backgroundColor: "#595959",
        },
      ],
    },
    {
      start: new Date(year, month, 1),
      end: new Date(year, month, 31),
      name: "Italo Verdi",
      id: "Italo Verdi",
      progress: month,
      type: "timeline",
      project: "ProjectSample",
      displayOrder: 9,
      valuesToShow: ["Italo Verdi", "#START#", "#END#"],
      styles: {
        backgroundColor: "#D9D9D8",
        backgroundSelectedColor: "#ffda3a",
        progressColor: "#D9D9D8",
        progressSelectedColor: "#ffda3a",
      },
      timeline: [
        {
          start: new Date(year, month, 5),
          end: new Date(year, month, 8),
          backgroundColor: "#DDE8F6",
        },
        {
          start: new Date(year, month, 12),
          end: new Date(year, month, 31),
          backgroundColor: "#595959",
        },
      ],
    },
  ];
  return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter(t => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
