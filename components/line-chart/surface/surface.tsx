import React from "react";
import { ART } from "react-native";
const { Surface, Group } = ART;
import { Graph } from "../models/Graph";

interface MyProps {
  children: JSX.Element;
  width: number;
  height: number;
  topPadding: number;
  bottomPadding: number;
  leftPadding: number;
  rightPadding: number;
}
interface MyState {
  graph: () => Graph;
}

class MySurface extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
    this.state = {
      graph: () => ({ path: "" })
    };
  }
  render() {
    const { children, height, width, topPadding, leftPadding } = this.props;
    return (
      <Surface width={width} height={height}>
        <Group x={leftPadding} y={topPadding}>
          {children}
        </Group>
      </Surface>
    );
  }
}

export { MySurface };
