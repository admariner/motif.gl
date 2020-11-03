// @ts-nocheck
import React from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';
import { Motif, MotifLightTheme, MotifDarkTheme } from 'motif.gl';
import { Provider } from 'react-redux';
import store from './redux-store';
import 'motif.gl/dist/index.css';

const engine = new Styletron();

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={MotifLightTheme}>
        <Provider store={store}>
          <Motif
            name='Blocklynx'
            currency='ETH'
            secondaryTheme={MotifDarkTheme}
            // accessors={{
            //   // getters below are for triangle time data
            //   nodeID: 'id',
            //   edgeID: 'id',
            //   edgeSource: 'source',
            //   edgeTarget: 'target',
            //   edgeTime: 'data.blk_ts_unix',
            //   edgeStyle: {
            //     label: 'id',
            //     width: 'data.value',
            //   },
            //   nodeStyle: {
            //     label: 'label',
            //   },
            //   // getters below are for nodobo
            //   // getEdgeWidth: edge => edge.data.other_id,
            //   // getEdgeTime: edge => edge.data.unix_ts,
            //   // getEdgeLabel: edge => edge.id,
            //   // getNodeLabel: node => node.data.name,
            //   // no getters required for Graphin mock data
            // }}
            accessors={{
              // getters below are for simple edge
              nodeID: 'id',
              nodeType: 'data.type',
              // edgeID: 'id',
              edgeSource: 'from',
              edgeTarget: 'to',
            }}
            overrides={
              {
                // Tabs: {
                //   Hash: <QueryHash />,
                //   Neighbours: <QueryNeighbours />,
                //   Path: <QueryPath />,
                // },
                // NodeMenu,
                // score,
              }
            }
          />
        </Provider>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
