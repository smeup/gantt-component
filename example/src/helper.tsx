import { Task } from "../../dist/types/public-types";

export function initTasks() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const tasks: Task[] = [
    {
      start: new Date(year, month-1, 20),
      end: new Date(year, month-1, 35),
      secondaryStart: new Date(year, month-1, 15),
      secondaryEnd: new Date(year, month-1, 29),
      name: "Project One",
      id: "ProjectSample1",
      progress: 25,
      type: "project",
      displayOrder: 0.1,
      hideChildren: false,
      styles: {
        backgroundColor: '#888888',
        backgroundSelectedColor: '#bbbbbb',
        progressColor: '#888888',
        progressSelectedColor: '#bbbbbb',
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
      styles: {
        backgroundColor: '#888888',
        backgroundSelectedColor: '#bbbbbb',
        progressColor: '#888888',
        progressSelectedColor: '#bbbbbb',
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
      styles: {
        backgroundColor: '#888888',
        backgroundSelectedColor: '#bbbbbb',
        progressColor: '#888888',
        progressSelectedColor: '#bbbbbb',
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
      styles: {
        backgroundColor: '#00aa00',
        backgroundSelectedColor: '#02aa44',
        progressColor: '#00aa00',
        progressSelectedColor: '#02aa44',
      },
    },
    {
      start: new Date(year, month, 4),
      end: new Date(year, month, 8 ),
      secondaryStart: new Date(year, month, 6),
      secondaryEnd: new Date(year, month, 8),
      name: "Discussion with team",
      id: "Task 2",
      progress: 10,
      dependencies: ["Task 1"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 4,
      styles: {
        backgroundColor: '#ff0000',
        backgroundSelectedColor: '#ff2222',
        progressColor: '#ff0000',
        progressSelectedColor: '#ff2222',
      },
    },
    {
      start: new Date(year, month, 8),
      end: new Date(year, month, 9, ),
      secondaryStart: new Date(year, month, 5),
      secondaryEnd: new Date(year, month, 10),
      name: "Developing",
      id: "Task 3",
      progress: 2,
      dependencies: ["Task 2"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 5,
      styles: {
        backgroundColor: '#861a08',
        backgroundSelectedColor: '#b3240b',
        progressColor: '#861a08',
        progressSelectedColor: '#b3240b',
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
    },
    {
      start: new Date(year, month, 15),
      end: new Date(year, month, 15),
      name: "Release",
      id: "Task 6",
      progress: month,
      type: "milestone",
      dependencies: ["Task 4"],
      project: "ProjectSample",
      displayOrder: 7,
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
