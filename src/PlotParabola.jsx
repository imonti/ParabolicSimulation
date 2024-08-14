import * as d3 from "d3";

const PI2 = Math.PI * 2;
const gravity = -9.81;
const stepCount = 30;

export default function plotParabola([radius, radSec, angle]) {
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

  const ex = d3.extent(xs);
  const ey = d3.extent(ys);

  return { xs, ys, ex, ey };
}
