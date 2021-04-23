/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useMemo,
  ReactNode,
  MutableRefObject,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyletron, ThemeProvider } from 'baseui';
import { Theme } from 'baseui/theme';
import { Block } from 'baseui/block';

import { ToasterContainer, PLACEMENT } from 'baseui/toast';
import Graphin from '@cylynx/graphin';
import { Loader } from '../components/ui';
import DataTableModal from './DataTableModal';
import ImportWizardModal from './ImportWizardModal';
import { defaultWidgetList } from './widgets';
import {
  Overrides,
  getTooltipOverride,
  getWidgetOverride,
} from '../utils/overrides';
import { UISelectors, UISlices } from '../redux/ui';
import { WidgetSelectors, WidgetSlices, WidgetItem } from '../redux/widget';
import { GraphSlices, Accessors, StyleOptions } from '../redux/graph';
import SideNavBars from './SideNavBar';
import Graph, { GraphRefContext } from './Graph';
import Tooltip from './Tooltip';
import { LEFT_LAYER_WIDTH } from '../constants/widget-units';
import { GraphLayer } from './widgets/layer';

export interface WidgetContainerProps {
  children: ReactNode;
  graphRef: MutableRefObject<Graphin>;
  theme: Theme;
}

export type ExplorerProps = {
  name: string;
  accessors: Accessors;
  overrides?: Overrides;
  styleOptions?: StyleOptions;
  secondaryTheme?: Theme;
};

export const WidgetContainer = (props: WidgetContainerProps) => {
  const { children, theme, graphRef } = props;

  // @ts-ignore not sure what to type for current.graph
  if (graphRef && graphRef.current && graphRef.current.graph) {
    return (
      <ThemeProvider theme={theme}>
        <ToasterContainer placement={PLACEMENT.top}>
          <GraphRefContext.Provider value={graphRef.current}>
            {children}
          </GraphRefContext.Provider>
        </ToasterContainer>
      </ThemeProvider>
    );
  }
  return null;
};

const Explorer = (props: ExplorerProps) => {
  const {
    name,
    accessors,
    overrides,
    secondaryTheme,
    styleOptions = GraphSlices.initialState.styleOptions,
  } = props;
  const graphRef = useRef<Graphin>(null);
  const [tooltip, setTooltip] = useState(null);
  const [leftLayerWidth, setLeftLayerWidth] = useState<string>(
    LEFT_LAYER_WIDTH,
  );

  const [, theme] = useStyletron();
  const dispatch = useDispatch();
  const loading = useSelector((state) => UISelectors.getUI(state).loading);
  const widgetState = useSelector((state) => WidgetSelectors.getWidget(state));
  const widgetStateIds = useMemo(() => {
    return Object.values(widgetState);
  }, [widgetState]);

  const UserTooltip = getTooltipOverride(overrides, Tooltip);
  const widgetList = getWidgetOverride(overrides, defaultWidgetList);
  const activeWidgetList: WidgetItem[] =
    widgetList.filter((x: WidgetItem) => widgetStateIds.includes(x.id)) || [];

  const isMainWidgetExpanded: boolean = useMemo(() => {
    return widgetState.main !== null;
  }, [widgetState.main]);

  useEffect(() => {
    if (isMainWidgetExpanded) {
      setLeftLayerWidth(LEFT_LAYER_WIDTH);
      return;
    }

    setLeftLayerWidth('0px');
  }, [isMainWidgetExpanded]);

  useEffect(() => {
    // Filter out components
    const widgetProp = widgetList.map((x) => {
      return {
        id: x.id,
        group: x.group,
        position: x.position,
        active: x.active,
      };
    });
    if (accessors) {
      dispatch(GraphSlices.setAccessors(accessors));
    }
    if (name) {
      dispatch(UISlices.setName(name));
    }
    dispatch(WidgetSlices.setWidget(widgetProp));
    dispatch(GraphSlices.overrideStyles(styleOptions));
  }, [accessors, overrides?.widgetList, name]);

  return (
    <Fragment>
      <DataTableModal />
      <ImportWizardModal overrideTabs={overrides?.Tabs} />
      <GraphLayer
        isMainWidgetExpanded={isMainWidgetExpanded}
        leftLayerWidth={leftLayerWidth}
        graphRef={graphRef}
      >
        <Graph ref={graphRef} setTooltip={setTooltip} />
      </GraphLayer>
      <WidgetContainer graphRef={graphRef} theme={secondaryTheme || theme}>
        <SideNavBars />
        {loading && <Loader />}
        {tooltip && <UserTooltip tooltip={{ ...tooltip, leftLayerWidth }} />}
        {activeWidgetList.length > 0 &&
          activeWidgetList.map((item) => (
            <Block key={item.id}>{item.widget}</Block>
          ))}
      </WidgetContainer>
    </Fragment>
  );
};

// const Explorer = React.forwardRef<Graphin, ExplorerProps>(
//   (props, ref: MutableRefObject<Graphin>) => {
//     const {
//       name,
//       accessors,
//       overrides,
//       secondaryTheme,
//       styleOptions = GraphSlices.initialState.styleOptions,
//     } = props;
//     const localRef = useRef<Graphin>(null);
//     const graphRef = ref || localRef;
//     const [tooltip, setTooltip] = useState(null);
//     const [leftLayerWidth, setLeftLayerWidth] = useState<string>(
//       LEFT_LAYER_WIDTH,
//     );

//     const [, theme] = useStyletron();
//     const dispatch = useDispatch();
//     const loading = useSelector((state) => UISelectors.getUI(state).loading);
//     const widgetState = useSelector((state) =>
//       WidgetSelectors.getWidget(state),
//     );
//     const widgetStateIds = useMemo(() => {
//       return Object.values(widgetState);
//     }, [widgetState]);

//     const UserTooltip = getTooltipOverride(overrides, Tooltip);
//     const widgetList = getWidgetOverride(overrides, defaultWidgetList);
//     const activeWidgetList: WidgetItem[] =
//       widgetList.filter((x: WidgetItem) => widgetStateIds.includes(x.id)) || [];

//     const isMainWidgetExpanded: boolean = useMemo(() => {
//       return widgetState.main !== null;
//     }, [widgetState.main]);

//     useEffect(() => {
//       if (isMainWidgetExpanded) {
//         setLeftLayerWidth(LEFT_LAYER_WIDTH);
//         return;
//       }

//       setLeftLayerWidth('0px');
//     }, [isMainWidgetExpanded]);

//     useEffect(() => {
//       // Filter out components
//       const widgetProp = widgetList.map((x) => {
//         return {
//           id: x.id,
//           group: x.group,
//           position: x.position,
//           active: x.active,
//         };
//       });
//       if (accessors) {
//         dispatch(GraphSlices.setAccessors(accessors));
//       }
//       if (name) {
//         dispatch(UISlices.setName(name));
//       }
//       dispatch(WidgetSlices.setWidget(widgetProp));
//       dispatch(GraphSlices.overrideStyles(styleOptions));
//     }, [accessors, overrides?.widgetList, name]);

//     return (
//       <Fragment>
//         <DataTableModal />
//         <ImportWizardModal overrideTabs={overrides?.Tabs} />
//         <GraphLayer
//           isMainWidgetExpanded={isMainWidgetExpanded}
//           leftLayerWidth={leftLayerWidth}
//           graphRef={graphRef}
//         >
//           <Graph ref={graphRef} setTooltip={setTooltip} />
//         </GraphLayer>
//         <WidgetContainer graphRef={graphRef} theme={secondaryTheme || theme}>
//           <SideNavBars />
//           {loading && <Loader />}
//           {tooltip && <UserTooltip tooltip={{ ...tooltip, leftLayerWidth }} />}
//           {activeWidgetList.length > 0 &&
//             activeWidgetList.map((item) => (
//               <Block key={item.id}>{item.widget}</Block>
//             ))}
//         </WidgetContainer>
//       </Fragment>
//     );
//   },
// );

export default Explorer;
