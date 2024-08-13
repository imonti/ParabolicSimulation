import * as d3 from "d3";
import { useRef, useEffect } from "react";

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
  const data = plotParabola(0.2, 20, 20);
  const x_set = data.xs;
  const y_set = data.ys;

  const gx = useRef();
  const gy = useRef();
  const x = d3.scaleLinear(d3.extent(x_set), [marginLeft, width - marginRight]);
  const y = d3.scaleLinear(d3.extent(y_set), [
    height - marginBottom,
    marginTop,
  ]);
  const line = d3
    .line()
    .x((d, i) => x(x_set[i]))
    .y((d) => y(d));
  useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), []);
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), []);
  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(y_set)}
      />
    </svg>
  );
}

function plotParabola(radius, radSec, angle) {
  const circumference = PI2 * radius;
  const releaseVelocity = circumference * (radSec / PI2);
  const releaseAngle = (angle / 360) * PI2;
  // decompose
  const viy = Math.sin(releaseAngle) * releaseVelocity;
  const vix = Math.cos(releaseAngle) * releaseVelocity;
  // compute airborn time
  const deltaT = viy / -(gravity / 2.0);
  const stepT = deltaT / stepCount;
  // compute all x coodrinates
  const distX = vix * deltaT;
  const stepX = distX / stepCount;
  const xs = Array(stepCount + 1)
    .fill(0)
    .map((e, i) => i * stepX);
  // compute all y coordinates
  const ys = Array(stepCount + 1)
    .fill(0)
    .map((e, i) => e + i * stepT)
    .map((dt) => {
      return dt * (viy + (gravity * dt) / 2);
    });

  return { xs, ys };
}
