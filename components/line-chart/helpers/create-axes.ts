import { ScaleLinear } from "d3-scale";

export interface AxisType {
  outerTick: number;
  innerTick: number;
  xPoints: number[];
  scaleX: ScaleLinear<number, number>;
  xKey: string;
}

export function getXAxis(props: AxisType): string {
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
