describe('Sinai Homepage', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('SINAI_BASE_URL'));
  });

  it('Visit the Homepage', () => {
    cy.percySnapshot();
  });

  it('Sinai Manuscripts Digital Library Logo', () => {
    cy.get('.site-navbar__logo--sinai');
  });

// Navbar Links
  it('About Link', () => {
    cy.contains('a', 'About the Project');
    cy.get('#navbarDropdown').click({ force: true });
    cy.get('[href="/sinai_about"]').click({ force: true });
    cy.url().should('include', '/sinai_about');
  });

  it('Manuscript Descriptions Link', () => {
    cy.contains('a', 'About the Project');
    cy.get('#navbarDropdown').click({ force: true });
    cy.contains('a', 'Manuscript Descriptions').click({ force: true });
    cy.url().should('include', '/manuscript_descriptions');
  });

  it('Terms of Use Link', () => {
    cy.contains('a', 'About the Project');
    cy.get('#navbarDropdown').click({ force: true });
    cy.contains('a', 'Terms of Use').click({ force: true });
    cy.url().should('include', '/terms-of-use');
  });

  it('Contact Us Link', () => {
    cy.contains('a', 'About the Project');
    cy.get('#navbarDropdown').click({ force: true });
    cy.contains('a', 'Contact Us').click({ force: true });
    cy.url().should('include', '/sinai_contact');
  });

  // Static pages
  it('About Page', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL') + '/sinai_about');
    cy.url().should('include', '/sinai_about');
    cy.contains('h1', 'About the Project');
    cy.percySnapshot();
  });

  it('Manuscript Descriptions Page', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL') + '/manuscript_descriptions');
    cy.contains('h1', 'Manuscript Descriptions');
    cy.percySnapshot();
  });

  it('Terms of Use Page', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL') + '/terms-of-use');
    cy.contains('h1', 'Terms of Use');
    cy.percySnapshot();
  });

  it('Contact Us Page', () => {
    cy.visit(Cypress.env('SINAI_BASE_URL') + '/sinai_contact');
    cy.contains('h1', 'Contact Us');
    cy.percySnapshot();
  });

  // Footer Primary - Logos
  it('St Catherine Monastery Logo', () => {
    cy.get('[alt="St Catherine Monastery logo"]').should('be.visible');
  });

  it('UCLA Library Logo', () => {
    cy.get('[alt="UCLA Library logo"]').should('be.visible');
  });

  it('EMEL Logo', () => {
    cy.get('[alt="EMEL logo"]').should('be.visible');
  });

  it('Ahmanson Foundation Logo', () => {
    cy.get('[alt="Ahmanson Foundation logo"]').should('be.visible');
  });

  it('Arcadia Logo', () => {
    cy.get('[alt="Arcadia logo"]').should('be.visible');
  });

// Footer Secondary - Sinai Palimpsests Project Link
  it('Sinai Palimpsests Project', () => {
    cy.contains('a[href="http://sinaipalimpsests.org/"]', 'Sinai Palimpsests Project');
  });
});

/* 
https://github.com/cypress-io/cypress-example-recipes/ Tab Handling and Links 
https://docs.cypress.io/guides/guides/environment-variables.html#Option-1-configuration-file
*/
