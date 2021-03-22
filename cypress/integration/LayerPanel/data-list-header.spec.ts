import { SampleData } from '../../../src/containers/ImportWizard/ImportSampleData/ImportSampleData';

describe('Data List Header', () => {
  before(() => {
    cy.visit('/');
    cy.waitForReact();
    cy.switchTab('sample-data');
    cy.importSampleData(SampleData.BANK);
  });

  describe('Display Node/Edge Information', () => {
    it('should open datatable modal', () => {
      cy.react('TableButton').click();
      cy.getReact('DatatableModal').should('exist');

      // close modal
      cy.get('button[aria-label="Close"]').click();
    });
  });

  describe('Visibility Button', () => {
    it('should hide the specific graph list', () => {
      cy.react('VisibilityButton').click();
      cy.wait(500);

      cy.getReact('GraphStatistics')
        .nthNode(1)
        .getProps()
        .then((props) => {
          const {
            edgeLength,
            hiddenEdgeLength,
            hiddenNodeLength,
            nodeLength,
          } = props;

          expect(nodeLength).to.deep.equal(0);
          expect(edgeLength).to.deep.equal(0);
          expect(hiddenNodeLength).to.deep.equal(17);
          expect(hiddenEdgeLength).to.deep.equal(23);
        });
    });
  });

  describe('Delete Layer', () => {
    it('should delete the specific graph list', () => {
      cy.react('DeleteButton')
        .last()
        .click();
      cy.wait(750);

      cy.getReact('GraphStatistics')
        .nthNode(0)
        .getProps()
        .then((props) => {
          const {
            edgeLength,
            hiddenEdgeLength,
            hiddenNodeLength,
            nodeLength,
          } = props;

          expect(nodeLength).to.deep.equal(0);
          expect(edgeLength).to.deep.equal(0);
          expect(hiddenNodeLength).to.deep.equal(0);
          expect(hiddenEdgeLength).to.deep.equal(0);
        });
    });
  });
});