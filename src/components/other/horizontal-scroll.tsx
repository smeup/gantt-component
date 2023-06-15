import React, { SyntheticEvent, useEffect, createRef } from "react";
import styles from "./horizontal-scroll.module.css";

export const HorizontalScroll: React.FC<{
  scroll: number;
  svgWidth: number;
  taskGanttRef: React.RefObject<HTMLDivElement>;
  taskListWidth: number;
  rtl: boolean;
  onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
}> = ({ scroll, svgWidth, taskGanttRef, rtl, onScroll }) => {
  const scrollRef = createRef<HTMLDivElement>();

  useEffect(() => {
    let id: any;
    if (scrollRef.current) {
      const wrap = scrollRef.current;
      const setScrollLeft = () => {
        wrap.scrollLeft = scroll;
      };
      id = setTimeout(setScrollLeft, 50);
    }
    return () => {
      clearTimeout(id);
    }
  }, [scroll, scrollRef]);
  
  const rect = taskGanttRef.current?.getBoundingClientRect();

  return (
    <div
      dir="ltr"
      style={
        rect
          ? {
              margin: rtl
                ? `0px ${rect.x}px 0px 0px`
                : `0px 0px 0px ${rect.x}px`,
            }
          : undefined
      }
      className={styles.scrollWrapper}
      onScroll={onScroll}
      data-scrollx="true"
      ref={scrollRef}
    >
      <div style={{ width: svgWidth }} className={styles.scroll} />
    </div>
  );
};
