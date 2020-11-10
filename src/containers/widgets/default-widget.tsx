import React from 'react';
import { Block } from 'baseui/block';
import { LeftLayer, BottomRightLayer, TopRightLayer } from './layer';
import InvestigateTimeBar from '../InvestigateTimeBar';
import Toolbar from '../Toolbar';
import { LayersPanel } from '../SidePanel';
import IconButton from './IconButton';
import * as Icon from '../../components/Icons';
import { WidgetItem } from './widget-slice';

const defaultWidgetList: WidgetItem[] = [
  {
    id: 'layers',
    group: 'main',
    icon: <IconButton id='layers' group='main' icon={<Icon.Layer />} />,
    widget: (
      <LeftLayer>
        <LayersPanel />
      </LeftLayer>
    ),
    position: 'top',
    active: true,
  },
  {
    id: 'options',
    group: 'main',
    icon: <IconButton id='options' group='main' icon={<Icon.Gear />} />,
    widget: (
      <LeftLayer>
        <Block />
      </LeftLayer>
    ),
    position: 'top',
    active: false,
  },
  {
    id: 'layer2',
    group: 'main',
    icon: <IconButton id='layer2' group='main' icon={<Icon.Tick />} />,
    widget: <Block />,
    position: 'top',
    active: false,
  },
  {
    id: 'toolbar',
    group: 'toolbar',
    icon: (
      <IconButton id='toolbar' group='toolbar' icon={<Icon.DotsVertical />} />
    ),
    widget: (
      <TopRightLayer>
        <Toolbar />
      </TopRightLayer>
    ),
    position: 'bottom',
    active: true,
  },
  {
    id: 'filter',
    group: 'filter',
    icon: <IconButton id='filter' group='filter' icon={<Icon.BarChart />} />,
    widget: (
      <BottomRightLayer>
        <InvestigateTimeBar />
      </BottomRightLayer>
    ),
    position: 'bottom',
    active: true,
  },
];

export default defaultWidgetList;
