/// <reference types="Cypress" />
beforeEach(() => {
  cy.visit('/');
});
describe('Search', () => {
  it('Search Blank', () => {
    cy.get('[id=search]').click();
    cy.contains('span', 'You searched for:').should('not.exist');
    cy.percySnapshot();
  });

  it('Search Not Found', () => {
    cy.get('[id=q]').type('unicorn');
    cy.get('[id=search]').click();
    cy.contains('h2', '0 Catalog Results').should('exist');
    cy.percySnapshot();
  });

  it('Search Title Found', () => {
    cy.get('[id=q]').type('postcards');
    cy.get('select').select('Title').should('have.value', 'title_tesim');
    cy.get('[id=search]').click();
    cy.get('.search-count__heading').contains('Catalog Results');
    cy.percySnapshot();
  });

  it('Search Subject Found', () => {
    cy.get('[id=q]').type('engineer');
    cy.get('select').select('Subject').should('have.value', 'subject_tesim');
    cy.get('[id=search]').click();
    cy.get('.search-count__heading').contains('Catalog Results');
    cy.percySnapshot();
  });

  it('Metadata Text', () => {
    cy.contains('a', 'Resource Type').click();
    cy.contains('a', 'text').click({ force: true });
    cy.get('[title="text"]');
    cy.get(
      '.document-position-0 > .document__list-header > .document__list-title > a'
    ).click({ force: true });
    cy.contains('a', 'text').click();
    cy.contains('span', 'Resource Type');
    cy.get('[title=text]').contains('text');
    cy.percySnapshot();
  });

  it('Metadata Still Image', () => {
    cy.get('[id=q]').type('still image');
    cy.get('[id=search]').click();
    cy.get(
      '.document-position-0 > .document__list-header > .document__list-title > a'
    ).click({ force: true });
    cy.contains('a', 'still image').click();
    cy.contains('span', 'Genre');
    cy.contains('span', 'still image');
    cy.percySnapshot();
  });

  it('Metadata Artistic Photo', () => {
    cy.get('[id=q]').type('photographer');
    cy.get('[id=search]').click();
    cy.get(
      '.document-position-0 > .document__list-header > .document__list-title > a'
    ).click({ force: true });
    cy.get(
      '.blacklight-photographer_tesim.metadata-block__label-value > a'
    ).click();
    cy.contains('span', 'Photographer Sim');
    cy.percySnapshot();
  });
});
