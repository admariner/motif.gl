import React from 'react';

import { Block } from 'baseui/block';
import { useDispatch, useSelector } from 'react-redux';
import { GraphSlices, GraphSelectors } from '../../../redux/graph';
import Accordion from '../../../components/Accordion';
import { NestedForm, genNestedForm } from '../../../components/form';

import * as Icon from '../../../components/Icons';
import { layoutForm } from './constants';

const OptionsLayout = () => {
  const dispatch = useDispatch();

  const layout = useSelector(
    (state) => GraphSelectors.getGraph(state).styleOptions.layout,
  );

  const layoutOptions = { layout: { id: layout.type, ...layout } };

  const updateLayout = (data: any) => dispatch(GraphSlices.changeLayout(data));

  const formData = genNestedForm(layoutForm, layoutOptions, updateLayout);

  return (
    <Accordion
      data-testid='OptionsLayout'
      items={[
        {
          title: (
            <Block display='flex' justifyContent='center'>
              <Icon.Network style={{ paddingRight: '8px' }} />
              Layout Options
            </Block>
          ),
          key: 'layout',
          content: (
            <NestedForm
              id='layout'
              data={formData}
              key={`${formData.id}-${formData.value}`}
            />
          ),
          expanded: true,
        },
      ]}
    />
  );
};

export default OptionsLayout;
