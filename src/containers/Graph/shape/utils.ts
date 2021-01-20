/* https://github.com/antvis/Graphin/blob/master/packages/graphin/src/shape/graph-studio/utils.ts */
/* eslint-disable import/prefer-default-export */
import { transparentize, lighten, desaturate } from 'polished';
import { ArrowOptions } from '../../../redux/graph';

export interface NormalizedColor {
  dark: string;
  normal: string;
  reflect: string;
}

export interface EndArrow {
  d: number;
  path: string;
}

export const normalizeColor = (
  rgb: string | [number, number, number] | NormalizedColor,
): NormalizedColor => {
  if (Array.isArray(rgb)) {
    const color = `rgba(${rgb.join(',')}, 1)`;
    return {
      dark: desaturate(0.1, lighten(0.1, color)),
      normal: color,
      reflect: transparentize(0.9, color),
    };
  }
  if (typeof rgb === 'string') {
    return {
      dark: desaturate(0.1, lighten(0.1, rgb)),
      normal: rgb,
      reflect: transparentize(0.9, rgb),
    };
  }
  return rgb as NormalizedColor;
};

export type EdgePattern = null | 'dot' | 'dash' | 'dash-dot';

export const mapEdgePattern = (str: EdgePattern) => {
  let result: null | number[] = null;
  // eslint-disable-next-line no-empty
  if (str === null) {
  } else if (str === 'dot') {
    result = [1, 1];
  } else if (str === 'dash') {
    result = [5, 5];
  } else if (str === 'dash-dot') {
    result = [4, 2, 1, 2];
  } else {
    // eslint-disable-next-line no-console
    console.warn(`Edge pattern ${str} not supported`);
  }
  return result;
};

/**
 * Process arrow options attributes with given data from `defaultStyle` in Edges.
 * - the end arrow will always be display on default unless user choose to hide
 *
 * @param {undefined|ArrowOptions} arrowOption
 */
export const processArrowOption = (arrowOption: undefined | ArrowOptions) => {
  return arrowOption || 'display';
};

/**
 * Determine whether graph should display edge's arrow.
 *
 * @param {ArrowOptions|boolean} arrowOptions - obtain arrow configuration from option panels
 * @param {EndArrow} endArrow - end arrow styling
 */
export const isArrowDisplay = (
  arrowOptions: ArrowOptions | boolean,
  endArrow: EndArrow,
) => {
  if (arrowOptions === 'none') {
    return false;
  }

  if (arrowOptions === true || arrowOptions === 'display') {
    return endArrow;
  }

  return endArrow;
};
