import { createSelector } from '@reduxjs/toolkit';
import { Option } from 'baseui/select';
import produce from 'immer';
import {
  Accessors,
  GraphList,
  GraphData,
  StyleOptions,
  FilterOptions,
  GraphState,
  SearchOptions,
  ItemProperties,
  SearchOptPagination,
  GroupEdges,
} from './types';
import {
  deriveVisibleGraph,
  filterGraph,
  paginateItems,
  getField,
  combineProcessedData,
} from '../../utils/graph-utils/utils';
import { groupEdgesForImportation } from './processors/group-edges';

const getGraph = (state: any): GraphState => state.investigate.graph.present;
const getAccessors = (state: any): Accessors => getGraph(state).accessors;
const getGraphList = (state: any): GraphList => getGraph(state).graphList;

/**
 * obtain the grouped edges of every single graph list with given group edge configuration.
 * created to make comparison with the ungroup graph to display hidden fields.
 *
 * this selector may not correctly memoize as the results will be different on each call
 * and perform recompute instead of returning the cached value.
 *
 * @param state - application global states
 * @param graphIndex - index to access specific graph data
 * @param visible - graph visibility that determine the data should returned
 * @param groupEdges - group edge configuration
 * @return {GraphData}
 */
const getAggregatedGroupGraphList = (
  state: any,
  graphIndex: number,
  visible: boolean,
  groupEdges: GroupEdges = {},
): GraphData => {
  const { graphList } = getGraph(state);
  const selectedGraphList: GraphData = graphList[graphIndex];

  if (visible === false) {
    return {
      nodes: [],
      edges: [],
      metadata: selectedGraphList.metadata,
    };
  }

  const graphWithGroupEdge: GraphData = groupEdgesForImportation(
    selectedGraphList,
    groupEdges,
  );
  return graphWithGroupEdge;
};

// obtain the grouped edges graph flatten
const getGraphFlatten = (state: any): GraphData => getGraph(state).graphFlatten;
const getStyleOptions = (state: any): StyleOptions =>
  getGraph(state).styleOptions;
const getFilterOptions = (state: any): FilterOptions =>
  getGraph(state).filterOptions;
const getSearchOptions = (state: any): SearchOptions =>
  getGraph(state).searchOptions;
const getSelectedItems = (state: any): ItemProperties =>
  getSearchOptions(state).results;
const getItemsPagination = (state: any): SearchOptPagination =>
  getSearchOptions(state).pagination;

const getPaginateItems = createSelector(
  [getSelectedItems, getItemsPagination],
  (selectedItems: ItemProperties, pagination: SearchOptPagination) => {
    const paginatedItems = paginateItems(selectedItems, pagination);
    return paginatedItems;
  },
);

/** Selector to get graph data after it is filtered */
const getGraphFiltered = createSelector(
  [getGraphFlatten, getFilterOptions],
  (graphFlatten: GraphData, filterOptions: FilterOptions) => {
    const graphFiltered = produce(graphFlatten, (draftState: GraphData) => {
      filterGraph(draftState, filterOptions);
    });

    return graphFiltered;
  },
);

/** Selector to derive visible data */
const getGraphVisible = createSelector(
  [getGraphFiltered, getStyleOptions],
  (graphFiltered: GraphData, styleOptions: StyleOptions) => {
    const graphVisible = produce(graphFiltered, (draftState: GraphData) => {
      deriveVisibleGraph(draftState, styleOptions);
    });

    return graphVisible;
  },
);

/** Selector to derive visible node ids */
const getGraphVisibleNodeOptions = createSelector(
  [getGraphVisible],
  (graphVisible: GraphData) => {
    const nodeIdOptions: Option[] = graphVisible.nodes.map((n) => {
      return { id: n.id, label: n.id };
    });
    return nodeIdOptions;
  },
);

/** Selector to get node fields as select options */
const getGraphFieldsOptions = createSelector(
  [getGraphFlatten],
  (graphFlatten: GraphData) => {
    const graphFields = graphFlatten.metadata.fields;

    const allNodeFields: Option[] = [{ id: 'id', label: 'id' }];
    const numericNodeFields: Option[] = [];
    const allEdgeFields: Option[] = [{ id: 'id', label: 'id' }];
    const numericEdgeFields: Option[] = [];
    const layoutFields: Option[] = [
      { id: 'id', label: 'id' },
      { id: 'degree', label: 'degree' },
    ];

    getField(graphFields.nodes).forEach(({ name, type }) => {
      if (name !== 'id' && name !== '-') {
        allNodeFields.push({ id: name, label: name });
      }
      if (name !== 'id' && name !== 'degree') {
        layoutFields.push({ id: name, label: name, type });
      }
      if (type === 'integer' || type === 'real') {
        numericNodeFields.push({ id: name, label: name, type });
      }
    });
    const nodeLabelFields = [...allNodeFields, { id: '-', label: '-' }];

    getField(graphFields.edges).forEach(({ name, type }) => {
      if (name !== 'id' && name !== '-') {
        allEdgeFields.push({ id: name, label: name });
      }
      if (type === 'integer' || type === 'real') {
        numericEdgeFields.push({ id: name, label: name, type });
      }
    });
    const edgeLabelFields = [...allEdgeFields, { id: '-', label: '-' }];

    return {
      allNodeFields,
      layoutFields,
      nodeLabelFields,
      numericNodeFields,
      allEdgeFields,
      edgeLabelFields,
      numericEdgeFields,
    };
  },
);

// obtain the ungroup edges graph flatten
const getUngroupedGraphFlatten = createSelector(
  [getGraphList],
  (graphList: GraphList) => {
    let ungroupedGraphFlatten: GraphData = {
      nodes: [],
      edges: [],
      metadata: { fields: { nodes: [], edges: [] } },
    };
    graphList.forEach((graphData: GraphData) => {
      ungroupedGraphFlatten = combineProcessedData(
        graphData,
        ungroupedGraphFlatten,
      );
    });

    return ungroupedGraphFlatten;
  },
);

export {
  getGraph,
  getAccessors,
  getGraphList,
  getGraphFlatten,
  getStyleOptions,
  getFilterOptions,
  getSearchOptions,
  getAggregatedGroupGraphList,
  getPaginateItems,
  getGraphFiltered,
  getGraphVisible,
  getGraphVisibleNodeOptions,
  getGraphFieldsOptions,
  getUngroupedGraphFlatten,
};
