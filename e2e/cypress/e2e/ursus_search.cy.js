/// <reference types="Cypress" />

describe('Search', () => {
  it('Search Blank', () => {
    cy.visit('/');
    cy.get('[id=search]').click();
    cy.contains('span', 'You searched for:').should('not.exist');
    cy.percySnapshot();
  });

  it('Search Not Found', () => {
    cy.visit('/');
    cy.get('[id=q]').type('haggard');
    cy.get('[id=search]').click();
    cy.contains('h2', '0 Catalog Results').should('exist');
    cy.percySnapshot();
  });

  it('Search Title Found', () => {
    cy.visit('/');
    cy.get('[id=q]').type('postcards');
    cy.get('select').select('Title').should('have.value', 'title_tesim');
    cy.get('[id=search]').click();
    cy.get('.search-count__heading').contains('Catalog Results');
    cy.percySnapshot();
  });

  it('Search Subject Found', () => {
    cy.visit('/');
    cy.get('[id=q]').type('engineer');
    cy.get('select').select('Subject').should('have.value', 'subject_tesim subject_topic_tesim subject_geographic_tesim subject_temporal_tesim');
    cy.get('[id=search]').click();
    cy.get('.search-count__heading').contains('Catalog Results');
    cy.percySnapshot();
  });

  it('Metadata Text', () => {
    cy.visit('/');
    cy.contains('a', 'Resource Type').click();
    cy.contains('a', 'still image').click({ force: true });
    cy.get('span[title="still image"]', { timeout: 60000 });
    cy.get(
      '.document-position-0 > .document__list-header > .document__list-title > a'
    ).click({ force: true });
    cy.contains('a', 'still image').click();
    cy.get('.filter-label-key', { timeout: 60000 }).contains('Resource Type');
    cy.get('span[title="still image"]').contains('still image');
    cy.percySnapshot();
  });

  it('Metadata Still Image', () => {
    cy.visit('/');
    cy.get('[id=q]').type('still image');
    cy.get('[id=search]').click();
    cy.get(
      '.document-position-0 > .document__list-header > .document__list-title > a'
    ).click({ force: true });
    cy.contains('a', 'still image').click();
    cy.get('.filter-label-key', { timeout: 100000 }).contains('Genre');
    cy.contains('span', 'still image');
    cy.percySnapshot();
  });

  it('Metadata Artistic Photo', () => {
    cy.visit('/catalog?utf8=%E2%9C%93&q=Artistic+Photo&search_field=all_fields');
    cy.get('a[href*="photographer_sim"]').eq(0).click();
    cy.get('.filter-label-key', { timeout: 100000 }).contains('Photographer');
    cy.percySnapshot();
  });

  it('Title links to item page', () => {
    cy.visit('/catalog?utf8=%E2%9C%93&q=&search_field=all_fields');
    cy.get('h3.document__list-title').eq(0).find('a').click();
    cy.get('.item-page__pagination-widgets', { timeout: 100000 }).should('contain', '1 of')
  });

  it('Thumbnail links to item page', () => {
    cy.visit('/catalog?utf8=%E2%9C%93&q=&search_field=all_fields');
    cy.get('div.document__gallery-thumbnail').eq(0).find('img').click();
    cy.get('.item-page__pagination-widgets').should('contain', '1 of')
  });
});
