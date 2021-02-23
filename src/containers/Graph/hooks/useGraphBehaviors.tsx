import { IG6GraphEvent } from '@antv/graphin';
import { useCallback } from 'react';
import { IEdge, INode, IGraph } from '@antv/g6';
import { isBigDataSet } from '../../../utils/utils';

const useGraphBehaviors = (graph: IGraph) => {
  const clearAllStates = useCallback(() => {
    graph.getNodes().forEach((node: INode) => {
      graph.clearItemStates(node, ['inactive', 'active', 'hover']);
    });

    graph.getEdges().forEach((edge: IEdge) => {
      graph.clearItemStates(edge, ['inactive', 'active', 'hover']);
    });
  }, [graph]);

  const disableAllNodeEdges = useCallback(() => {
    graph.getNodes().forEach((node: INode) => {
      graph.clearItemStates(node, ['inactive', 'active']);
      graph.setItemState(node, 'inactive', true);
    });

    graph.getEdges().forEach((edge: IEdge) => {
      graph.clearItemStates(edge, ['inactive', 'active']);
      graph.setItemState(edge, 'inactive', true);
    });
  }, [graph]);

  const resetNodeEdgeStates = useCallback(
    (e: IG6GraphEvent) => {
      const { cfg } = e.currentTarget;
      const isBigData: boolean = isBigDataSet(
        cfg.nodes.length,
        cfg.edges.length,
      );
      if (isBigData) {
        return;
      }

      graph.setAutoPaint(false);
      clearAllStates();
      graph.paint();
      graph.setAutoPaint(true);
    },
    [graph],
  );

  const getViewCenterPoint = () => {
    const padding = graph.get('fitViewPadding');
    const width: number = graph.get('width');
    const height: number = graph.get('height');

    const viewCenter = {
      x: (width - padding - padding) / 2 + padding,
      y: (height - padding - padding) / 2 + padding,
    };

    return viewCenter;
  };

  const centerCanvas = useCallback(() => {
    const viewCenter = getViewCenterPoint();

    const groupBBox = graph.get('group').getCanvasBBox();
    if (groupBBox.width === 0 || groupBBox.height === 0) return;
    const groupCenter = {
      x: groupBBox.x + groupBBox.width / 2,
      y: groupBBox.y + groupBBox.height / 2,
    };
    graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);
  }, []);

  const clearNodeHoverState = () => {
    graph.findAllByState('node', 'hover').forEach((node: INode) => {
      graph.clearItemStates(node, ['hover']);
    });
  };

  const clearEdgeHoverState = () => {
    graph.findAllByState('edge', 'hover').forEach((edge: IEdge) => {
      graph.clearItemStates(edge, ['hover']);
    });
  };

  const centerItem = (item: INode | IEdge) => {
    const viewCenter = getViewCenterPoint();

    if (graph.getZoom() <= 0.75) {
      graph.zoomTo(1.0, viewCenter);
    }

    const itemBBox = item.getCanvasBBox();
    const dx = (viewCenter.x - itemBBox.centerX) * graph.getZoom();
    const dy = (viewCenter.y - itemBBox.centerY) * graph.getZoom();
    graph.translate(dx, dy);
  };

  return {
    disableAllNodeEdges,
    resetNodeEdgeStates,
    centerCanvas,
    getViewCenterPoint,
    clearAllStates,
    clearNodeHoverState,
    clearEdgeHoverState,
    centerItem,
  };
};

export default useGraphBehaviors;
