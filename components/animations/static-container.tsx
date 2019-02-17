import React from "react";

interface MyProps {
  isAnimating: boolean;
  children: JSX.Element;
}
interface MyState {}

class StaticContainer extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps: MyProps): boolean {
    return nextProps.isAnimating;
  }
  render() {
    const { children } = this.props;
    return children;
  }
}

export { StaticContainer };
