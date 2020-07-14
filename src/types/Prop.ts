import {
 ReactNode, RefObject, MouseEvent, FC,
} from 'react';
import { GetFns } from './Graph';

// Prop Types for Investigate Component
export interface Overrides {
  Tabs: FC[];
  NodeMenu: FC<NodeMenu>;
  score: number[];
}

// Prop Types for ImportWizard
export interface ImportWizard {
  tabs: FC[];
}

// Prop Types for NodeMenu
export interface Menu {
  x: number;
  y: number;
  node: {
    id: string;
  };
}

export interface NodeMenu {
  menu: Menu | null;
}

// Prop Types for Investigate Explorer
export interface InvestigateExplorer {
  name: string;
  currency: string;
  getFns: GetFns;
  overrides: Overrides;
}

// Prop Types for Bottom and Side Layer
export interface Layer {
  children: ReactNode;
}

// Prop Types for Toggle Button
export interface ToggleButton {
  onClick: (event: MouseEvent<HTMLButtonElement>) => any;
  isOpen: boolean;
}

// Prop Types for Wrapper
export interface Wrapper {
  offset?: string;
  color?: string;
  children: ReactNode;
  forwardedRef?: RefObject<any>;
}

// Prop Types for ImportDataButton
export interface ImportDataButton {
  onClick: (event: MouseEvent<HTMLButtonElement>) => any;
}

// Prop Types for EventChart
export interface ItemStyle {
  color?: string;
}

export interface TimeBarData {
  value: any;
  itemStyle: ItemStyle;
}

export interface EventChart {
  min: number;
  max: number;
  data: TimeBarData[];
}

// Prop Types for ToolbarItem
export interface ToolbarItem {
  key: number;
  item: {
    name: string;
    icon: JSX.Element;
    isDisabled: boolean;
    popoverContent: () => JSX.Element;
    onClick: () => void | null;
  };
}

// Prop Types for PopoverOption
export interface Layout {
  label: string;
  id: string;
}

// Prop Types for QueryFile
export interface QueryFile {
  info: string;
  tooltip: string;
}

// Prop Types for InvestigateChart
export interface InvestigateChart {
  NodeMenu: FC<NodeMenu>;
}

// Prop Types for InvestigateGraph
export interface InvestigateGraph {
  setMenu: (menu: Menu | boolean) => void;
}
