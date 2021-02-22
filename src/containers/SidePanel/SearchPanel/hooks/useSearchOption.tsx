import { useDispatch, useSelector } from 'react-redux';
import { Value } from 'baseui/select';
import {
  GraphSlices,
  GraphSelectors,
  GraphAttribute,
  SearchOptionPayload,
  SearchResultPayload,
  Node,
  EdgeInformation,
} from '../../../../redux/graph';
import { IUseSearchOptions } from '../types';
import { RootState } from '../../../../redux/investigate';

const useSearchOption = (): IUseSearchOptions => {
  const dispatch = useDispatch();
  const searchOptions = useSelector((state: RootState) =>
    GraphSelectors.getSearchOptions(state),
  );

  const updateNodeSearch = (value: Value): void => {
    const payload: SearchOptionPayload = {
      key: 'nodeSearchCase',
      value,
    };

    dispatch(GraphSlices.updateSearchOptions(payload));
  };

  const updateEdgeSearch = (value: Value): void => {
    const payload: SearchOptionPayload = {
      key: 'edgeSearchCase',
      value,
    };

    dispatch(GraphSlices.updateSearchOptions(payload));
  };

  const updateNodeResults = (results: Node[]): void => {
    const payload: SearchResultPayload = {
      value: results,
    };

    dispatch(GraphSlices.updateNodeResults(payload));
  };

  const updateEdgeResults = (results: EdgeInformation[]): void => {
    const payload: SearchResultPayload = {
      value: results,
    };

    dispatch(GraphSlices.updateEdgeResults(payload));
  };

  const updateTabs = (activeTab: GraphAttribute): void => {
    const payload: SearchOptionPayload = {
      key: 'activeTabs',
      value: activeTab,
    };

    dispatch(GraphSlices.updateSearchOptions(payload));
  };

  return {
    searchOptions,
    updateNodeSearch,
    updateEdgeSearch,
    updateTabs,
    updateNodeResults,
    updateEdgeResults,
  };
};

export default useSearchOption;
