import React, { useState } from "react";
import {
  GanttPlannerDetailsProps,
  GanttPlannerProps,
  GanttRow,
  GanttTask,
  Planner,
  PlannerProps,
} from "@sme.up/gantt-component";
import "@sme.up/gantt-component/dist/index.css";

const AppPlanner = () => {
  const [plannerProps, setPlannerProps] =
    useState<PlannerProps>(plannerPropsMock);
  const [clicked, setClicked] = useState(false);

  const mainGanttClickHandler = (row: GanttRow) => {
    console.log("Main Gantt click event", row);
    if (clicked) {
      setPlannerProps(plannerPropsMock);
    } else {
      setPlannerProps(plannerAfterClickPropsMock);
    }
    setClicked(!clicked);
  };

  const secondaryGanttClickHandler = (row: GanttRow) => {
    console.log("Secondary Gantt click event", row);
  };

  const props: PlannerProps = {
    ...plannerProps,
    mainGantt: {
      ...plannerProps.mainGantt,
      onClick: mainGanttClickHandler,
    },
    secondaryGantt: {
      ...(plannerProps.secondaryGantt as GanttPlannerDetailsProps),
      onClick: secondaryGanttClickHandler,
    },
  };

  return (
    <React.StrictMode>
      <h1>
        Test Planner Component with secondary gantt dates greater than primary
        gantt dates
      </h1>
      <Planner {...props} />
    </React.StrictMode>
  );
};

const mainGanttPlannerPropsMock: GanttPlannerProps = {
  filter: dummyFilter(),
  items: [
    {
      id: "1",
      name: "G456",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      secondaryStartDate: "2021-10-25",
      secondaryEndDate: "2023-03-07",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G456", "#START#", "#END#"],
    },
    {
      id: "2",
      name: "G460",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      secondaryStartDate: "2021-10-20",
      secondaryEndDate: "2022-12-16",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G460", "#START#", "#END#"],
    },
  ],
  stylingOptions: {
    listCellWidth: "297px",
    rowHeight: 40,
    barFill: 90,
    projectProgressColor: "#CBCBCB",
    projectProgressSelectedColor: "#CBCBCB",
    projectBackgroundColor: "#CBCBCB",
    projectBackgroundSelectedColor: "#CBCBCB",
    barProgressColor: "#A2A415",
    barProgressSelectedColor: "#A2A415",
    barBackgroundColor: "#A2A415",
    barBackgroundSelectedColor: "#A2A415",
  },
  hideLabel: true,
  showSecondaryDates: false,
  ganttHeight: 350,
  hideDependencies: true,
  title: "Secondary",
};

const mainGanttItemAfterClick: GanttTask[] = [
  {
    id: "1",
    name: "G456",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    secondaryStartDate: "2021-10-25",
    secondaryEndDate: "2023-03-07",
    type: "project",
    phases: [
      {
        id: "P410           ",
        name: "P410           ",
        startDate: "2023-01-01",
        endDate: "2023-06-01",
        secondaryStartDate: "2022-11-07",
        secondaryEndDate: "2022-11-04",
        color: "#ED7D31",
        selectedColor: "#ED7D31",
        valuesToShow: ["P410", "#START#", "#END#"],
        dependencies: [],
        type: "task",
      },
      {
        id: "P420           ",
        name: "P420           ",
        startDate: "2023-06-02",
        endDate: "2023-12-31",
        secondaryStartDate: "2023-01-13",
        secondaryEndDate: "2022-11-11",
        color: "#FF0000",
        selectedColor: "#FF0000",
        valuesToShow: ["P420", "#START#", "#END#"],
        dependencies: [],
        type: "task",
      },
    ],
    details: [],
    valuesToShow: ["G456", "#START#", "#END#"],
  },
  {
    id: "2",
    name: "G460",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    secondaryStartDate: "2021-10-20",
    secondaryEndDate: "2022-12-16",
    type: "project",
    phases: [],
    details: [],
    valuesToShow: ["G460", "#START#", "#END#"],
  },
];

const secondaryGanttPlannerPropsMock: GanttPlannerDetailsProps = {
  filter: dummyFilter(),
  items: [
    {
      id: "RIS1",
      name: "Risorsa 1",
      schedule: [
        { startDate: "2023-01-01", endDate: "2027-02-01", color: "#ff0000" },
        { startDate: "2023-03-01", endDate: "2027-04-01", color: "#ff0000" },
      ],
      type: "timeline",
      valuesToShow: ["Risorsa 1"],
    },
    {
      id: "RIS2",
      name: "Risorsa 2",
      schedule: [
        { startDate: "2023-01-10", endDate: "2023-02-10", color: "#ff0000" },
        { startDate: "2023-03-10", endDate: "2023-04-10", color: "#ff0000" },
      ],
      type: "timeline",
      valuesToShow: ["Risorsa 2"],
    },
  ],
  stylingOptions: {
    listCellWidth: "297px",
    rowHeight: 40,
    barFill: 90,
    projectProgressColor: "#CBCBCB",
    projectProgressSelectedColor: "#CBCBCB",
    projectBackgroundColor: "#CBCBCB",
    projectBackgroundSelectedColor: "#CBCBCB",
    barProgressColor: "#A2A415",
    barProgressSelectedColor: "#A2A415",
    barBackgroundColor: "#A2A415",
    barBackgroundSelectedColor: "#A2A415",
  },
  hideLabel: true,
  ganttHeight: 200,
  hideDependencies: true,
  title: "Detail",
};

const plannerPropsMock: PlannerProps = {
  mainGantt: mainGanttPlannerPropsMock,
  secondaryGantt: secondaryGanttPlannerPropsMock,
  viewMode: "month",
};

const plannerAfterClickPropsMock: PlannerProps = {
  mainGantt: {
    ...mainGanttPlannerPropsMock,
    items: mainGanttItemAfterClick,
  },
  secondaryGantt: secondaryGanttPlannerPropsMock,
  viewMode: "month",
};

function dummyFilter() {
  const filter = document.createElement("div");
  filter.innerText = "Filter placeholder";
  return filter;
}

export default AppPlanner;
