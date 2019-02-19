import React from "react";
import { createLineGraph } from "../functions/line-graph";
import { AnimShape } from "../animations/anim-shape";
import { MySurface } from "./surface/surface";

import { ART } from "react-native";
const { Group } = ART;

interface MyProps<T> {
  data: T[];
  width: number;
  height: number;
  topPadding?: number;
  bottomPadding?: number;
  leftPadding?: number;
  rightPadding?: number;
  strokeWidth?: number;
  color?: string;
}
interface MyState {}

class Chart<T> extends React.Component<MyProps<T>, MyState> {
  constructor(props: MyProps<T>) {
    super(props);
  }
  render() {
    const { data, height, width } = this.props;
    if (!data) {
      return null;
    }
    let {
      topPadding,
      bottomPadding,
      leftPadding,
      rightPadding,
      strokeWidth,
      color
    } = this.props;
    topPadding = topPadding || 10;
    bottomPadding = bottomPadding || 10;
    leftPadding = leftPadding || 30;
    rightPadding = rightPadding || 10;
    strokeWidth = strokeWidth || 4;
    color = color || "#00f";
    const { path, xAxis, yAxis } = createLineGraph(
      data,
      width - leftPadding - rightPadding,
      height - topPadding - bottomPadding,
      "Year",
      "Mean"
    );
    return (
      <MySurface
        width={500}
        height={500}
        topPadding={topPadding}
        bottomPadding={bottomPadding}
        leftPadding={leftPadding}
        rightPadding={rightPadding}
      >
        <React.Fragment>
          <AnimShape d={() => path} color={color} strokeWidth={strokeWidth} />
          <Group x={-20} y={topPadding}>
            <AnimShape
              d={() => yAxis}
              color={color}
              strokeWidth={strokeWidth}
            />
          </Group>
          <Group x={leftPadding - 25} y={height + topPadding}>
            <AnimShape
              d={() => xAxis}
              color={color}
              strokeWidth={strokeWidth}
            />
          </Group>
        </React.Fragment>
      </MySurface>
    );
  }
}

export { Chart };
