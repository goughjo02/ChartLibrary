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

export function getXAxis(props: XAxisType): string {
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
export function getYAxis(props: YAxisType): string {
  let { outerTick, innerTick, yPoints, scaleY, yKey } = props;
  let yString: string;
  yString = `M0,${0}`;
  for (var i = 0; i <= yPoints.length - 1; i++) {
    yString = yString + `V${scaleY(yPoints[i])}`;
    yString = yString + `h${outerTick}`;
    yString = yString + `h-${outerTick}`;
    yString = yString + `h-${innerTick}`;
    yString = yString + `h${innerTick}`;
  }
  return yString;
}
