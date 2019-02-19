import React from "react";
import { createLineGraph } from "../functions/line-graph";
import { AnimShape } from "../animations/anim-shape";
import { MySurface } from "./surface/surface";
import { Draggable } from "../animations/click-and-drag";
import { Axis } from "./axis/axis";
import { Animated } from "react-native";
const { View } = Animated;

interface MyProps<T> {
  yKey: string;
  xKey: string;
  data: T[];
  width: number;
  height: number;
  topPadding: number;
  bottomPadding: number;
  leftPadding: number;
  rightPadding: number;
  strokeWidth: number;
  xInner: number;
  xOuter: number;
  yInner: number;
  yOuter: number;
  color?: string;
}
interface MyState {}

class Chart<T> extends React.Component<MyProps<T>, MyState> {
  path: string;
  xAxis: string;
  yAxis: string;
  constructor(props: MyProps<T>) {
    super(props);
  }
  setPath(): void {
    const {
      data,
      height,
      width,
      topPadding,
      bottomPadding,
      leftPadding,
      rightPadding,
      xInner,
      xOuter,
      yInner,
      yOuter,
      xKey,
      yKey
    } = this.props;
    const { path, xAxis, yAxis } = createLineGraph(
      data,
      width - leftPadding - rightPadding,
      height - topPadding - bottomPadding,
      xKey,
      yKey,
      xInner,
      xOuter,
      yInner,
      yOuter
    );
    this.path = path;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
  }
  componentDidMount() {
    this.setPath();
  }
  componentDidUpdate() {
    this.setPath();
  }
  render() {
    const {
      data,
      height,
      width,
      topPadding,
      bottomPadding,
      leftPadding,
      rightPadding,
      strokeWidth,
      color,
      xInner,
      xOuter,
      yInner,
      yOuter
    } = this.props;
    if (!data) {
      return null;
    }
    return (
      <View>
        <Draggable />
        <MySurface
          width={width}
          height={height}
          topPadding={topPadding}
          bottomPadding={bottomPadding}
          leftPadding={leftPadding}
          rightPadding={rightPadding}
        >
          <React.Fragment>
            <AnimShape
              d={() => this.path}
              color={color}
              strokeWidth={strokeWidth}
            />
            <Axis
              x={-(yInner + yOuter)}
              y={topPadding}
              d={() => this.yAxis}
              color={color}
              strokeWidth={strokeWidth}
            />
            <Axis
              x={-(xInner + xOuter)}
              y={topPadding}
              d={() => this.xAxis}
              color={color}
              strokeWidth={strokeWidth}
            />
          </React.Fragment>
        </MySurface>
      </View>
    );
  }
}

export { Chart };
