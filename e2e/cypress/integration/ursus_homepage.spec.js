describe('Ursus Homepage', () => {
  beforeEach(() => { 
    cy.visit('/');
  });

  it('Visit the Homepage', () => {
    cy.percySnapshot();
  });

// Navbar  & Static pages
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
    cy.visit('/ursus_about');
    cy.contains('h1', 'About Us');
    cy.get('.static-page__title');
    cy.percySnapshot();
  });

  it('Nav - Give Us Feedback', () => {
    cy.get(":nth-child(2) > .site-navbar__item-link").should('have.prop', 'href', 'https://forms.gle/x2BV9dJMK241VsAJA')
  });

// Footer Links & Static pages
  it('Copyrights and Collections', () => {
    cy.visit('/');
    cy.contains('a', 'Copyrights and Collection').click({ force: true });
    cy.url().should('include', '/copyrights_and_collections');
    cy.visit('/copyrights_and_collections');
    cy.contains('h1', 'Copyrights and Collections');
    cy.percySnapshot();
  });

  it('Privacy Policy', () => {
    cy.visit('/');
    cy.contains('a', 'Privacy Policy').click({ force: true });
    cy.url().should('include', '/privacy_policy');
    cy.visit('/privacy_policy');
    cy.contains('h1', 'Privacy');
    cy.percySnapshot();
  });

  it('Contact', () => {
    cy.visit('/');
    cy.contains('a', 'Contact Us').click({ force: true });
    cy.url().should('include', '/contact');
    cy.visit('/contact');
    cy.contains('h1', 'Contact');
    cy.percySnapshot();
  });

  it('UCLA Library Logo', () => {
    cy.get('.site-footer__logo');
    cy.get('[alt="UCLA Library Logo"]').should('be.visible')
    .parent().should("have.attr", 'href', "https://www.library.ucla.edu/");
  });

  it('Visit Our Legacy Site', () => {
    cy.contains('a[href="http://digital2.library.ucla.edu/"]', 'Visit Our Legacy Site');
  });

  it('Footer - Give Us Feedback', () => {
    cy.contains('a[href="https://forms.gle/x2BV9dJMK241VsAJA"]', 'Give Us Feedback');
  });
})

/* https://github.com/cypress-io/cypress-example-recipes/ Tab Handling and Links */
