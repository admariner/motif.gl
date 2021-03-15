import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Block } from 'baseui/block';
import {
  GraphSlices,
  GraphData,
  GraphList,
  GraphSelectors,
} from '../../../../../redux/graph';

import useNodeStyle from '../../../../../redux/graph/hooks/useNodeStyle';
import useSearchOption from '../../../SearchPanel/hooks/useSearchOption';
import LayerDetailed from './LayerDetailed';

import DataListAccordion from '../../components/DataListAccordion/DataListAccordion';
import AccordionPanel from '../../components/DataListAccordion/AccordionPanel';
import { UISlices } from '../../../../../redux/ui';

const ImportLayers = () => {
  const dispatch = useDispatch();
  const { nodeStyle, switchToFixNodeColor } = useNodeStyle();
  const { resetSearchOptions } = useSearchOption();
  const graphList: GraphList = useSelector((state) =>
    GraphSelectors.getGraphList(state),
  );

  /**
   * Delete single data list.
   *
   * https://github.com/cylynx/motif.gl/pull/73#issuecomment-789393660
   * 1. Switch to original node colour when node style is legend to prevent crash.
   *
   * @param {number} index
   * @return {void}
   */
  const onDelete = (index: number) => {
    dispatch(GraphSlices.deleteGraphList(index));
    resetSearchOptions();

    if (nodeStyle.color.id === 'legend') {
      switchToFixNodeColor();
    }
  };

  const onChangeVisibility = (index: number, isVisible: boolean) => {
    dispatch(GraphSlices.changeVisibilityGraphList({ index, isVisible }));
  };

  const displayTabularData = (index: number): void => {
    dispatch(UISlices.openDataTableModal(`table_${index}`));
  };

  const items = graphList.map((graph: GraphData, index: number) => {
    const titleText: string = graph.metadata?.title ?? `import ${index}`;
    const isVisible: boolean = graph.metadata?.visible ?? true;

    const title = (
      <AccordionPanel
        key={index}
        index={index}
        onDatatableClick={displayTabularData}
        onChangeVisibility={onChangeVisibility}
        onDelete={onDelete}
        title={titleText}
        isVisible={isVisible}
      />
    );

    const content = <LayerDetailed graph={graph} index={index} />;

    return {
      key: index,
      title,
      content,
      expanded: true,
    };
  });

  return (
    <Block overflow='auto' marginTop='scale300'>
      <DataListAccordion items={items} />
    </Block>
  );
};

export default ImportLayers;
