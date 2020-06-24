import some from 'lodash/some';

import {
  fetchBegin,
  fetchError,
  fetchDone,
  postMessage,
  setBottomOpen,
  closeImportModal,
} from '../redux/graphInitSlice';
import {
  addQuery,
  processGraphResponse,
} from '../redux/graphSlice';
import { processData } from '../Utilities/utils';

// API Methods
const checkMetaData = (newData) => {
  const metadata = newData.metadata;
  if (metadata) {
    return metadata.search_size > metadata.retrieved_size;
  }
  return false;
};

const checkNewData = (graphList, newData) => {
  const graphListKeys = graphList.map(graph => graph.metadata.key);
  return (
    newData &&
    !some(graphListKeys, key => key === newData.metadata.key) &&
    newData.edges.length > 0
  );
};

const processResponse = (dispatch, graphList, newData) => {
  dispatch(fetchBegin());
  if (checkMetaData(newData)) {
    const message = `${metadata.retrieved_size} / ${metadata.search_size} of the most recent transactions retrieved.
        We plan to allow large imports and visualization in the full version.
        Feel free to reach out to timothy at timothy.lin@cylynx.io if you are interesting in retrieving the full results.`;
    dispatch(postMessage(message));
  }
  // Need to check edges for new data as it might just return nodes and repetition
  if (checkNewData(graphList, newData)) {    
    dispatch(addQuery(newData));
    dispatch(processGraphResponse(newData));
    dispatch(fetchDone());
    dispatch(setBottomOpen(true));
    dispatch(closeImportModal());
  } else {
    dispatch(fetchDone());
    throw new Error('Data has already been imported');
  }
};

// Asynchronous forEach to ensure graph renders in a nice circle
const waitFor = ms => new Promise(r => setTimeout(r, ms));

async function asyncForEach(array, callback) {
  for (const item of array) {
    await callback(item);
  }
};

// One function to rule them all
// Thunk to dispatch our calls
export const addData = data => (dispatch, getState) => {  
  const graphList = getState().graph.present.graphList;
  if (Array.isArray(data)) {
    asyncForEach(data, async graph => {
      try {
        await waitFor(0);
        processResponse(dispatch, graphList, processData(graph));
      } catch(err) {
        dispatch(fetchError(err));
      }        
    });  
  } else {
    try {
      processResponse(dispatch, graphList, processData(data));      
    } catch {
      dispatch(fetchError(err));
    }   
  }
  
}