import { SampleData } from '../../../src/containers/ImportWizard/ImportSampleData/ImportSampleData';

describe('Import Random + Circle', () => {
  before(() => {
    cy.visit('/');
    cy.waitForReact();
  });

  it('should import Random + Circle successfully', () => {
    // switch tabs to sample data
    cy.switchTab('sample-data');

    // import sample data by clicking random graph
    cy.react('Cell', {
      props: { 'data-testid': SampleData.SIMPLE_GRAPH },
    })
      .find('Button')
      .click();
  });

  it('should display layout in Concentric', () => {
    cy.getReact('Graphin')
      .getProps('layout.type')
      .should('deep.eq', 'concentric');
  });

  it('should render 25 edges in Graphin', () => {
    cy.getReact('Graphin')
      .getProps('data.edges')
      .should('have.length', 25);
  });

  it('should render 15 nodes in Graphin', () => {
    cy.getReact('Graphin')
      .getProps('data.nodes')
      .should('have.length', 15);
  });

  it('should display 15 nodes count in Nodes label', () => {
    cy.getReact('Statistic', {
      props: { 'data-testid': 'nodes-count' },
    })
      .nthNode(0)
      .getProps('value')
      .should('deep.eq', 15);
  });

  it('should display 25 edges count in Edges label', () => {
    cy.getReact('Statistic', {
      props: { 'data-testid': 'edges-count' },
    })
      .nthNode(0)
      .getProps('value')
      .should('deep.eq', 25);
  });

  it('should display two row for data list', () => {
    cy.getReact('DataListAccordion')
      .getProps('items')
      .should('have.length', 2);
  });

  it('should display data list name [Random Data]', () => {
    cy.getReact('AccordionPanel')
      .nthNode(0)
      .getProps('title')
      .should('deep.eq', 'Random Data');
  });

  it('should display data list name [Circle Data]', () => {
    cy.getReact('AccordionPanel')
      .nthNode(1)
      .getProps('title')
      .should('deep.eq', 'Circle Data');
  });
});
