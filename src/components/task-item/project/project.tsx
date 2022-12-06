import React from 'react';
import { TaskItemProps } from '../task-item';
import styles from './project.module.css';
import style from '../bar/bar.module.css';

export const Project: React.FC<TaskItemProps> = (
  {
    task: {
      barCornerRadius,
      height,
      progressWidth,
      progressX,
      styles: {
        backgroundColor,
        backgroundSelectedColor,
        progressColor,
        progressSelectedColor
      },
      x1,
      x2,
      x1secondary,
      x2secondary,
      y,
    },
    isSelected,
  }
) => {
  const barColor = isSelected
    ? backgroundSelectedColor
    : backgroundColor;
  const processColor = isSelected
    ? progressSelectedColor
    : progressColor;
  const projectWidth = x2 - x1;

  if (typeof x1secondary !== 'undefined'
    && typeof x2secondary !== 'undefined') {
    const halfHeight = height / 2
    return (
      <g tabIndex={0} className={styles.projectWrapper}>
        <rect
          key="top semi-transparent bar"
          x={x1secondary}
          width={x2secondary - x1secondary}
          y={y}
          height={halfHeight}
          ry={barCornerRadius}
          rx={barCornerRadius}
          fill={barColor}
          opacity={0.5}
          className={style.projectBackground}
        />
        <rect
          fill={barColor}
          x={x1}
          width={projectWidth}
          y={y + halfHeight}
          height={halfHeight}
          rx={barCornerRadius}
          ry={barCornerRadius}
          className={styles.projectBackground}
        />
        <rect
          x={progressX}
          width={progressWidth}
          y={y + halfHeight}
          height={halfHeight}
          ry={barCornerRadius}
          rx={barCornerRadius}
          fill={processColor}
        />
      </g>
    );

  }
  return (
    <g tabIndex={0} className={styles.projectWrapper}>
      <rect
        fill={barColor}
        x={x1}
        width={projectWidth}
        y={y}
        height={height}
        rx={barCornerRadius}
        ry={barCornerRadius}
        className={styles.projectBackground}
      />
      <rect
        x={progressX}
        width={progressWidth}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={processColor}
      />
    </g>
  );
};
