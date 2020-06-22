import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import NodeMenu from './NodeMenu';
import 'vis-network/styles/vis-network.css';
import InvestigateChartLegend from './InvestigateChartLegend';
import InvestigateGraph from './InvestigateGraph';

const InvestigateChart = () => {
  const graphFlatten = useSelector(state => state.graph.present.graphFlatten);

  const [menu, setMenu] = useState(null);

  return (
    <>
      <InvestigateGraph setMenu={setMenu} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '2%',
        }}
      >
        <InvestigateChartLegend data={graphFlatten} />
      </div>
      {menu && (
        <div
          style={{
            position: 'absolute',
            left: menu.x,
            top: menu.y,
            width: '250px',
          }}
        >
          <NodeMenu node={menu.node} />
        </div>
      )}
    </>
  );
};

export default InvestigateChart;
