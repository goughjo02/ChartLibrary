import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { createLineGraph } from "../functions/line-graph";
import { MySurface } from "./surface/surface";
// import { Draggable } from "../animations/click-and-drag";
var path = require("svg-path-properties");
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
interface MyState {
  // for revolut scroller
  x: any;
}

class Chart<T> extends React.Component<MyProps<T>, MyState> {
  path: string;
  xAxis: string;
  yAxis: string;
  scaleX: ScaleLinear<number, number>;
  scaleY: ScaleLinear<number, number>;
  // for revolut scroller
  cursor: any;
  constructor(props: MyProps<T>) {
    super(props);
    this.state = {
      x: new Animated.Value(0)
    };
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
    this.state.x.addListener(({ value }) => this.moveCursor(value));
    this.moveCursor(0);
  }
  componentDidUpdate() {
    this.setPath();
  }
  handleScroll = (event: Object) => {
    const { x } = event.nativeEvent.contentOffset;
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: { x }
          }
        }
      ],
      { useNativeDriver: true }
    );
  };
  moveCursor(value): void {
    const { x, y } = path.svgPathProperties(this.path);
    this.cursor.current.setNativeProps({ top: y, left: x });
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
    const properties = path.svgPathProperties(this.path);
    const lineLength = properties.getTotalLength();
    return (
      <View width={width} height={height}>
        <ScrollView
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{ width: lineLength * 2 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          onScroll={this.handleScroll}
        >
          {/* <Draggable height={height} width={width} scaleX={this.scaleX} scaleY={this.scaleY} /> */}
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
        </ScrollView>
      </View>
    );
  }
}

export { Chart };
