import React from "react";
import { Gantt, Task, ViewMode } from "@sme.up/gantt-component";
import { ViewSwitcher } from "./components/view-switcher";
import { getStartEndDateForProject, initTasks } from "./helper";
import "@sme.up/gantt-component/dist/index.css";

const App = () => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = React.useState<Task[]>(initTasks());
  const [doubleView, setDoubleView] = React.useState(true);
  const [showArrows, setShowArrows] = React.useState(false);

  const [isChecked, setIsChecked] = React.useState(true);
  let columnWidth = 20;
  if (view === ViewMode.Year) {
    columnWidth = 250;
  } else if (view === ViewMode.Month) {
    columnWidth = 200;
  } else if (view === ViewMode.Week) {
    columnWidth = 100;
  }

  const handleTaskChange = (task: Task) => {
    console.log("app.tsx On date change Id:" + task.id);
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("app.tsx On progress change Id:" + task.id);
  };

  const handleDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleClick = (task: Task) => {
    console.log("app.tsx On Click event Id:" + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(
      "app.tsx " +
        task.name +
        " has " +
        (isSelected ? "selected" : "unselected")
    );
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("app.tsx On expander click Id:" + task.id);
  };

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      >
        <div
          style={{
            border: "1px solid #ccd",
            display: "flex",
            gap: 12,
            marginRight: 12,
            padding: 6,
          }}
        >
          <label htmlFor="arrows">
            <input
              id="arrows"
              type="checkbox"
              defaultChecked={showArrows}
              onClick={() => setShowArrows(!showArrows)}
            />
            Show dependencies
          </label>
          <label htmlFor="ch2">
            <input
              id="ch2"
              type="checkbox"
              defaultChecked={doubleView}
              onClick={() => setDoubleView(!doubleView)}
            />
            View 2 lines
          </label>
        </div>
      </ViewSwitcher>

      <div style={{ padding: 3, border: "1px solid violet" }}>
        <h2>Customized Gantt</h2>
        <Gantt
          id="1"
          locale="it"
          singleLineHeader
          hideLabel
          todayColor="red"
          showSecondaryDates={doubleView}
          hideDependencies={!showArrows}
          dateTimeFormatters={{
            year: (date: Date) => "A.D. " + date.getFullYear(),
            month: (date: Date, locale: string) =>
              date.toLocaleString(locale, { month: "short" }).toUpperCase() +
              ".",
            monthAndYear: (date: Date, locale: string) =>
              date.toLocaleString(locale, { month: "short" }) +
              " '" +
              (date.getFullYear() % 100),
            day: (date: Date) => `${date.getDate()}`,
            dayAndMonth: (date: Date, locale: string) =>
              date.toLocaleString(locale, { day: "numeric" }).toUpperCase(),
          }}
          tasks={tasks}
          viewMode={view}
          onDateChange={handleTaskChange}
          onDelete={handleTaskDelete}
          onProgressChange={handleProgressChange}
          onDoubleClick={handleDblClick}
          onClick={handleClick}
          onSelect={handleSelect}
          onExpanderClick={handleExpanderClick}
          columnWidth={columnWidth}
          listCellWidth={isChecked ? "155px" : ""}
          rowHeight={25 /* smaller rows */}
          barFill={99 /* bar fills entire height of row */}
          projectFill={66}
          timelineFill={33}
          barCornerRadius={0}
        />
      </div>

      <details>
        <summary>Default styles</summary>
        <h3>Gantt With Unlimited Height</h3>
        <Gantt
          id="1"
          locale="it"
          tasks={tasks}
          viewMode={view}
          onDateChange={handleTaskChange}
          onDelete={handleTaskDelete}
          onProgressChange={handleProgressChange}
          onDoubleClick={handleDblClick}
          onClick={handleClick}
          onSelect={handleSelect}
          onExpanderClick={handleExpanderClick}
          listCellWidth={isChecked ? "155px" : ""}
          columnWidth={columnWidth}
        />
        <h3>Gantt With Limited Height</h3>
        <Gantt
          id="1"
          tasks={tasks}
          viewMode={view}
          onDateChange={handleTaskChange}
          onDelete={handleTaskDelete}
          onProgressChange={handleProgressChange}
          onDoubleClick={handleDblClick}
          onClick={handleClick}
          onSelect={handleSelect}
          onExpanderClick={handleExpanderClick}
          listCellWidth={isChecked ? "155px" : ""}
          ganttHeight={300}
          columnWidth={columnWidth}
        />
      </details>
    </div>
  );
};

export default App;
