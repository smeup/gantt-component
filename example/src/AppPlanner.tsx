import React, { useState } from "react";
import {
  GanttRow,
  GanttTask,
  Planner,
  PlannerProps,
} from "@sme.up/gantt-component";
import "@sme.up/gantt-component/dist/index.css";

const AppPlanner = () => {
  const [jsonData, setJsonData] = useState(mockDataTasks);
  const [clicked, setClicked] = useState(false);

  const clickHandler = (row: GanttRow) => {
    console.log("appplanner.tsx " + row.name);
    if (clicked) {
      setJsonData(mockDataTasks);
    } else {
      setJsonData(mockDataTasksSelected);
    }
    setClicked(!clicked);
  };

  const secondaryGanttClickHandler = (row: GanttRow) => {
    console.log("Clicked", row.id)
  }

  const plannerProps: PlannerProps = {
    mainGantt: {
      hideLabel: jsonData.hideLabel,
      hideDependencies: jsonData.hideDependencies,
      showSecondaryDates: jsonData.showSecondaryDates,
      items: jsonData.tasks,
      stylingOptions: jsonData.stylingOptions,
      ganttHeight: 400,
      title: "Main Gantt example",
      onClick: row => clickHandler(row),
    },
    secondaryGantt: {
      hideLabel: jsonData.hideLabel,
      hideDependencies: jsonData.hideDependencies,
      showSecondaryDates: jsonData.showSecondaryDates,
      items: mockDataDetails,
      title: "Secondary Gantt example",
      ganttHeight: 200,
      onClick: row => secondaryGanttClickHandler(row)
    },
  };

  return <Planner {...plannerProps} />;
};

const mockDataTasks = JSON.parse(
  '{"tasks":[{"id":"1","name":"G456","customerCountry":"ISVAL S.P.A","startDate":"2021-10-25","endDate":"2023-07-04","secondaryStartDate":"2021-10-25","secondaryEndDate":"2023-03-07","type":"project","phases":[],"details":[],"valuesToShow":["G456","#START#","#END#"]},{"id":"2","name":"G460","customerCountry":"ALBAN GIACOMO SPA","startDate":"2021-10-20","endDate":"2023-04-07","secondaryStartDate":"2021-10-20","secondaryEndDate":"2022-12-16","type":"project","phases":[],"details":[],"valuesToShow":["G460","#START#","#END#"]},{"id":"3","name":"G452","customerCountry":"RACCORPE DI PE ANGELO & C SNC","startDate":"2022-01-03","endDate":"2023-06-30","secondaryStartDate":"2022-01-03","secondaryEndDate":"2023-03-06","type":"project","phases":[],"details":[],"valuesToShow":["G452","#START#","#END#"]},{"id":"4","name":"G453","customerCountry":"RACCORPE DI PE ANGELO & C SNC","startDate":"2022-01-03","endDate":"2023-06-30","secondaryStartDate":"2022-01-03","secondaryEndDate":"2023-07-06","type":"project","phases":[],"details":[],"valuesToShow":["G453","#START#","#END#"]},{"id":"5","name":"G458","customerCountry":"IBP INSTALFITTINGS SP Z.O.O","startDate":"2021-11-02","endDate":"2023-04-04","secondaryStartDate":"2021-11-02","secondaryEndDate":"2022-10-19","type":"project","phases":[],"details":[],"valuesToShow":["G458","#START#","#END#"]},{"id":"6","name":"G462","customerCountry":"Catalina Cylinders","startDate":"2021-12-15","endDate":"2023-07-07","secondaryStartDate":"2021-12-15","secondaryEndDate":"2023-03-06","type":"project","phases":[],"details":[],"valuesToShow":["G462","#START#","#END#"]},{"id":"7","name":"G465","customerCountry":"CONBRACO INDUSTRIES INC.","startDate":"2021-12-08","endDate":"2023-07-07","secondaryStartDate":"2021-12-08","secondaryEndDate":"2023-02-17","type":"project","phases":[],"details":[],"valuesToShow":["G465","#START#","#END#"]},{"id":"8","name":"G466","customerCountry":"CONBRACO INDUSTRIES INC.","startDate":"2022-01-20","endDate":"2023-07-07","secondaryStartDate":"2022-01-20","secondaryEndDate":"2023-02-24","type":"project","phases":[],"details":[],"valuesToShow":["G466","#START#","#END#"]},{"id":"9","name":"G468","customerCountry":"CALEFFI S.P.A.","startDate":"2022-02-02","endDate":"2023-07-21","secondaryStartDate":"2022-02-02","secondaryEndDate":"2023-03-03","type":"project","phases":[],"details":[],"valuesToShow":["G468","#START#","#END#"]},{"id":"10","name":"G469","customerCountry":"CALEFFI S.P.A.","startDate":"2021-11-02","endDate":"2023-07-21","secondaryStartDate":"2021-11-02","secondaryEndDate":"2023-06-16","type":"project","phases":[],"details":[],"valuesToShow":["G469","#START#","#END#"]},{"id":"11","name":"G418","customerCountry":"BENDER ARMATUREN","startDate":"2022-01-20","endDate":"2023-10-06","secondaryStartDate":"2022-01-20","secondaryEndDate":"2023-01-20","type":"project","phases":[],"details":[],"valuesToShow":["G418","#START#","#END#"]},{"id":"12","name":"G471","customerCountry":"FAPIM SPA","startDate":"2022-02-21","endDate":"2023-07-28","secondaryStartDate":"2022-02-21","secondaryEndDate":"2023-02-27","type":"project","phases":[],"details":[],"valuesToShow":["G471","#START#","#END#"]},{"id":"13","name":"G472","customerCountry":"DOCOL METAIS SANITARIOS","startDate":"2022-04-02","endDate":"2023-09-29","secondaryStartDate":"2022-04-02","secondaryEndDate":"2023-05-12","type":"project","phases":[],"details":[],"valuesToShow":["G472","#START#","#END#"]},{"id":"14","name":"G474","customerCountry":"UPONOR GMBH","startDate":"2022-01-07","endDate":"2023-04-14","secondaryStartDate":"2022-01-07","secondaryEndDate":"2023-03-09","type":"project","phases":[],"details":[],"valuesToShow":["G474","#START#","#END#"]},{"id":"15","name":"G480","customerCountry":"ILME SPA","startDate":"2021-11-20","endDate":"2023-07-21","secondaryStartDate":"2021-11-20","secondaryEndDate":"2023-05-03","type":"project","phases":[],"details":[],"valuesToShow":["G480","#START#","#END#"]},{"id":"16","name":"G470","customerCountry":"GIACOMINI SPA","startDate":"2022-01-15","endDate":"2023-05-19","secondaryStartDate":"2022-01-15","secondaryEndDate":"2023-02-17","type":"project","phases":[],"details":[],"valuesToShow":["G470","#START#","#END#"]},{"id":"17","name":"G481","customerCountry":"MEC TO SRL","startDate":"2022-05-20","endDate":"2023-07-21","secondaryStartDate":"2022-05-20","secondaryEndDate":"2023-05-23","type":"project","phases":[],"details":[],"valuesToShow":["G481","#START#","#END#"]},{"id":"18","name":"G473","customerCountry":"RELIANCE WORLDWIDE CORP.","startDate":"2022-05-20","endDate":"2023-10-13","secondaryStartDate":"2022-05-20","secondaryEndDate":"2023-08-01","type":"project","phases":[],"details":[],"valuesToShow":["G473","#START#","#END#"]},{"id":"19","name":"G482","customerCountry":"ARCO-VALVULAS ARCO","startDate":"2022-03-15","endDate":"2023-09-08","secondaryStartDate":"2022-03-15","secondaryEndDate":"2023-03-27","type":"project","phases":[],"details":[],"valuesToShow":["G482","#START#","#END#"]},{"id":"20","name":"G483","customerCountry":"ARCO-VALVULAS ARCO","startDate":"2022-03-15","endDate":"2023-11-03","secondaryStartDate":"2022-03-15","secondaryEndDate":"2023-10-30","type":"project","phases":[],"details":[],"valuesToShow":["G483","#START#","#END#"]},{"id":"21","name":"G487","customerCountry":"Vitillo SpA","startDate":"2022-05-02","endDate":"2024-02-23","secondaryStartDate":"2022-05-02","secondaryEndDate":"2023-11-30","type":"project","phases":[],"details":[],"valuesToShow":["G487","#START#","#END#"]},{"id":"22","name":"G488","customerCountry":"Vitillo SpA","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","phases":[],"details":[],"valuesToShow":["G488","#START#","#END#"]},{"id":"23","name":"G489","customerCountry":"Vitillo SpA","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","phases":[],"details":[],"valuesToShow":["G489","#START#","#END#"]},{"id":"24","name":"G490","customerCountry":"Vitillo SpA","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","phases":[],"details":[],"valuesToShow":["G490","#START#","#END#"]},{"id":"25","name":"G491","customerCountry":"Vitillo SpA","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","phases":[],"details":[],"valuesToShow":["G491","#START#","#END#"]},{"id":"26","name":"G492","customerCountry":"AALBERTS IPS AMERICAS, INC","startDate":"2022-09-01","endDate":"2024-02-09","secondaryStartDate":"2022-09-01","secondaryEndDate":"2023-12-22","type":"project","phases":[],"details":[],"valuesToShow":["G492","#START#","#END#"]},{"id":"27","name":"G493","customerCountry":"AALBERTS IPS AMERICAS, INC","startDate":"2022-10-20","endDate":"2024-02-09","secondaryStartDate":"2022-10-20","secondaryEndDate":"2024-01-10","type":"project","phases":[],"details":[],"valuesToShow":["G493","#START#","#END#"]},{"id":"28","name":"G495","customerCountry":"OMB SALERI VENTILGAS SPA","startDate":"2022-04-15","endDate":"2024-01-26","secondaryStartDate":"2022-04-15","secondaryEndDate":"2023-11-07","type":"project","phases":[],"details":[],"valuesToShow":["G495","#START#","#END#"]},{"id":"29","name":"G496","customerCountry":"Cisa Spa","startDate":"2022-01-07","endDate":"2023-09-07","secondaryStartDate":"2022-01-07","secondaryEndDate":"2023-07-27","type":"project","phases":[],"details":[],"valuesToShow":["G496","#START#","#END#"]},{"id":"30","name":"G484","customerCountry":"LA.CAM Lavorazioni Camune S.r.l.","startDate":"2021-12-05","endDate":"2023-04-06","secondaryStartDate":"2021-12-05","secondaryEndDate":"2023-04-07","type":"project","phases":[],"details":[],"valuesToShow":["G484","#START#","#END#"]},{"id":"31","name":"G485","customerCountry":"BREMBO NANJING BRAKE SYSTEM CO.LTD.","startDate":"2022-02-25","endDate":"2024-01-16","secondaryStartDate":"2022-02-25","secondaryEndDate":"2023-10-16","type":"project","phases":[],"details":[],"valuesToShow":["G485","#START#","#END#"]},{"id":"32","name":"G497","customerCountry":"THE FORD METER BOX CO. INC.","startDate":"2022-09-02","endDate":"2024-01-19","secondaryStartDate":"2022-09-02","secondaryEndDate":"2023-12-05","type":"project","phases":[],"details":[],"valuesToShow":["G497","#START#","#END#"]},{"id":"33","name":"G498","customerCountry":"NIBCO INC.","startDate":"2022-11-02","endDate":"2024-03-29","secondaryStartDate":"2022-11-02","secondaryEndDate":"2024-02-07","type":"project","phases":[],"details":[],"valuesToShow":["G498","#START#","#END#"]},{"id":"34","name":"G477","customerCountry":"Vitillo SpA","startDate":"2022-05-02","endDate":"2023-07-28","secondaryStartDate":"2022-05-02","secondaryEndDate":"2023-06-06","type":"project","phases":[],"details":[],"valuesToShow":["G477","#START#","#END#"]},{"id":"35","name":"G478","customerCountry":"Vitillo SpA","startDate":"2022-05-02","endDate":"2023-12-01","secondaryStartDate":"2022-05-02","secondaryEndDate":"2023-11-17","type":"project","phases":[],"details":[],"valuesToShow":["G478","#START#","#END#"]},{"id":"36","name":"G479","customerCountry":"Vitillo SpA","startDate":"2022-05-02","endDate":"2024-07-05","secondaryStartDate":"2022-05-02","secondaryEndDate":"2024-06-26","type":"project","phases":[],"details":[],"valuesToShow":["G479","#START#","#END#"]},{"id":"37","name":"G486","customerCountry":"COMISA SpA","startDate":"2022-05-20","endDate":"2023-07-07","secondaryStartDate":"2022-05-20","secondaryEndDate":"2023-04-27","type":"project","phases":[],"details":[],"valuesToShow":["G486","#START#","#END#"]},{"id":"38","name":"G499","customerCountry":"Beck Manufacturing","startDate":"2022-09-15","endDate":"2024-05-03","secondaryStartDate":"2022-09-15","secondaryEndDate":"2024-01-24","type":"project","phases":[],"details":[],"valuesToShow":["G499","#START#","#END#"]},{"id":"39","name":"G501","customerCountry":"THE FORD METER BOX CO. INC.","startDate":"2022-09-02","endDate":"2024-05-31","secondaryStartDate":"2022-09-02","secondaryEndDate":"2024-04-16","type":"project","phases":[],"details":[],"valuesToShow":["G501","#START#","#END#"]},{"id":"40","name":"G502","customerCountry":"THE FORD METER BOX CO. INC.","startDate":"2022-09-02","endDate":"2024-05-31","secondaryStartDate":"2022-09-02","secondaryEndDate":"2024-05-24","type":"project","phases":[],"details":[],"valuesToShow":["G502","#START#","#END#"]},{"id":"41","name":"G504","customerCountry":"SWAGELOK COMPANY","startDate":"2022-10-20","endDate":"2024-05-24","secondaryStartDate":"2022-10-20","secondaryEndDate":"2024-04-22","type":"project","phases":[],"details":[],"valuesToShow":["G504","#START#","#END#"]},{"id":"42","name":"G507","customerCountry":"KONGSBERG AUTOMOTIVE AS","startDate":"2022-10-20","endDate":"2023-12-22","secondaryStartDate":"2022-10-20","secondaryEndDate":"2024-02-05","type":"project","phases":[],"details":[],"valuesToShow":["G507","#START#","#END#"]},{"id":"43","name":"G509","customerCountry":"PPT-Armature DD p.o.","startDate":"2022-11-15","endDate":"2023-12-22","secondaryStartDate":"2022-11-15","secondaryEndDate":"2024-02-02","type":"project","phases":[],"details":[],"valuesToShow":["G509","#START#","#END#"]},{"id":"44","name":"G503","customerCountry":"ISVAL S.P.A","startDate":"2022-10-17","endDate":"2024-02-23","secondaryStartDate":"2022-10-17","secondaryEndDate":"2023-11-20","type":"project","phases":[],"details":[],"valuesToShow":["G503","#START#","#END#"]},{"id":"45","name":"G510","customerCountry":"AYVAZ COMPAny","startDate":"2022-12-02","endDate":"2024-04-19","secondaryStartDate":"2022-12-02","secondaryEndDate":"2024-04-15","type":"project","phases":[],"details":[],"valuesToShow":["G510","#START#","#END#"]},{"id":"46","name":"G511","customerCountry":"ISIFLO AS, Norway","startDate":"2022-09-15","endDate":"2024-05-31","secondaryStartDate":"2022-09-15","secondaryEndDate":"2024-05-08","type":"project","phases":[],"details":[],"valuesToShow":["G511","#START#","#END#"]},{"id":"47","name":"G505","customerCountry":"CALEFFI S.P.A.","startDate":"2022-08-02","endDate":"2024-06-21","secondaryStartDate":"2022-08-02","secondaryEndDate":"2024-05-21","type":"project","phases":[],"details":[],"valuesToShow":["G505","#START#","#END#"]},{"id":"48","name":"G508","customerCountry":"Wonder SpA","startDate":"2022-11-14","endDate":"2024-03-22","secondaryStartDate":"2022-11-14","secondaryEndDate":"2024-03-01","type":"project","phases":[],"details":[],"valuesToShow":["G508","#START#","#END#"]},{"id":"49","name":"G494","customerCountry":"COMISA SpA","startDate":"2022-11-14","endDate":"2024-01-26","secondaryStartDate":"2022-11-14","secondaryEndDate":"2023-12-07","type":"project","phases":[],"details":[],"valuesToShow":["G494","#START#","#END#"]},{"id":"50","name":"G515","customerCountry":"THE FORD METER BOX CO. INC.","startDate":"2022-11-29","endDate":"2024-12-20","secondaryStartDate":"2022-11-29","secondaryEndDate":"2024-12-23","type":"project","phases":[],"details":[],"valuesToShow":["G515","#START#","#END#"]},{"id":"51","name":"G519","customerCountry":"THE FORD METER BOX CO. INC.","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","phases":[],"details":[],"valuesToShow":["G519","#START#","#END#"]},{"id":"52","name":"G523","customerCountry":"SWAGELOK COMPANY","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","phases":[],"details":[],"valuesToShow":["G523","#START#","#END#"]},{"id":"53","name":"G520","customerCountry":"Neuman Alluminium GmbH & Co","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","phases":[],"details":[],"valuesToShow":["G520","#START#","#END#"]},{"id":"54","name":"G521","customerCountry":"SAINTE LIZAIGNE SAS","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","phases":[],"details":[],"valuesToShow":["G521","#START#","#END#"]},{"id":"55","name":"G518","customerCountry":"RACCORPE DI PE ANGELO & C SNC","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","phases":[],"details":[],"valuesToShow":["G518","#START#","#END#"]},{"id":"56","name":"G522","customerCountry":"Zoppelletto SpA","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","phases":[],"details":[],"valuesToShow":["G522","#START#","#END#"]},{"id":"57","name":"G516","customerCountry":"RACCORPE DI PE ANGELO & C SNC","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","phases":[],"details":[],"valuesToShow":["G516","#START#","#END#"]},{"id":"58","name":"G517","customerCountry":"RACCORPE DI PE ANGELO & C SNC","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","phases":[],"details":[],"valuesToShow":["G517","#START#","#END#"]}],"timeUnit":"days","stylingOptions":{"listCellWidth":"297px","rowHeight":40,"barFill":90,"projectProgressColor":"#CBCBCB","projectProgressSelectedColor":"#CBCBCB","projectBackgroundColor":"#CBCBCB","projectBackgroundSelectedColor":"#CBCBCB","barProgressColor":"#A2A415","barProgressSelectedColor":"#A2A415","barBackgroundColor":"#A2A415","barBackgroundSelectedColor":"#A2A415"},"hideLabel":true,"showSecondaryDates":true,"ganttHeight":350,"hideDependencies":true}'
);

const mockDataTasksSelected = JSON.parse(
  '{"tasks":[{"id":"1","name":"G456","customerCountry":"ISVAL S.P.A","startDate":"2021-10-25","endDate":"2023-07-04","secondaryStartDate":"2021-10-25","secondaryEndDate":"2023-03-07","type":"project","valuesToShow":["G456","#START#","#END#"],"phases":[{"id":"P410           ","name":"P410           ","startDate":"2022-10-17","endDate":"2023-03-10","secondaryStartDate":"2022-11-07","secondaryEndDate":"2022-11-04","color":"#ED7D31","selectedColor":"#ED7D31","valuesToShow":["P410","#START#","#END#"],"dependencies":[],"type":"phase"},{"id":"P420           ","name":"P420           ","startDate":"2022-11-21","endDate":"2023-03-10","secondaryStartDate":"2023-01-13","secondaryEndDate":"2022-11-11","color":"#FF0000","selectedColor":"#FF0000","valuesToShow":["P420","#START#","#END#"],"dependencies":[],"type":"phase"},{"id":"P610           ","name":"P610           ","startDate":"2023-03-27","endDate":"2023-04-14","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-01-02","color":"#70AD47","selectedColor":"#70AD47","valuesToShow":["P610","#START#","#END#"],"dependencies":["P410           "],"type":"phase"},{"id":"P620           ","name":"P620           ","startDate":"2023-03-27","endDate":"2023-04-14","secondaryStartDate":"2023-03-01","secondaryEndDate":"2022-11-30","color":"#C6E0B4","selectedColor":"#C6E0B4","valuesToShow":["P620","#START#","#END#"],"dependencies":["P410           "],"type":"phase"},{"id":"P630           ","name":"P630           ","startDate":"2023-03-20","endDate":"2023-04-07","secondaryStartDate":"2023-03-01","secondaryEndDate":"2022-12-21","color":"#BDD7EE","selectedColor":"#BDD7EE","valuesToShow":["P630","#START#","#END#"],"dependencies":["P410           "],"type":"phase"},{"id":"P710           ","name":"P710           ","startDate":"2023-04-17","endDate":"2023-04-28","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-01-10","color":"#FFFF00","selectedColor":"#FFFF00","valuesToShow":["P710","#START#","#END#"],"dependencies":["P610           "],"type":"phase"},{"id":"P720           ","name":"P720           ","startDate":"2023-05-02","endDate":"2023-05-10","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-01-17","color":"#BDD7EE","selectedColor":"#BDD7EE","valuesToShow":["P720","#START#","#END#"],"dependencies":["P710           "],"type":"phase"},{"id":"P730           ","name":"P730           ","startDate":"2023-05-17","endDate":"2023-05-30","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-01-31","color":"#F8CBAD","selectedColor":"#F8CBAD","valuesToShow":["P730","#START#","#END#"],"dependencies":["P720           "],"type":"phase"},{"id":"P750           ","name":"P750           ","startDate":"2023-05-31","endDate":"2023-07-04","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-07","color":"#7030A0","selectedColor":"#7030A0","valuesToShow":["P750","#START#","#END#"],"dependencies":["P730           "],"type":"phase"}]},{"id":"2","name":"G460","customerCountry":"ALBAN GIACOMO SPA","startDate":"2021-10-20","endDate":"2023-04-07","secondaryStartDate":"2021-10-20","secondaryEndDate":"2022-12-16","type":"project","valuesToShow":["G460","#START#","#END#"],"phases":[]},{"id":"3","name":"G452","customerCountry":"RACCORPE DI PE ANGELO & C SNC","startDate":"2022-01-03","endDate":"2023-06-30","secondaryStartDate":"2022-01-03","secondaryEndDate":"2023-03-06","type":"project","valuesToShow":["G452","#START#","#END#"],"phases":[]},{"id":"4","name":"G453","customerCountry":"RACCORPE DI PE ANGELO & C SNC","startDate":"2022-01-03","endDate":"2023-06-30","secondaryStartDate":"2022-01-03","secondaryEndDate":"2023-07-06","type":"project","valuesToShow":["G453","#START#","#END#"],"phases":[]},{"id":"5","name":"G458","customerCountry":"IBP INSTALFITTINGS SP Z.O.O","startDate":"2021-11-02","endDate":"2023-04-04","secondaryStartDate":"2021-11-02","secondaryEndDate":"2022-10-19","type":"project","valuesToShow":["G458","#START#","#END#"],"phases":[]},{"id":"6","name":"G462","customerCountry":"Catalina Cylinders","startDate":"2021-12-15","endDate":"2023-07-07","secondaryStartDate":"2021-12-15","secondaryEndDate":"2023-03-06","type":"project","valuesToShow":["G462","#START#","#END#"],"phases":[]},{"id":"7","name":"G465","customerCountry":"CONBRACO INDUSTRIES INC.","startDate":"2021-12-08","endDate":"2023-07-07","secondaryStartDate":"2021-12-08","secondaryEndDate":"2023-02-17","type":"project","valuesToShow":["G465","#START#","#END#"],"phases":[]},{"id":"8","name":"G466","customerCountry":"CONBRACO INDUSTRIES INC.","startDate":"2022-01-20","endDate":"2023-07-07","secondaryStartDate":"2022-01-20","secondaryEndDate":"2023-02-24","type":"project","valuesToShow":["G466","#START#","#END#"],"phases":[]},{"id":"9","name":"G468","customerCountry":"CALEFFI S.P.A.","startDate":"2022-02-02","endDate":"2023-07-21","secondaryStartDate":"2022-02-02","secondaryEndDate":"2023-03-03","type":"project","valuesToShow":["G468","#START#","#END#"],"phases":[]},{"id":"10","name":"G469","customerCountry":"CALEFFI S.P.A.","startDate":"2021-11-02","endDate":"2023-07-21","secondaryStartDate":"2021-11-02","secondaryEndDate":"2023-06-16","type":"project","valuesToShow":["G469","#START#","#END#"],"phases":[]},{"id":"11","name":"G418","customerCountry":"BENDER ARMATUREN","startDate":"2022-01-20","endDate":"2023-10-06","secondaryStartDate":"2022-01-20","secondaryEndDate":"2023-01-20","type":"project","valuesToShow":["G418","#START#","#END#"],"phases":[]},{"id":"12","name":"G471","customerCountry":"FAPIM SPA","startDate":"2022-02-21","endDate":"2023-07-28","secondaryStartDate":"2022-02-21","secondaryEndDate":"2023-02-27","type":"project","valuesToShow":["G471","#START#","#END#"],"phases":[]},{"id":"13","name":"G472","customerCountry":"DOCOL METAIS SANITARIOS","startDate":"2022-04-02","endDate":"2023-09-29","secondaryStartDate":"2022-04-02","secondaryEndDate":"2023-05-12","type":"project","valuesToShow":["G472","#START#","#END#"],"phases":[]},{"id":"14","name":"G474","customerCountry":"UPONOR GMBH","startDate":"2022-01-07","endDate":"2023-04-14","secondaryStartDate":"2022-01-07","secondaryEndDate":"2023-03-09","type":"project","valuesToShow":["G474","#START#","#END#"],"phases":[]},{"id":"15","name":"G480","customerCountry":"ILME SPA","startDate":"2021-11-20","endDate":"2023-07-21","secondaryStartDate":"2021-11-20","secondaryEndDate":"2023-05-03","type":"project","valuesToShow":["G480","#START#","#END#"],"phases":[]},{"id":"16","name":"G470","customerCountry":"GIACOMINI SPA","startDate":"2022-01-15","endDate":"2023-05-19","secondaryStartDate":"2022-01-15","secondaryEndDate":"2023-02-17","type":"project","valuesToShow":["G470","#START#","#END#"],"phases":[]},{"id":"17","name":"G481","customerCountry":"MEC TO SRL","startDate":"2022-05-20","endDate":"2023-07-21","secondaryStartDate":"2022-05-20","secondaryEndDate":"2023-05-23","type":"project","valuesToShow":["G481","#START#","#END#"],"phases":[]},{"id":"18","name":"G473","customerCountry":"RELIANCE WORLDWIDE CORP.","startDate":"2022-05-20","endDate":"2023-10-13","secondaryStartDate":"2022-05-20","secondaryEndDate":"2023-08-01","type":"project","valuesToShow":["G473","#START#","#END#"],"phases":[]},{"id":"19","name":"G482","customerCountry":"ARCO-VALVULAS ARCO","startDate":"2022-03-15","endDate":"2023-09-08","secondaryStartDate":"2022-03-15","secondaryEndDate":"2023-03-27","type":"project","valuesToShow":["G482","#START#","#END#"],"phases":[]},{"id":"20","name":"G483","customerCountry":"ARCO-VALVULAS ARCO","startDate":"2022-03-15","endDate":"2023-11-03","secondaryStartDate":"2022-03-15","secondaryEndDate":"2023-10-30","type":"project","valuesToShow":["G483","#START#","#END#"],"phases":[]},{"id":"21","name":"G487","customerCountry":"Vitillo SpA","startDate":"2022-05-02","endDate":"2024-02-23","secondaryStartDate":"2022-05-02","secondaryEndDate":"2023-11-30","type":"project","valuesToShow":["G487","#START#","#END#"],"phases":[]},{"id":"22","name":"G488","customerCountry":"Vitillo SpA","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","valuesToShow":["G488","#START#","#END#"],"phases":[]},{"id":"23","name":"G489","customerCountry":"Vitillo SpA","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","valuesToShow":["G489","#START#","#END#"],"phases":[]},{"id":"24","name":"G490","customerCountry":"Vitillo SpA","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","valuesToShow":["G490","#START#","#END#"],"phases":[]},{"id":"25","name":"G491","customerCountry":"Vitillo SpA","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","valuesToShow":["G491","#START#","#END#"],"phases":[]},{"id":"26","name":"G492","customerCountry":"AALBERTS IPS AMERICAS, INC","startDate":"2022-09-01","endDate":"2024-02-09","secondaryStartDate":"2022-09-01","secondaryEndDate":"2023-12-22","type":"project","valuesToShow":["G492","#START#","#END#"],"phases":[]},{"id":"27","name":"G493","customerCountry":"AALBERTS IPS AMERICAS, INC","startDate":"2022-10-20","endDate":"2024-02-09","secondaryStartDate":"2022-10-20","secondaryEndDate":"2024-01-10","type":"project","valuesToShow":["G493","#START#","#END#"],"phases":[]},{"id":"28","name":"G495","customerCountry":"OMB SALERI VENTILGAS SPA","startDate":"2022-04-15","endDate":"2024-01-26","secondaryStartDate":"2022-04-15","secondaryEndDate":"2023-11-07","type":"project","valuesToShow":["G495","#START#","#END#"],"phases":[]},{"id":"29","name":"G496","customerCountry":"Cisa Spa","startDate":"2022-01-07","endDate":"2023-09-07","secondaryStartDate":"2022-01-07","secondaryEndDate":"2023-07-27","type":"project","valuesToShow":["G496","#START#","#END#"],"phases":[]},{"id":"30","name":"G484","customerCountry":"LA.CAM Lavorazioni Camune S.r.l.","startDate":"2021-12-05","endDate":"2023-04-06","secondaryStartDate":"2021-12-05","secondaryEndDate":"2023-04-07","type":"project","valuesToShow":["G484","#START#","#END#"],"phases":[]},{"id":"31","name":"G485","customerCountry":"BREMBO NANJING BRAKE SYSTEM CO.LTD.","startDate":"2022-02-25","endDate":"2024-01-16","secondaryStartDate":"2022-02-25","secondaryEndDate":"2023-10-16","type":"project","valuesToShow":["G485","#START#","#END#"],"phases":[]},{"id":"32","name":"G497","customerCountry":"THE FORD METER BOX CO. INC.","startDate":"2022-09-02","endDate":"2024-01-19","secondaryStartDate":"2022-09-02","secondaryEndDate":"2023-12-05","type":"project","valuesToShow":["G497","#START#","#END#"],"phases":[]},{"id":"33","name":"G498","customerCountry":"NIBCO INC.","startDate":"2022-11-02","endDate":"2024-03-29","secondaryStartDate":"2022-11-02","secondaryEndDate":"2024-02-07","type":"project","valuesToShow":["G498","#START#","#END#"],"phases":[]},{"id":"34","name":"G477","customerCountry":"Vitillo SpA","startDate":"2022-05-02","endDate":"2023-07-28","secondaryStartDate":"2022-05-02","secondaryEndDate":"2023-06-06","type":"project","valuesToShow":["G477","#START#","#END#"],"phases":[]},{"id":"35","name":"G478","customerCountry":"Vitillo SpA","startDate":"2022-05-02","endDate":"2023-12-01","secondaryStartDate":"2022-05-02","secondaryEndDate":"2023-11-17","type":"project","valuesToShow":["G478","#START#","#END#"],"phases":[]},{"id":"36","name":"G479","customerCountry":"Vitillo SpA","startDate":"2022-05-02","endDate":"2024-07-05","secondaryStartDate":"2022-05-02","secondaryEndDate":"2024-06-26","type":"project","valuesToShow":["G479","#START#","#END#"],"phases":[]},{"id":"37","name":"G486","customerCountry":"COMISA SpA","startDate":"2022-05-20","endDate":"2023-07-07","secondaryStartDate":"2022-05-20","secondaryEndDate":"2023-04-27","type":"project","valuesToShow":["G486","#START#","#END#"],"phases":[]},{"id":"38","name":"G499","customerCountry":"Beck Manufacturing","startDate":"2022-09-15","endDate":"2024-05-03","secondaryStartDate":"2022-09-15","secondaryEndDate":"2024-01-24","type":"project","valuesToShow":["G499","#START#","#END#"],"phases":[]},{"id":"39","name":"G501","customerCountry":"THE FORD METER BOX CO. INC.","startDate":"2022-09-02","endDate":"2024-05-31","secondaryStartDate":"2022-09-02","secondaryEndDate":"2024-04-16","type":"project","valuesToShow":["G501","#START#","#END#"],"phases":[]},{"id":"40","name":"G502","customerCountry":"THE FORD METER BOX CO. INC.","startDate":"2022-09-02","endDate":"2024-05-31","secondaryStartDate":"2022-09-02","secondaryEndDate":"2024-05-24","type":"project","valuesToShow":["G502","#START#","#END#"],"phases":[]},{"id":"41","name":"G504","customerCountry":"SWAGELOK COMPANY","startDate":"2022-10-20","endDate":"2024-05-24","secondaryStartDate":"2022-10-20","secondaryEndDate":"2024-04-22","type":"project","valuesToShow":["G504","#START#","#END#"],"phases":[]},{"id":"42","name":"G507","customerCountry":"KONGSBERG AUTOMOTIVE AS","startDate":"2022-10-20","endDate":"2023-12-22","secondaryStartDate":"2022-10-20","secondaryEndDate":"2024-02-05","type":"project","valuesToShow":["G507","#START#","#END#"],"phases":[]},{"id":"43","name":"G509","customerCountry":"PPT-Armature DD p.o.","startDate":"2022-11-15","endDate":"2023-12-22","secondaryStartDate":"2022-11-15","secondaryEndDate":"2024-02-02","type":"project","valuesToShow":["G509","#START#","#END#"],"phases":[]},{"id":"44","name":"G503","customerCountry":"ISVAL S.P.A","startDate":"2022-10-17","endDate":"2024-02-23","secondaryStartDate":"2022-10-17","secondaryEndDate":"2023-11-20","type":"project","valuesToShow":["G503","#START#","#END#"],"phases":[]},{"id":"45","name":"G510","customerCountry":"AYVAZ COMPAny","startDate":"2022-12-02","endDate":"2024-04-19","secondaryStartDate":"2022-12-02","secondaryEndDate":"2024-04-15","type":"project","valuesToShow":["G510","#START#","#END#"],"phases":[]},{"id":"46","name":"G511","customerCountry":"ISIFLO AS, Norway","startDate":"2022-09-15","endDate":"2024-05-31","secondaryStartDate":"2022-09-15","secondaryEndDate":"2024-05-08","type":"project","valuesToShow":["G511","#START#","#END#"],"phases":[]},{"id":"47","name":"G505","customerCountry":"CALEFFI S.P.A.","startDate":"2022-08-02","endDate":"2024-06-21","secondaryStartDate":"2022-08-02","secondaryEndDate":"2024-05-21","type":"project","valuesToShow":["G505","#START#","#END#"],"phases":[]},{"id":"48","name":"G508","customerCountry":"Wonder SpA","startDate":"2022-11-14","endDate":"2024-03-22","secondaryStartDate":"2022-11-14","secondaryEndDate":"2024-03-01","type":"project","valuesToShow":["G508","#START#","#END#"],"phases":[]},{"id":"49","name":"G494","customerCountry":"COMISA SpA","startDate":"2022-11-14","endDate":"2024-01-26","secondaryStartDate":"2022-11-14","secondaryEndDate":"2023-12-07","type":"project","valuesToShow":["G494","#START#","#END#"],"phases":[]},{"id":"50","name":"G515","customerCountry":"THE FORD METER BOX CO. INC.","startDate":"2022-11-29","endDate":"2024-12-20","secondaryStartDate":"2022-11-29","secondaryEndDate":"2024-12-23","type":"project","valuesToShow":["G515","#START#","#END#"],"phases":[]},{"id":"51","name":"G519","customerCountry":"THE FORD METER BOX CO. INC.","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","valuesToShow":["G519","#START#","#END#"],"phases":[]},{"id":"52","name":"G523","customerCountry":"SWAGELOK COMPANY","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","valuesToShow":["G523","#START#","#END#"],"phases":[]},{"id":"53","name":"G520","customerCountry":"Neuman Alluminium GmbH & Co","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","valuesToShow":["G520","#START#","#END#"],"phases":[]},{"id":"54","name":"G521","customerCountry":"SAINTE LIZAIGNE SAS","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","valuesToShow":["G521","#START#","#END#"],"phases":[]},{"id":"55","name":"G518","customerCountry":"RACCORPE DI PE ANGELO & C SNC","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","valuesToShow":["G518","#START#","#END#"],"phases":[]},{"id":"56","name":"G522","customerCountry":"Zoppelletto SpA","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","valuesToShow":["G522","#START#","#END#"],"phases":[]},{"id":"57","name":"G516","customerCountry":"RACCORPE DI PE ANGELO & C SNC","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","valuesToShow":["G516","#START#","#END#"],"phases":[]},{"id":"58","name":"G517","customerCountry":"RACCORPE DI PE ANGELO & C SNC","startDate":"2023-03-01","endDate":"2023-03-01","secondaryStartDate":"2023-03-01","secondaryEndDate":"2023-03-01","type":"project","valuesToShow":["G517","#START#","#END#"],"phases":[]}],"timeUnit":"months","stylingOptions":{"listCellWidth":"297px","rowHeight":40,"barFill":90,"projectProgressColor":"#CBCBCB","projectProgressSelectedColor":"#CBCBCB","projectBackgroundColor":"#CBCBCB","projectBackgroundSelectedColor":"#CBCBCB","barProgressColor":"#A2A415","barProgressSelectedColor":"#A2A415","barBackgroundColor":"#A2A415","barBackgroundSelectedColor":"#A2A415"},"hideLabel":true,"showSecondaryDates":true,"ganttHeight":350,"hideDependencies":true}'
);

const mockDataDetails: GanttTask[] = [
  {
    id: "1",
    name: "G456",
    startDate: "2021-10-25",
    endDate: "2023-07-04",
    secondaryStartDate: "2021-10-25",
    secondaryEndDate: "2023-03-07",
    type: "timeline",
    phases: [],
    details: [],
    valuesToShow: ["G456"],
  },
  {
    id: "2",
    name: "G460",
    startDate: "2021-10-20",
    endDate: "2023-04-07",
    secondaryStartDate: "2021-10-20",
    secondaryEndDate: "2022-12-16",
    type: "timeline",
    phases: [],
    details: [],
    valuesToShow: ["G460"],
  },
  {
    id: "3",
    name: "G452",
    startDate: "2022-01-03",
    endDate: "2023-06-30",
    secondaryStartDate: "2022-01-03",
    secondaryEndDate: "2023-03-06",
    type: "timeline",
    phases: [],
    details: [],
    valuesToShow: ["G452"],
  },
  {
    id: "4",
    name: "G453",
    startDate: "2022-01-03",
    endDate: "2023-06-30",
    secondaryStartDate: "2022-01-03",
    secondaryEndDate: "2023-07-06",
    type: "timeline",
    phases: [],
    details: [],
    valuesToShow: ["G453"],
  },
  {
    id: "5",
    name: "G458",
    startDate: "2021-11-02",
    endDate: "2023-04-04",
    secondaryStartDate: "2021-11-02",
    secondaryEndDate: "2022-10-19",
    type: "timeline",
    phases: [],
    details: [],
    valuesToShow: ["G458"],
  },
  {
    id: "6",
    name: "G462",
    startDate: "2021-12-15",
    endDate: "2023-07-07",
    secondaryStartDate: "2021-12-15",
    secondaryEndDate: "2023-03-06",
    type: "timeline",
    phases: [],
    details: [],
    valuesToShow: ["G462"],
  },
  {
    id: "7",
    name: "G465",
    startDate: "2021-12-08",
    endDate: "2023-07-07",
    secondaryStartDate: "2021-12-08",
    secondaryEndDate: "2023-02-17",
    type: "timeline",
    phases: [],
    details: [],
    valuesToShow: ["G465"],
  },
  {
    id: "8",
    name: "G466",
    startDate: "2022-01-20",
    endDate: "2023-07-07",
    secondaryStartDate: "2022-01-20",
    secondaryEndDate: "2023-02-24",
    type: "timeline",
    phases: [],
    details: [],
    valuesToShow: ["G466"],
  },
  {
    id: "9",
    name: "G468",
    startDate: "2022-02-02",
    endDate: "2023-07-21",
    secondaryStartDate: "2022-02-02",
    secondaryEndDate: "2023-03-03",
    type: "timeline",
    phases: [],
    details: [],
    valuesToShow: ["G468"],
  },
  {
    id: "10",
    name: "G469",
    startDate: "2021-11-02",
    endDate: "2023-07-21",
    secondaryStartDate: "2021-11-02",
    secondaryEndDate: "2023-06-16",
    type: "timeline",
    phases: [],
    details: [],
    valuesToShow: ["G469"],
  },
  {
    id: "11",
    name: "G418",
    startDate: "2022-01-20",
    endDate: "2023-10-06",
    secondaryStartDate: "2022-01-20",
    secondaryEndDate: "2023-01-20",
    type: "timeline",
    phases: [],
    details: [],
    valuesToShow: ["G418"],
  },
  {
    id: "12",
    name: "G471",
    startDate: "2022-02-21",
    endDate: "2023-07-28",
    secondaryStartDate: "2022-02-21",
    secondaryEndDate: "2023-02-27",
    type: "timeline",
    phases: [],
    details: [],
    valuesToShow: ["G471"],
  },
];

export default AppPlanner;
