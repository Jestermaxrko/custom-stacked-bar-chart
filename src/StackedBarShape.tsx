import React from "react";
import { adjustBarsHeight, getBarHeight } from "./utils";

interface BarData {
  key: string;
  y: number;
  height: number;
  fill: string;
}

interface Props {
  dataKeys: string[];
  width: number;
  height: number;
  y: number;
  x: number;
  minBarHeight?: number;
  colorMap?: Record<string, string>;
  payload: Record<string, any> & { total: number };
}

const StackedBarShape = ({
  dataKeys,
  minBarHeight = 8,
  colorMap = {},
  ...props
}: Props) => {
  const total = props.payload.total;
  const containerHeight = props.height;

  const generateBars = () => {
    let y = props.height + props.y;
    const bars: BarData[] = [];

    dataKeys.forEach((key) => {
      const value = props.payload[key];
      if (value) {
        const height = getBarHeight({
          value,
          total,
          containerHeight,
          minBarHeight,
        });
        const barData = {
          key,
          y: y - height,
          height,
          fill: colorMap[key],
        };
        y -= height;
        bars.push(barData);
      }
    });
    return bars;
  };

  const bars = adjustBarsHeight({
    bars: generateBars(),
    minBarHeight,
    containerHeight,
    yOffset: props.y,
  });

  return bars.map((bar) => (
    <rect
      key={bar.key}
      x={props.x}
      y={bar.y}
      width={props.width}
      height={bar.height}
      fill={bar.fill}
    />
  ));
};

export default StackedBarShape;
