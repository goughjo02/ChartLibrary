// Snippet based on https://github.com/hswolff/BetterWeather/blob/master/js/weather/graph-utils.js
import * as scale from "d3-scale";
import * as shape from "d3-shape";
import * as d3Array from "d3-array";
import { Data } from "../components/surface/surface";
import { createScaleX } from "./create-scales";

const d3 = {
  scale,
  shape
};
export interface LineType {
  path: string;
}
export function createLineGraph(
  // This is the data that we get from the API.
  data: Data[],
  width: number,
  height: number
): LineType {

  // Get last item in the array.
  const lastDatum = data[data.length - 1];

  // Create our x-scale.
  const scaleX = createScaleX(data[0].Year, lastDatum.Year, width);

  // Collect all y values.
  const allYValues = data.reduce<number[]>((all, datum) => {
    all.push(datum.Mean);
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

  let lineShape: shape.Line<Data>;
  // Use the d3-shape line generator to create the `d={}` attribute value.
  lineShape = d3.shape
    .line<Data>()
    // For every x and y-point in our line shape we are given an item from our
    // array which we pass through our scale function so we map the domain value
    // to the range value.
    .x(d => scaleX(d.Year))
    .y(d => scaleY(d.Mean));
  return {
    // Pass in our array of data to our line generator to produce the `d={}`
    // attribute value that will go into our `<Shape />` component.
    path: lineShape(data)
  };
}
