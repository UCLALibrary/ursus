/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./cypress/e2e/oai_pmh_request.cy.js ***!
  \*******************************************/


describe('OAI-PMH Requests', () => {
  it('Identify Request page', () => {
    cy.request('/catalog/oai?verb=Identify').its('body').should('include', 'UCLA Library Digital Collections');
  });
  it('ListSets Request page', () => {
    cy.request('/catalog/oai?verb=ListSets').its('body').should('include', 'setSpec');
  });
  it('ListMetadataFormats Request page', () => {
    cy.request('/catalog/oai?verb=ListMetadataFormats').its('body').should('include', 'oai_dc');
  });
  it('ListRecords Request page', () => {
    cy.request('/catalog/oai?verb=ListRecords&metadataPrefix=oai_dc').its('body').should('include', '<ListRecords><record><header><identifier>oai:library.ucla.edu:');
  });
  it('ListRecords Request page with mods arce', () => {
    cy.request('/catalog/oai?verb=ListRecords&metadataPrefix=mods_arce').its('body').should('include', '<ListRecords><record><header><identifier>oai:library.ucla.edu:');
  });
  it('ListIdentifiers Request page', () => {
    cy.request('/catalog/oai?verb=ListIdentifiers&metadataPrefix=oai_dc').its('body').should('include', '<ListIdentifiers><header><identifier>oai:library.ucla.edu:');
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2FpX3BtaF9yZXF1ZXN0LmN5LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUFBLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNO0VBQ2pDQyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsTUFBTTtJQUNoQ0MsRUFBRSxDQUFDQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDQyxNQUFNLENBQUMsU0FBUyxFQUFFLGtDQUFrQyxDQUFDO0VBQzVHLENBQUMsQ0FBQztFQUNGSixFQUFFLENBQUMsdUJBQXVCLEVBQUUsTUFBTTtJQUNoQ0MsRUFBRSxDQUFDQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDQyxNQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztFQUNuRixDQUFDLENBQUM7RUFDRkosRUFBRSxDQUFDLGtDQUFrQyxFQUFFLE1BQU07SUFDM0NDLEVBQUUsQ0FBQ0MsT0FBTyxDQUFDLHVDQUF1QyxDQUFDLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7RUFDN0YsQ0FBQyxDQUFDO0VBQ0ZKLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSxNQUFNO0lBQ25DQyxFQUFFLENBQUNDLE9BQU8sQ0FBQyxxREFBcUQsQ0FBQyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUNDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsZ0VBQWdFLENBQUM7RUFDbkssQ0FBQyxDQUFDO0VBQ0ZKLEVBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxNQUFNO0lBQ2xEQyxFQUFFLENBQUNDLE9BQU8sQ0FBQyx3REFBd0QsQ0FBQyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUNDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsZ0VBQWdFLENBQUM7RUFDdEssQ0FBQyxDQUFDO0VBQ0ZKLEVBQUUsQ0FBQyw4QkFBOEIsRUFBRSxNQUFNO0lBQ3ZDQyxFQUFFLENBQUNDLE9BQU8sQ0FBQyx5REFBeUQsQ0FBQyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUNDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsNERBQTRELENBQUM7RUFDbkssQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91cnN1cy1lMmUvLi9jeXByZXNzL2UyZS9vYWlfcG1oX3JlcXVlc3QuY3kuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZGVzY3JpYmUoJ09BSS1QTUggUmVxdWVzdHMnLCAoKSA9PiB7XG4gIGl0KCdJZGVudGlmeSBSZXF1ZXN0IHBhZ2UnLCAoKSA9PiB7XG4gICAgY3kucmVxdWVzdCgnL2NhdGFsb2cvb2FpP3ZlcmI9SWRlbnRpZnknKS5pdHMoJ2JvZHknKS5zaG91bGQoJ2luY2x1ZGUnLCAnVUNMQSBMaWJyYXJ5IERpZ2l0YWwgQ29sbGVjdGlvbnMnKVxuICB9KTtcbiAgaXQoJ0xpc3RTZXRzIFJlcXVlc3QgcGFnZScsICgpID0+IHtcbiAgICBjeS5yZXF1ZXN0KCcvY2F0YWxvZy9vYWk/dmVyYj1MaXN0U2V0cycpLml0cygnYm9keScpLnNob3VsZCgnaW5jbHVkZScsICdzZXRTcGVjJyk7XG4gIH0pO1xuICBpdCgnTGlzdE1ldGFkYXRhRm9ybWF0cyBSZXF1ZXN0IHBhZ2UnLCAoKSA9PiB7XG4gICAgY3kucmVxdWVzdCgnL2NhdGFsb2cvb2FpP3ZlcmI9TGlzdE1ldGFkYXRhRm9ybWF0cycpLml0cygnYm9keScpLnNob3VsZCgnaW5jbHVkZScsICdvYWlfZGMnKTtcbiAgfSk7XG4gIGl0KCdMaXN0UmVjb3JkcyBSZXF1ZXN0IHBhZ2UnLCAoKSA9PiB7XG4gICAgY3kucmVxdWVzdCgnL2NhdGFsb2cvb2FpP3ZlcmI9TGlzdFJlY29yZHMmbWV0YWRhdGFQcmVmaXg9b2FpX2RjJykuaXRzKCdib2R5Jykuc2hvdWxkKCdpbmNsdWRlJywgJzxMaXN0UmVjb3Jkcz48cmVjb3JkPjxoZWFkZXI+PGlkZW50aWZpZXI+b2FpOmxpYnJhcnkudWNsYS5lZHU6Jyk7XG4gIH0pO1xuICBpdCgnTGlzdFJlY29yZHMgUmVxdWVzdCBwYWdlIHdpdGggbW9kcyBhcmNlJywgKCkgPT4ge1xuICAgIGN5LnJlcXVlc3QoJy9jYXRhbG9nL29haT92ZXJiPUxpc3RSZWNvcmRzJm1ldGFkYXRhUHJlZml4PW1vZHNfYXJjZScpLml0cygnYm9keScpLnNob3VsZCgnaW5jbHVkZScsICc8TGlzdFJlY29yZHM+PHJlY29yZD48aGVhZGVyPjxpZGVudGlmaWVyPm9haTpsaWJyYXJ5LnVjbGEuZWR1OicpO1xuICB9KTtcbiAgaXQoJ0xpc3RJZGVudGlmaWVycyBSZXF1ZXN0IHBhZ2UnLCAoKSA9PiB7XG4gICAgY3kucmVxdWVzdCgnL2NhdGFsb2cvb2FpP3ZlcmI9TGlzdElkZW50aWZpZXJzJm1ldGFkYXRhUHJlZml4PW9haV9kYycpLml0cygnYm9keScpLnNob3VsZCgnaW5jbHVkZScsICc8TGlzdElkZW50aWZpZXJzPjxoZWFkZXI+PGlkZW50aWZpZXI+b2FpOmxpYnJhcnkudWNsYS5lZHU6Jyk7XG4gIH0pO1xufSlcbiJdLCJuYW1lcyI6WyJkZXNjcmliZSIsIml0IiwiY3kiLCJyZXF1ZXN0IiwiaXRzIiwic2hvdWxkIl0sInNvdXJjZVJvb3QiOiIifQ==