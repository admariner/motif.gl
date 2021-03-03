// @ts-nocheck
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import cloneDeep from 'lodash/cloneDeep';
import flatten from 'lodash/flatten';
import { render } from '@testing-library/react';
import { ToasterContainer } from 'baseui/toast';
import {
  importEdgeListData,
  importJsonData,
  importNodeEdgeData,
  importSingleJsonData,
} from '../thunk';
import {
  initialState,
  addQuery,
  processGraphResponse,
  updateStyleOption,
} from '../slice';
import {
  importJson,
  importNodeEdgeCsv,
  importEdgeListCsv,
} from '../processors/import';
import { fetchBegin, fetchDone, updateToast } from '../../ui/slice';
import { SimpleEdge } from '../../../constants/sample-data';
import { RootState } from '../../investigate';
import { ImportFormat, TLoadFormat } from '../types';
import * as LAYOUT from '../../../constants/layout-options';
import { DEFAULT_NODE_STYLE } from '../../../constants/graph-shapes';

const mockStore = configureStore([thunk]);
const getStore = (): RootState => {
  const graphState = cloneDeep(initialState);
  const store = {
    investigate: {
      ui: {},
      widget: {},
      graph: {
        present: graphState,
      },
    },
  };
  return store;
};

describe('add-data-thunk.test.js', () => {
  beforeEach(() => {
    render(<ToasterContainer />);
  });

  describe('importJsonData', () => {
    const jsonDataOne = {
      data: {
        data: {
          nodes: [{ id: 'node-1' }, { id: 'node-2' }],
          edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2' }],
          metadata: {
            key: 123,
          },
        },
        style: {
          layout: LAYOUT.RADIAL_DEFAULT,
          nodeStyle: {
            color: {
              id: 'fixed',
              value: DEFAULT_NODE_STYLE.color,
            },
            size: {
              id: 'fixed',
              value: 30,
            },
          },
          edgeStyle: {
            width: {
              id: 'fixed',
              value: 2,
            },
            label: 'none',
          },
          resetView: true,
          groupEdges: false,
        },
      },
      type: 'json',
    };
    const jsonDataTwo = {
      data: {
        data: {
          nodes: [{ id: 'node-3' }, { id: 'node-4' }],
          edges: [{ id: 'edge-2', source: 'node-3', target: 'node-4' }],
          metadata: {
            key: 234,
          },
        },
        style: {
          layout: { type: 'graphin-force' },
          nodeStyle: {
            color: { value: 'orange', id: 'fixed' },
            size: { value: 47, id: 'fixed' },
            label: 'id',
          },
          edgeStyle: {
            width: { id: 'fixed', value: 1 },
            label: 'source',
            pattern: 'dot',
            fontSize: 16,
            arrow: 'none',
          },
          resetView: true,
          groupEdges: false,
        },
      },
      type: 'json',
    };

    const store = mockStore(getStore());

    afterEach(() => {
      store.clearActions();
    });

    it('should receive array of importData and process graph responses accurately', async () => {
      // input
      const importDataArr = [jsonDataOne, jsonDataTwo];

      // processes
      const batchDataPromises = importDataArr.map((graphData: ImportFormat) => {
        const { data } = graphData.data as TLoadFormat;
        return importJson(data, initialState.accessors);
      });

      const graphDataArr = await Promise.all(batchDataPromises);
      const [firstGraphData, secondGraphData] = flatten(graphDataArr);

      // expected results
      const expectedActions = [
        fetchBegin(),
        addQuery(firstGraphData),
        processGraphResponse({
          data: firstGraphData,
          accessors: initialState.accessors,
        }),
        fetchDone(),
        addQuery(secondGraphData),
        processGraphResponse({
          data: secondGraphData,
          accessors: initialState.accessors,
        }),
        fetchDone(),
        updateToast('toast-0'),
      ];

      // assertions
      await store.dispatch(
        importJsonData(importDataArr, initialState.accessors),
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should overwrite styles with the last file', async () => {
      // input
      const importDataArr = [jsonDataOne, jsonDataTwo];
      let { styleOptions } = initialState;

      // processes
      const batchDataPromises = importDataArr.map((graphData: ImportFormat) => {
        const { data, style } = graphData.data as TLoadFormat;

        if (style) {
          styleOptions = style;
        }

        return importJson(data, initialState.accessors);
      });

      const graphDataArr = await Promise.all(batchDataPromises);
      const [firstGraphData, secondGraphData] = flatten(graphDataArr);

      // expected results
      const expectedActions = [
        updateStyleOption(styleOptions),
        fetchBegin(),
        addQuery(firstGraphData),
        processGraphResponse({
          data: firstGraphData,
          accessors: initialState.accessors,
        }),
        fetchDone(),
        addQuery(secondGraphData),
        processGraphResponse({
          data: secondGraphData,
          accessors: initialState.accessors,
        }),
        fetchDone(),
        updateToast('toast-0'),
      ];

      // assertions
      await store.dispatch(
        importJsonData(importDataArr, initialState.accessors, true),
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should not overwrite styles if data has no style', async () => {
      // input
      const jsonOneWithoutStyle = {
        data: {
          data: jsonDataOne.data.data,
        },
        type: jsonDataOne.type,
      };

      const jsonTwoWithoutStyle = {
        data: {
          data: jsonDataTwo.data.data,
        },
        type: jsonDataTwo.type,
      };

      const importDataArr = [jsonOneWithoutStyle, jsonTwoWithoutStyle];
      let { styleOptions } = initialState;

      // processes
      const batchDataPromises = importDataArr.map((graphData: ImportFormat) => {
        const { data, style } = graphData.data as TLoadFormat;

        if (style) {
          styleOptions = style;
        }

        return importJson(data, initialState.accessors);
      });

      const graphDataArr = await Promise.all(batchDataPromises);
      const [firstGraphData, secondGraphData] = flatten(graphDataArr);

      // expected results
      const expectedActions = [
        fetchBegin(),
        addQuery(firstGraphData),
        processGraphResponse({
          data: firstGraphData,
          accessors: initialState.accessors,
        }),
        fetchDone(),
        addQuery(secondGraphData),
        processGraphResponse({
          data: secondGraphData,
          accessors: initialState.accessors,
        }),
        fetchDone(),
        updateToast('toast-0'),
      ];

      // assertions
      await store.dispatch(
        importJsonData(importDataArr, initialState.accessors, true),
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should throw error if importData parameter is not array', async () => {
      // assertions
      expect(importJsonData(jsonDataOne)).toThrow(Error);
    });
  });

  describe('importNodeEdgeData', () => {
    const sampleNodeEdgeData = {
      data: {
        edgeData:
          'id,relation,source,target\ntxn1,hello,a,b\ntxn2,works,b,c\ntxn3,abc,c,a',
        nodeData: 'id,value,score\na,20,80\nb,40,100\nc,60,123',
        metadata: {
          key: 123,
        },
      },
      type: 'nodeEdgeCsv',
    };

    it('should receive importNodeEdgeData as object and process graph responses accurately', async () => {
      const store = mockStore(getStore());
      const { nodeData, edgeData } = sampleNodeEdgeData.data;
      const { accessors } = initialState;
      const metadataKey = '123';

      const data = await importNodeEdgeCsv(
        nodeData,
        edgeData,
        accessors,
        metadataKey,
      );

      const expectedActions = [
        fetchBegin(),
        addQuery(data),
        processGraphResponse({
          data,
          accessors,
        }),
        fetchDone(),
        updateToast('toast-0'),
      ];

      await store.dispatch(
        importNodeEdgeData(sampleNodeEdgeData, accessors, metadataKey),
      );
      expect(store.getActions()).toEqual(expectedActions);
    });
    it('should throw errors if importNodeEdgeData parameter is array', async () => {
      const importDataArr = [sampleNodeEdgeData];
      await expect(importNodeEdgeData(importDataArr)).toThrow(Error);
    });

    it('should throw errors if source and target fields are invalid', async () => {
      const invalidNodeEdgeData = {
        data: {
          edgeData:
            'id,relation,from,to\ntxn1,hello,a,b\ntxn2,works,b,c\ntxn3,abc,c,a',
          nodeData: 'id,value,score\na,20,80\nb,40,100\nc,60,123',
          metadata: {
            key: 123,
          },
        },
        type: 'nodeEdgeCsv',
      };
      await expect(importNodeEdgeData(invalidNodeEdgeData)).toThrow(Error);
    });
  });

  describe('importEdgeListData', () => {
    const store = mockStore(getStore());

    const firstEdgeListCsv = {
      data:
        'id,relation,source,target\ntxn1,works,jason,cylynx\ntxn3,abc,cylynx,timothy\ntxn4,says hi to,swan,cylynx',
      type: 'edgeListCsv',
    };

    const secondEdgeListCsv = {
      data: 'id,source,target\n123,x,y\n456,y,z\n789,z,x',
      type: 'edgeListCsv',
    };

    it('should receive importData as array and process graph responses accurately', async () => {
      // input
      const importDataArr = [firstEdgeListCsv, secondEdgeListCsv];

      // processes
      const batchDataPromises = importDataArr.map((graphData) => {
        const { data } = graphData;
        return importEdgeListCsv(data, initialState.accessors);
      });

      const graphDataArr = await Promise.all(batchDataPromises);
      const [firstGraphData, secondGraphData] = graphDataArr;

      // expected results
      const expectedActions = [
        fetchBegin(),
        addQuery(firstGraphData),
        processGraphResponse({
          data: firstGraphData,
          accessors: initialState.accessors,
        }),
        fetchDone(),
        addQuery(secondGraphData),
        processGraphResponse({
          data: secondGraphData,
          accessors: initialState.accessors,
        }),
        fetchDone(),
        updateToast('toast-0'),
      ];

      // assertions
      await store.dispatch(
        importEdgeListData(importDataArr, initialState.accessors),
      );
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should throw errors if importData parameter is not array', async () => {
      await expect(importEdgeListData(firstEdgeListCsv)).toThrow(Error);
    });

    it('should throw errors if source and target fields are invalid', async () => {
      const firstErrorEdgeCsv = {
        data:
          'id,relation,from,to\ntxn1,works,jason,cylynx\ntxn3,abc,cylynx,timothy\ntxn4,says hi to,swan,cylynx',
        type: 'edgeListCsv',
      };

      const secondValidEdgeCsv = {
        data: 'id,source,target\n123,x,y\n456,y,z\n789,z,x',
        type: 'edgeListCsv',
      };
      await expect(
        importEdgeListData([firstErrorEdgeCsv, secondValidEdgeCsv]),
      ).toThrow(Error);
    });
  });

  describe('importSingleJsonData', () => {
    const store = mockStore(getStore());

    it('should receive importData as object and process graph accurately', async () => {
      // input
      const data = SimpleEdge();
      const importData = { data, type: 'json' };

      // processes
      const processedJsonData = await importJson(data, initialState.accessors);
      const [objectData] = processedJsonData;

      // expected results
      const expectedActions = [
        fetchBegin(),
        addQuery(objectData),
        processGraphResponse({
          data: objectData,
          accessors: initialState.accessors,
        }),
        fetchDone(),
        updateToast('toast-0'),
      ];

      await store.dispatch(importSingleJsonData(importData));
      expect(store.getActions()).toEqual(expectedActions);
    });

    it('should throw error if importData parameter is an array', async () => {
      const data = SimpleEdge();
      const importData = { data, type: 'json' };

      await expect(importSingleJsonData([importData])).toThrow(Error);
    });

    it('should throw error if source and target fields are invalid', async () => {
      // input
      const invalidData = {
        nodes: [
          {
            id: 'nodeA',
            label: 'nodeA',
          },
          {
            id: 'nodeB',
            label: 'nodeB',
          },
        ],
        edges: [
          {
            id: 'nodeA-nodeB',
            from: 'nodeA',
            to: 'nodeB',
            weight: 100,
          },
        ],
        metadata: {
          key: '123',
        },
      };
      const importData = { data: invalidData, type: 'json' };

      await expect(importSingleJsonData(importData)).toThrow(Error);
    });
  });
});
