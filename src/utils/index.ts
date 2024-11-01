interface GetBarHeightProps {
  value: number;
  total: number;
  containerHeight: number;
  minBarHeight: number;
}

export const getBarHeight = ({
  value,
  total,
  containerHeight,
  minBarHeight,
}: GetBarHeightProps) => {
  if (total === 0 || !value) return 0;
  const barHeight = (containerHeight * value) / total;
  if (!minBarHeight) return barHeight;
  return Math.max(minBarHeight, barHeight);
};

interface BarAttributes {
  y: number;
  height: number;
}

interface AdjustBarsHeightProps<T extends BarAttributes> {
  bars: T[];
  containerHeight: number;
  minBarHeight: number;
  yOffset?: number;
}

export const adjustBarsHeight = <T extends BarAttributes>({
  bars,
  containerHeight,
  minBarHeight,
  yOffset = 0,
}: AdjustBarsHeightProps<T>) => {
  if (!minBarHeight) return bars;

  const totalComputedBarsHeight = bars.reduce(
    (acc, bar) => acc + bar.height,
    0
  );
  const diff = totalComputedBarsHeight - containerHeight;
  if (diff > 0) {
    const barsToAdjust = bars.filter((bar) => bar.height > minBarHeight);
    const barsToAdjustCount = barsToAdjust.length;
    const diffPerBar = diff / barsToAdjustCount;

    let y = containerHeight + yOffset;

    const adjustedBars = [];

    bars.forEach((bar) => {
      if (bar.height > minBarHeight) {
        const adjustedHeight = bar.height - diffPerBar;

        const updatedBar = {
          ...bar,
          height: adjustedHeight,
          y: y - adjustedHeight,
        };
        y -= adjustedHeight;
        adjustedBars.push(updatedBar);
      } else {
        const updatedBar = {
          ...bar,
          y: y - bar.height,
        };
        y -= bar.height;
        adjustedBars.push(updatedBar);
      }
    });

    return adjustedBars;
  }

  return bars;
};
