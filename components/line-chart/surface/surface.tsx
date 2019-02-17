import React from "react";
import { ART } from "react-native";
const { Surface, Group } = ART;
import { createLineGraph } from "../helpers/create-line-graph";
import { AnimShape } from "../../animations/anim-shape";
import { Graph } from "../models/Graph";
import { path } from "d3-path";

interface MyProps<T> {
  data: T[];
  width: number;
  height: number;
}
interface MyState {
  graph: () => Graph;
}

class MySurface<T> extends React.Component<MyProps<T>, MyState> {
  constructor(props: MyProps<T>) {
    super(props);
    this.state = {
      graph: () => ({ path: "" })
    };
  }
  render() {
    const { data, height, width } = this.props;
    return (
      <Surface width={width} height={height}>
        <Group x={0} y={0}>
          <AnimShape
            d={() => createLineGraph<T>(data, height, width, "Year", "Mean")}
            color="#00f"
            strokeWidth={10}
          />
        </Group>
      </Surface>
    );
  }
}

export { MySurface as Surface };
