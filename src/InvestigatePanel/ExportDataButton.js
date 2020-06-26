import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { StatefulMenu } from 'baseui/menu';
import { StatefulPopover, PLACEMENT } from 'baseui/popover';
import * as html2canvas from 'html2canvas';
import { FullButton, Notification } from '@blocklynx/ui';
import { getGraph } from '../redux/accessors';

const ExportDataButton = () => {
  const exportGraph = useSelector(state => getGraph(state).graphList);
  const [showNotification, setShowNotification] = useState(false);

  const exportPNG = close => {
    const graph = document.getElementById('graphin-container');
    if (graph !== null) {
      html2canvas(graph).then(canvas => {
        const file = document.createElement('a');
        file.download = 'graph.png';
        file.href = canvas.toDataURL();
        document.body.appendChild(file);
        file.click();
        document.body.removeChild(file);
      });
    } else {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
    close();
  };

  const exportJSON = close => {
    const contentType = 'application/json;charset=utf-8;';
    const jsonInfo = JSON.stringify(exportGraph);
    const file = document.createElement('a');
    file.download = 'graph.json';
    file.href = `data:${contentType},${encodeURIComponent(jsonInfo)}`;
    document.body.appendChild(file);
    file.click();
    document.body.removeChild(file);
    close();
  };

  const onItemSelect = (e, close) => {
    const exportAction = e.item.label;
    if (exportAction === 'PNG') {
      exportPNG(close);
    } else {
      exportJSON(close);
    }
  };

  return (
    <>
      <StatefulPopover
        content={({ close }) => (
          <StatefulMenu
            items={[{ label: 'JSON' }, { label: 'PNG' }]}
            onItemSelect={e => onItemSelect(e, close)}
            overrides={{
              Option: { style: { color: 'white' } },
              List: {
                style: {
                  width: '140px',
                },
              },
            }}
          />
        )}
        placement={PLACEMENT.top}
        showArrow
      >
        <FullButton width="140px" kind="secondary" size="compact">
          Export As
        </FullButton>
      </StatefulPopover>
      {showNotification && (
        <Notification
          overrides={{
            Body: {
              style: {
                backgroundColor: 'black',
                color: 'white',
              },
            },
          }}
        >
          Please import a graph
        </Notification>
      )}
    </>
  );
};

export default ExportDataButton;
