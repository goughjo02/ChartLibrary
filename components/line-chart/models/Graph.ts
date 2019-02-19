import { ScaleLinear } from "d3-scale";

export interface Graph {
  path: string;
  xAxis: string;
  yAxis: string;
  scaleX: ScaleLinear<number, number>;
  scaleY: ScaleLinear<number, number>;
}
