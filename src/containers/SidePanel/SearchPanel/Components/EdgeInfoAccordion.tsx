import React, { useMemo } from 'react';
import Accordion from '../../../../components/Accordion';
import * as Icon from '../../../../components/Icons';
import { EdgeInformation } from '../../../../redux/graph';
import useItemInformation from '../hooks/useItemInformation';

type EdgeInformationProps = {
  results: EdgeInformation;
  expanded?: boolean;
};

const EdgeInfoAccordion = ({
  results,
  expanded = false,
}: EdgeInformationProps) => {
  const { sourceNode, edge, targetNode } = results;
  const { createNodeItem, createEdgeItem } = useItemInformation();

  const sourceNodeItem = useMemo(() => {
    return createNodeItem(sourceNode, expanded, 'source');
  }, [sourceNode]);

  const edgeItem = useMemo(() => {
    return createEdgeItem(edge, expanded);
  }, []);

  const targetNodeItem = useMemo(() => {
    return createNodeItem(targetNode, expanded, 'target');
  }, [targetNode]);

  return (
    <Accordion
      overrides={{
        Content: {
          style: ({ $expanded, $theme }) => ({
            paddingTop: $expanded ? $theme.sizing.scale200 : 0,
            paddingBottom: $expanded ? $theme.sizing.scale200 : 0,
            paddingLeft: $theme.sizing.scale300,
            paddingRight: $theme.sizing.scale300,
            backgroundColor: '#323742',
            color: $theme.colors.mono200,
            borderBottomWidth: 0,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }),
        },
        Header: {
          style: ({ $theme }) => ({
            paddingLeft: $theme.sizing.scale500,
            paddingRight: $theme.sizing.scale300,
            paddingTop: $theme.sizing.scale200,
            paddingBottom: $theme.sizing.scale200,
            backgroundColor: $theme.colors.backgroundSecondary,
            color: $theme.colors.backgroundInverseSecondary,
            borderBottomStyle: 'none',
            fontWeight: 600,
            fontSize: '12px',
          }),
        },
        ToggleIcon: {
          component: () => {
            return <Icon.ChevronDown />;
          },
        },
      }}
      items={[sourceNodeItem, edgeItem, targetNodeItem]}
    />
  );
};

export default EdgeInfoAccordion;
