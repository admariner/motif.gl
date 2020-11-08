/* eslint-disable import/no-extraneous-dependencies */
import { Group, Shape } from '@antv/g-canvas';
import { INode } from '@antv/g6/lib/interface/item';
import G6 from '@antv/g6';
import { G6Node } from '@antv/graphin';
import { GREY, EnumNodeAndEdgeStatus, DEFAULT_NODE_STYLE } from './constants';
import { normalizeColor } from './utils';

export default (g6: typeof G6) => {
  g6.registerNode('CircleNode', {
    draw(cfg: G6Node, group: Group) {
      const hasLabel = cfg.label;
      const defaultStyle = cfg?.defaultStyle;
      const innerSize =
        cfg.style?.size || defaultStyle.size || DEFAULT_NODE_STYLE.size;
      const outerSize = innerSize > 5 ? innerSize + 4 : innerSize + 2;

      const color = cfg.style?.dark
        ? GREY
        : normalizeColor(
            cfg.style?.color || defaultStyle.color || DEFAULT_NODE_STYLE.color,
          );

      const strokeColor = cfg.style?.dark
        ? GREY
        : normalizeColor(cfg.style?.stroke || defaultStyle.stroke || color);

      const labelFontSize =
        cfg.style?.fontSize ||
        defaultStyle.fontSize ||
        DEFAULT_NODE_STYLE.fontSize;

      group.addShape('circle', {
        attrs: {
          id: 'circle-floor',
          x: 0,
          y: 0,
          r: outerSize / 2,
        },
        draggable: true,
        name: 'circle-floor',
      });
      group.addShape('circle', {
        attrs: {
          id: 'circle-selected',
          x: 0,
          y: 0,
          r: 0,
          fill: '#000',
          opacity: 0.05,
        },
        draggable: true,
        name: 'circle-selected',
      });

      const keyShape = group.addShape('circle', {
        attrs: {
          id: 'circle-inner',
          x: 0,
          y: 0,
          r: innerSize / 2,
          fill: color.dark,
          stroke: strokeColor.normal,
          lineWidth: innerSize > 10 ? 2 : 1,
        },
        draggable: true,
        name: 'circle-inner',
      });
      const inner = group.addGroup(
        {
          attrs: {
            id: 'circle-inner-group',
          },
          draggable: true,
          name: 'circle-inner-group',
          // tslint:disable-next-line: align
        },
        {},
      );
      // font-icon
      inner.addShape('text', {
        attrs: {
          id: 'circle-icon',
          x: 0,
          y: 0,
          text: '',
          fontSize: 20,
          textAlign: 'center',
          textBaseline: 'middle',
          fontFamily: 'graphin',
          fill: cfg.style?.dark ? '#8D93B0' : '#FFFFFF',
        },
        draggable: true,
        name: 'circle-icon',
      });
      if (hasLabel) {
        group.addShape('text', {
          attrs: {
            id: 'circle-label',
            x: 0,
            y: outerSize / 2 + labelFontSize,
            fontSize: labelFontSize,
            text: cfg.label,
            textAlign: 'center',
            fontFamily:
              cfg.style?.fontFamily ||
              defaultStyle.fontFamily ||
              DEFAULT_NODE_STYLE.fontFamily,
            fill: cfg.style?.dark ? '#8D93B0' : '#3B3B3B',
          },
          draggable: true,
          name: 'circle-label',
        });
      }

      if (!cfg.badge) return keyShape;

      const children = group.addGroup(
        {
          attrs: {
            id: 'circle-children-group',
          },
          draggable: true,
          name: 'circle-children-group',
          // tslint:disable-next-line: align
        },
        {},
      );
      children.addShape('circle', {
        attrs: {
          id: 'circle-children',
          x: outerSize / 2 - 9,
          y: -outerSize / 2 + 9,
          r: 9,
          fill: cfg.style?.dark ? '#1E202D' : color.dark,
        },
        draggable: true,
        name: 'circle-children',
      });
      children.addShape('text', {
        attrs: {
          id: 'circle-children-icon',
          x: outerSize / 2 - 9,
          y: -outerSize / 2 + 9,
          text: cfg.badge,
          fontSize: 10,
          textAlign: 'center',
          textBaseline: 'middle',
          fill: cfg.style?.dark ? '#8D93B0' : '#FFFFFF',
        },
        draggable: true,
        name: 'circle-children-icon',
      });
      return keyShape;
    },
    setState(name: EnumNodeAndEdgeStatus, value: string, node: INode) {
      if (!name) return;
      const data: G6Node = node.get('model');
      const defaultStyle = data?.defaultStyle;
      const container = node.getContainer();
      const circleSelected = container
        .get('children')
        .find((item: Shape.Base) => item.attr().id === 'circle-selected');
      const circleInnerGroup = container
        .get('children')
        .find((item: Shape.Base) => item.attr().id === 'circle-inner-group');
      const circleInner = container
        .get('children')
        .find((item: Shape.Base) => item.attr().id === 'circle-inner');
      const circleIcon = circleInnerGroup
        .get('children')
        .find((item: Shape.Base) => item.attr().id === 'circle-icon');
      const circleLabel = container
        .get('children')
        .find((item: Shape.Base) => item.attr().id === 'circle-label');
      const circleChildrenGroup = container
        .get('children')
        .find((item: Shape.Base) => item.attr().id === 'circle-children-group');
      const circleChildren = circleChildrenGroup
        ?.get('children')
        .find((item: Shape.Base) => item.attr().id === 'circle-children');
      const circleChildrenIcon = circleChildrenGroup
        ?.get('children')
        .find((item: Shape.Base) => item.attr().id === 'circle-children-icon');

      const innerSize =
        data.style?.size || defaultStyle.size || DEFAULT_NODE_STYLE.size;
      const outerSize = innerSize > 5 ? innerSize + 4 : innerSize + 2;
      const adjustment = innerSize > 10 ? 4 : 2;

      const color = data.style?.dark
        ? GREY
        : normalizeColor(
            data.style?.color || defaultStyle.color || DEFAULT_NODE_STYLE.color,
          );

      const strokeColor = data.style?.dark
        ? GREY
        : normalizeColor(data.style?.stroke || defaultStyle.stroke || color);

      const targetAttrs = {
        selected: {
          r: 0,
        },
        inner: {
          fill: color.dark,
          stroke: strokeColor.normal,
          lineWidth: innerSize > 10 ? 2 : 1,
        },
        icon: {
          fill: data.style?.dark ? '#8D93B0' : '#FFFFFF',
        },
        label: {
          fill: data.style?.dark ? '#8D93B0' : '#3B3B3B',
        },
        children: {
          fill: color.normal,
        },
        childrenIcon: {
          fill: data.style?.dark ? '#8D93B0' : '#FFFFFF',
        },
      };

      if (name === EnumNodeAndEdgeStatus.SELECTED && value) {
        targetAttrs.inner.lineWidth = innerSize > 10 ? 4 : 2;
        targetAttrs.selected.r = outerSize / 2 + adjustment;
      }

      if (name === EnumNodeAndEdgeStatus.LIGHT && value) {
        targetAttrs.selected.r = outerSize / 2 + adjustment;
      }

      if (name === EnumNodeAndEdgeStatus.DARK && value) {
        targetAttrs.inner.stroke = GREY.dark;
        targetAttrs.inner.fill = GREY.dark;
        targetAttrs.icon.fill = '#8D93B0';
        targetAttrs.label.fill = '#8D93B0';
        targetAttrs.children.fill = GREY.normal;
        targetAttrs.childrenIcon.fill = '#8D93B0';
      }

      // circleBorder.attr(targetAttrs.border);
      circleSelected.attr(targetAttrs.selected);
      circleInner.attr(targetAttrs.inner);
      circleIcon.attr(targetAttrs.icon);
      if (circleLabel) circleLabel.attr(targetAttrs.label);
      if (circleChildren) circleChildren.attr(targetAttrs.children);
      if (circleChildrenIcon) circleChildrenIcon.attr(targetAttrs.childrenIcon);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
};
