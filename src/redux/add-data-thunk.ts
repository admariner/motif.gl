import some from 'lodash/some';
import isUndefined from 'lodash/isUndefined';
import { getGraph, getAccessors } from './combine-reducers';
import * as Graph from '../types/Graph';

import {
  fetchBegin,
  fetchError,
  fetchDone,
  setTimeLock,
  setBottomOpen,
} from './ui-slice';
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
  const { edgeTime } = accessors;
  dispatch(fetchBegin());
  // Check if TimeBar should be opened
  if (checkEdgeTime(edgeTime)) {
    dispatch(setBottomOpen(true));
  } else {
    dispatch(setTimeLock());
  }
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

/**
 * Thunk to add data to graph - processes JSON / CSV and add to graphList
 * Input can either be a single GraphData object or an array of GraphData
 *
 * @param {ImportFormat} importData Json, Edge-list csv or Node edge csv
 */
export const addData = (importData: ImportFormat) => (
  dispatch: any,
  getState: any,
) => {
  const { data, type } = importData;
  const { graphList } = getGraph(getState());
  const accessors = getAccessors(getState());
  let newData: Promise<Graph.GraphData> | Promise<Graph.GraphList>;
  if (type === IMPORT_OPTIONS.json) {
    newData = importJson(data as Graph.GraphData | Graph.GraphList, accessors);
  } else if (type === IMPORT_OPTIONS.nodeEdgeCsv) {
    dispatch(fetchError('CSV import not yet implemented'));
  } else if (type === IMPORT_OPTIONS.edgeListCsv) {
    newData = importEdgeListCsv(data as string, accessors);
  } else {
    dispatch(fetchError('Invalid data format'));
  }

  newData
    // @ts-ignore
    .then((graphData: Graph.GraphData | Graph.GraphList) => {
      processResponse(dispatch, graphList, accessors, graphData);
    })
    .catch((err: Error) => dispatch(fetchError(err)));
};
