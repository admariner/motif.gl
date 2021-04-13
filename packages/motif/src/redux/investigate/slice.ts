import { combineReducers } from '@reduxjs/toolkit';
import undoable, { excludeAction, GroupByFunction } from 'redux-undo';
import uiReducer from '../ui';
import widgetReducer from '../widget';
import graphReducer, { GraphState, GraphSlices } from '../graph';
import importReducer from '../import';

// History group that collapses both actions into 1 undo/redo
const undoGroup: GroupByFunction<GraphState> = (
  action,
  _currentState,
  previousHistory,
) => {
  switch (action.type) {
    case 'graph/processGraphResponse':
      return previousHistory.group;
    case 'graph/addQuery':
      if (previousHistory.group !== null) {
        return `addDataGroup${previousHistory.past.length}`;
      }
      return 'addDataGroup';
    default:
      return null;
  }
};

// Enhanced graph reducer
const graphReducerHistory = undoable(graphReducer, {
  filter: excludeAction([GraphSlices.setAccessors.type]),
  groupBy: undoGroup,
});

// Export combined reducers
const investigateReducer = combineReducers({
  ui: uiReducer,
  widget: widgetReducer,
  graph: graphReducerHistory,
  import: importReducer,
});
export default investigateReducer;
