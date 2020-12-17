describe('Sinai Homepage', () => {
  it('Visit the Sinai Homepage', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL'));
    cy.percySnapshot();
  });

  it('Sinai Manuscripts Digital Library Logo', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL'));
    cy.get('.site-navbar__logo-block--sinai');
  });

// Navbar Links
  it('Search Link', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL'));
    cy.contains('a', 'Search ');
    cy.get('.site-header__search-icon--sinai').click({ force: true });
    cy.url().should('include', 'search_field=all_fields');
  });

  it('About Link', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL'));
    cy.contains('a', 'About');
    cy.get('[href="/sinai_about"]').click({ force: true });
    cy.url().should('include', '/sinai_about');
  });

  it('Login Link', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL'));
    cy.contains('[type="submit"]', 'LOGIN');
  });

  // Static pages
  it('About Page', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL') + '/sinai_about');
    cy.url().should('include', '/sinai_about');
    cy.contains('h1', 'About the Project');
    cy.percySnapshot();
  });

  // Footer Primary - Logos
  it('St Catherine Monastery Logo', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL'));
    cy.get('[alt="St Catherine Monastery logo"]').should('be.visible');
  });

  it('UCLA Library Logo', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL'));
    cy.get('[alt="UCLA Library logo"]').should('be.visible');
  });

  it('EMEL Logo', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL'));
    cy.get('[alt="EMEL logo"]').should('be.visible');
  });

  it('Ahmanson Foundation Logo', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL'));
    cy.get('[alt="Ahmanson Foundation logo"]').should('be.visible');
  });

  it('Arcadia Logo', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL'));
    cy.get('[alt="Arcadia logo"]').should('be.visible');
  });

// Footer Secondary - Sinai Palimpsests Project Link
  it('Sinai Palimpsests Project', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL'));
    cy.contains('a[href="http://sinaipalimpsests.org/"]', 'Sinai Palimpsests Project');
  });
});

/* 
https://github.com/cypress-io/cypress-example-recipes/ Tab Handling and Links 
https://docs.cypress.io/guides/guides/environment-variables.html#Option-1-configuration-file
*/
