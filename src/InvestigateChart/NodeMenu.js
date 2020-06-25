import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DarkTheme, ThemeProvider } from 'baseui';
import { Label3, Paragraph3 } from 'baseui/typography';
import { StyledInner, StyledPadding } from 'baseui/popover';
import { TriGrid, Hash, FullButton } from '@blocklynx/ui';
import { timeConverter } from '../Utilities/utils';

const NodeMenu = ({ menu, setMenu }) => {
  const graphFlatten = useSelector(state => state.graph.present.graphFlatten);
  const { data } = graphFlatten.nodes.find(x => x.data.address === menu.node);
  const getRecentTrans = useSelector(state => state.graphInit.recentTrans);

  const onClick = e => {
    e.preventDefault();
    getRecentTrans(menu.node);
    setMenu(false);
  };

  return (
    <ThemeProvider theme={DarkTheme}>
      <StyledInner style={{ opacity: '0.9' }}>
        <StyledPadding>
          <Label3>Address:</Label3>
          <Hash
            style={{ overflowWrap: 'break-word', width: '220px' }}
            text={data.address}
          />
          <TriGrid
            startComponent={
              <>
                <Label3>Category:</Label3>
                <Paragraph3>{data.category}</Paragraph3>
              </>
            }
            midComponent={
              data.entity && (
                <>
                  <Label3>Entity:</Label3>
                  <Paragraph3>{data.entity}</Paragraph3>
                </>
              )
            }
            span={[6, 6]}
          />
          <br />
          <Label3>Created timestamp</Label3>
          <Paragraph3>{timeConverter(data.created_ts_unix)}</Paragraph3>
          {getRecentTrans && (
            <FullButton size="mini" onClick={onClick}>
              Import Recent Transactions
            </FullButton>
          )}
        </StyledPadding>
      </StyledInner>
    </ThemeProvider>
  );
};

export default NodeMenu;
