/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!****************************************!*\
  !*** ./cypress/e2e/ursus_facets.cy.js ***!
  \****************************************/


describe('Facets', () => {
  it('Subject', () => {
    cy.visit('/catalog/');
    cy.contains('a', 'Subject').click({
      force: true
    });
    cy.percySnapshot('Subject facet open');
    cy.contains('a', 'more').click({
      force: true
    });
    cy.request('/catalog/facet/combined_subject_ssim').its('body').should('include', 'A-Z Sort');
    cy.contains('People');
    cy.contains('a', 'A-Z Sort').click({
      force: true
    });
    cy.contains('14th Dynasty');
    cy.contains('a', 'Next').click({
      force: true
    });
    cy.percySnapshot('Subject facet modal');
    cy.contains('4-H clubs').click({
      force: true
    });
    cy.get('.filter-label-key', {
      timeout: 100000
    }).contains('Subject');
    cy.get('.filter-label-value').contains('4-H clubs');
    cy.percySnapshot('Subject facet selected');
  });
  it('Resource Type + Language', () => {
    cy.visit('/catalog/');
    cy.contains('h3', 'Resource Type').click();
    cy.contains('a', 'cartographic').click({
      force: true
    });
    cy.get('[title="cartographic"]', {
      timeout: 100000
    });
    cy.contains('Language').click();
    cy.contains('a', 'English').click({
      force: true
    });
    cy.get('[title="English"]', {
      timeout: 100000
    });
    // cy.get(
    //   '.filter-human_readable_language_sim > .filter-group__label > .filter-label-key'
    // ).contains('Language');
    // cy.get(
    //   '.filter-human_readable_language_sim > .filter-group__label > .filter-label-value'
    // ).contains('English');
    // cy.get(
    //   '.filter-human_readable_resource_type_sim > .filter-group__label > .filter-label-key'
    // ).contains('Resource Type');
    // cy.get(
    //   '.filter-human_readable_resource_type_sim > .filter-group__label > .filter-label-value'
    // ).contains('cartographic');
    cy.percySnapshot();
  });
  it('Genre + Language', () => {
    cy.visit('/catalog/');
    cy.contains('Genre').click();
    cy.contains('a', 'black-and-white photographs').click({
      force: true
    });
    cy.get('[title="black-and-white photographs"]', {
      timeout: 100000
    });
    cy.contains('Language').click();
    cy.contains('a', 'English').click({
      force: true
    });
    cy.get('[title="English"]', {
      timeout: 100000
    });
    // cy.get(
    //   '.filter-genre_sim > .filter-group__label > .filter-label-key'
    // ).contains('Genre');
    // cy.get(
    //   '.filter-genre_sim > .filter-group__label > .filter-label-value'
    // ).contains('black-and-white photographs');
    // cy.get(
    //   '.filter-human_readable_language_sim > .filter-group__label > .filter-label-key'
    // ).contains('Language');
    // cy.get(
    //   '.filter-human_readable_language_sim > .filter-group__label > .filter-label-value'
    // ).contains('English');
  });

  /*it('Start Over', () => {
    cy.visit('/catalog?f[genre_sim][]=Black-and-white+photographs');
    cy.get('[title="Black-and-white photographs"]');
    cy.contains('a', 'Start Over').click({ force: true });
    cy.get('.search-results-container', { timeout: 100000 }).should('not.contain', 'You searched for');
  });
   it('Names', () => {
    cy.visit('/catalog/');
    cy.contains('a', 'Names').click();
    cy.contains('a', 'Santa Monica Civic Opera Association').click({ force: true });
    cy.get('[title="Santa Monica Civic Opera Association"]', { timeout: 100000 });
    cy.contains('a', 'Location').click();
    cy.contains('a', 'California--Los Angeles--Westwood').click({ force: true });
    cy.get('[title="California--Los Angeles--Westwood"]', { timeout: 100000 });
    cy.get(
      '.filter-location_sim > .filter-group__label > .filter-label-key'
    ).contains('Location');
    cy.get(
      '.filter-location_sim > .filter-group__label > .filter-label-value'
    ).contains('California--Los Angeles--Westwood');
    cy.get(
      '.filter-named_subject_sim > .filter-group__label > .filter-label-key'
    ).contains('Names');
    cy.get(
      '.filter-named_subject_sim > .filter-group__label > .filter-label-value'
    ).contains('Santa Monica Civic Opera Association');
    cy.percySnapshot();
  });
   it('Dates', () => {
    cy.visit('/catalog/');
    cy.contains('a', 'Date').click();
    cy.get('#range_year_isim_begin').clear().type('1935');
    cy.get('#range_year_isim_end').clear().type('1967');
    cy.get('.submit').click();
    cy.get('.filter-label-key').contains('Date');
    cy.get('.filter-label-value').contains('1935 to 1967');
    cy.percySnapshot();
  });
   it('Collection', () => {
    cy.visit('/catalog/');
    cy.contains('a', 'Collection').click({ force: true });
    cy.get(
      '#facet-member_of_collections_ssim > .facet-values > .more_facets > a'
    ).click({ force: true });
    cy.contains('a', 'Next').click({ force: true });
    cy.contains('a', 'Caro Minasian Collection of Armenian Material, circa 1600-1968').click({ force: true });
    cy.get('.filter-label-key', { timeout: 100000 }).contains('Collection');
    cy.get('.filter-label-value').contains('Caro Minasian Collection of Armenian Material, circa 1600-1968');
    cy.percySnapshot();
  });*/

  it('Genre', () => {
    cy.visit('/catalog/');
    cy.contains('Genre').click({
      force: true
    });
    // cy.get('#facet-genre_sim > .facet-values > .more_facets > a').click({
    cy.contains('more').click({
      force: true
    });
    cy.contains('A-Z Sort').click({
      force: true
    });
    // cy.get('a[href*="Architectural+drawings"]').click({ force: true });
    // cy.get('.filter-label-key', { timeout: 100000 }).contains('Genre');
    // cy.get('.filter-label-value').contains('Architectural drawings');
    // cy.percySnapshot();
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDQyxLQUFLLENBQUM7TUFBRUMsS0FBSyxFQUFFO0lBQUssQ0FBQyxDQUFDO0lBQzNDO0lBQ0FKLEVBQUUsQ0FBQ0UsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDQyxLQUFLLENBQUM7TUFDeEJDLEtBQUssRUFBRTtJQUNULENBQUMsQ0FBQztJQUNGSixFQUFFLENBQUNFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQ0MsS0FBSyxDQUFDO01BQUVDLEtBQUssRUFBRTtJQUFLLENBQUMsQ0FBQztJQUM5QztJQUNBO0lBQ0E7SUFDQTtFQUNGLENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdXJzdXMtZTJlLy4vY3lwcmVzcy9lMmUvdXJzdXNfZmFjZXRzLmN5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuZGVzY3JpYmUoJ0ZhY2V0cycsICgpID0+IHtcbiAgaXQoJ1N1YmplY3QnLCAoKSA9PiB7XG4gICAgY3kudmlzaXQoJy9jYXRhbG9nLycpO1xuICAgIGN5LmNvbnRhaW5zKCdhJywgJ1N1YmplY3QnKS5jbGljayh7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGN5LnBlcmN5U25hcHNob3QoJ1N1YmplY3QgZmFjZXQgb3BlbicpO1xuXG4gICAgY3kuY29udGFpbnMoJ2EnLCAnbW9yZScpLmNsaWNrKHsgZm9yY2U6IHRydWUgfSk7XG4gICAgY3kucmVxdWVzdCgnL2NhdGFsb2cvZmFjZXQvY29tYmluZWRfc3ViamVjdF9zc2ltJykuaXRzKCdib2R5Jykuc2hvdWxkKCdpbmNsdWRlJywgJ0EtWiBTb3J0Jyk7XG4gICAgY3kuY29udGFpbnMoJ1Blb3BsZScpXG5cbiAgICBjeS5jb250YWlucygnYScsICdBLVogU29ydCcpLmNsaWNrKHsgZm9yY2U6IHRydWUgfSk7XG4gICAgY3kuY29udGFpbnMoJzE0dGggRHluYXN0eScpO1xuICAgIGN5LmNvbnRhaW5zKCdhJywgJ05leHQnKS5jbGljayh7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGN5LnBlcmN5U25hcHNob3QoJ1N1YmplY3QgZmFjZXQgbW9kYWwnKTtcbiAgICBjeS5jb250YWlucygnNC1IIGNsdWJzJykuY2xpY2soeyBmb3JjZTogdHJ1ZSB9KTtcblxuICAgIGN5LmdldCgnLmZpbHRlci1sYWJlbC1rZXknLCB7IHRpbWVvdXQ6IDEwMDAwMCB9KS5jb250YWlucygnU3ViamVjdCcpO1xuICAgIGN5LmdldCgnLmZpbHRlci1sYWJlbC12YWx1ZScpLmNvbnRhaW5zKCc0LUggY2x1YnMnKTtcbiAgICBjeS5wZXJjeVNuYXBzaG90KCdTdWJqZWN0IGZhY2V0IHNlbGVjdGVkJyk7XG4gIH0pO1xuXG4gIGl0KCdSZXNvdXJjZSBUeXBlICsgTGFuZ3VhZ2UnLCAoKSA9PiB7XG4gICAgY3kudmlzaXQoJy9jYXRhbG9nLycpO1xuICAgIGN5LmNvbnRhaW5zKCdoMycsICdSZXNvdXJjZSBUeXBlJykuY2xpY2soKTtcbiAgICBjeS5jb250YWlucygnYScsICdjYXJ0b2dyYXBoaWMnKS5jbGljayh7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGN5LmdldCgnW3RpdGxlPVwiY2FydG9ncmFwaGljXCJdJywgeyB0aW1lb3V0OiAxMDAwMDAgfSk7XG4gICAgY3kuY29udGFpbnMoJ0xhbmd1YWdlJykuY2xpY2soKTtcbiAgICBjeS5jb250YWlucygnYScsICdFbmdsaXNoJykuY2xpY2soeyBmb3JjZTogdHJ1ZSB9KTtcbiAgICBjeS5nZXQoJ1t0aXRsZT1cIkVuZ2xpc2hcIl0nLCB7IHRpbWVvdXQ6IDEwMDAwMCB9KTtcbiAgICAvLyBjeS5nZXQoXG4gICAgLy8gICAnLmZpbHRlci1odW1hbl9yZWFkYWJsZV9sYW5ndWFnZV9zaW0gPiAuZmlsdGVyLWdyb3VwX19sYWJlbCA+IC5maWx0ZXItbGFiZWwta2V5J1xuICAgIC8vICkuY29udGFpbnMoJ0xhbmd1YWdlJyk7XG4gICAgLy8gY3kuZ2V0KFxuICAgIC8vICAgJy5maWx0ZXItaHVtYW5fcmVhZGFibGVfbGFuZ3VhZ2Vfc2ltID4gLmZpbHRlci1ncm91cF9fbGFiZWwgPiAuZmlsdGVyLWxhYmVsLXZhbHVlJ1xuICAgIC8vICkuY29udGFpbnMoJ0VuZ2xpc2gnKTtcbiAgICAvLyBjeS5nZXQoXG4gICAgLy8gICAnLmZpbHRlci1odW1hbl9yZWFkYWJsZV9yZXNvdXJjZV90eXBlX3NpbSA+IC5maWx0ZXItZ3JvdXBfX2xhYmVsID4gLmZpbHRlci1sYWJlbC1rZXknXG4gICAgLy8gKS5jb250YWlucygnUmVzb3VyY2UgVHlwZScpO1xuICAgIC8vIGN5LmdldChcbiAgICAvLyAgICcuZmlsdGVyLWh1bWFuX3JlYWRhYmxlX3Jlc291cmNlX3R5cGVfc2ltID4gLmZpbHRlci1ncm91cF9fbGFiZWwgPiAuZmlsdGVyLWxhYmVsLXZhbHVlJ1xuICAgIC8vICkuY29udGFpbnMoJ2NhcnRvZ3JhcGhpYycpO1xuICAgIGN5LnBlcmN5U25hcHNob3QoKTtcbiAgfSk7XG5cbiAgaXQoJ0dlbnJlICsgTGFuZ3VhZ2UnLCAoKSA9PiB7XG4gICAgY3kudmlzaXQoJy9jYXRhbG9nLycpO1xuICAgIGN5LmNvbnRhaW5zKCdHZW5yZScpLmNsaWNrKCk7XG4gICAgY3kuY29udGFpbnMoJ2EnLCAnYmxhY2stYW5kLXdoaXRlIHBob3RvZ3JhcGhzJykuY2xpY2soeyBmb3JjZTogdHJ1ZSB9KTtcbiAgICBjeS5nZXQoJ1t0aXRsZT1cImJsYWNrLWFuZC13aGl0ZSBwaG90b2dyYXBoc1wiXScsIHsgdGltZW91dDogMTAwMDAwIH0pO1xuICAgIGN5LmNvbnRhaW5zKCdMYW5ndWFnZScpLmNsaWNrKCk7XG4gICAgY3kuY29udGFpbnMoJ2EnLCAnRW5nbGlzaCcpLmNsaWNrKHsgZm9yY2U6IHRydWUgfSk7XG4gICAgY3kuZ2V0KCdbdGl0bGU9XCJFbmdsaXNoXCJdJywgeyB0aW1lb3V0OiAxMDAwMDAgfSk7XG4gICAgLy8gY3kuZ2V0KFxuICAgIC8vICAgJy5maWx0ZXItZ2VucmVfc2ltID4gLmZpbHRlci1ncm91cF9fbGFiZWwgPiAuZmlsdGVyLWxhYmVsLWtleSdcbiAgICAvLyApLmNvbnRhaW5zKCdHZW5yZScpO1xuICAgIC8vIGN5LmdldChcbiAgICAvLyAgICcuZmlsdGVyLWdlbnJlX3NpbSA+IC5maWx0ZXItZ3JvdXBfX2xhYmVsID4gLmZpbHRlci1sYWJlbC12YWx1ZSdcbiAgICAvLyApLmNvbnRhaW5zKCdibGFjay1hbmQtd2hpdGUgcGhvdG9ncmFwaHMnKTtcbiAgICAvLyBjeS5nZXQoXG4gICAgLy8gICAnLmZpbHRlci1odW1hbl9yZWFkYWJsZV9sYW5ndWFnZV9zaW0gPiAuZmlsdGVyLWdyb3VwX19sYWJlbCA+IC5maWx0ZXItbGFiZWwta2V5J1xuICAgIC8vICkuY29udGFpbnMoJ0xhbmd1YWdlJyk7XG4gICAgLy8gY3kuZ2V0KFxuICAgIC8vICAgJy5maWx0ZXItaHVtYW5fcmVhZGFibGVfbGFuZ3VhZ2Vfc2ltID4gLmZpbHRlci1ncm91cF9fbGFiZWwgPiAuZmlsdGVyLWxhYmVsLXZhbHVlJ1xuICAgIC8vICkuY29udGFpbnMoJ0VuZ2xpc2gnKTtcbiAgfSk7XG5cbiAgLyppdCgnU3RhcnQgT3ZlcicsICgpID0+IHtcbiAgICBjeS52aXNpdCgnL2NhdGFsb2c/ZltnZW5yZV9zaW1dW109QmxhY2stYW5kLXdoaXRlK3Bob3RvZ3JhcGhzJyk7XG4gICAgY3kuZ2V0KCdbdGl0bGU9XCJCbGFjay1hbmQtd2hpdGUgcGhvdG9ncmFwaHNcIl0nKTtcbiAgICBjeS5jb250YWlucygnYScsICdTdGFydCBPdmVyJykuY2xpY2soeyBmb3JjZTogdHJ1ZSB9KTtcbiAgICBjeS5nZXQoJy5zZWFyY2gtcmVzdWx0cy1jb250YWluZXInLCB7IHRpbWVvdXQ6IDEwMDAwMCB9KS5zaG91bGQoJ25vdC5jb250YWluJywgJ1lvdSBzZWFyY2hlZCBmb3InKTtcbiAgfSk7XG5cbiAgaXQoJ05hbWVzJywgKCkgPT4ge1xuICAgIGN5LnZpc2l0KCcvY2F0YWxvZy8nKTtcbiAgICBjeS5jb250YWlucygnYScsICdOYW1lcycpLmNsaWNrKCk7XG4gICAgY3kuY29udGFpbnMoJ2EnLCAnU2FudGEgTW9uaWNhIENpdmljIE9wZXJhIEFzc29jaWF0aW9uJykuY2xpY2soeyBmb3JjZTogdHJ1ZSB9KTtcbiAgICBjeS5nZXQoJ1t0aXRsZT1cIlNhbnRhIE1vbmljYSBDaXZpYyBPcGVyYSBBc3NvY2lhdGlvblwiXScsIHsgdGltZW91dDogMTAwMDAwIH0pO1xuICAgIGN5LmNvbnRhaW5zKCdhJywgJ0xvY2F0aW9uJykuY2xpY2soKTtcbiAgICBjeS5jb250YWlucygnYScsICdDYWxpZm9ybmlhLS1Mb3MgQW5nZWxlcy0tV2VzdHdvb2QnKS5jbGljayh7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGN5LmdldCgnW3RpdGxlPVwiQ2FsaWZvcm5pYS0tTG9zIEFuZ2VsZXMtLVdlc3R3b29kXCJdJywgeyB0aW1lb3V0OiAxMDAwMDAgfSk7XG4gICAgY3kuZ2V0KFxuICAgICAgJy5maWx0ZXItbG9jYXRpb25fc2ltID4gLmZpbHRlci1ncm91cF9fbGFiZWwgPiAuZmlsdGVyLWxhYmVsLWtleSdcbiAgICApLmNvbnRhaW5zKCdMb2NhdGlvbicpO1xuICAgIGN5LmdldChcbiAgICAgICcuZmlsdGVyLWxvY2F0aW9uX3NpbSA+IC5maWx0ZXItZ3JvdXBfX2xhYmVsID4gLmZpbHRlci1sYWJlbC12YWx1ZSdcbiAgICApLmNvbnRhaW5zKCdDYWxpZm9ybmlhLS1Mb3MgQW5nZWxlcy0tV2VzdHdvb2QnKTtcbiAgICBjeS5nZXQoXG4gICAgICAnLmZpbHRlci1uYW1lZF9zdWJqZWN0X3NpbSA+IC5maWx0ZXItZ3JvdXBfX2xhYmVsID4gLmZpbHRlci1sYWJlbC1rZXknXG4gICAgKS5jb250YWlucygnTmFtZXMnKTtcbiAgICBjeS5nZXQoXG4gICAgICAnLmZpbHRlci1uYW1lZF9zdWJqZWN0X3NpbSA+IC5maWx0ZXItZ3JvdXBfX2xhYmVsID4gLmZpbHRlci1sYWJlbC12YWx1ZSdcbiAgICApLmNvbnRhaW5zKCdTYW50YSBNb25pY2EgQ2l2aWMgT3BlcmEgQXNzb2NpYXRpb24nKTtcbiAgICBjeS5wZXJjeVNuYXBzaG90KCk7XG4gIH0pO1xuXG4gIGl0KCdEYXRlcycsICgpID0+IHtcbiAgICBjeS52aXNpdCgnL2NhdGFsb2cvJyk7XG4gICAgY3kuY29udGFpbnMoJ2EnLCAnRGF0ZScpLmNsaWNrKCk7XG4gICAgY3kuZ2V0KCcjcmFuZ2VfeWVhcl9pc2ltX2JlZ2luJykuY2xlYXIoKS50eXBlKCcxOTM1Jyk7XG4gICAgY3kuZ2V0KCcjcmFuZ2VfeWVhcl9pc2ltX2VuZCcpLmNsZWFyKCkudHlwZSgnMTk2NycpO1xuICAgIGN5LmdldCgnLnN1Ym1pdCcpLmNsaWNrKCk7XG4gICAgY3kuZ2V0KCcuZmlsdGVyLWxhYmVsLWtleScpLmNvbnRhaW5zKCdEYXRlJyk7XG4gICAgY3kuZ2V0KCcuZmlsdGVyLWxhYmVsLXZhbHVlJykuY29udGFpbnMoJzE5MzUgdG8gMTk2NycpO1xuICAgIGN5LnBlcmN5U25hcHNob3QoKTtcbiAgfSk7XG5cbiAgaXQoJ0NvbGxlY3Rpb24nLCAoKSA9PiB7XG4gICAgY3kudmlzaXQoJy9jYXRhbG9nLycpO1xuICAgIGN5LmNvbnRhaW5zKCdhJywgJ0NvbGxlY3Rpb24nKS5jbGljayh7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGN5LmdldChcbiAgICAgICcjZmFjZXQtbWVtYmVyX29mX2NvbGxlY3Rpb25zX3NzaW0gPiAuZmFjZXQtdmFsdWVzID4gLm1vcmVfZmFjZXRzID4gYSdcbiAgICApLmNsaWNrKHsgZm9yY2U6IHRydWUgfSk7XG4gICAgY3kuY29udGFpbnMoJ2EnLCAnTmV4dCcpLmNsaWNrKHsgZm9yY2U6IHRydWUgfSk7XG4gICAgY3kuY29udGFpbnMoJ2EnLCAnQ2FybyBNaW5hc2lhbiBDb2xsZWN0aW9uIG9mIEFybWVuaWFuIE1hdGVyaWFsLCBjaXJjYSAxNjAwLTE5NjgnKS5jbGljayh7IGZvcmNlOiB0cnVlIH0pO1xuICAgIGN5LmdldCgnLmZpbHRlci1sYWJlbC1rZXknLCB7IHRpbWVvdXQ6IDEwMDAwMCB9KS5jb250YWlucygnQ29sbGVjdGlvbicpO1xuICAgIGN5LmdldCgnLmZpbHRlci1sYWJlbC12YWx1ZScpLmNvbnRhaW5zKCdDYXJvIE1pbmFzaWFuIENvbGxlY3Rpb24gb2YgQXJtZW5pYW4gTWF0ZXJpYWwsIGNpcmNhIDE2MDAtMTk2OCcpO1xuICAgIGN5LnBlcmN5U25hcHNob3QoKTtcbiAgfSk7Ki9cblxuICBpdCgnR2VucmUnLCAoKSA9PiB7XG4gICAgY3kudmlzaXQoJy9jYXRhbG9nLycpO1xuICAgIGN5LmNvbnRhaW5zKCdHZW5yZScpLmNsaWNrKHsgZm9yY2U6IHRydWUgfSk7XG4gICAgLy8gY3kuZ2V0KCcjZmFjZXQtZ2VucmVfc2ltID4gLmZhY2V0LXZhbHVlcyA+IC5tb3JlX2ZhY2V0cyA+IGEnKS5jbGljayh7XG4gICAgY3kuY29udGFpbnMoJ21vcmUnKS5jbGljayh7XG4gICAgICBmb3JjZTogdHJ1ZSxcbiAgICB9KTtcbiAgICBjeS5jb250YWlucygnQS1aIFNvcnQnKS5jbGljayh7IGZvcmNlOiB0cnVlIH0pO1xuICAgIC8vIGN5LmdldCgnYVtocmVmKj1cIkFyY2hpdGVjdHVyYWwrZHJhd2luZ3NcIl0nKS5jbGljayh7IGZvcmNlOiB0cnVlIH0pO1xuICAgIC8vIGN5LmdldCgnLmZpbHRlci1sYWJlbC1rZXknLCB7IHRpbWVvdXQ6IDEwMDAwMCB9KS5jb250YWlucygnR2VucmUnKTtcbiAgICAvLyBjeS5nZXQoJy5maWx0ZXItbGFiZWwtdmFsdWUnKS5jb250YWlucygnQXJjaGl0ZWN0dXJhbCBkcmF3aW5ncycpO1xuICAgIC8vIGN5LnBlcmN5U25hcHNob3QoKTtcbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6WyJkZXNjcmliZSIsIml0IiwiY3kiLCJ2aXNpdCIsImNvbnRhaW5zIiwiY2xpY2siLCJmb3JjZSIsInBlcmN5U25hcHNob3QiLCJyZXF1ZXN0IiwiaXRzIiwic2hvdWxkIiwiZ2V0IiwidGltZW91dCJdLCJzb3VyY2VSb290IjoiIn0=