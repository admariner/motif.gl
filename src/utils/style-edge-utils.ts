import get from 'lodash/get';
import produce from 'immer';
import * as Graph from '../types/Graph';

// Assume we can style an edge by its width, color and label
// Each should be able to map to a edge property e.g. value or length or amount
// There might be additional options passed as well e.g. width can be scaled based on different formulas applied to property
// For each property there should be a default action, if for example there is no edge width option passed

/**
 * Style an edge dataset based on a given method
 *
 * @param {Graph.GraphData} data
 * @param {Graph.EdgeStyleOptions} edgeStyleOptions
 * @param {Graph.EdgeStyleAccessors} edgeStyleAccessors
 * @return {*}  {Graph.Edge[]}
 */
export const styleEdges = (
  data: Graph.GraphData,
  edgeStyleOptions: Graph.EdgeStyleOptions,
  edgeStyleAccessors: Graph.EdgeStyleAccessors,
): Graph.Edge[] => {
  // Scales width based on min, max value of edges
  // mode = eth (scale width from 0.5-5) or fix (default value of 0.5)
  const nextData = produce(data, (draftData) => {
    styleEdgeWidth(
      draftData,
      edgeStyleAccessors.width || false,
      edgeStyleOptions.width,
    );
    styleEdgeLabel(draftData, edgeStyleAccessors.label || false);
  });
  return nextData.edges;
};

export const styleEdgeWidth = (
  data: Graph.GraphData,
  accessor: string | boolean,
  option: string,
) => {
  if (typeof accessor === 'string') {
    const { min, max } = getMinMaxValue(data, accessor);
    for (const edge of data.edges) {
      let w = 2; // default
      // For standard edge
      if (option === 'value' && typeof get(edge, accessor) === 'number') {
        w = ((get(edge, accessor) - min) / (max - min)) * (10 - 2) + 2;
      }
      // For grouped edge
      if (option === 'value' && Array.isArray(get(edge, accessor))) {
        w =
          (((get(edge, accessor) as number[]).reduce((a, b) => a + b, 0) -
            min) /
            (max - min)) *
            (10 - 2) +
          2;
      }
      edge.style.line = {
        width: w,
      };
    }
  }
};

export const styleEdgeLabel = (
  data: Graph.GraphData,
  accessor: string | boolean,
) => {
  if (typeof accessor === 'string') {
    for (const edge of data.edges) {
      edge.label = get(edge, accessor).toString();
    }
  }
};

type MinMax = {
  min: number;
  max: number;
};

/**
 * Check edge.data.value is array to determine if it is grouped
 *
 * @param {Graph.Edge} edge
 * @param {string} edgeWidth accesor function that maps to edge width
 */
export const isGroupEdges = (edge: Graph.Edge, edgeWidth: string) =>
  Array.isArray(get(edge, edgeWidth));

/**
 * Get minimum and maximum value of attribute that maps to edge width
 *
 * @param {Graph.GraphData} data
 * @param {string} edgeWidth accesor string that maps to edge width
 * @return {*}  {MinMax}
 */
export const getMinMaxValue = (
  data: Graph.GraphData,
  edgeWidth: string,
): MinMax => {
  const arrValue = [];
  for (const edge of data.edges) {
    if (isGroupEdges(edge, edgeWidth)) {
      // isGroupEdges ensures that it is of type number[]. Sum all values in array
      arrValue.push(
        (get(edge, edgeWidth) as number[]).reduce((a, b) => a + b, 0),
      );
    } else {
      arrValue.push(get(edge, edgeWidth));
    }
  }
  return {
    min: Math.min(...(arrValue as number[])),
    max: Math.max(...(arrValue as number[])),
  };
};
