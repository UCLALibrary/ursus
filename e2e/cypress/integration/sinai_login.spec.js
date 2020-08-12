describe('Sinai Homepage', () => {
  beforeEach(() => { 
    cy.visit('/login');
    cy.percySnapshot();
  });

  it('Visits the Homepage', () => {
    cy.get('.si-auth__navbar-logo').should('be.visible');
    cy.get('.si-auth-page__title').should('be.visible');
  });

  it('Logs in', () => {
    cy.get('.btn-base', 'Access the Sinai Collection').click({ force: true });
    cy.contains('a[href="https://sinai-id.org/users/sign_in');
  });
});
