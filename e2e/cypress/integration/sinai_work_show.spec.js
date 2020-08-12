describe('Work show pages', () => {
  it('Sinai Syriac 127', () => {
    cy.visit('https://sinaimanuscripts.library.ucla.edu/catalog/ark:%2F21198%2Fz1bg3sbz');
    cy.contains('h1', "Sinai Syriac 127. Services : manuscript, 1294. St. Catherine's Monastery, Sinai, Egypt");
    cy.percySnapshot();
  });

  it('Sinai Arabic 42', () => {
    cy.visit('https://sinaimanuscripts.library.ucla.edu/catalog/ark:%2F21198%2Fz1p85g7p');
    cy.contains('h1', "Sinai Arabic 42. Psalter and Odes : manuscript, 1790. St. Catherine's Monastery, Sinai, Egypt");
    cy.percySnapshot();
  });

  it('Sinai Arabic 578', () => {
    cy.visit('https://sinaimanuscripts.library.ucla.edu/catalog/ark:%2F21198%2Fz1fv04nq');
    cy.contains('h1', "Sinai Arabic 578. The diseases of the eye and their treatment by ‘Alī ibn Īsā : manuscript, [11th c.]. St. Catherine's Monastery, Sinai, Egypt");
    cy.percySnapshot();
  });
});
