/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!******************************************!*\
  !*** ./cypress/e2e/ursus_homepage.cy.js ***!
  \******************************************/


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
    cy.get('[alt="UCLA Library Logo"]').should('be.visible').parent().should("have.attr", 'href', "https://www.library.ucla.edu/");
  });
  it('Footer - Give Us Feedback', () => {
    cy.contains('a[href="https://forms.gle/x2BV9dJMK241VsAJA"]', 'Give Us Feedback');
  });
});

/* https://github.com/cypress-io/cypress-example-recipes/ Tab Handling and Links */
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJzdXNfaG9tZXBhZ2UuY3kuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQUEsUUFBUSxDQUFDLGdCQUFnQixFQUFFLE1BQU07RUFDL0JDLFVBQVUsQ0FBQyxNQUFNO0lBQ2ZDLEVBQUUsQ0FBQ0MsS0FBSyxDQUFDLEdBQUcsQ0FBQztFQUNmLENBQUMsQ0FBQztFQUVGQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsTUFBTTtJQUM3QkYsRUFBRSxDQUFDRyxhQUFhLENBQUMsQ0FBQztFQUNwQixDQUFDLENBQUM7O0VBRUo7RUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFRCxFQUFFLENBQUMsbUJBQW1CLEVBQUUsTUFBTTtJQUM1QjtJQUNBO0lBQ0E7SUFDQUYsRUFBRSxDQUFDSSxHQUFHLENBQUMsb0JBQW9CLENBQUM7SUFDNUJKLEVBQUUsQ0FBQ0ksR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUNDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FDdkRDLE1BQU0sQ0FBQyxDQUFDLENBQUNELE1BQU0sQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLCtCQUErQixDQUFDO0VBQ3hFLENBQUMsQ0FBQztFQUVGSCxFQUFFLENBQUMsMkJBQTJCLEVBQUUsTUFBTTtJQUNwQ0YsRUFBRSxDQUFDTyxRQUFRLENBQUMsK0NBQStDLEVBQUUsa0JBQWtCLENBQUM7RUFDbEYsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDOztBQUVGLG1GIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdXJzdXMtZTJlLy4vY3lwcmVzcy9lMmUvdXJzdXNfaG9tZXBhZ2UuY3kuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZGVzY3JpYmUoJ1Vyc3VzIEhvbWVwYWdlJywgKCkgPT4ge1xuICBiZWZvcmVFYWNoKCgpID0+IHsgXG4gICAgY3kudmlzaXQoJy8nKTtcbiAgfSk7XG5cbiAgaXQoJ1Zpc2l0IHRoZSBIb21lcGFnZScsICgpID0+IHtcbiAgICBjeS5wZXJjeVNuYXBzaG90KCk7XG4gIH0pO1xuXG4vLyBOYXZiYXJcbi8qXG4gIGl0KCdVQ0xBIExpYnJhcnkgRGlnaXRhbCBDb2xsZWN0aW9ucyBMb2dvJywgKCkgPT4ge1xuICAgIGN5LmdldCgnaW1nJykudGhlbigoJGVsKSA9PiB7XG4gICAgICBDeXByZXNzLmRvbS5pc1Zpc2libGUoJGVsKSAvLyB0cnVlXG4gICAgfSk7XG5cbiAgICBjeS5nZXQoJy5zaXRlLW5hdmJhcl9fbG9nbycpLmNsaWNrKHsgZm9yY2U6IHRydWUgfSk7XG4gICAgY3kuZ2V0KCdbYWx0PVwiVUNMQSBMaWJyYXJ5IERpZ2l0YWwgQ29sbGVjdGlvbnMgTG9nb1wiXScpLnNob3VsZCgnYmUudmlzaWJsZScpO1xuICAgIGN5LnVybCgpLnNob3VsZCgnaW5jbHVkZScsICcvJyk7XG4gIH0pO1xuXG4gIGl0KCdBYm91dCcsICgpID0+IHtcbiAgICBjeS5jb250YWlucygnYScsICdBYm91dCcpLmNsaWNrKHsgZm9yY2U6IHRydWUgfSk7XG4gICAgY3kudXJsKCkuc2hvdWxkKCdpbmNsdWRlJywgJy91cnN1c19hYm91dCcpO1xuICAgIGN5LmNvbnRhaW5zKCdoMScsICdBYm91dCBVcycpO1xuICAgIGN5LnBlcmN5U25hcHNob3QoKTtcbiAgfSk7XG5cbiAgaXQoJ05hdiAtIEdpdmUgVXMgRmVlZGJhY2snLCAoKSA9PiB7XG4gICAgY3kuZ2V0KFwiOm50aC1jaGlsZCgyKSA+IC5zaXRlLW5hdmJhcl9faXRlbS1saW5rXCIpLnNob3VsZCgnaGF2ZS5wcm9wJywgJ2hyZWYnLCAnaHR0cHM6Ly9mb3Jtcy5nbGUveDJCVjlkSk1LMjQxVnNBSkEnKVxuICB9KTtcblxuLy8gRm9vdGVyIC8gU3RhdGljIHBhZ2VzXG5cbiAgaXQoJ0NvcHlyaWdodCBhbmQgQ29sbGVjdGlvbnMnLCAoKSA9PiB7XG4gICAgY3kudmlzaXQoJy8nKTtcbiAgICBjeS5jb250YWlucygnYScsICdDb3B5cmlnaHQgYW5kIENvbGxlY3Rpb24nKS5jbGljayh7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGN5LnVybCgpLnNob3VsZCgnaW5jbHVkZScsICcvY29weXJpZ2h0c19hbmRfY29sbGVjdGlvbnMnKTtcbiAgICBjeS5wZXJjeVNuYXBzaG90KCk7XG4gIH0pO1xuXG4gIGl0KCdQcml2YWN5IFBvbGljeScsICgpID0+IHtcbiAgICBjeS52aXNpdCgnLycpO1xuICAgIGN5LmNvbnRhaW5zKCdhJywgJ1ByaXZhY3kgUG9saWN5JykuY2xpY2soeyBmb3JjZTogdHJ1ZSB9KTtcbiAgICBjeS51cmwoKS5zaG91bGQoJ2luY2x1ZGUnLCAnL3ByaXZhY3lfcG9saWN5Jyk7XG4gICAgY3kucGVyY3lTbmFwc2hvdCgpO1xuICB9KTtcblxuICBpdCgnQ29udGFjdCcsICgpID0+IHtcbiAgICBjeS52aXNpdCgnLycpO1xuICAgIGN5LmdldCgnOm50aC1jaGlsZCgzKSA+IC5zaXRlLWZvb3Rlcl9fbGluaycpLmNsaWNrKHsgZm9yY2U6IHRydWUgfSk7XG4gICAgY3kudXJsKCkuc2hvdWxkKCdpbmNsdWRlJywgJy9jb250YWN0Jyk7XG4gICAgY3kuY29udGFpbnMoJ2gxJywgJ0NvbnRhY3QnKTtcbiAgICBjeS5wZXJjeVNuYXBzaG90KCk7XG4gIH0pO1xuKi9cbiAgaXQoJ1VDTEEgTGlicmFyeSBMb2dvJywgKCkgPT4ge1xuICAgIC8vZmluZCB0aGUgc2VsZWN0b3JcbiAgICAvL2RvZXMgaXQgaGF2ZSBsb2dvIFxuICAgIC8vZG9lcyBpdCBoYXZlIHRoZSByaWdodCB1cmxcbiAgICBjeS5nZXQoJy5zaXRlLWZvb3Rlcl9fbG9nbycpO1xuICAgIGN5LmdldCgnW2FsdD1cIlVDTEEgTGlicmFyeSBMb2dvXCJdJykuc2hvdWxkKCdiZS52aXNpYmxlJylcbiAgICAucGFyZW50KCkuc2hvdWxkKFwiaGF2ZS5hdHRyXCIsICdocmVmJywgXCJodHRwczovL3d3dy5saWJyYXJ5LnVjbGEuZWR1L1wiKTtcbiAgfSk7XG5cbiAgaXQoJ0Zvb3RlciAtIEdpdmUgVXMgRmVlZGJhY2snLCAoKSA9PiB7XG4gICAgY3kuY29udGFpbnMoJ2FbaHJlZj1cImh0dHBzOi8vZm9ybXMuZ2xlL3gyQlY5ZEpNSzI0MVZzQUpBXCJdJywgJ0dpdmUgVXMgRmVlZGJhY2snKTtcbiAgfSk7XG59KVxuXG4vKiBodHRwczovL2dpdGh1Yi5jb20vY3lwcmVzcy1pby9jeXByZXNzLWV4YW1wbGUtcmVjaXBlcy8gVGFiIEhhbmRsaW5nIGFuZCBMaW5rcyAqL1xuIl0sIm5hbWVzIjpbImRlc2NyaWJlIiwiYmVmb3JlRWFjaCIsImN5IiwidmlzaXQiLCJpdCIsInBlcmN5U25hcHNob3QiLCJnZXQiLCJzaG91bGQiLCJwYXJlbnQiLCJjb250YWlucyJdLCJzb3VyY2VSb290IjoiIn0=