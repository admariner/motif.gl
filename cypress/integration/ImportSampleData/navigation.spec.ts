/// <reference types="cypress" />
import 'cypress-react-selector';

describe('Navigation', () => {
  before(() => {
    cy.visit('/');
    cy.waitForReact();
  });

  it('should open Modal when the page initialized', () => {
    cy.getReact('Modal')
      .getProps('isOpen')
      .should('eq', true);
  });

  it('should display sample data list after switched to [Sample Data] tabs', () => {
    switchSampleDataTabs('sample-data');

    cy.getReact('Tabs')
      .getProps('activeKey')
      .should('eq', 'sample-data');
  });

  it('should display six categories of sample data', () => {
    cy.react('FlushedGrid')
      .react('Cell')
      .should('have.length', 6);
  });

  const switchSampleDataTabs = (tabActiveKey: string) => {
    cy.react('Tabs')
      .react('InternalTab', {
        props: { childKey: tabActiveKey },
      })
      .click();
  };
});
