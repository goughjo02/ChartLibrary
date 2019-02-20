import React from "react";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import { ScaleLinear } from "d3-scale";
var path = require("svg-path-properties");

type MyProps = {
  height: number;
  width: number;
  scaleX: ScaleLinear<number, number>;
  scaleY: ScaleLinear<number, number>;
  dString: string;
};

type MyState = {
  backgroundColor: string;
};

const CIRCLE_SIZE = 25;

class Draggable extends React.Component<MyProps, any> {
  _panResponder: any;
  listener: any;
  panresponder: any;
  constructor(props) {
    super(props);
    (this.panresponder = new Animated.ValueXY({
      x: new Animated.Value(0),
      y: new Animated.Value(0)
    })),
      (this.state = {
        backgroundColor: "blue",
        cssTransform: new Animated.ValueXY({
          x: new Animated.Value(0),
          y: new Animated.Value(0)
        })
      });
    this.listener = e => {
      // const { currentPageX, currentPageY} = e.nativeEvent.touchHistory;
      const {
        locationX
        // locationY,
        // pageX,
        // pageY
      } = e.nativeEvent;
      const { dString } = this.props;
      if (dString) {
        const properties = path.svgPathProperties(dString);
        const { y } = properties.getPointAtLength(locationX);
        this.state.cssTransform.setValue({
          x: locationX,
          y
        });
      }
    };
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // this.panresponder.setOffset;
        this.setState({
          backgroundColor: "green"
        });
      },
      onPanResponderMove: (e, g) => {
        const dx = this.panresponder["x"];
        const dy = this.panresponder["y"];
        const event = Animated.event(
          [
            null, // raw event arg ignored
            {
              dx,
              dy
            } // gestureState arg
          ],
          {
            listener: this.listener
          }
        );
        event(e, g);
      },
      // (e, gestureState) => {
      //   this.state.panresponder.setValue({
      //     x: gestureState.dx,
      //     y: gestureState.dy
      //   })
      // }
      onPanResponderRelease: () => {
        this.setState({
          backgroundColor: "blue"
        });
      },
      onPanResponderTerminate: () => {
        this.setState({
          backgroundColor: "blue"
        });
      }
    });
  }

  render() {
    const { height, width } = this.props;
    const viewStyle = StyleSheet.create({
      view: {
        height,
        width
      }
    });
    return (
      <View
        style={[styles.holder, viewStyle.view]}
        {...this._panResponder.panHandlers}
      >
        <Animated.View
          hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
          style={{
            backgroundColor: this.state.backgroundColor,
            transform: this.state.cssTransform.getTranslateTransform(),
            ...styles.circle
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  holder: {
    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 99,
    height: "100%",
    flex: 1
  },
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
