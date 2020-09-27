// @ts-nocheck
// Copied from https://github.com/antvis/Graphin/blob/master/packages/graphin/src/utils/mock.ts
// Since there's a problem getting the imported mock to work with jest...
import { NodeData, EdgeData, Data } from '@antv/graphin';

const defaultOptions = {
  /** 节点 */
  nodeCount: 10,
  nodeType: 'company',
};

type OptionType = typeof defaultOptions;

/**
 * 1,mock data with edges,nodes
 * 2.mock nodes properties
 * 3.filter edges
 * 4.
 */
export class Mock {
  nodes: NodeData[];

  edges: EdgeData[];

  options: OptionType;

  nodeIds: string[];

  combosData: any; // eslint-disable-line  @typescript-eslint/no-explicit-any

  constructor(count: number) {
    this.options = defaultOptions;
    this.options.nodeCount = count;
    this.nodes = [];
    this.edges = [];
    this.nodeIds = [];
    this.initNodes();
  }

  initNodes = () => {
    const { nodeCount, nodeType } = this.options;
    const temp = Array.from({ length: nodeCount });
    this.nodes = temp.map((node, index) => {
      return {
        id: `node-${index}`,
        label: `node-${index}`,
        type: nodeType,
        properties: [],
      };
    });

    for (let i = 0; i < nodeCount; i = i + 1) {
      for (let j = 0; j < nodeCount - 1; j = j + 1) {
        this.edges.push({
          source: `node-${i}`,
          target: `node-${j}`,
          label: `edge-${i}_${j}`,
          properties: [],
        });
      }
    }
    this.nodeIds = this.nodes.map((node) => node.id);
  };

  expand = (snodes: NodeData[]) => {
    this.edges = [];
    this.nodes = [];
    snodes.forEach((node) => {
      for (let i = 0; i < this.options.nodeCount; i += 1) {
        this.nodes.push({
          id: `${node.id}-${i}`,
          type: node.type,
          label: `${node.id}-${i}`,
          properties: [],
        });
        this.edges.push({
          source: `${node.id}-${i}`,
          target: node.id,
          label: `edge-${i}_${node.id}`,
          properties: [],
        });
      }
    });
    return this;
  };

  type = (nodeType: string) => {
    this.nodes = this.nodes.map((node) => {
      return {
        ...node,
        type: nodeType,
      };
    });
    return this;
  };

  circle = (centerId = '') => {
    let id = centerId;
    if (this.nodeIds.indexOf(id) === -1) {
      id = 'node-0';
    }
    this.edges = this.edges.filter((edge: EdgeData) => {
      return edge.source === id || edge.target === id;
    });
    return this;
  };

  /**
   * @param ratio 随机的稀疏程度，默认0.5
   */
  random = (ratio = 0.5) => {
    const { nodeCount } = this.options;
    const length: number = parseInt(String(nodeCount * ratio));
    /**  随机ID */
    const randomArray: string[] = this.nodeIds
      .sort(() => Math.random() - 0.5)
      .slice(0, length);

    this.edges = this.edges.filter((edge: EdgeData) => {
      return randomArray.indexOf(edge.target) !== -1;
    });

    this.edges = this.edges.sort(() => Math.random() - 0.5).slice(0, length);

    return this;
  };

  value = () => {
    return {
      nodes: this.nodes,
      edges: this.edges,
    };
  };

  combos = (chunkSize: number) => {
    const comboIds = new Set();
    this.nodes = this.nodes.map((node, index) => {
      const comboIndex = Math.ceil((index + 1) / chunkSize);
      const comboId = `combo-${comboIndex}`;
      comboIds.add(comboId);
      return {
        ...node,
        comboId,
      };
    });
    this.combosData = [...comboIds].map((c) => {
      return {
        id: c,
        label: c,
      };
    });

    return this;
  };

  graphin = (): Data => {
    return {
      nodes: this.nodes.map((node) => {
        return {
          id: node.id,
          label: `node-${node.id}`,
          data: node,
          shape: 'CircleNode',
          comboId: node.comboId,
          style: {
            nodeSize: 24,
          },
        };
      }),
      edges: this.edges.map((edge) => {
        return {
          source: edge.source,
          target: edge.target,
          label: edge.label,
          data: edge,
        };
      }),
      combos: this.combosData,
    };
  };
}

const mock = (count: number) => {
  return new Mock(count);
};
export default mock;

/**
 * mock(10).type('company').value()
 * mock(10).type('company').circle('node-1').value()
 * mock(10).type('company').random('node-1').value()
 * mock(10).type('company').random('node-1').value()
 *
 *
 * graphin()
 */
