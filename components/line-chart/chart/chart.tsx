import React from "react";
import { createLineGraph } from "../helpers/create-line-graph";
import { AnimShape } from "../../animations/anim-shape";
import { Graph } from "../models/Graph";
import { MySurface } from "../surface/surface";

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
interface MyState {
  graph: () => Graph;
}

class Chart<T> extends React.Component<MyProps<T>, MyState> {
  constructor(props: MyProps<T>) {
    super(props);
    this.state = {
      graph: () => ({ path: "" })
    };
  }
  render() {
    const { data, height, width } = this.props;
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
    leftPadding = leftPadding || 10;
    rightPadding = rightPadding || 10;
    strokeWidth = strokeWidth || 4;
    color = color || "#00f";
    return (
      <MySurface
        width={500}
        height={500}
        topPadding={topPadding}
        bottomPadding={bottomPadding}
        leftPadding={leftPadding}
        rightPadding={rightPadding}
      >
        <AnimShape
          d={() =>
            createLineGraph<T>(
              data,
              width - leftPadding - rightPadding,
              height - topPadding - bottomPadding,
              "Year",
              "Mean"
            )
          }
          color={color}
          strokeWidth={strokeWidth}
        />
      </MySurface>
    );
  }
}

export { Chart };
