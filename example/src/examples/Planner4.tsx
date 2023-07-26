import React, { useState } from "react";
import {
  GanttPlannerProps,
  Planner,
  PlannerProps,
} from "@sme.up/gantt-component";
import "@sme.up/gantt-component/dist/index.css";

const AppPlanner = () => {
  const [props, setProps] = useState<PlannerProps>(plannerPropsMock);
  const [clicked, setClicked] = useState<boolean>(false);

  const onclick = () => {
    if (clicked) {
      const newProps = { ...plannerPropsMock };
      newProps.mainGantt.initialScrollY = -1;
      setProps(newProps);
    } else {
      const newProps = { ...plannerPropsMock };
      newProps.mainGantt.initialScrollY = 200;
      setProps(newProps);
    }
    setClicked(!clicked);
  };

  const onScrollX = (value: number) => {
    console.log("SCROLL X", value);
  }

  const plannerProps: PlannerProps = {
    ...props,
    mainGantt: {
      ...props.mainGantt,
    },
    onScrollX: onScrollX
  };

  console.log("PROPS EXAMPLE", props.mainGantt.initialScrollY);

  return (
    <React.StrictMode>
      <h1>
        Test Planner Component with initial scroll x and y (click on task with
        icon)
      </h1>
      <Planner {...plannerProps} />
      <button onClick={onclick}>Click to change scroll Y</button>
    </React.StrictMode>
  );
};

const onScrollY = (value: number) => {
  console.log("SCROLL Y", value);
}

const mainGanttPlannerPropsMock: GanttPlannerProps = {
  filter: dummyFilter(),
  items: [
    {
      id: "1",
      name: "G459",
      startDate: "2023-01-01",
      endDate: "2023-01-28",
      secondaryStartDate: "2021-10-25",
      secondaryEndDate: "2023-03-07",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G459", "#START#", "#END#"],
    },
    {
      id: "2",
      name: "G460",
      startDate: "2023-02-01",
      endDate: "2023-02-28",
      secondaryStartDate: "2021-10-20",
      secondaryEndDate: "2022-12-16",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G460", "#START#", "#END#"],
    },
    {
      id: "3",
      name: "G461",
      startDate: "2023-03-01",
      endDate: "2023-03-28",
      secondaryStartDate: "2021-10-20",
      secondaryEndDate: "2022-12-16",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G461", "#START#", "#END#"],
    },
    {
      id: "4",
      name: "G462",
      startDate: "2023-04-01",
      endDate: "2023-04-28",
      secondaryStartDate: "2021-10-20",
      secondaryEndDate: "2022-12-16",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G462", "#START#", "#END#"],
    },
    {
      id: "5",
      name: "G463",
      startDate: "2023-05-01",
      endDate: "2023-05-28",
      secondaryStartDate: "2021-10-20",
      secondaryEndDate: "2022-12-16",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G463", "#START#", "#END#"],
    },
    {
      id: "6",
      name: "G464",
      startDate: "2023-06-01",
      endDate: "2023-06-28",
      secondaryStartDate: "2021-10-20",
      secondaryEndDate: "2022-12-16",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G464", "#START#", "#END#"],
    },
    {
      id: "7",
      name: "G465",
      startDate: "2023-07-01",
      endDate: "2023-07-28",
      secondaryStartDate: "2021-10-20",
      secondaryEndDate: "2022-12-16",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G465", "#START#", "#END#"],
    },
    {
      id: "8",
      name: "G466",
      startDate: "2023-08-01",
      endDate: "2023-08-28",
      secondaryStartDate: "2021-10-20",
      secondaryEndDate: "2022-12-16",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G466", "#START#", "#END#"],
    },
    {
      id: "9",
      name: "G467",
      startDate: "2023-09-01",
      endDate: "2023-09-28",
      secondaryStartDate: "2021-10-20",
      secondaryEndDate: "2022-12-16",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G467", "#START#", "#END#"],
    },
    {
      id: "10",
      name: "G468",
      startDate: "2023-10-01",
      endDate: "2023-10-28",
      secondaryStartDate: "2021-11-25",
      secondaryEndDate: "2023-04-07",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G468", "#START#", "#END#"],
    },
    {
      id: "11",
      name: "G469",
      startDate: "2023-11-01",
      endDate: "2023-11-28",
      secondaryStartDate: "2021-10-25",
      secondaryEndDate: "2023-03-07",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G469", "#START#", "#END#"],
    },
    {
      id: "12",
      name: "G470",
      startDate: "2023-12-01",
      endDate: "2023-12-28",
      secondaryStartDate: "2021-10-20",
      secondaryEndDate: "2022-12-16",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G470", "#START#", "#END#"],
    },
    {
      id: "13",
      name: "G471",
      startDate: "2024-01-01",
      endDate: "2024-01-28",
      secondaryStartDate: "2021-10-20",
      secondaryEndDate: "2022-12-16",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G471", "#START#", "#END#"],
    },
    {
      id: "14",
      name: "G472",
      startDate: "2024-02-01",
      endDate: "2024-02-28",
      secondaryStartDate: "2021-10-20",
      secondaryEndDate: "2022-12-16",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G472", "#START#", "#END#"],
    },
    {
      id: "15",
      name: "G473",
      startDate: "2024-03-01",
      endDate: "2024-03-28",
      secondaryStartDate: "2021-10-20",
      secondaryEndDate: "2022-12-16",
      type: "project",
      phases: [],
      details: [],
      icon: {
        color: "#FF0000",
        url: "http://localhost:3000/assets/svg/alert-circle.svg",
      },
      valuesToShow: ["G473", "#START#", "#END#"],
    },
    {
      id: "16",
      name: "G442",
      startDate: "2025-02-01",
      endDate: "2025-02-28",
      secondaryStartDate: "2021-10-20",
      secondaryEndDate: "2022-12-16",
      type: "project",
      phases: [],
      details: [],
      valuesToShow: ["G472", "#START#", "#END#"],
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
  title: "Main Gantt",
  initialScrollX: -1,
  initialScrollY: 100,
  onScrollY: onScrollY
};

const plannerPropsMock: PlannerProps = {
  mainGantt: mainGanttPlannerPropsMock,
  viewMode: "month",
};

function dummyFilter() {
  const filter = document.createElement("div");
  filter.innerText = "Filter placeholder";
  return filter;
}

export default AppPlanner;
