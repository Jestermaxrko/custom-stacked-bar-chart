import React from "react";
import { TooltipProps } from "recharts";

interface Props extends TooltipProps<string | number, number> {
  dataKeys: string[];
  colorMap: Record<string, string>;
}

const TooltipContent = ({ active, payload, dataKeys, colorMap }: Props) => {
  if (!active || !payload?.length) {
    return null;
  }

  const data = payload[0].payload;

  return (
    <div style={{ backgroundColor: "#fff", padding: 16 }}>
      <div>{data.name}</div>
      {dataKeys.map((key) => {
        return (
          <div key={key} style={{ color: colorMap[key], marginTop: 10 }}>
            {key}: {data[key]}
          </div>
        );
      })}
    </div>
  );
};

export default TooltipContent;
