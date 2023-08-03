import React, { SyntheticEvent, useContext } from 'react';
import { useDispatch } from '../../../../redux/hooks';
import { Block } from 'baseui/block';
import useGraphBehaviors from '../../../Graph/hooks/useGraphBehaviors';
import { GraphRefContext } from '../../../Graph';
import { GraphSlices } from '../../../../redux/graph';
import { UISlices } from '../../../../redux/ui';
import ToggleTokens from '../../../../components/ToggleTokens';
import { Button } from '../../../../components/ui';
import * as Icon from '../../../../components/Icons';
import useNodeStyle from '../../../../redux/graph/hooks/useNodeStyle';

export const ToggleAllButton = ({
  selected,
  onClick,
}: {
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <Block width='150px'>
      <ToggleTokens
        options={[
          {
            label: selected ? 'Unselect All' : 'Select All',
            id: 'select',
            type: null,
            selected,
          },
        ]}
        onClick={onClick}
        shape='default'
      />
    </Block>
  );
};

export const ImportDataButton = () => {
  const dispatch = useDispatch();
  const onClickImport = (e: SyntheticEvent<HTMLButtonElement, Event>) => {
    e.preventDefault();
    dispatch(UISlices.openImportModal());
  };

  return (
    <Button
      kind='primary'
      width='100%'
      startEnhancer={() => <Icon.Plus size={18} />}
      onClick={onClickImport}
    >
      Import Data
    </Button>
  );
};

export const ClearDataButton = () => {
  const dispatch = useDispatch();
  const { nodeStyle, switchToFixNodeColor } = useNodeStyle();
  const { graph } = useContext(GraphRefContext);
  const { centerCanvas } = useGraphBehaviors(graph);

  /**
   * Reset all the graph states when all data list are deleted.
   *
   * https://github.com/cylynx/motif.gl/pull/73#issuecomment-789393660
   * 1. Switch to original node colour when node style is legend to prevent crash.
   *
   * @param {SyntheticEvent<HTMLButtonElement, Event>} e
   * @return {void}
   */
  const onClickClearAll = (e: SyntheticEvent<HTMLButtonElement, Event>) => {
    e.preventDefault();
    dispatch(GraphSlices.resetState());
    centerCanvas();

    if (nodeStyle.color.id === 'legend') {
      switchToFixNodeColor();
    }
  };

  return (
    <Button
      kind='tertiary'
      size='compact'
      startEnhancer={() => <Icon.Trash size={18} />}
      onClick={onClickClearAll}
      overrides={{
        BaseButton: {
          style: ({ $theme }) => ({
            ':hover': {
              backgroundColor: $theme.colors.backgroundNegative,
            },
          }),
        },
      }}
    >
      Clear All
    </Button>
  );
};
