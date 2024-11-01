import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import StackedBarShape from "./StackedBarShape";
import TooltipContent from "./TooltipContent";

const data = [
  {
    name: "Page A",
    a: 200,
    b: 1,
    c: 10,
    total: 211,
  },
  {
    name: "Page A",
    a: 2,
    b: 170,
    c: 4,
    total: 211,
  },
];

const dataKeys = ["a", "b", "c"];
const colorsMap = {
  a: "#8884d8",
  b: "red",
  c: "green",
};

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/p/sandbox/stacked-bar-chart-7fwfgj";

  render() {
    return (
      <div>
        <h1>Custom stacked bar chart</h1>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              content={
                <TooltipContent dataKeys={dataKeys} colorMap={colorsMap} />
              }
            />
            <Bar
              dataKey="total"
              shape={
                <StackedBarShape dataKeys={dataKeys} colorMap={colorsMap} />
              }
            />
          </BarChart>
        </ResponsiveContainer>
        <h1>Default one</h1>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="a" stackId="a" fill="#8884d8" />
            <Bar dataKey="b" stackId="a" fill="red" />
            <Bar dataKey="c" stackId="a" fill="green" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
