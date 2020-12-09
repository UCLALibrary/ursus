describe('Sinai Login', () => {
  it('Login page', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL') + '/login');
    cy.get('.site-navbar__logo--sinai').should('be.visible');
    cy.get('.site-navbar__logo-subtitle--sinai').should('be.visible');
    cy.get('.site-searchbar--sinai').should('not.exist');
    cy.get('.si-auth-page__title').should('be.visible');
    cy.get('.si-auth-page__sub-title');
    cy.get('.btn-base');
    cy.get('.si-auth__image-wrapper');
    cy.percySnapshot();
  });
});
