// @ts-nocheck
import React, {
  useContext,
  useState,
  useCallback,
  useMemo,
  Fragment,
} from 'react';
import { styled } from 'baseui';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { Block } from 'baseui/block';
import { LabelSmall } from 'baseui/typography';
import { Node, Edge } from '@antv/graphin';
import { GraphRefContext, EnumNodeAndEdgeStatus } from '../Graph';
import SelectVariable from '../../components/SelectVariable';
import { RangePlot } from '../../components/plots';
import { getGraphFlatten, getGraphVisible } from '../../redux';
import { getFieldDomain, unixTimeConverter } from '../../utils/data-utils';

const dateTimeAnalyzerTypes = ['DATETIME', 'DATE', 'TIME'];
const validTypes = ['integer', 'real', 'timestamp', 'date'];

export const PlotDiv = styled('div', ({ $theme, $expanded }) => {
  const { animation, sizing } = $theme;
  return {
    paddingLeft: sizing.scale700,
    paddingRight: sizing.scale600,
    height: $expanded ? '150px' : 0,
    transitionProperty: 'all',
    transitionDuration: animation.timing400,
    transitionTimingFunction: animation.easeInOutCurve,
  };
});

const VariableInspector = () => {
  const graphRef = useContext(GraphRefContext);
  const [selection, setSelection] = useState([]);
  const [histogramProp, setHistogramProp] = useState({});
  const [value, setValue] = useState(false);
  const graphFlatten = useSelector((state) => getGraphFlatten(state));
  const graphVisible = useSelector((state) => getGraphVisible(state));
  const graphFields = graphFlatten.metadata.fields;

  const nodeOptions = useMemo(
    () =>
      graphFields.nodes
        .filter((f) => validTypes.includes(f.type))
        .map((f) => {
          return {
            id: f.name,
            label: f.name,
            type: f.type,
            analyzerType: f.analyzerType,
            format: f.format,
            from: 'nodes',
          };
        }),
    [graphFields],
  );

  const edgeOptions = useMemo(
    () =>
      graphFields.edges
        .filter((f) => validTypes.includes(f.type))
        .map((f) => {
          return {
            id: f.name,
            label: f.name,
            type: f.type,
            analyzerType: f.analyzerType,
            format: f.format,
            from: 'edges',
          };
        }),
    [graphFields],
  );

  const onChangeRange = useCallback(
    (val) => {
      setValue(val);
      const { graph } = graphRef;
      const { from, id, analyzerType } = selection[0];
      const isDateTime = dateTimeAnalyzerTypes.includes(analyzerType);
      graph.setAutoPaint(false);
      if (from === 'nodes') {
        for (const obj of graphVisible.nodes) {
          let prop = get(obj, id);
          if (isDateTime) {
            prop = unixTimeConverter(prop, analyzerType);
          }
          if (val[0] <= prop && prop <= val[1]) {
            graph.setItemState(obj.id, EnumNodeAndEdgeStatus.FILTERED, false);
          } else {
            graph.setItemState(obj.id, EnumNodeAndEdgeStatus.FILTERED, true);
          }
        }
      } else {
        for (const obj of graphVisible.edges) {
          let prop = get(obj, id);
          if (isDateTime) {
            // eslint-disable-next-line no-loop-func
            prop = prop.map((el: string) =>
              unixTimeConverter(el, analyzerType),
            );
          }
          let condition = true;
          if (Array.isArray(prop)) {
            condition = prop.some((el: any) => {
              return val[0] <= el && el <= val[1];
            });
          } else {
            condition = val[0] <= prop && prop <= val[1];
          }
          if (condition) {
            graph.setItemState(obj.id, EnumNodeAndEdgeStatus.FILTERED, false);
          } else {
            graph.setItemState(obj.id, EnumNodeAndEdgeStatus.FILTERED, true);
          }
        }
      }
      graph.paint();
      graph.setAutoPaint(true);
    },
    [setValue, graphRef, selection, graphVisible],
  );

  const onChangeSelected = useCallback(
    (obj) => {
      if (obj?.id) {
        const { domain, step, histogram } = getFieldDomain(
          graphFlatten[obj.from],
          (x) => x[obj.id],
          obj.analyzerType,
        );
        setSelection([obj]);
        setHistogramProp({ domain, step, histogram, format: obj.format });
        setValue(domain);
      } else {
        const { graph } = graphRef;
        graph.setAutoPaint(false);
        graph.getNodes().forEach((node: Node) => {
          graph.clearItemStates(node, EnumNodeAndEdgeStatus.FILTERED);
        });
        graph.getEdges().forEach((edge: Edge) => {
          graph.clearItemStates(edge, EnumNodeAndEdgeStatus.FILTERED);
        });
        graph.paint();
        graph.setAutoPaint(true);
        setSelection([]);
        setHistogramProp({});
        setValue(false);
      }
    },
    [graphRef, setSelection, setHistogramProp, setValue, graphFlatten],
  );

  return (
    <Fragment>
      <Block
        display='flex'
        height='50px'
        paddingTop='scale600'
        paddingLeft='scale600'
        paddingRight='scale600'
      >
        <LabelSmall width='100px'>Variable Inspector</LabelSmall>
        <SelectVariable
          value={selection}
          options={{ Nodes: nodeOptions, Edges: edgeOptions }}
          onChange={(obj) => onChangeSelected(obj)}
        />
      </Block>
      <PlotDiv $expanded={histogramProp.histogram}>
        {histogramProp.histogram && (
          <RangePlot
            value={value}
            step={histogramProp.step}
            onChange={onChangeRange}
            range={histogramProp.domain}
            histogram={histogramProp.histogram}
            xAxisFormat={histogramProp.format}
          />
        )}
      </PlotDiv>
    </Fragment>
  );
};

export default VariableInspector;
