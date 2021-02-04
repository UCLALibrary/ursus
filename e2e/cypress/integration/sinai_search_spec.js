/// <reference types="Cypress" />
beforeEach(() => {
  cy.visit(Cypress.env('SINAI_BASE_URL') + '/catalog');
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
    cy.clearCookie('sinai_authenticated');
    cy.setCookie('sinai_authenticated', 'true')
    cy.get('[id=q]').type('manuscript');
    cy.get('[id=search]').click();
    cy.get('.search-count__heading').contains('Catalog Results');
    cy.get('#documents > article.document.document__list-item.blacklight-work.document-position-0 > div > span > header > a:nth-child(2)').click();
    // cy.get('.document-position-1 > .document__list-item-wrapper > .document__list-title > a').click();
    cy.contains('h4','Item Overview');
  });

  it('Search Shelfmark Found', () => {
    cy.get('[id=q]').type('sinai syriac 100');
    cy.get('select').select('Shelfmark').should('have.value', 'shelfmark_tsi');
    cy.get('[id=search]').click();
    cy.get('.search-count__heading').contains('Catalog Results');
    cy.percySnapshot();
  });

  it('Search Title Found', () => {
    cy.get('[id=q]').type('sinai');
    cy.get('select').select('Title').should('have.value', 'title_tesim descriptive_title_tesim alternative_title_tesim uniform_title_tesim');
    cy.get('[id=search]').click();
    cy.get('.search-count__heading').contains('Catalog Results');
    cy.percySnapshot();
  });
});
