import React from "react";
import { ART } from "react-native";
const { Surface, Group, Shape } = ART;
import { createLineGraph } from "../../helpers/create-line-graph";

export interface Data {
  Mean: number;
  Source: string;
  Year: number;
}

interface MyProps {
  children?: JSX.Element;
  data: Data[];
  width: number;
  height: number;
}

const MySurface = (props: MyProps) => {
  const { data, height, width } = props;
  return (
    <Surface width={width} height={height}>
      <Group x={0} y={0}>
        <Shape
          d={createLineGraph(data, height, width).path}
          stroke="#00f"
          strokeWidth={10}
        />
      </Group>
    </Surface>
  );
};

export { MySurface as Surface };
