import React, { useMemo } from 'react';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import { ViewSwitcher } from './components/view-switcher';
import { getStartEndDateForProject, initTasks } from './helper';
import 'gantt-task-react/dist/index.css';

const App = () => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = React.useState<Task[]>(initTasks());

  const delta = 1e7
  const tasksWithGhosts = useMemo(() =>
    tasks.flatMap((task: Task) => {
      const styles = task.styles ?? {
        backgroundColor: '#aaaaaa',
        backgroundSelectedColor: '#dddddd',
        progressColor: '#aaaaaa',
        progressSelectedColor: '#dddddd',
      }
      const ghost = {
        ...task,
        id: task.id + '-ghost',
        start: new Date(+task.start - delta),
        end: new Date(+task.end + delta * 1.5),
        progress: 0,
        styles: {
          backgroundColor: styles.backgroundColor + '45',
          backgroundSelectedColor: styles.backgroundSelectedColor + '45',
          progressColor: styles.progressColor + '45',
          progressSelectedColor: styles.progressSelectedColor + '45',
        },
        name: '',
        dependencies: [],
        isDisabled: true,
      }
      return [ghost, task]
    }), tasks)

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
    console.log('On date change Id:' + task.id);
    let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = {...project, start, end};
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm('Are you sure about ' + task.name + ' ?');
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log('On progress change Id:' + task.id);
  };

  const handleDblClick = (task: Task) => {
    alert('On Double Click event Id:' + task.id);
  };

  const handleClick = (task: Task) => {
    console.log('On Click event Id:' + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + ' has ' + (isSelected ? 'selected' : 'unselected'));
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log('On expander click Id:' + task.id);
  };

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <div style={{padding: 3, border: '1px solid violet'}}>
        <h2>Customized Gantt</h2>
        <Gantt
          locale="it"
          singleLineHeader
          todayColor="red"
          dateTimeFormatters={{
            year: (date: Date) => 'A.D. ' + date.getFullYear(),
            month: (date: Date, locale: string) => date.toLocaleString(locale, {month: 'short'}).toUpperCase() + '.',
            monthAndYear: (date: Date, locale: string) => date.toLocaleString(locale, {month: 'short'}) + ' \'' + date.getFullYear() % 100,
            day: (date: Date) => `${date.getDate()}`,
            dayAndMonth: (date: Date, locale: string) =>
              date.toLocaleString(locale, {weekday: 'narrow', day: 'numeric', month: 'short'}).toUpperCase()
          }}
          tasks={tasksWithGhosts}
          viewMode={view}
          onDateChange={handleTaskChange}
          onDelete={handleTaskDelete}
          onProgressChange={handleProgressChange}
          onDoubleClick={handleDblClick}
          onClick={handleClick}
          onSelect={handleSelect}
          onExpanderClick={handleExpanderClick}
          columnWidth={columnWidth}
          listCellWidth={isChecked ? '155px' : ''}
          rowHeight={25 /* smaller rows */}
          barFill={100 /* bar fills entire height of row */}
        />

      </div>

      <details>
        <summary>Default styles</summary>
        <h3>Gantt With Unlimited Height</h3>
        <Gantt
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
          listCellWidth={isChecked ? '155px' : ''}
          columnWidth={columnWidth}
        />
        <h3>Gantt With Limited Height</h3>
        <Gantt
          tasks={tasks}
          viewMode={view}
          onDateChange={handleTaskChange}
          onDelete={handleTaskDelete}
          onProgressChange={handleProgressChange}
          onDoubleClick={handleDblClick}
          onClick={handleClick}
          onSelect={handleSelect}
          onExpanderClick={handleExpanderClick}
          listCellWidth={isChecked ? '155px' : ''}
          ganttHeight={300}
          columnWidth={columnWidth}
        />

      </details>
    </div>
  );
};

export default App;
