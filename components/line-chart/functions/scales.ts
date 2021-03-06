import * as scale from "d3-scale";

export function createScaleX(
  start: number,
  finish: number,
  range: number
): scale.ScaleLinear<any, any> {
  return scale
    .scaleLinear<any, any>()
    .domain([start, finish])
    .range([0, range])
    .clamp(true);
}
