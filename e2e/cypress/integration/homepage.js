describe('Ursus Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visit the Homepage', () => {
    cy.percySnapshot();
  });

  // Navbar
  /*
  it('UCLA Library Digital Collections Logo', () => {
    cy.get('img').then(($el) => {
      Cypress.dom.isVisible($el) // true
    });

    cy.get('.site-navbar__logo').click({ force: true });
    cy.get('[alt="UCLA Library Digital Collections Logo"]').should('be.visible');
    cy.url().should('include', '/');
  });

  it('About', () => {
    cy.contains('a', 'About').click({ force: true });
    cy.url().should('include', '/ursus_about');
    cy.contains('h1', 'About Us');
    cy.percySnapshot();
  });

  it('Nav - Give Us Feedback', () => {
    cy.get(":nth-child(2) > .site-navbar__item-link").should('have.prop', 'href', 'https://forms.gle/x2BV9dJMK241VsAJA')
  });

// Footer / Static pages

  it('Copyright and Collections', () => {
    cy.visit('/');
    cy.contains('a', 'Copyright and Collection').click({ force: true });
    cy.url().should('include', '/copyrights_and_collections');
    cy.percySnapshot();
  });

  it('Privacy Policy', () => {
    cy.visit('/');
    cy.contains('a', 'Privacy Policy').click({ force: true });
    cy.url().should('include', '/privacy_policy');
    cy.percySnapshot();
  });

  it('Contact', () => {
    cy.visit('/');
    cy.get(':nth-child(3) > .site-footer__link').click({ force: true });
    cy.url().should('include', '/contact');
    cy.contains('h1', 'Contact');
    cy.percySnapshot();
  });
*/
  it('UCLA Library Logo', () => {
    //find the selector
    //does it have logo
    //does it have the right url
    cy.get('.site-footer__logo');
    cy.get('[alt="UCLA Library Logo"]')
      .should('be.visible')
      .parent()
      .should('have.attr', 'href', 'https://www.library.ucla.edu/');
  });

  it('Visit Our Legacy Site', () => {
    cy.contains(
      'a[href="http://digital2.library.ucla.edu/"]',
      'Visit Our Legacy Site'
    );
  });

  it('Footer - Give Us Feedback', () => {
    cy.contains(
      'a[href="https://forms.gle/x2BV9dJMK241VsAJA"]',
      'Give Us Feedback'
    );
  });
});

/* https://github.com/cypress-io/cypress-example-recipes/ Tab Handling and Links */
