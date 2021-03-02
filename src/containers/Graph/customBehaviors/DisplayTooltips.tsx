import {
  GraphinContext,
  IG6GraphEvent,
  GraphinContextType,
} from '@antv/graphin';
import { INode, IEdge } from '@antv/g6';
import { useContext, useLayoutEffect } from 'react';
import { TooltipProps } from '../../Tooltip/Tooltip';
import { interactionStates } from '../../../constants/graph-shapes';

export type DisplayTooltipProps = {
  setTooltip: (tooltip: Partial<TooltipProps>) => void;
};

const DisplayTooltip = ({ setTooltip }: DisplayTooltipProps): any => {
  const { graph } = useContext(GraphinContext) as GraphinContextType;

  const onResetClick = (): void => {
    setTooltip(null);
  };

  const onNodeClick = (e: IG6GraphEvent): void => {
    const item = e.item as INode;
    const { shiftKey } = e.originalEvent as KeyboardEvent;

    if (shiftKey === false) {
      graph.clearItemStates(item, interactionStates);
      graph.setItemState(item, 'selected', true);

      const node = item.get('model');
      const point = graph.getPointByClient(e.clientX, e.clientY);
      const { x, y } = graph.getCanvasByPoint(point.x, point.y);
      setTooltip({
        id: node.id,
        x,
        y,
        type: 'node',
      });
    }
  };

  const onEdgeClick = (e: IG6GraphEvent): void => {
    const item = e.item as IEdge;
    const { shiftKey } = e.originalEvent as KeyboardEvent;

    if (shiftKey === false) {
      graph.clearItemStates(item, interactionStates);
      graph.setItemState(item, 'selected', true);

      const edge = item.get('model');
      const point = graph.getPointByClient(e.clientX, e.clientY);
      const { x, y } = graph.getCanvasByPoint(point.x, point.y);
      setTooltip({
        id: edge.id,
        x,
        y,
        type: 'edge',
      });
    }
  };

  useLayoutEffect(() => {
    graph.on('node:click', onNodeClick);
    graph.on('node:mouseleave', onResetClick);
    graph.on('edge:click', onEdgeClick);
    graph.on('edge:mouseleave', onResetClick);

    return (): void => {
      graph.off('node:click', onNodeClick);
      graph.off('node:mouseleave', onResetClick);
      graph.off('edge:click', onEdgeClick);
      graph.off('edge:mouseleave', onResetClick);
    };
  }, [setTooltip]);

  return null;
};

export default DisplayTooltip;
