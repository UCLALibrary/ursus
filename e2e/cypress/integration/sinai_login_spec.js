describe('Sinai Login', () => {
  it('Login page', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL') + '/login');
    cy.get('.si-auth__navbar-logo').should('be.visible');
    cy.get('.si-auth-page__title').should('be.visible');
    cy.get('.si-auth-page__sub-title');
    cy.get('.btn-base');
    cy.get('.si-auth__image-wrapper');
    cy.percySnapshot();
  });
});

  /*it('Logs in', () => {
    cy.get('.btn-base', 'Access the Sinai Collection').click({ force: true });
    cy.contains('a[href="https://sinai-id.org/users/sign_in');
  });
  */
