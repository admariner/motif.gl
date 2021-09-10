/* eslint-disable react/destructuring-assignment */
/* eslint-disable  react/no-did-update-set-state */
import React, {
  Component,
  ReactNode,
  createRef,
  FC,
  MutableRefObject,
} from 'react';
import { useStyletron } from 'baseui';
import { Block } from 'baseui/block';

import Graphin from '@cylynx/graphin';
import {
  SIDE_NAVBAR_WIDTH,
  LEFT_LAYER_WIDTH,
} from '../../constants/widget-units';
import { Card } from '../../components/ui';
import { extractIntegerFromString } from '../../utils/data-utils/data-utils';

export const BottomRightLayer: FC = ({ children }) => {
  const [, theme] = useStyletron();
  return (
    <Card
      $style={{
        paddingLeft: theme.sizing.scale400,
        paddingTop: theme.sizing.scale400,
        paddingBottom: theme.sizing.scale400,
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        width: '580px',
      }}
    >
      {children}
    </Card>
  );
};

type LeftLayerProps = { padding?: boolean };
export const LeftLayer: FC<LeftLayerProps> = ({ children, padding = true }) => {
  return (
    <Block
      position='absolute'
      top='0px'
      bottom='0px'
      left={SIDE_NAVBAR_WIDTH}
      width={padding ? '280px' : '308px'}
      paddingTop={padding ? 'scale600' : 0}
      paddingBottom={padding ? 'scale200' : 0}
      paddingLeft={padding ? 'scale550' : 0}
      paddingRight={padding ? 'scale550' : 0}
      backgroundColor='backgroundPrimary'
      overflow='auto'
    >
      {children}
    </Block>
  );
};

export const TopRightLayer: FC = ({ children }) => {
  return (
    <Block
      display='flex'
      flexDirection='column'
      position='absolute'
      top='10px'
      right='10px'
    >
      {children}
    </Block>
  );
};

type GraphLayerProps = {
  isMainWidgetExpanded: boolean;
  children?: ReactNode;
  leftLayerWidth: string;
  graphRef?: MutableRefObject<Graphin>;
};

type GraphLayerState = {
  width: string;
  left: string;
};

export class GraphLayer extends Component<GraphLayerProps, GraphLayerState> {
  private blockRef = createRef<HTMLDivElement>();

  constructor(props: GraphLayerProps) {
    super(props);

    this.state = {
      width: `calc(100% - (${SIDE_NAVBAR_WIDTH} + ${props.leftLayerWidth}))`,
      left: `calc(${SIDE_NAVBAR_WIDTH} + ${props.leftLayerWidth})`,
    };
  }

  componentDidMount(): void {
    const { graphRef } = this.props;
    const { graph } = graphRef.current;
    const { innerWidth, innerHeight } = this.getInnerDimension();
    graph.changeSize(innerWidth, innerHeight);
  }

  shouldComponentUpdate(
    nextProps: GraphLayerProps,
    nextState: GraphLayerState,
  ): boolean {
    if (this.props.isMainWidgetExpanded !== nextProps.isMainWidgetExpanded) {
      return true;
    }

    if (this.state.left !== nextState.left) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps: GraphLayerProps): void {
    if (this.props.isMainWidgetExpanded !== prevProps.isMainWidgetExpanded) {
      const { graphRef, isMainWidgetExpanded } = this.props;

      const { graph } = graphRef.current;

      // convert the value from px into integer
      const leftLayerWidthPx: number =
        extractIntegerFromString(LEFT_LAYER_WIDTH);

      const { innerWidth, innerHeight } = this.getInnerDimension();

      if (isMainWidgetExpanded) {
        const deductedInnerWidth: number = innerWidth - leftLayerWidthPx;
        graph.changeSize(deductedInnerWidth, innerHeight);
        this.setState({
          width: `${deductedInnerWidth}px`,
          left: `calc(${SIDE_NAVBAR_WIDTH} + ${leftLayerWidthPx}px)`,
        });
      } else {
        const addedInnerWidth: number = innerWidth + leftLayerWidthPx;
        graph.changeSize(addedInnerWidth, innerHeight);
        this.setState({
          width: `${addedInnerWidth}px`,
          left: SIDE_NAVBAR_WIDTH,
        });
      }

      this.centerView();
    }
  }

  private getInnerDimension = () => {
    const { clientWidth, clientHeight } = this.blockRef.current;

    // to prevent the browser round off decimals to cause overflow
    const innerWidth: number = Math.floor(clientWidth);
    const innerHeight: number = Math.floor(clientHeight);

    return { innerWidth, innerHeight };
  };

  private centerView = () => {
    const { graphRef } = this.props;
    const { graph } = graphRef.current;

    const padding = graph.get('fitViewPadding');
    const width: number = graph.get('width');
    const height: number = graph.get('height');

    const viewCenter = {
      x: (width - padding - padding) / 2 + padding,
      y: (height - padding - padding) / 2 + padding,
    };

    const bbox = graph.get('group').getCanvasBBox();
    if (bbox.width === 0 || bbox.height === 0) return;
    const groupCenter = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2,
    };

    graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);
  };

  render(): JSX.Element {
    const { children } = this.props;
    const { width, left } = this.state;

    return (
      <Block
        data-testid='graph-layer'
        ref={this.blockRef}
        position='relative'
        width={width}
        height='100%'
        paddingTop='0'
        paddingBottom='0'
        top='0'
        bottom='0'
        left={left}
      >
        {children}
      </Block>
    );
  }
}
