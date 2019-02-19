import React from "react";
import { ART } from "react-native";
const { Surface, Group } = ART;

interface MyProps {
  children: JSX.Element;
  width: number;
  height: number;
  topPadding: number;
  bottomPadding: number;
  leftPadding: number;
  rightPadding: number;
}
interface MyState {}

class MySurface extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
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
