import * as scale from "d3-scale";

export function createScaleX(
  start: number,
  finish: number,
  range: number
): scale.ScaleLinear<number, number> {
  return scale
    .scaleLinear()
    .domain([start, finish])
    .range([0, range])
    .clamp(true);
}
