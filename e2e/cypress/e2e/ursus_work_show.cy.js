describe('Work show pages', () => {
  it('Arganon (Praise) of Mary', () => {
    cy.visit('/catalog/ark:/21198/zz0009q5nq');

    cy.contains(
      'h1',
      'Ms. 35 Arganon'
    );

    cy.frameLoaded('#media-viewer-iframe');

    cy.iframe('#media-viewer-iframe').within(() => {
      cy.contains('div', 'Ms. 35 Arganon');
    });
  });
});