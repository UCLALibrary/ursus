describe('Sinai Homepage', () => {
  beforeEach(() => { 
    cy.visit('/');
  });

  it('Visit the Homepage', () => {
    cy.percySnapshot();
  });

// Navbar Links & Static pages tests
  it('Sinai Manuscripts Digital Library Logo', () => {
    cy.get('.site-navbar__logo--sinai');
    cy.url().should('include', '/');
  });

  it('About', () => {
    // About Link
    cy.contains('a', 'About');
    cy.contains('a', 'About').click({ force: true });
    // Goes to About page
    cy.url().should('include', '/sinai_about');
    cy.contains('h1', 'About the Project');
    cy.percySnapshot();
  });

  it('Manuscript Descriptions', () => {
    cy.contains('a', 'Manuscript Descriptions').click({ force: true });
    cy.url().should('include', '/manuscript_descriptions');
    cy.visit('/manuscript_descriptions');
    cy.contains('h1', 'Manuscript Descriptions');
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

// Footer Secondary - Links & Static pages tests
  it('Contact Us', () => {
    cy.visit('/');
    cy.contains('a', 'Contact Us').click({ force: true });
    cy.url().should('include', '/contact');
    cy.visit('/contact');
    cy.contains('h1', 'Contact Us');
    cy.percySnapshot();
  });

  it('Terms of Use', () => {
    cy.visit('/');
    cy.contains('a', 'Terms of Use').click({ force: true });
    cy.url().should('include', '/terms-of-use');
    cy.visit('/terms-of-use');
    cy.contains('h1', 'Terms of Use');
    cy.percySnapshot();
  });

  it('Sinai Palimpsests Project', () => {
    cy.contains('a[href="http://sinaipalimpsests.org/"]', 'Sinai Palimpsests Project');
  });
});

/* https://github.com/cypress-io/cypress-example-recipes/ Tab Handling and Links */
