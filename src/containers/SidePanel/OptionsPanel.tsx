import React, { Fragment } from 'react';

import { Block } from 'baseui/block';
import { useDispatch, useSelector } from 'react-redux';
import { getGraph, getUI } from '../../redux';
import Header from './Header';
import Accordion from '../../components/Accordion';
import FormGenerator, {
  FormGeneratorData,
} from '../../components/FormGenerator';
import { changeLayout } from '../../redux/graph-slice';
import * as LAYOUT from '../../constants/layout-options';
import * as Icon from '../../components/Icons';

const genLayoutForm = (
  currentOptions: any,
  callback: (data: any) => void,
): FormGeneratorData => {
  const option = {
    id: 'layout',
    label: 'Layout',
    value: currentOptions.id || 'circle',
    options: LAYOUT.OPTIONS.map((o) => {
      return { id: o.name, label: o.name };
    }),
    callback,
    dagre: [
      {
        id: 'rankSep',
        label: 'rankSep',
        type: 'slider',
        value: LAYOUT.DAGRE_DEFAULT.rankSep,
        min: 1,
        max: 50,
      },
    ],
    circle: [
      {
        id: 'r',
        label: 'r',
        type: 'slider',
        value: LAYOUT.CIRCLE_DEFAULT.r,
        min: 10,
        max: 300,
      },
    ],
    grid: [
      {
        id: 'nodeSep',
        label: 'nodeSep',
        type: 'slider',
        value: LAYOUT.GRID_DEFAULT.nodeSep,
        min: 10,
        max: 100,
      },
    ],
    radial: [
      {
        id: 'unitRadius',
        label: 'radius',
        type: 'slider',
        value: LAYOUT.RADIAL_DEFAULT.unitRadius,
        min: 10,
        max: 500,
      },
    ],
  };

  // override value for option if exist in currentOption
  if (option[currentOptions.id]) {
    Object.entries(currentOptions).forEach(([key, value]) => {
      const idx = option[currentOptions.id].findIndex((x: any) => x.id === key);
      if (idx > -1) {
        option[currentOptions.id][idx].value = value;
      }
    });
  }
  return option;
};

const OptionsPanel = () => {
  const dispatch = useDispatch();

  const styleOptions = useSelector((state) => getGraph(state).styleOptions);
  const { layout } = styleOptions;
  const layoutOptions = { id: layout.name, ...layout.options };
  return (
    <Fragment>
      <Header />
      <Accordion
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
              <Fragment>
                <FormGenerator
                  data={genLayoutForm(layoutOptions, (data) =>
                    dispatch(changeLayout(data)),
                  )}
                />
              </Fragment>
            ),
            expanded: true,
          },
        ]}
      />
      <Block marginTop='scale800' />
      <Accordion
        items={[
          {
            title: (
              <Block display='flex' justifyContent='center'>
                <Icon.Node style={{ paddingRight: '8px' }} />
                Node Styles
              </Block>
            ),
            key: 'node styles',
            content: (
              <Fragment>
                <Block>Node Settings</Block>
              </Fragment>
            ),
            expanded: true,
          },
        ]}
      />
      <Block marginTop='scale800' />
      <Accordion
        items={[
          {
            title: (
              <Block display='flex' justifyContent='center'>
                <Icon.Edge style={{ paddingRight: '8px' }} />
                Edge Styles
              </Block>
            ),
            key: 'edge styles',
            content: (
              <Fragment>
                <Block>Edge Settings</Block>
              </Fragment>
            ),
            expanded: true,
          },
        ]}
      />
    </Fragment>
  );
};

export default OptionsPanel;
