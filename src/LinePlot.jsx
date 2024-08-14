import * as d3 from "d3";
import { useRef, useEffect, useContext } from "react";
import { DataContext } from "./Provider";

const PI2 = Math.PI * 2;
const gravity = -9.81;
const stepCount = 20;

export default function LinePlot({
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40,
}) {
  const { sets } = useContext(DataContext);

  const extentX = d3.extent(
    sets.reduce((prev, curr) => {
      prev.push(...curr.ex);
      return prev;
    }, [])
  );

  const extentY = d3.extent(
    sets.reduce((prev, curr) => {
      prev.push(...curr.ey);
      return prev;
    }, [])
  );

  const gx = useRef();
  const gy = useRef();
  const x = d3.scaleLinear(extentX, [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(extentY, [height - marginBottom, marginTop]);

  const lines = sets.map((plot) => {
    const xSet = plot.xs;
    const ySet = plot.ys;
    const line = d3
      .line()
      .x((d, i) => x(xSet[i]))
      .y((d) => y(d));
    return line(ySet);
  });
  useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), []);
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), []);
  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      {lines.map((line) => (
        <path fill="none" stroke="#FF0000" strokeWidth="1.5" d={line} />
      ))}
    </svg>
  );
}
