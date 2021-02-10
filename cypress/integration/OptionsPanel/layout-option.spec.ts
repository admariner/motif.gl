import * as layoutOptions from '../../../src/constants/layout-options';
import * as form from '../../../src/containers/SidePanel/OptionsPanel/constants';
import { NestedFormData } from '../../../src/components/form/NestedForm';
import { SampleData } from '../../../src/containers/ImportWizard/ImportSampleData/ImportSampleData';
const findLayout = (id: string) =>
  layoutOptions.LAYOUT_NAMES.find((layout) => layout.id === id);

describe('Layout Options', () => {
  const layoutEl: string = 'layout';

  const changeLayout = (label: string) => {
    cy.react('NestedForm', { props: { id: layoutEl } })
      .react('Controller', { props: { name: layoutEl } })
      .type(`${label}{enter}`);
  };

  const findDefaultFromLayoutForm = (
    form: NestedFormData,
    layout: string,
    controllerName: string,
  ) => {
    return form[layout].find((value: any) => value.id === controllerName);
  };

  before(() => {
    cy.visit('/');
    cy.waitForReact(5000);
    cy.switchTab('sample-data');
    cy.importSampleData(SampleData.CIRCLE_GRAPH);
    cy.switchPanel('options');
  });

  // describe('Concentric', () => {
  //   const { type, minNodeSpacing } = layoutOptions.CONCENTRIC_DEFAULT;

  //   it('should convert layout', () => {
  //     const { label, id } = findLayout(type);
  //     changeLayout(label);

  //     cy.getReact('Graphin')
  //       .getProps('layout')
  //       .then(($layout) => {
  //         cy.wrap($layout.type).should('deep.equal', id);
  //         cy.wrap($layout.minNodeSpacing).should('deep.equal', minNodeSpacing);
  //       });
  //   });

  //   it('should change node spacing', () => {
  //     const arrows = '{rightarrow}'.repeat(1);
  //     const controllerName: string = 'minNodeSpacing';
  //     const formDefaults = findDefaultFromLayoutForm(form.layoutForm, type, controllerName);
  //     const { min, max } = formDefaults;

  //     cy.react('Controller', { props: { name: controllerName } }).type(arrows);

  //     cy.getReact('Graphin')
  //       .getProps(`layout.${controllerName}`)
  //       .should('deep.equal', max / 2 + min);
  //   });

  // });

  // describe('Radial', () => {
  //   const { type, unitRadius, linkDistance } = layoutOptions.RADIAL_DEFAULT;
  //   it('should convert layout', () => {
  //     const { label, id } = findLayout(type);
  //     changeLayout(label);

  //     cy.getReact('Graphin')
  //       .getProps('layout')
  //       .then(($layout) => {
  //         cy.wrap($layout.type).should('deep.equal', id);
  //         cy.wrap($layout.unitRadius).should('deep.equal', unitRadius);
  //         cy.wrap($layout.linkDistance).should('deep.equal', linkDistance);
  //       });
  //   });

  //   it('should change radius', () => {
  //     const arrows = '{rightarrow}'.repeat(1);
  //     const controllerName: string = 'unitRadius';
  //     const formDefaults = findDefaultFromLayoutForm(form.layoutForm, type, controllerName);
  //     const { max } = formDefaults;

  //     cy.react('Controller', { props: { name: controllerName } }).type(arrows);

  //     cy.getReact('Graphin')
  //       .getProps(`layout.${controllerName}`)
  //       .should('deep.equal', max / 2);
  //   });

  //   it('should change node spacing', () => {
  //     const arrows = '{rightarrow}'.repeat(1);
  //     const controllerName: string = 'linkDistance';
  //     const formDefaults = findDefaultFromLayoutForm(form.layoutForm, type, controllerName);
  //     const { min, max } = formDefaults;

  //     cy.react('Controller', { props: { name: controllerName } }).type(arrows);

  //     cy.getReact('Graphin')
  //       .getProps(`layout.${controllerName}`)
  //       .should('deep.equal', max / 2 + min);
  //   });
  // });

  // it('should convert to Concentric', () => {
  //   changeAndVerifyLayout('concentric');
  // });

  // it('should convert to Grid', () => {
  //   changeAndVerifyLayout('grid');
  // });

  // it('should convert to Sequential', () => {
  //   changeAndVerifyLayout('dagre');
  // });

  // it('should convert to Circular', () => {
  //   changeAndVerifyLayout('circular');
  // });

  // it('should convert to Force-directed', () => {
  //   changeAndVerifyLayout('graphin-force');
  // });

  // it('should convert to Fruchterman-force', () => {
  //   changeAndVerifyLayout('fruchterman');
  // });

  // it('should convert to X Y Coordinates', () => {
  //   changeAndVerifyLayout('preset');
  // });
});
