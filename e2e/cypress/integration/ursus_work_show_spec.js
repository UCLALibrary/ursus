describe('Work show pages', () => {
  it('Calendar of Feasts', () => {
    cy.visit('/catalog/ark:/21198/zz0026hvpq');
    cy.contains(
      'h1',
      'Manuscript No. 32: Calendar of Feasts 14th/15th Century'
    );
    cy.frameLoaded({
      url:
        'https://p-w-dl-viewer01.library.ucla.edu/uv.html#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz0026hvpq%2Fmanifest',
    });
    cy.iframe().contains('span', 'Manuscript No.32: 00');
    cy.percySnapshot();
  });
});
