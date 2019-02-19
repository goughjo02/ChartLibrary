import React from "react";
import { ART } from "react-native";
// import { AnimShape } from "../../animations/anim-shape";
const { Group, Shape } = ART;

interface MyProps {
  d: () => string;
  color: string;
  strokeWidth: number;
  x: number;
  y: number;
}
interface MyState {}

class Axis extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
  }
  render() {
    const { d, color, strokeWidth, x, y } = this.props;
    return (
      <Group x={x} y={y}>
        {/* <AnimShape
            d={d}
            color={color}
            strokeWidth={strokeWidth}
          /> */}
        <Shape d={d()} stroke={color} strokeWidth={strokeWidth} />
      </Group>
    );
  }
}

export { Axis };
