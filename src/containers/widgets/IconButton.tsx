import React from 'react';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { useDispatch, useSelector } from 'react-redux';
import { updateWidget } from './widget-slice';
import { getWidget } from '../../redux';

type IconButton = {
  icon: React.ReactNode;
  id: string;
  group: string;
};

const IconButton = ({ icon, id, group }: IconButton) => {
  const dispatch = useDispatch();
  const activeId = useSelector((state) => getWidget(state)[group]);
  const updateSelection = () => {
    dispatch(updateWidget({ key: group, id }));
  };

  return (
    <Block marginBottom='12px'>
      <Button
        size='compact'
        shape='round'
        kind='minimal'
        onClick={updateSelection}
        isSelected={activeId === id}
      >
        {icon}
      </Button>
    </Block>
  );
};

export default IconButton;
