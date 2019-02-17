// Snippet based on https://github.com/hswolff/BetterWeather/blob/master/js/weather/graph-utils.js
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as d3Array from "d3-array";
import { createScaleX } from "./create-scales";
import { Graph } from "../models/Graph";

const d3 = {
  scale,
  shape
};
export function createLineGraph<T>(
  // This is the data that we get from the API.
  data: T[],
  width: number,
  height: number,
  xKey: string,
  yKey: string
): Graph {

  // Get last and first item in the array.
  const lastDatum = data[data.length - 1];
  const firstDatum = data[0];

  // Create our x-scale.
  const scaleX = createScaleX(firstDatum[xKey], lastDatum[xKey], width);

  // Collect all y values.
  const allYValues = data.reduce<number[]>((all, datum) => {
    all.push(datum[yKey]);
    return all;
  }, []);

  // Get the min and max y value.
  const extentY = d3Array.extent(allYValues);

  let scaleY: scale.ScaleLinear<number, number>;
  if (extentY[0]) {
    // Create our y-scale.
    scaleY = scale
      .scaleLinear()
      .domain([extentY[0], extentY[1]])
      .range([0, height])
      .clamp(true);
  }

  let lineShape: shape.Line<T>;
  // Use the d3-shape line generator to create the `d={}` attribute value.
  lineShape = d3.shape
    .line<T>()
    // For every x and y-point in our line shape we are given an item from our
    // array which we pass through our scale function so we map the domain value
    // to the range value.
    .x(d => scaleX(d[xKey]))
    .y(d => scaleY(d[yKey]));
  return {
    // Pass in our array of data to our line generator to produce the `d={}`
    // attribute value that will go into our `<Shape />` component.
    path: lineShape(data)
  };
}
