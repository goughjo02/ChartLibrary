import React from "react";
import { createLineGraph } from "../functions/line-graph";
import { MySurface } from "./surface/surface";
import { Draggable } from "../animations/click-and-drag";
import { AnimatedElement } from "./elements/animated";
import { StaticElement } from "./elements/static";
import { Animated } from "react-native";
import { ScaleLinear } from "d3-scale";
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
  surfaceColor: string;
  color?: string;
}
interface MyState {}

class Chart<T> extends React.Component<MyProps<T>, MyState> {
  path: string;
  xAxis: string;
  yAxis: string;
  scaleX: ScaleLinear<number, number>;
  scaleY: ScaleLinear<number, number>;
  constructor(props: MyProps<T>) {
    super(props);
    this.state = {};
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
    const { path, xAxis, yAxis, scaleX, scaleY } = createLineGraph(
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
    this.scaleX = scaleX;
    this.scaleY = scaleY;
  }
  componentDidMount() {
    this.setPath();
  }
  componentDidUpdate() {
    this.setPath();
  }
  render() {
    this.setPath();
    const {
      data,
      height,
      width,
      topPadding,
      bottomPadding,
      leftPadding,
      strokeWidth,
      surfaceColor,
      color,
      xInner,
      yInner
    } = this.props;
    if (!data) {
      return null;
    }
    return (
      <View width={width} height={height}>
        <Draggable height={height} width={width} dString={this.path} scaleX={this.scaleX} scaleY={this.scaleY} />
        <MySurface color={surfaceColor} width={width} height={height}>
          <React.Fragment>
            <AnimatedElement
              d={() => this.path}
              x={leftPadding}
              y={topPadding}
              color={color}
              strokeWidth={strokeWidth}
            />
            <StaticElement
              x={leftPadding - yInner}
              y={topPadding}
              d={() => this.yAxis}
              color={color}
              strokeWidth={strokeWidth}
            />
            <StaticElement
              x={leftPadding}
              y={height - bottomPadding + xInner}
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
