import { ScaleLinear } from "d3-scale";

export interface XAxisType {
  outerTick: number;
  innerTick: number;
  xPoints: number[];
  scaleX: ScaleLinear<number, number>;
  xKey: string;
}
export interface YAxisType {
  outerTick: number;
  innerTick: number;
  yPoints: number[];
  scaleY: ScaleLinear<number, number>;
  yKey: string;
}

export function axisSequentialScale(props: XAxisType): string {
  let { outerTick, innerTick, xPoints, scaleX, xKey } = props;
  let xString: string;
  xString = `M0,${0}`;
  for (var i = 0; i <= xPoints.length - 1; i++) {
    xString = xString + `H${scaleX(xPoints[i][xKey])}`;
    xString = xString + `v${outerTick}`;
    xString = xString + `v-${outerTick}`;
    xString = xString + `v-${innerTick}`;
    xString = xString + `v${innerTick}`;
  }
  return xString;
}

export function axisContinuousScale(
  minValue: number,
  maxValue: number,
  totalDist: number,
  minDist: number,
  scale: ScaleLinear<number, number>,
  innerTick = 10,
  outerTick = 10
): string {
  var divider = Math.floor(totalDist / minDist);
  var noPoints = divider + 1;
  let newArray: number[] = [];
  var difference = maxValue - minValue;
  for (let i = noPoints; i >=  0; i--) {
    newArray.unshift(minValue + (difference * i) / (noPoints));
  }
  let yString: string;
  yString = `M0,${0}`;
  for (var i = 0; i <= newArray.length - 1; i++) {
    yString = yString + `V${scale(newArray[i])}`;
    // yString = yString + `V${scale(newArray[i][yKey] || newArray[i])}`;
    yString = yString + `h${outerTick}`;
    yString = yString + `h-${outerTick}`;
    yString = yString + `h-${innerTick}`;
    yString = yString + `h${innerTick}`;
  }
  return yString;
}
