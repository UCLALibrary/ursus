/// <reference types="Cypress" />

describe('Ursus Homepage', () => {
  it('Visits the Homepage', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.get('[class=lead__text--homepage]');
    cy.percySnapshot();
  });
  it('Visits the Homepage and clicks through to Los Angeles Daily News Negatives', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('h3', 'Los Angeles Daily News Negatives').click();
    cy.get('[class=banner__title--collection]').contains(
      'Los Angeles Daily News Negatives'
    );
    cy.percySnapshot();
  });
  it('Visits the Homepage and clicks through to Walter E. Bennett Photographic Collection, 1937-1983', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains(
      'h3',
      'Walter E. Bennett Photographic Collection, 1937-1983'
    ).click();
    cy.get('[class=banner__title--collection]').contains(
      'Bennett (Walter E.) Photographic Collection, 1937-1983 (bulk 1952-1982)'
    );
    cy.percySnapshot();
  });
  it('Visits the Homepage and clicks through to Will Connell Papers', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('h3', 'Will Connell Papers').click();
    cy.get('[class=banner__title--collection]').contains(
      'Connell (Will) Papers'
    );
    cy.percySnapshot();
  });
  it('Visits the Homepage and clicks the More about this collection link of a collection', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('p', 'More about this collection').click();
    cy.percySnapshot();
  });
  it('Visits the Homepage and clicks the See More Collections link under the featured collections', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('a', 'See More Collections').click();
    cy.percySnapshot();
  });
  it('Visits the Homepage, enters unicorn in the search field and clicks the Search icon', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.get('[id=search]').click();
    cy.percySnapshot();
  });
  it('Visits the Homepage, enters unicorn in the search field and clicks the Search icon', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.get('[id=q]').type('unicorn');
    cy.get('[id=search]').click();
    cy.percySnapshot();
  });
  it('Visits the Homepage, enters postcards in the search field, choses Title from the dropdown and clicks the Search icon', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.get('[id=q]').type('postcards');
    cy.get('select').select('Title').should('have.value', 'title_tesim');
    cy.get('[id=search]').click();
    cy.percySnapshot();
  });
  it('Visits the Homepage, enters engineer in the search field, choses Subject from the dropdown and clicks the Search icon', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.get('[id=q]').type('engineer');
    cy.get('select').select('Subject').should('have.value', 'subject_tesim');
    cy.get('[id=search]').click();
    cy.percySnapshot();
  });
  it('Visits the Homepage, opens on the Browse facet, clicks on more, clicks on A-Z sort, clicks on 4-H Clubs and verifies page load', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('a', 'Subject').click();
    cy.get('[href="/catalog/facet/subject_sim"]').click();
    cy.get('[href="/catalog/facet/subject_sim?facet.sort=index"]').click();
    cy.get('[href="/catalog?f%5Bsubject_sim%5D%5B%5D=4-H+clubs"]').click();
    cy.get('[title="4-H clubs"]').click();
    cy.percySnapshot();
  });
  it('Visits the Homepage, opens on the Resource Type facet, clicks on Catographis, opens on the Language facet, clicks on English and verifies page load', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('a', 'Resource Type').click();

    cy.get(
      '[href="/catalog?f%5Bhuman_readable_resource_type_sim%5D%5B%5D=cartographic"]'
    ).click();
    //cy.contains('a', 'English').click();

    cy.get('[href="#facet-human_readable_resource_type_sim"]').click();
    cy.get(
      '[href="/catalog?f%5Bhuman_readable_resource_type_sim%5D%5B%5D=cartographic"]'
    ).click();
    cy.get('[title="English"]');
    cy.get('[title="Cartographic"]');
    cy.percySnapshot();
  });
});
