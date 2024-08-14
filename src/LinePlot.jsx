import * as d3 from "d3";
import { useRef, useEffect, useContext, useMemo } from "react";
import { DataContext } from "./Provider";

export default function LinePlot({
  sizePx = 640,
  marginTop = 40,
  marginRight = 40,
  marginBottom = 40,
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

  const m = d3.extent([...extentX, ...extentY]);

  const x = useMemo(() => {
    return d3.scaleLinear(m, [marginLeft, sizePx - marginRight]);
  }, [sizePx, m]);

  const y = useMemo(() => {
    return d3.scaleLinear(m, [sizePx - marginBottom, marginTop]);
  }, [sizePx, m]);

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
    <svg width={sizePx} height={sizePx}>
      <g ref={gx} transform={`translate(0,${sizePx - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      {lines.map((line, i) => (
        <path className="parabola" d={line} key={i} />
      ))}
    </svg>
  );
}
