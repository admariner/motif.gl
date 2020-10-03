import React from 'react';
import { Block } from 'baseui/block';
import {
  CopyOutlined,
  BarChartOutlined,
  CheckOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { LeftLayer, BottomRightLayer, TopRightLayer } from './layer';
import InvestigateTimeBar from '../InvestigateTimeBar';
import InvestigateToolbar from '../InvestigateToolbar';
import { InvestigatePanel } from '../InvestigatePanel';
import IconButton from './IconButton';
import { WidgetItem } from '../../types/Widget';

const defaultWidgetList: WidgetItem[] = [
  {
    id: 'layers',
    group: 'main',
    icon: (
      <IconButton
        id='layers'
        group='main'
        icon={<CopyOutlined style={{ fontSize: '16px' }} />}
      />
    ),
    widget: (
      <LeftLayer>
        <InvestigatePanel />
      </LeftLayer>
    ),
    position: 'top',
    active: true,
  },
  {
    id: 'layer2',
    group: 'main',
    icon: (
      <IconButton
        id='layer2'
        group='main'
        icon={<CheckOutlined style={{ fontSize: '16px' }} />}
      />
    ),
    widget: <Block />,
    position: 'top',
    active: false,
  },
  {
    id: 'toolbar',
    group: 'toolbar',
    icon: (
      <IconButton
        id='toolbar'
        group='toolbar'
        icon={<MoreOutlined style={{ fontSize: '16px' }} />}
      />
    ),
    widget: (
      <TopRightLayer>
        <InvestigateToolbar />
      </TopRightLayer>
    ),
    position: 'bottom',
    active: true,
  },
  {
    id: 'filter',
    group: 'filter',
    icon: (
      <IconButton
        id='filter'
        group='filter'
        icon={<BarChartOutlined style={{ fontSize: '16px' }} />}
      />
    ),
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
