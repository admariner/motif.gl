/* eslint-disable import/no-extraneous-dependencies */
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useStyletron } from 'baseui';
import Graphin, { GraphinContextType, IG6GraphEvent } from '@antv/graphin';
import { GraphinData } from '@antv/graphin/lib/typings/type';
import { interactionStates } from './shape/constants';
import { GraphSelectors, Layout } from '../../redux/graph';
import { TooltipProps } from './Tooltip';
import './graphin.css';
import {
  defaultNodeStateStyle,
  defaultNodeStyle,
  defaultEdgeStyle,
  defaultEdgeStateStyle,
} from './styles';

export type GraphProps = {
  setTooltip: (tooltip: TooltipProps | null) => void;
};

const Graph = React.forwardRef<Graphin, GraphProps>((props, ref) => {
  const { setTooltip } = props;
  const [, theme] = useStyletron();
  const graphVisible = useSelector((state) =>
    GraphSelectors.getGraphVisible(state),
  );

  console.log(graphVisible.edges);

  const layout: Layout = useSelector(
    (state) => GraphSelectors.getStyleOptions(state).layout,
  );

  useLayoutEffect(() => {
    // Imperatively set the color by theme
    document.getElementById('graphin-container').style.backgroundColor =
      theme.colors.backgroundPrimary;

    // @ts-ignore
    const { graph }: GraphinContextType = ref.current;

    const onResetClick = (): void => {
      setTooltip(null);
    };

    const onNodeClick = (e: IG6GraphEvent): void => {
      const { item } = e;
      // Avoid inconsistent styling between highlight.light and selected by giving priority to selected
      graph.clearItemStates(item, interactionStates);
      graph.setItemState(item, 'selected', true);

      const node = item.get('model');
      const { clientX, clientY } = e;
      setTooltip({
        id: node.id,
        x: clientX,
        y: clientY,
        type: 'node',
      });

      // Ctrl event is for multiple select so don't display tooltip
      // if (!e.originalEvent.ctrlKey && !e.originalEvent.shiftKey) {
      //   const node = item.get('model');
      //   const { clientX, clientY } = e;
      //   setTooltip({
      //     id: node.id,
      //     x: clientX,
      //     y: clientY,
      //     type: 'node',
      //   });
      // }
    };

    const onEdgeClick = (e: IG6GraphEvent): void => {
      const { item } = e;
      // Avoid inconsistent styling between highlight.light and selected by giving priority to selected
      graph.clearItemStates(item, interactionStates);
      graph.setItemState(item, 'selected', true);

      const { clientX, clientY } = e;
      const edge = item.get('model');
      setTooltip({
        id: edge.id,
        x: clientX,
        y: clientY,
        type: 'edge',
      });

      // Ctrl event is for multiple select so don't display tooltip
      // if (!e.originalEvent.ctrlKey && !e.originalEvent.shiftKey) {
      //   const { clientX, clientY } = e;
      //   const edge = item.get('model');
      //   setTooltip({
      //     id: edge.id,
      //     x: clientX,
      //     y: clientY,
      //     type: 'edge',
      //   });
      // }
    };

    // Graph Behaviours
    graph.on('node:click', onNodeClick);
    graph.on('node:dragstart', onResetClick);
    graph.on('edge:click', onEdgeClick);
    graph.on('canvas:click', onResetClick);
    graph.on('canvas:dragstart', onResetClick);

    return (): void => {
      graph.off('node:click', onNodeClick);
      graph.off('node:mouseleave', onResetClick);
      graph.off('edge:click', onEdgeClick);
      graph.off('canvas:click', onResetClick);
      graph.off('canvas:dragstart', onResetClick);
    };
  }, [setTooltip]);

  return (
    <Graphin
      data={graphVisible as GraphinData}
      ref={ref}
      layout={layout}
      defaultNode={defaultNodeStyle}
      // @ts-ignore
      defaultEdge={defaultEdgeStyle}
      nodeStateStyles={defaultNodeStateStyle}
      edgeStateStyles={defaultEdgeStateStyle}
      // options={{
      //   isZoomOptimize: () => true,
      //   keyShapeZoom: 0.6,
      //   autoPolyEdge: true,
      //   autoLoopEdge: true,
      //   // If using combo in the future, might have to set to false
      //   // https://g6.antv.vision/en/docs/api/Graph/#graphoptionsgroupbytypes
      //   groupByTypes: true,
      //   modes: {
      //     default: [
      //       {
      //         type: 'brush-select',
      //         trigger: 'shift',
      //         includeEdges: true,
      //       },
      //     ],
      //   },
      // }}
    />
  );
});

export default Graph;
