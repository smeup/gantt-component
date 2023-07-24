import React, { SyntheticEvent, useEffect, createRef } from "react";
import styles from "./vertical-scroll.module.css";

export const VerticalScroll: React.FC<{
  scroll: number;
  ganttHeight: number;
  ganttFullHeight: number;
  headerHeight: number;
  rtl: boolean;
  onScroll: (event: SyntheticEvent<HTMLDivElement>) => void;
}> = ({
  scroll,
  ganttHeight,
  ganttFullHeight,
  headerHeight,
  rtl,
  onScroll,
}) => {
  const scrollRef = createRef<HTMLDivElement>();

  useEffect(() => {
    let id: any;
    if (scrollRef.current) {
      const wrap = scrollRef.current;
      const setScrollTop = () => {
        wrap.scrollTop = scroll;
      };
      id = setTimeout(setScrollTop, 50);
    }
    return () => {
      clearTimeout(id);
    }
  }, [scroll, scrollRef]);

  return (
    <div
      style={{
        height: ganttHeight,
        marginTop: headerHeight,
        marginLeft: rtl ? "" : "-1rem",
      }}
      className={styles.scroll}
      onScroll={onScroll}
      ref={scrollRef}
    >
      <div style={{ height: ganttFullHeight, width: 1 }} />
    </div>
  );
};
