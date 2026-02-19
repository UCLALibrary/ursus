/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./cypress/e2e/ursus_work_show.cy.js ***!
  \*******************************************/


describe('Work show pages', () => {
  it('Arganon (Praise) of Mary', () => {
    cy.visit('/catalog/ark:/21198/zz0009q5nq');
    cy.contains('h1', 'Ms. 35 Arganon');
    cy.frameLoaded({
      url: 'https://p-w-dl-viewer01.library.ucla.edu/#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz0009q5nq%2Fmanifest'
    });
    cy.iframe().within(() => {
      cy.iframe().contains('div', 'Ms. 35 Arganon');
    });
    cy.percySnapshot();
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJzdXNfd29ya19zaG93LmN5LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQ0FBLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNO0VBQ2hDQyxFQUFFLENBQUMsMEJBQTBCLEVBQUUsTUFBTTtJQUNuQ0MsRUFBRSxDQUFDQyxLQUFLLENBQUMsZ0NBQWdDLENBQUM7SUFDMUNELEVBQUUsQ0FBQ0UsUUFBUSxDQUNULElBQUksRUFDSixnQkFDRixDQUFDO0lBQ0RGLEVBQUUsQ0FBQ0csV0FBVyxDQUFDO01BQ2JDLEdBQUcsRUFDRDtJQUNKLENBQUMsQ0FBQztJQUNGSixFQUFFLENBQUNLLE1BQU0sQ0FBQyxDQUFDLENBQUNDLE1BQU0sQ0FBQyxNQUFNO01BQ3ZCTixFQUFFLENBQUNLLE1BQU0sQ0FBQyxDQUFDLENBQUNILFFBQVEsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUM7SUFDL0MsQ0FBQyxDQUFDO0lBQ0ZGLEVBQUUsQ0FBQ08sYUFBYSxDQUFDLENBQUM7RUFDcEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91cnN1cy1lMmUvLi9jeXByZXNzL2UyZS91cnN1c193b3JrX3Nob3cuY3kuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5kZXNjcmliZSgnV29yayBzaG93IHBhZ2VzJywgKCkgPT4ge1xuICBpdCgnQXJnYW5vbiAoUHJhaXNlKSBvZiBNYXJ5JywgKCkgPT4ge1xuICAgIGN5LnZpc2l0KCcvY2F0YWxvZy9hcms6LzIxMTk4L3p6MDAwOXE1bnEnKTtcbiAgICBjeS5jb250YWlucyhcbiAgICAgICdoMScsXG4gICAgICAnTXMuIDM1IEFyZ2Fub24nXG4gICAgKTtcbiAgICBjeS5mcmFtZUxvYWRlZCh7XG4gICAgICB1cmw6XG4gICAgICAgICdodHRwczovL3Atdy1kbC12aWV3ZXIwMS5saWJyYXJ5LnVjbGEuZWR1LyM/bWFuaWZlc3Q9aHR0cHMlM0ElMkYlMkZpaWlmLmxpYnJhcnkudWNsYS5lZHUlMkZhcmslMjUzQSUyNTJGMjExOTglMjUyRnp6MDAwOXE1bnElMkZtYW5pZmVzdCcsXG4gICAgfSk7XG4gICAgY3kuaWZyYW1lKCkud2l0aGluKCgpID0+IHtcbiAgICAgIGN5LmlmcmFtZSgpLmNvbnRhaW5zKCdkaXYnLCAnTXMuIDM1IEFyZ2Fub24nKVxuICAgIH0pO1xuICAgIGN5LnBlcmN5U25hcHNob3QoKTtcbiAgfSk7XG59KTtcbiJdLCJuYW1lcyI6WyJkZXNjcmliZSIsIml0IiwiY3kiLCJ2aXNpdCIsImNvbnRhaW5zIiwiZnJhbWVMb2FkZWQiLCJ1cmwiLCJpZnJhbWUiLCJ3aXRoaW4iLCJwZXJjeVNuYXBzaG90Il0sInNvdXJjZVJvb3QiOiIifQ==