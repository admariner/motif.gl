/* eslint-disable no-shadow */
// Adapted from: https://github.com/keplergl/kepler.gl/blob/master/src/components/common/range-plot.js

import React, { useState, useCallback, useMemo } from 'react';
import { Block } from 'baseui/block';
import RangeBrush from './RangeBrush';
import HistogramPlot from './HistogramPlot';
import { Slider } from '../ui';
import { HistogramBin } from '../../utils/data-utils/data-utils';
import NumericAxis from './NumericAxis';
import DateTimeAxis from './DateTimeAxis';
import TimeAxis from './TimeAxis';

export type RangePlotProps = {
  range: [number, number];
  value: [number, number];
  histogram: HistogramBin[];
  dataType: string;
  onChange: ([v0, v1]: [number, number]) => void;
  onFinalChange?: ([v0, v1]: [number, number]) => void;
  xAxisFormat?: string;
  step?: number;
  numTicks?: number;
  size?: 'default' | 'compact';
  height?: number;
  width?: number;
  isRanged?: boolean;
  [key: string]: any;
};

export type Ticks = {
  pos: number;
  value: any;
};

const RangePlot = ({
  range,
  value,
  histogram,
  onChange,
  onFinalChange,
  xAxisFormat,
  step = 0.01,
  numTicks,
  size = 'default',
  height: inputHeight = null,
  width: inputWidth = null,
  isRanged = true,
  dataType,
  ...chartProps
}: RangePlotProps) => {
  const [brushing, setBrushing] = useState(false);
  const [hoveredDP, onMouseMove] = useState(null);
  const [enableChartHover, setEnableChartHover] = useState(false);

  const height: number = useMemo(() => {
    if (inputHeight) return inputHeight;
    if (size === 'default') return 100;

    return 60;
  }, [inputHeight, size]);

  const width: number = useMemo(() => {
    if (inputWidth) return inputWidth;
    if (size === 'default') return 420;

    return 150;
  }, [inputWidth, size]);

  const onBrushStart = useCallback(() => {
    setBrushing(true);
    onMouseMove(null);
    setEnableChartHover(false);
  }, [setBrushing, onMouseMove, setEnableChartHover]);

  const onBrush = useCallback(
    (v0: number, v1: number) => {
      if (onChange) {
        onChange([v0, v1]);
      }
    },
    [onChange],
  );

  const onChangeSlider = useCallback(
    (value: [number, number]) => {
      if (value) {
        setBrushing(false);
        onMouseMove(null);
        setEnableChartHover(false);
      }
      if (value && onChange) {
        onChange(value);
      }
    },
    [setBrushing, onMouseMove, setEnableChartHover, onChange],
  );

  const onBrushEnd = useCallback(
    (v0: number, v1: number) => {
      setBrushing(false);
      setEnableChartHover(true);
      if (onFinalChange) {
        onFinalChange([v0, v1]);
      }
    },
    [setBrushing, setEnableChartHover, onFinalChange],
  );

  const onFinalChangeSlider = useCallback(
    (value: [number, number]) => {
      setBrushing(false);
      setEnableChartHover(true);
      if (onFinalChange) {
        onFinalChange(value);
      }
    },
    [setBrushing, setEnableChartHover, onFinalChange],
  );

  const onMouseoverHandle = useCallback(() => {
    onMouseMove(null);
    setEnableChartHover(false);
  }, [onMouseMove, setEnableChartHover]);

  const onMouseoutHandle = useCallback(() => {
    setEnableChartHover(true);
  }, [setEnableChartHover]);

  const brushComponent = (
    <RangeBrush
      // @ts-ignore
      onBrush={onBrush}
      onBrushStart={onBrushStart}
      onBrushEnd={onBrushEnd}
      range={range}
      value={value}
      step={step}
      width={width}
      height={height}
      isRanged={isRanged}
      onMouseoverHandle={onMouseoverHandle}
      onMouseoutHandle={onMouseoutHandle}
      {...chartProps}
    />
  );

  const commonProps = {
    // to avoid last histogram exceeding container width
    width,
    value,
    height,
    domain: range,
    step,
    brushComponent,
    brushing,
    enableChartHover,
    onMouseMove,
    hoveredDP,
    isRanged,
    ...chartProps,
  };

  const XAxisMemo = useMemo(
    () => (
      <Block position='relative' width={`${width}px`}>
        {(dataType === 'INT' ||
          dataType === 'FLOAT' ||
          dataType === 'NUMBER') && (
          <NumericAxis domain={range} width={width} />
        )}
        {(dataType === 'DATETIME' || dataType === 'DATE') && (
          <DateTimeAxis
            domain={range}
            width={width}
            xAxisFormat={xAxisFormat}
          />
        )}
        {dataType === 'TIME' && <TimeAxis domain={range} width={width} />}
      </Block>
    ),
    [range, dataType],
  );

  const SliderMemo = useMemo(() => {
    let [startRange, endRange] = range;
    let [startValue, endValue] = value;

    const MS_UNIX_TIMESTAMP = 'X';
    if (xAxisFormat === MS_UNIX_TIMESTAMP) {
      startRange /= 1000;
      endRange /= 1000;
      startValue /= 1000;
      endValue /= 1000;
    }

    return (
      <Block marginTop='-15px'>
        <Slider
          value={[startValue, endValue]}
          min={startRange}
          max={endRange}
          step={step}
          onChange={({ value }) => onChangeSlider(value as [number, number])}
          onFinalChange={({ value }) =>
            onFinalChangeSlider(value as [number, number])
          }
          showThumbValue={false}
          showTickBar={false}
        />
      </Block>
    );
  }, [value, range, xAxisFormat]);

  return (
    <Block display='flex' justifyContent='center'>
      <Block height={`${height}px`} width={`${width}px`}>
        <HistogramPlot histogram={histogram} {...commonProps} />
        {SliderMemo}
        {XAxisMemo}
      </Block>
    </Block>
  );
};

export default RangePlot;
