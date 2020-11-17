/// <reference types="Cypress" />
beforeEach(() => {
  cy.visit(Cypress.env('SINAI_BASE_URL'));
});

describe('Sinai Search', () => {
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

  it('Search Found', () => {
    cy.get('[id=q]').type('manuscript');
    cy.get('[id=search]').click();
    cy.get('.search-count__heading').contains('Catalog Results');
    cy.get('.document-position-1 > .document__list-item-wrapper > .document__list-title > a').click();
    cy.contains('h4','Item Overview');
  });
});
