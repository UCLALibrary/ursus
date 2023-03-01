describe('Collection pages', () => {
  it('Los Angeles Daily News Negatives', () => {
    cy.visit('/', { responseTimeout: 100000 });
    cy.contains('h3', 'Los Angeles Daily News Negatives').click();
    cy.get('[class=banner__title--collection]', { timeout: 100000 }).contains(
      'Los Angeles Daily News Negatives'
    );
    cy.percySnapshot();
  });

  it('Walter E. Bennett Photographic Collection, 1937-1983', () => {
    cy.visit('/', { responseTimeout: 100000 });
    cy.contains(
      'h3',
      'Walter E. Bennett Photographic Collection, 1937-1983'
    ).click();
    cy.get('[class=banner__title--collection]', { timeout: 100000 }).contains(
      'Bennett (Walter E.) Photographic Collection, 1937-1983 (bulk 1952-1982)'
    );
    cy.percySnapshot();
  });

  it('Will Connell Papers', () => {
    cy.visit('/', { responseTimeout: 100000 });
    cy.contains('h3', 'Will Connell Papers').click();
    cy.get('[class=banner__title--collection]', { timeout: 100000 }).contains('Connell (Will) Papers');
    cy.percySnapshot();
  });

  it('California Postcards - Collection Record', () => {
    cy.visit('/', { responseTimeout: 100000 });
    cy.get(
      '[href="/catalog/ark:/21198/zz0008hs73"] > .collection-grid__item-content > .collection-grid__item-link'
    ).click();
    cy.get('.metadata-block__title', { timeout: 100000 }).contains('Collection Overview')
    cy.percySnapshot();
  });
});
