import isUndefined from 'lodash/isUndefined';
import get from 'lodash/get';
import shortid from 'shortid';
import * as Graph from '../types/Graph';
import {
  processJson,
  processNodeEdgeCsv,
  processEdgeListCsv,
  validateMotifJson,
} from './data-processors';

export type ImportFormat = JsonImport | EdgeListCsv | NodeEdgeCsv;

export type JsonImport = {
  data: Graph.GraphData | Graph.GraphList;
  type: 'json';
};

export type EdgeListCsv = {
  data: string;
  type: 'edgeListCsv';
};

export type NodeEdgeCsv = {
  data: {
    nodeData: string;
    edgeData: string;
  };
  type: 'nodeEdgeCsv';
};

export const OPTIONS = {
  json: { label: 'Json', id: 'json' },
  edgeListCsv: { label: 'Edge List Csv', id: 'edgeListCsv' },
  nodeEdgeCsv: { label: 'Node Edge Csv (2 Files)', id: 'nodeEdgeCsv' },
};

/**
 * Initial function to process json object with node, edge fields or motif json to required format
 * Parse and generates metadata fields
 *
 * @param {Graph.GraphData} data
 * @param {Graph.Accessors} accessors
 * @return {*} {Promise<Graph.GraphList>}
 */
export const importJson = async (
  json: Graph.GraphData | Graph.GraphList,
  accessors: Graph.Accessors,
): Promise<Graph.GraphList> => {
  const results = [];
  const jsonArray = Array.isArray(json) ? json : [json];
  for (const data of jsonArray) {
    if (validateMotifJson(data)) return jsonArray;
    // eslint-disable-next-line no-await-in-loop
    const processedData = await processJson(
      data,
      data?.key || data?.metadata?.key,
    );
    results.push(addRequiredFields(processedData, accessors));
  }
  return results;
};

/**
 * Initial function to process edge list csv
 * Parse and generates metadata fields
 *
 * @param {string} csv
 * @param {Graph.Accessors} accessors
 * @return {*}  {Promise<Graph.GraphData>}
 */
export const importEdgeListCsv = async (
  csv: string,
  accessors: Graph.Accessors,
): Promise<Graph.GraphData> => {
  const processedData = await processEdgeListCsv(csv);
  const results = addRequiredFields(processedData, accessors);
  return results;
};

/**
 * Initial function to process node edge csv
 * Parse and generates metadata fields
 *
 * @param {string} nodeCsv
 * @param {string} edgeCsv
 * @param {Graph.Accessors} accessors
 * @return {*}  {Promise<Graph.GraphData>}
 */
export const importNodeEdgeCsv = async (
  nodeCsv: string,
  edgeCsv: string,
  accessors: Graph.Accessors,
): Promise<Graph.GraphData> => {
  const processedData = await processNodeEdgeCsv(nodeCsv, edgeCsv);
  const results = addRequiredFields(processedData, accessors);
  return results;
};

export const addRequiredFields = (
  processedData: Graph.GraphData,
  accessors: Graph.Accessors,
) => {
  const { edgeSource, edgeTarget, edgeID, nodeID } = accessors;
  const data = processedData;
  for (const node of data.nodes) {
    // data property required by graphin
    if (isUndefined(node.data)) node.data = {};
    // eslint-disable-next-line no-nested-ternary
    node.id = isUndefined(nodeID)
      ? isUndefined(node.id)
        ? shortid.generate()
        : node.id
      : get(node, nodeID);
  }
  for (const edge of data.edges) {
    // data property required by graphin
    if (isUndefined(edge.data)) edge.data = {};
    // source, target are required
    edge.source = get(edge, edgeSource);
    edge.target = get(edge, edgeTarget);
    // eslint-disable-next-line no-nested-ternary
    edge.id = isUndefined(edgeID)
      ? isUndefined(edge.id)
        ? shortid.generate()
        : edge.id
      : get(edge, edgeID);
  }
  return data;
};
