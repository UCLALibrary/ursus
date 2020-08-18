describe('Work show pages', () => {
  it('Calendar of Feasts', () => {
    cy.visit('https://digital.library.ucla.edu/catalog/qpvh6200zz-89112');
    cy.contains(
      'h1',
      'Manuscript No. 32: Calendar of Feasts 14th/15th Century'
    );
    cy.frameLoaded();
    cy.frameLoaded({
      url:
        'https://digital.library.ucla.edu/uv/uv.html#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz0026hvpq%2Fmanifest',
    });
    cy.visit(
      'https://digital.library.ucla.edu/uv/uv.html#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz0026hvpq%2Fmanifest'
    );
    cy.percySnapshot();
  });
});
