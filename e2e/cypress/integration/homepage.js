/// <reference types="Cypress" />

describe('Ursus Homepage', () => {
  it('Visits the Homepage', () => {
    cy.visit('/');
    cy.percySnapshot();
  });
  it('Visits the Homepageand clicks through to Los Angeles Daily News Negatives', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('h3', 'Los Angeles Daily News Negatives').click();
    cy.percySnapshot();
  });
  it('Visits the Homepageand clicks through to Walter E. Bennett Photographic Collection, 1937-1983', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains(
      'h3',
      'Walter E. Bennett Photographic Collection, 1937-1983'
    ).click();
    cy.percySnapshot();
  });
  it('Visits the Homepageand clicks through to Will Connell Papers', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('h3', 'Will Connell Papers').click();
    cy.percySnapshot();
  });
});
