import { GraphData } from '../../../packages/src/redux/graph';

const nodeEdgeRootPath = 'LocalFiles/NodeEdge';
const edgeDatasetRootPath = 'LocalFiles/EdgeList';

describe('Import Edge List', () => {
  const selectNodeEdgeFormat = () => {
    cy.react('Select', { props: { id: 'DataTypeSelection' } })
      .nthNode(0)
      .click();
    cy.get('li[role="option"')
      .contains('Node Edge Csv (2 Files)')
      .click();
  };

  before(() => {
    cy.visit('/');
    cy.waitForReact();

    // close modal
    cy.get('button[aria-label="Close"]').click();
  });

  beforeEach(() => {
    cy.react('ImportDataButton').click();
    selectNodeEdgeFormat();
  });

  const nodeDataset = `${nodeEdgeRootPath}/node_dataset.csv`;
  const edgeDataset = `${nodeEdgeRootPath}/edge_dataset.csv`;
  const sampleEdge = `${edgeDatasetRootPath}/edge_dataset.csv`;

  describe('Local Files Import', () => {
    it('should import both node and edge successfully', () => {
      cy.get('input[type="file"]')
        .nthNode(0)
        .attachFile([nodeDataset]);
      cy.get('input[type="file"]')
        .nthNode(1)
        .attachFile([edgeDataset]);
      cy.get('button[type="submit"]').click();
      cy.get('button[type="submit"]').click();

      cy.getReact('Graphin')
        .getProps('data')
        .then((graph: GraphData) => {
          const { edges, nodes } = graph;
          expect(edges.length).to.deep.equal(3);
          expect(nodes.length).to.deep.equal(3);
        });

      cy.react('ClearDataButton').click();
    });

    describe('Wrong format provided', function() {
      it('should remain modal', () => {
        cy.get('input[type="file"]')
          .nthNode(0)
          .attachFile(sampleEdge);
        cy.get('input[type="file"]')
          .nthNode(1)
          .attachFile(sampleEdge);

        cy.get('button[type="submit"]').click();
        cy.get('button[type="submit"]').click();

        cy.getReact('ImportWizardModal').should('exist');
      });
    });
  });
});
