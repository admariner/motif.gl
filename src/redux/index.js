import graphInitReducer from './graphInitSlice';
import graphReducer from './graphSlice';

// Export 2 reducers
export { graphInitReducer, graphReducer };

// Export history group that collapses both actions into 1 undo/redo
export const undoGroup = (action, currentState, previousHistory) => {
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

// Export all actions
export * from './graphInitSlice';
export * from './graphSlice';
