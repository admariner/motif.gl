import React, { useMemo } from 'react';
import { Block } from 'baseui/block';
import { LabelSmall } from 'baseui/typography';
import { useSelector } from 'react-redux';
import { GraphSelectors } from '../../redux/graph';

const GraphStatistics = () => {
  const ungroupGraphFlatten = useSelector((state) => {
    return GraphSelectors.getUngroupedGraphFlatten(state);
  });

  const graphFlatten = useSelector((state) =>
    GraphSelectors.getGraphFlatten(state),
  );

  const hiddenNodes =
    ungroupGraphFlatten.nodes.length - graphFlatten.nodes.length;
  const hiddenEdges =
    ungroupGraphFlatten.edges.length - graphFlatten.edges.length;

  const visibleNodeLength = graphFlatten.nodes.length;
  const hiddenNodeLength = hiddenNodes < 0 ? 0 : hiddenNodes;
  const visibleEdgeLength = graphFlatten.edges.length;
  const hiddenEdgeLength = hiddenEdges < 0 ? 0 : hiddenEdges;

  return useMemo(
    () => (
      <Block
        $style={{ zIndex: 1, userSelect: 'none' }}
        position='absolute'
        left='8px'
        top='8px'
      >
        <Block display='flex'>
          <LabelSmall marginRight='scale200' color='contentInverseSecondary'>
            Nodes:
          </LabelSmall>
          <LabelSmall>
            {visibleNodeLength}/{hiddenNodeLength + visibleNodeLength}{' '}
          </LabelSmall>
        </Block>
        <Block display='flex'>
          <LabelSmall marginRight='scale200' color='contentInverseSecondary'>
            Edges:
          </LabelSmall>
          <LabelSmall>
            {visibleEdgeLength}/{hiddenEdgeLength + visibleEdgeLength}{' '}
          </LabelSmall>
        </Block>
      </Block>
    ),
    [visibleNodeLength, hiddenNodeLength, visibleEdgeLength, hiddenEdgeLength],
  );
};

export default GraphStatistics;
