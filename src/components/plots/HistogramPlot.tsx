// Adapted from: https://github.com/keplergl/kepler.gl/blob/master/src/components/common/histogram-plot.js

import React, { useMemo } from 'react';
import { styled } from 'baseui';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { HistogramBin } from '../../utils/data-utils';
import { PRIMARY_COLOR, DARK_GREY } from '../../constants/colors';

export type HistogramPlotProps = {
  width: number;
  height: number;
  isRanged: boolean;
  step: number;
  domain: [number, number];
  histogram: HistogramBin[];
  value: [number, number];
  brushComponent: any;
};

const histogramStyle = {
  highlightW: 0.7,
  unHighlightedW: 0.4,
};

// @ts-ignore
const StyledSvg = styled('svg', ({ $theme, width, height }) => ({
  overflow: 'visible',
  width,
  height,
  marginTop: '8px',
}));

const HistogramPlot = ({
  width,
  height,
  isRanged,
  step,
  histogram,
  domain,
  value,
  brushComponent,
}: HistogramPlotProps) => {
  // value taken from count field
  const getValue = useMemo(() => (d: HistogramBin) => d.count, []);

  const x = useMemo(() => {
    return scaleLinear().domain(domain).range([0, width]);
  }, [domain, width]);

  const y = useMemo(
    () =>
      scaleLinear()
        .domain([0, max(histogram, getValue)])
        .range([0, height]),
    [histogram, height, getValue],
  );

  const barWidth = width / histogram.length;

  return !histogram || !histogram.length ? null : (
    <StyledSvg width={width} height={height}>
      <g className='histogram-bars'>
        {histogram.map((bar: HistogramBin) => {
          const inRange = bar.x1 <= value[1] + step && bar.x0 >= value[0];
          const wRatio = inRange
            ? histogramStyle.highlightW
            : histogramStyle.unHighlightedW;
          const fillColor = inRange ? PRIMARY_COLOR : DARK_GREY;
          return (
            <rect
              fill={fillColor}
              key={bar.x0}
              height={y(getValue(bar))}
              width={barWidth * wRatio}
              x={x(bar.x0) + (barWidth * (1 - wRatio) - barWidth) / 2}
              rx={1}
              ry={1}
              y={height - y(getValue(bar))}
            />
          );
        })}
      </g>
      <g transform={`translate(${isRanged ? 0 : barWidth / 2}, 0)`}>
        {brushComponent}
      </g>
    </StyledSvg>
  );
};

export default HistogramPlot;
