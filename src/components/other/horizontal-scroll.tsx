import React, { SyntheticEvent, useRef, useEffect } from "react";
import styles from "./horizontal-scroll.module.css";

export const HorizontalScroll: React.FC<{
  scroll: number;
  svgWidth: number;
  taskGanttRef: React.RefObject<HTMLDivElement>;
  taskListWidth: number;
  rtl: boolean;
  onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
}> = ({ scroll, svgWidth, taskGanttRef, rtl, onScroll }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const wrap = scrollRef.current;
      const setScrollLeft = () => {
        wrap.scrollLeft = scroll;
      };
      setTimeout(setScrollLeft, 250);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scroll;
    }
  }, [scroll]);
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
      ref={scrollRef}
    >
      <div style={{ width: svgWidth }} className={styles.scroll} />
    </div>
  );
};
