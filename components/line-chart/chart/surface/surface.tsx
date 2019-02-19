import React from "react";
import { ART } from "react-native";
const { Surface } = ART;

interface MyProps {
  color: string;
  children: JSX.Element;
  width: number;
  height: number;
}
interface MyState {}

class MySurface extends React.Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props);
  }
  render() {
    const { children, height, width, color } = this.props;
    return (
      <Surface width={width} height={height} style={{ backgroundColor: color }}>
        {children}
      </Surface>
    );
  }
}

export { MySurface };
