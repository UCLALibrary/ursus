describe('Sinai Logout', () => {
  it('Logout', () => {
    cy.clearCookie('sinai_authenticated');
    cy.setCookie('sinai_authenticated', 'true');
    cy.visit(Cypress.env('SINAI_BASE_URL'));
    cy.contains('a', 'Logout');
  });
});
