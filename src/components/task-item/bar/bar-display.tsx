import React from 'react';
import style from './bar.module.css';

type BarDisplayProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  /* progress start point */
  progressX: number;
  progressWidth: number;
  barCornerRadius: number;
  styles: {
    backgroundColor: string;
    backgroundSelectedColor: string;
    progressColor: string;
    progressSelectedColor: string;
  };
  onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
  xSecondary?: number;
  widthSecondary?: number;
};
export const BarDisplay: React.FC<BarDisplayProps> = (
  {
    x,
    y,
    width,
    height,
    isSelected,
    progressX,
    progressWidth,
    barCornerRadius,
    styles,
    onMouseDown,
    xSecondary,
    widthSecondary
  }
) => {
  const getProcessColor = () => {
    return isSelected ? styles.progressSelectedColor : styles.progressColor;
  };

  const getBarColor = () => {
    return isSelected ? styles.backgroundSelectedColor : styles.backgroundColor;
  };

  if (typeof xSecondary !== 'undefined') {
    const halfHeight = height / 2
    return (
      <g onMouseDown={onMouseDown}>
        <rect
          key="top semi-transparent bar"
          x={xSecondary}
          width={widthSecondary}
          y={y}
          height={halfHeight}
          ry={barCornerRadius}
          rx={barCornerRadius}
          fill={getBarColor()}
          opacity={0.5}
          className={style.barBackground}
        />
        <rect
          key="main bar"
          x={x}
          width={width}
          y={y + halfHeight}
          height={halfHeight}
          ry={barCornerRadius}
          rx={barCornerRadius}
          fill={getBarColor()}
          className={style.barBackground}
        />
        <rect
          key="progress bar"
          x={progressX}
          width={progressWidth}
          y={y + halfHeight}
          height={halfHeight}
          ry={barCornerRadius}
          rx={barCornerRadius}
          fill={getProcessColor()}
        />
      </g>
    );

  }
  return (
    <g onMouseDown={onMouseDown}>
      <rect
        x={x}
        width={width}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()}
        className={style.barBackground}
      />
      <rect
        x={progressX}
        width={progressWidth}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getProcessColor()}
      />
    </g>
  );
};
