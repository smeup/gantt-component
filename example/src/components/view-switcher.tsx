import React, { PropsWithChildren } from "react";
import "@sme.up/gantt-component/dist/index.css";
import { ViewMode } from "@sme.up/gantt-component";
type ViewSwitcherProps = PropsWithChildren<{
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
}>;
export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
  children,
}) => {
  return (
    <div className="ViewContainer">
      {children}
      <button className="Button" onClick={() => onViewModeChange("day")}>
        Day
      </button>
      <button className="Button" onClick={() => onViewModeChange("week")}>
        Week
      </button>
      <button className="Button" onClick={() => onViewModeChange("month")}>
        Month
      </button>
      <button className="Button" onClick={() => onViewModeChange("year")}>
        Year
      </button>
      <div className="Switch">
        <label className="Switch_Toggle">
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="Slider" />
        </label>
        Show Task List
      </div>
    </div>
  );
};
