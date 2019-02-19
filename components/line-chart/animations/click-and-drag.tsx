import React from "react";
import { Animated, PanResponder, StyleSheet } from "react-native";

type MyProps = {};

type MyState = {
  pan: any;
  cssTransform: any;
};


const CIRCLE_SIZE = 25;

class Draggable extends React.Component<MyProps, MyState> {
  _handleStartShouldSetPanResponder = (event, gestureState): boolean => {
    // Should we become active when the user presses down on the circle?
    return true;
  };

  _handleMoveShouldSetPanResponder = (event, gestureState): boolean => {
    // Should we become active when the user moves a touch over the circle?
    return true;
  };

  _handlePanResponderGrant = (event, gestureState) => {
    this._highlight();
  };

  _handlePanResponderMove = (event, gestureState) => {
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this._updateNativeStyles();
  };

  _handlePanResponderEnd = (event, gestureState) => {
    this._unHighlight();
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  };

  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
    onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
    onPanResponderGrant: this._handlePanResponderGrant,
    onPanResponderMove: this._handlePanResponderMove,
    onPanResponderRelease: this._handlePanResponderEnd,
    onPanResponderTerminate: this._handlePanResponderEnd
  });

  _previousLeft: number = 0;
  _previousTop: number = 0;
  _circleStyles = { style: {} };
  circle: any;

  UNSAFE_componentWillMount() {
    this._previousLeft = 20;
    this._previousTop = 84;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
        backgroundColor: "green"
      }
    };
  }

  componentDidMount() {
    this._updateNativeStyles();
  }

  _highlight() {
    this._circleStyles.style.backgroundColor = "blue";
    this._updateNativeStyles();
  }

  _unHighlight() {
    this._circleStyles.style.backgroundColor = "green";
    this._updateNativeStyles();
  }
  _updateNativeStyles() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.Value(0),
      cssTransform: new Animated.Value(0)
    };
  }

  render() {
    return (
      <Animated.View
        hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
        ref={circle => {
          this.circle = circle;
        }}
        style={styles.circle}
        {...this._panResponder.panHandlers}
      />
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: "absolute",
    zIndex: 9999,
    left: 0,
    top: 0
  },
  container: {
    flex: 1,
    paddingTop: 64
  }
});

export { Draggable };
