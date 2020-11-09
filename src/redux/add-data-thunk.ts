import some from 'lodash/some';
import isUndefined from 'lodash/isUndefined';
import { getGraph, getAccessors } from './combine-reducers';
import * as Graph from '../types/Graph';

import { fetchBegin, fetchError, fetchDone } from './ui-slice';
import { addQuery, processGraphResponse } from './graph-slice';
import {
  OPTIONS as IMPORT_OPTIONS,
  ImportFormat,
  importEdgeListCsv,
  importNodeEdgeCsv,
  importJson,
} from '../processors/import-data';

const checkNewData = (
  graphList: Graph.GraphList,
  newData: Graph.GraphData,
): boolean => {
  if (isUndefined(newData.metadata)) {
    // eslint-disable-next-line no-param-reassign
    newData.metadata = {
      key: 'abc',
    };
  }
  const graphListKeys = graphList.map((graph) => graph.metadata.key);
  return newData && !some(graphListKeys, (key) => key === newData.metadata.key);
};

const checkEdgeTime = (edgeTime: string): boolean => !isUndefined(edgeTime);

const processResponse = (
  dispatch: any,
  graphList: Graph.GraphList,
  accessors: Graph.Accessors,
  newData: Graph.GraphData | Graph.GraphList,
) => {
  dispatch(fetchBegin());
  for (const data of Array.isArray(newData) ? newData : [newData]) {
    // Check edges for new data as it might just be repeated
    if (checkNewData(graphList, data)) {
      dispatch(addQuery(data));
      dispatch(processGraphResponse({ data, accessors }));
      dispatch(fetchDone());
    } else {
      dispatch(fetchDone());
      throw new Error('Data has already been imported');
    }
  }
};

type ImportAccessors = Graph.Accessors | null;

/**
 * Thunk to add data to graph - processes JSON / CSV and add to graphList
 * Input can either be a single GraphData object or an array of GraphData
 *
 * @param {ImportFormat} importData
 * @param {ImportAccessors} [importAccessors=null] to customize node Id / edge Id / edge source or target
 */
export const addData = (
  importData: ImportFormat,
  importAccessors: ImportAccessors = null,
) => (dispatch: any, getState: any) => {
  const { data, type } = importData;
  const {
    graphList,
    accessors: mainAccessors,
    defaultNodeStyle,
    defaultEdgeStyle,
  } = getGraph(getState());
  // Use importAccessors if available to do initial mapping
  const accessors = { ...mainAccessors, ...importAccessors };
  const styles = { defaultNodeStyle, defaultEdgeStyle };
  let newData: Promise<Graph.GraphData> | Promise<Graph.GraphList>;

  if (type === IMPORT_OPTIONS.json.id) {
    newData = importJson(
      data as Graph.GraphData | Graph.GraphList,
      accessors,
      styles,
    );
  } else if (type === IMPORT_OPTIONS.nodeEdgeCsv.id) {
    const { nodeData, edgeData } = data as {
      nodeData: string;
      edgeData: string;
    };
    newData = importNodeEdgeCsv(nodeData, edgeData, accessors, styles);
  } else if (type === IMPORT_OPTIONS.edgeListCsv.id) {
    newData = importEdgeListCsv(data as string, mainAccessors, styles);
  } else {
    dispatch(fetchError('Invalid data format'));
  }

  newData
    // @ts-ignore
    .then((graphData: Graph.GraphData | Graph.GraphList) => {
      processResponse(dispatch, graphList, mainAccessors, graphData);
    })
    .catch((err: Error) => {
      dispatch(fetchError(err));
    });
};
