import React from "react";
import { ART } from "react-native";
const { Surface, Group, Shape } = ART;

export interface Data {
  Mean: number;
  Source: string;
  year: number;
}

interface MyProps {
  children?: JSX.Element;
  data?: Data[];
  width: number;
  height: number;
}

const MySurface = (props: MyProps) => {
  const { width, height } = props;
  return (
    <Surface width={width} height={height}>
      <Group x={0} y={0}>
        <Shape
          d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
          stroke="#00f"
          strokeWidth={10}
        />
      </Group>
    </Surface>
  );
};

export { MySurface as Surface };
