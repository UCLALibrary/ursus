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
  cy.get('[class=banner__title--collection]').contains('Connell (Will) Papers');
  cy.percySnapshot();
});
it('Visits the Homepage and clicks the More about this collection link of a collection', () => {
  cy.visit('https://digital.library.ucla.edu');
  cy.get(
    '[href="/catalog/37sh8000zz-89112"] > .collection-grid__item-content > .collection-grid__item-link'
  ).click();
  cy.percySnapshot();
});
