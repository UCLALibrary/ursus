/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./cypress/e2e/ursus_pagination.cy.js ***!
  \********************************************/


describe('Prev/next Pagination', () => {
  it('Pages proper on empty search and checks for Prev link is disabled', () => {
    /* steps: 
    1. go to home page
    2. do empty search 
    3. check if prev is disabled
    */
    /*<li class="pagination__page-item pagination__page-item--ursus disabled">
        <a rel="prev" onclick="return false;" class="pagination__page-link pagination__page-link--ursus" aria-label="Go to previous page" href="#">‹ Prev</a>
      </li>
      */
    cy.visit('/catalog?utf8=%E2%9C%93&q=&search_field=all_fields');
    cy.get('[aria-current="true"]').contains('1');
    cy.get('[aria-label="Go to previous page"]').parent('.disabled').each(($el, index, $list) => {
      if ($el.children('a').attr('onclick') == 'return false;') {
        cy.log('disabled');
      }
    });
  });
  it('Go To Next Page of the search results, check Prev link is enabled ', () => {
    /*
     4. click on next 
    5. check if prev is enabled
    
    */
    /*
      <li class="pagination__page-item pagination__page-item--ursus">
        <a rel="next" class="pagination__page-link pagination__page-link--ursus" aria-label="Go to next page" href="/catalog?page=2&amp;q=&amp;search_field=all_fields">Next ›</a>
      </li>
      */
    cy.visit('/catalog?page=2&q=&search_field=all_fields');
    cy.get('[aria-current="true"]').contains('2');
    cy.get('[aria-label="Go to previous page"]').parent().should('not.have.class', 'disabled');
    // The Following solution is if the user is on home page.
    /*cy.get('[aria-label="Go to next page"]')
      .eq(0)
      .then(function ($a) {
        // extract the fully qualified href property
        const href = $a.prop('href');
        // make an http request for this resource outside of the browser
        cy.request(href)
          // drill into the response body
          .its('body')
          // and assert that its contents have the <html> response
          .should(
            'include',
            ' <li class="pagination__page-item pagination__page-item--ursus">\n        <a rel="prev"'
          )
          .and(
            'include',
            '<span class="pagination__page-link pagination__page-link--ursus" aria-label="Current Page, Page 2" aria-current="true">2</span>'
          );
      });
    */
  });

  it('On Empty search, When on Last page, Next page link is disabled', () => {
    /*
    6. when on the last page, then next is disabled
    */
    cy.visit('/catalog?utf8=%E2%9C%93&q=&search_field=all_fields');
    cy.get('ul.pagination__list-wrapper').eq(0).find('li').last().find('a');
    // .then(function ($a) {
    //   // extract the fully qualified href property
    //   cy.log($a.prop('href'));
    //   const href = $a.prop('href');
    //   cy.log($a.text());

    //   // make an http request for this resource outside of the browser
    //   cy.request(href)
    //     // drill into the response body
    //     .its('body')
    //     // and assert that its contents have the <html> response
    //     .should(
    //       'include',
    //       ' <li class="pagination__page-item pagination__page-item--ursus disabled">\n        <a rel="next"'
    //     )
    //     .and(
    //       'include',
    //       '<span class="pagination__page-link pagination__page-link--ursus" aria-label="Current Page, Page ' +
    //         $a.text() +
    //         '" aria-current="true">' +
    //         $a.text() +
    //         '</span>'
    //     );
    // });

    //Following code not working due to cypress not waiting longer.
    //cy.get('ul.pagination__list-wrapper').eq(0).find('li').last().find('a').click();
    /*cy.get('[aria-label="Go to next page"]')
      .parent('.disabled')
      .should('have.length', 2);*/
  });

  // it('Prev/next in search results', () => {
  //   /* steps: 
  //   1. go to empty search 
  //   2. remember third item title
  //   3. click on first item, then click 'next' to 2nd and 3rd, 'prev' back to second
  //   4. at each stop, assert:
  //       - pagination control says '1/2/3 of ...'
  //       - title isn't equal to remembered 3rd title, except when it should be
  //       - 'Next'/'Prev' links are <a> tags, execpt on 1st item where 'Next' is a (inactive) span
  //   */
  //   cy.visit('/catalog?utf8=%E2%9C%93&q=&search_field=all_fields');
  //   cy.get('h3.document__list-title').eq(2).then(($title) => {
  //     let third_title = $title.text().replace(/^\s+/, '').replace(/\s+$/, '');

  //     cy.get('h3.document__list-title').eq(0).find('a').click();
  //     cy.get('.item-page__pagination-widgets').should('contain', '1 of')
  //     // Next/Prev links are <span> when disabled, <a> when active
  //     cy.get('.item-page__pagination-widgets').contains('span', 'Prev').should('exist')
  //     cy.get('.item-page__pagination-widgets').contains('a', 'Prev').should('not.exist')
  //     cy.get('.item-page__pagination-widgets').contains('span', 'Next').should('not.exist')
  //     cy.get('.item-page__pagination-widgets').contains('a', 'Next').should('exist')
  //     cy.get('.item-page__title').should('not.contain', third_title);

  //     cy.get('.item-page__pagination-widgets').contains('a', 'Next').click();
  //     cy.get('.item-page__pagination-widgets').should('contain', '2 of')
  //     // Next/Prev links are <span> when disabled, <a> when active
  //     cy.get('.item-page__pagination-widgets').contains('span', 'Prev').should('not.exist')
  //     cy.get('.item-page__pagination-widgets').contains('a', 'Prev').should('exist')
  //     cy.get('.item-page__pagination-widgets').contains('span', 'Next').should('not.exist')
  //     cy.get('.item-page__pagination-widgets').contains('a', 'Next').should('exist')
  //     // After the solr image got updated third title and second title are same
  //     //cy.get('.item-page__title').should('not.contain', third_title);

  //     cy.get('.item-page__pagination-widgets').contains('a', 'Next').click();
  //     cy.get('.item-page__pagination-widgets').should('contain', '3 of')
  //     // Next/Prev links are <span> when disabled, <a> when active
  //     cy.get('.item-page__pagination-widgets').contains('span', 'Prev').should('not.exist')
  //     cy.get('.item-page__pagination-widgets').contains('a', 'Prev').should('exist')
  //     cy.get('.item-page__pagination-widgets').contains('span', 'Next').should('not.exist')
  //     cy.get('.item-page__pagination-widgets').contains('a', 'Next').should('exist')
  //     cy.get('.item-page__title').should('contain', third_title);

  //     cy.get('.item-page__pagination-widgets').contains('a', 'Prev').click();
  //     cy.get('.item-page__pagination-widgets').should('contain', '2 of')
  //     // After the solr image got updated third title and second title are same
  //     //cy.get('.item-page__title').should('not.contain', third_title);
  //   })
  // });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJzdXNfcGFnaW5hdGlvbi5jeS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBQSxRQUFRLENBQUMsc0JBQXNCLEVBQUUsTUFBTTtFQUNyQ0MsRUFBRSxDQUFDLG1FQUFtRSxFQUFFLE1BQU07SUFDNUU7QUFDSjtBQUNBO0FBQ0E7QUFDQTtJQUNJO0FBQ0o7QUFDQTtBQUNBO0lBQ0lDLEVBQUUsQ0FBQ0MsS0FBSyxDQUFDLG9EQUFvRCxDQUFDO0lBQzlERCxFQUFFLENBQUNFLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDQyxRQUFRLENBQUMsR0FBRyxDQUFDO0lBQzdDSCxFQUFFLENBQUNFLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUN6Q0UsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUNuQkMsSUFBSSxDQUFDLENBQUNDLEdBQUcsRUFBRUMsS0FBSyxFQUFFQyxLQUFLLEtBQUs7TUFDM0IsSUFBSUYsR0FBRyxDQUFDRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxlQUFlLEVBQUU7UUFDeERWLEVBQUUsQ0FBQ1csR0FBRyxDQUFDLFVBQVUsQ0FBQztNQUNwQjtJQUNGLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUVGWixFQUFFLENBQUMsb0VBQW9FLEVBQUUsTUFBTTtJQUM3RTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0lBRUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtJQUNJQyxFQUFFLENBQUNDLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQztJQUN0REQsRUFBRSxDQUFDRSxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLEdBQUcsQ0FBQztJQUM3Q0gsRUFBRSxDQUFDRSxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FDekNFLE1BQU0sQ0FBQyxDQUFDLENBQ1JRLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUM7SUFDdkM7SUFDQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0VBQ0UsQ0FBQyxDQUFDOztFQUVGYixFQUFFLENBQUMsZ0VBQWdFLEVBQUUsTUFBTTtJQUN6RTtBQUNKO0FBQ0E7SUFDSUMsRUFBRSxDQUFDQyxLQUFLLENBQUMsb0RBQW9ELENBQUM7SUFDOURELEVBQUUsQ0FBQ0UsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQ2xDVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ0xDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDVkMsSUFBSSxDQUFDLENBQUMsQ0FDTkQsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNWO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7O0lBRUE7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUVGO0lBQ0E7SUFDQTtBQUNKO0FBQ0E7RUFDRSxDQUFDLENBQUM7O0VBRUY7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDRixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Vyc3VzLWUyZS8uL2N5cHJlc3MvZTJlL3Vyc3VzX3BhZ2luYXRpb24uY3kuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZGVzY3JpYmUoJ1ByZXYvbmV4dCBQYWdpbmF0aW9uJywgKCkgPT4ge1xuICBpdCgnUGFnZXMgcHJvcGVyIG9uIGVtcHR5IHNlYXJjaCBhbmQgY2hlY2tzIGZvciBQcmV2IGxpbmsgaXMgZGlzYWJsZWQnLCAoKSA9PiB7XG4gICAgLyogc3RlcHM6IFxuICAgIDEuIGdvIHRvIGhvbWUgcGFnZVxuICAgIDIuIGRvIGVtcHR5IHNlYXJjaCBcbiAgICAzLiBjaGVjayBpZiBwcmV2IGlzIGRpc2FibGVkXG4gICAgKi9cbiAgICAvKjxsaSBjbGFzcz1cInBhZ2luYXRpb25fX3BhZ2UtaXRlbSBwYWdpbmF0aW9uX19wYWdlLWl0ZW0tLXVyc3VzIGRpc2FibGVkXCI+XG4gICAgICAgIDxhIHJlbD1cInByZXZcIiBvbmNsaWNrPVwicmV0dXJuIGZhbHNlO1wiIGNsYXNzPVwicGFnaW5hdGlvbl9fcGFnZS1saW5rIHBhZ2luYXRpb25fX3BhZ2UtbGluay0tdXJzdXNcIiBhcmlhLWxhYmVsPVwiR28gdG8gcHJldmlvdXMgcGFnZVwiIGhyZWY9XCIjXCI+4oC5IFByZXY8L2E+XG4gICAgICA8L2xpPlxuICAgICAgKi9cbiAgICBjeS52aXNpdCgnL2NhdGFsb2c/dXRmOD0lRTIlOUMlOTMmcT0mc2VhcmNoX2ZpZWxkPWFsbF9maWVsZHMnKTtcbiAgICBjeS5nZXQoJ1thcmlhLWN1cnJlbnQ9XCJ0cnVlXCJdJykuY29udGFpbnMoJzEnKTtcbiAgICBjeS5nZXQoJ1thcmlhLWxhYmVsPVwiR28gdG8gcHJldmlvdXMgcGFnZVwiXScpXG4gICAgICAucGFyZW50KCcuZGlzYWJsZWQnKVxuICAgICAgLmVhY2goKCRlbCwgaW5kZXgsICRsaXN0KSA9PiB7XG4gICAgICAgIGlmICgkZWwuY2hpbGRyZW4oJ2EnKS5hdHRyKCdvbmNsaWNrJykgPT0gJ3JldHVybiBmYWxzZTsnKSB7XG4gICAgICAgICAgY3kubG9nKCdkaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgaXQoJ0dvIFRvIE5leHQgUGFnZSBvZiB0aGUgc2VhcmNoIHJlc3VsdHMsIGNoZWNrIFByZXYgbGluayBpcyBlbmFibGVkICcsICgpID0+IHtcbiAgICAvKlxuXG4gICAgNC4gY2xpY2sgb24gbmV4dCBcbiAgICA1LiBjaGVjayBpZiBwcmV2IGlzIGVuYWJsZWRcbiAgICBcbiAgICAqL1xuICAgIC8qXG4gICAgICA8bGkgY2xhc3M9XCJwYWdpbmF0aW9uX19wYWdlLWl0ZW0gcGFnaW5hdGlvbl9fcGFnZS1pdGVtLS11cnN1c1wiPlxuICAgICAgICA8YSByZWw9XCJuZXh0XCIgY2xhc3M9XCJwYWdpbmF0aW9uX19wYWdlLWxpbmsgcGFnaW5hdGlvbl9fcGFnZS1saW5rLS11cnN1c1wiIGFyaWEtbGFiZWw9XCJHbyB0byBuZXh0IHBhZ2VcIiBocmVmPVwiL2NhdGFsb2c/cGFnZT0yJmFtcDtxPSZhbXA7c2VhcmNoX2ZpZWxkPWFsbF9maWVsZHNcIj5OZXh0IOKAujwvYT5cbiAgICAgIDwvbGk+XG4gICAgICAqL1xuICAgIGN5LnZpc2l0KCcvY2F0YWxvZz9wYWdlPTImcT0mc2VhcmNoX2ZpZWxkPWFsbF9maWVsZHMnKTtcbiAgICBjeS5nZXQoJ1thcmlhLWN1cnJlbnQ9XCJ0cnVlXCJdJykuY29udGFpbnMoJzInKTtcbiAgICBjeS5nZXQoJ1thcmlhLWxhYmVsPVwiR28gdG8gcHJldmlvdXMgcGFnZVwiXScpXG4gICAgICAucGFyZW50KClcbiAgICAgIC5zaG91bGQoJ25vdC5oYXZlLmNsYXNzJywgJ2Rpc2FibGVkJyk7XG4gICAgLy8gVGhlIEZvbGxvd2luZyBzb2x1dGlvbiBpcyBpZiB0aGUgdXNlciBpcyBvbiBob21lIHBhZ2UuXG4gICAgLypjeS5nZXQoJ1thcmlhLWxhYmVsPVwiR28gdG8gbmV4dCBwYWdlXCJdJylcbiAgICAgIC5lcSgwKVxuICAgICAgLnRoZW4oZnVuY3Rpb24gKCRhKSB7XG4gICAgICAgIC8vIGV4dHJhY3QgdGhlIGZ1bGx5IHF1YWxpZmllZCBocmVmIHByb3BlcnR5XG4gICAgICAgIGNvbnN0IGhyZWYgPSAkYS5wcm9wKCdocmVmJyk7XG4gICAgICAgIC8vIG1ha2UgYW4gaHR0cCByZXF1ZXN0IGZvciB0aGlzIHJlc291cmNlIG91dHNpZGUgb2YgdGhlIGJyb3dzZXJcbiAgICAgICAgY3kucmVxdWVzdChocmVmKVxuICAgICAgICAgIC8vIGRyaWxsIGludG8gdGhlIHJlc3BvbnNlIGJvZHlcbiAgICAgICAgICAuaXRzKCdib2R5JylcbiAgICAgICAgICAvLyBhbmQgYXNzZXJ0IHRoYXQgaXRzIGNvbnRlbnRzIGhhdmUgdGhlIDxodG1sPiByZXNwb25zZVxuICAgICAgICAgIC5zaG91bGQoXG4gICAgICAgICAgICAnaW5jbHVkZScsXG4gICAgICAgICAgICAnIDxsaSBjbGFzcz1cInBhZ2luYXRpb25fX3BhZ2UtaXRlbSBwYWdpbmF0aW9uX19wYWdlLWl0ZW0tLXVyc3VzXCI+XFxuICAgICAgICA8YSByZWw9XCJwcmV2XCInXG4gICAgICAgICAgKVxuICAgICAgICAgIC5hbmQoXG4gICAgICAgICAgICAnaW5jbHVkZScsXG4gICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJwYWdpbmF0aW9uX19wYWdlLWxpbmsgcGFnaW5hdGlvbl9fcGFnZS1saW5rLS11cnN1c1wiIGFyaWEtbGFiZWw9XCJDdXJyZW50IFBhZ2UsIFBhZ2UgMlwiIGFyaWEtY3VycmVudD1cInRydWVcIj4yPC9zcGFuPidcbiAgICAgICAgICApO1xuICAgICAgfSk7XG4qL1xuICB9KTtcblxuICBpdCgnT24gRW1wdHkgc2VhcmNoLCBXaGVuIG9uIExhc3QgcGFnZSwgTmV4dCBwYWdlIGxpbmsgaXMgZGlzYWJsZWQnLCAoKSA9PiB7XG4gICAgLypcbiAgICA2LiB3aGVuIG9uIHRoZSBsYXN0IHBhZ2UsIHRoZW4gbmV4dCBpcyBkaXNhYmxlZFxuICAgICovXG4gICAgY3kudmlzaXQoJy9jYXRhbG9nP3V0Zjg9JUUyJTlDJTkzJnE9JnNlYXJjaF9maWVsZD1hbGxfZmllbGRzJyk7XG4gICAgY3kuZ2V0KCd1bC5wYWdpbmF0aW9uX19saXN0LXdyYXBwZXInKVxuICAgICAgLmVxKDApXG4gICAgICAuZmluZCgnbGknKVxuICAgICAgLmxhc3QoKVxuICAgICAgLmZpbmQoJ2EnKVxuICAgICAgLy8gLnRoZW4oZnVuY3Rpb24gKCRhKSB7XG4gICAgICAvLyAgIC8vIGV4dHJhY3QgdGhlIGZ1bGx5IHF1YWxpZmllZCBocmVmIHByb3BlcnR5XG4gICAgICAvLyAgIGN5LmxvZygkYS5wcm9wKCdocmVmJykpO1xuICAgICAgLy8gICBjb25zdCBocmVmID0gJGEucHJvcCgnaHJlZicpO1xuICAgICAgLy8gICBjeS5sb2coJGEudGV4dCgpKTtcblxuICAgICAgLy8gICAvLyBtYWtlIGFuIGh0dHAgcmVxdWVzdCBmb3IgdGhpcyByZXNvdXJjZSBvdXRzaWRlIG9mIHRoZSBicm93c2VyXG4gICAgICAvLyAgIGN5LnJlcXVlc3QoaHJlZilcbiAgICAgIC8vICAgICAvLyBkcmlsbCBpbnRvIHRoZSByZXNwb25zZSBib2R5XG4gICAgICAvLyAgICAgLml0cygnYm9keScpXG4gICAgICAvLyAgICAgLy8gYW5kIGFzc2VydCB0aGF0IGl0cyBjb250ZW50cyBoYXZlIHRoZSA8aHRtbD4gcmVzcG9uc2VcbiAgICAgIC8vICAgICAuc2hvdWxkKFxuICAgICAgLy8gICAgICAgJ2luY2x1ZGUnLFxuICAgICAgLy8gICAgICAgJyA8bGkgY2xhc3M9XCJwYWdpbmF0aW9uX19wYWdlLWl0ZW0gcGFnaW5hdGlvbl9fcGFnZS1pdGVtLS11cnN1cyBkaXNhYmxlZFwiPlxcbiAgICAgICAgPGEgcmVsPVwibmV4dFwiJ1xuICAgICAgLy8gICAgIClcbiAgICAgIC8vICAgICAuYW5kKFxuICAgICAgLy8gICAgICAgJ2luY2x1ZGUnLFxuICAgICAgLy8gICAgICAgJzxzcGFuIGNsYXNzPVwicGFnaW5hdGlvbl9fcGFnZS1saW5rIHBhZ2luYXRpb25fX3BhZ2UtbGluay0tdXJzdXNcIiBhcmlhLWxhYmVsPVwiQ3VycmVudCBQYWdlLCBQYWdlICcgK1xuICAgICAgLy8gICAgICAgICAkYS50ZXh0KCkgK1xuICAgICAgLy8gICAgICAgICAnXCIgYXJpYS1jdXJyZW50PVwidHJ1ZVwiPicgK1xuICAgICAgLy8gICAgICAgICAkYS50ZXh0KCkgK1xuICAgICAgLy8gICAgICAgICAnPC9zcGFuPidcbiAgICAgIC8vICAgICApO1xuICAgICAgLy8gfSk7XG5cbiAgICAvL0ZvbGxvd2luZyBjb2RlIG5vdCB3b3JraW5nIGR1ZSB0byBjeXByZXNzIG5vdCB3YWl0aW5nIGxvbmdlci5cbiAgICAvL2N5LmdldCgndWwucGFnaW5hdGlvbl9fbGlzdC13cmFwcGVyJykuZXEoMCkuZmluZCgnbGknKS5sYXN0KCkuZmluZCgnYScpLmNsaWNrKCk7XG4gICAgLypjeS5nZXQoJ1thcmlhLWxhYmVsPVwiR28gdG8gbmV4dCBwYWdlXCJdJylcbiAgICAgIC5wYXJlbnQoJy5kaXNhYmxlZCcpXG4gICAgICAuc2hvdWxkKCdoYXZlLmxlbmd0aCcsIDIpOyovXG4gIH0pO1xuXG4gIC8vIGl0KCdQcmV2L25leHQgaW4gc2VhcmNoIHJlc3VsdHMnLCAoKSA9PiB7XG4gIC8vICAgLyogc3RlcHM6IFxuICAvLyAgIDEuIGdvIHRvIGVtcHR5IHNlYXJjaCBcbiAgLy8gICAyLiByZW1lbWJlciB0aGlyZCBpdGVtIHRpdGxlXG4gIC8vICAgMy4gY2xpY2sgb24gZmlyc3QgaXRlbSwgdGhlbiBjbGljayAnbmV4dCcgdG8gMm5kIGFuZCAzcmQsICdwcmV2JyBiYWNrIHRvIHNlY29uZFxuICAvLyAgIDQuIGF0IGVhY2ggc3RvcCwgYXNzZXJ0OlxuICAvLyAgICAgICAtIHBhZ2luYXRpb24gY29udHJvbCBzYXlzICcxLzIvMyBvZiAuLi4nXG4gIC8vICAgICAgIC0gdGl0bGUgaXNuJ3QgZXF1YWwgdG8gcmVtZW1iZXJlZCAzcmQgdGl0bGUsIGV4Y2VwdCB3aGVuIGl0IHNob3VsZCBiZVxuICAvLyAgICAgICAtICdOZXh0Jy8nUHJldicgbGlua3MgYXJlIDxhPiB0YWdzLCBleGVjcHQgb24gMXN0IGl0ZW0gd2hlcmUgJ05leHQnIGlzIGEgKGluYWN0aXZlKSBzcGFuXG4gIC8vICAgKi9cbiAgLy8gICBjeS52aXNpdCgnL2NhdGFsb2c/dXRmOD0lRTIlOUMlOTMmcT0mc2VhcmNoX2ZpZWxkPWFsbF9maWVsZHMnKTtcbiAgLy8gICBjeS5nZXQoJ2gzLmRvY3VtZW50X19saXN0LXRpdGxlJykuZXEoMikudGhlbigoJHRpdGxlKSA9PiB7XG4gIC8vICAgICBsZXQgdGhpcmRfdGl0bGUgPSAkdGl0bGUudGV4dCgpLnJlcGxhY2UoL15cXHMrLywgJycpLnJlcGxhY2UoL1xccyskLywgJycpO1xuXG4gIC8vICAgICBjeS5nZXQoJ2gzLmRvY3VtZW50X19saXN0LXRpdGxlJykuZXEoMCkuZmluZCgnYScpLmNsaWNrKCk7XG4gIC8vICAgICBjeS5nZXQoJy5pdGVtLXBhZ2VfX3BhZ2luYXRpb24td2lkZ2V0cycpLnNob3VsZCgnY29udGFpbicsICcxIG9mJylcbiAgLy8gICAgIC8vIE5leHQvUHJldiBsaW5rcyBhcmUgPHNwYW4+IHdoZW4gZGlzYWJsZWQsIDxhPiB3aGVuIGFjdGl2ZVxuICAvLyAgICAgY3kuZ2V0KCcuaXRlbS1wYWdlX19wYWdpbmF0aW9uLXdpZGdldHMnKS5jb250YWlucygnc3BhbicsICdQcmV2Jykuc2hvdWxkKCdleGlzdCcpXG4gIC8vICAgICBjeS5nZXQoJy5pdGVtLXBhZ2VfX3BhZ2luYXRpb24td2lkZ2V0cycpLmNvbnRhaW5zKCdhJywgJ1ByZXYnKS5zaG91bGQoJ25vdC5leGlzdCcpXG4gIC8vICAgICBjeS5nZXQoJy5pdGVtLXBhZ2VfX3BhZ2luYXRpb24td2lkZ2V0cycpLmNvbnRhaW5zKCdzcGFuJywgJ05leHQnKS5zaG91bGQoJ25vdC5leGlzdCcpXG4gIC8vICAgICBjeS5nZXQoJy5pdGVtLXBhZ2VfX3BhZ2luYXRpb24td2lkZ2V0cycpLmNvbnRhaW5zKCdhJywgJ05leHQnKS5zaG91bGQoJ2V4aXN0JylcbiAgLy8gICAgIGN5LmdldCgnLml0ZW0tcGFnZV9fdGl0bGUnKS5zaG91bGQoJ25vdC5jb250YWluJywgdGhpcmRfdGl0bGUpO1xuXG4gIC8vICAgICBjeS5nZXQoJy5pdGVtLXBhZ2VfX3BhZ2luYXRpb24td2lkZ2V0cycpLmNvbnRhaW5zKCdhJywgJ05leHQnKS5jbGljaygpO1xuICAvLyAgICAgY3kuZ2V0KCcuaXRlbS1wYWdlX19wYWdpbmF0aW9uLXdpZGdldHMnKS5zaG91bGQoJ2NvbnRhaW4nLCAnMiBvZicpXG4gIC8vICAgICAvLyBOZXh0L1ByZXYgbGlua3MgYXJlIDxzcGFuPiB3aGVuIGRpc2FibGVkLCA8YT4gd2hlbiBhY3RpdmVcbiAgLy8gICAgIGN5LmdldCgnLml0ZW0tcGFnZV9fcGFnaW5hdGlvbi13aWRnZXRzJykuY29udGFpbnMoJ3NwYW4nLCAnUHJldicpLnNob3VsZCgnbm90LmV4aXN0JylcbiAgLy8gICAgIGN5LmdldCgnLml0ZW0tcGFnZV9fcGFnaW5hdGlvbi13aWRnZXRzJykuY29udGFpbnMoJ2EnLCAnUHJldicpLnNob3VsZCgnZXhpc3QnKVxuICAvLyAgICAgY3kuZ2V0KCcuaXRlbS1wYWdlX19wYWdpbmF0aW9uLXdpZGdldHMnKS5jb250YWlucygnc3BhbicsICdOZXh0Jykuc2hvdWxkKCdub3QuZXhpc3QnKVxuICAvLyAgICAgY3kuZ2V0KCcuaXRlbS1wYWdlX19wYWdpbmF0aW9uLXdpZGdldHMnKS5jb250YWlucygnYScsICdOZXh0Jykuc2hvdWxkKCdleGlzdCcpXG4gIC8vICAgICAvLyBBZnRlciB0aGUgc29sciBpbWFnZSBnb3QgdXBkYXRlZCB0aGlyZCB0aXRsZSBhbmQgc2Vjb25kIHRpdGxlIGFyZSBzYW1lXG4gIC8vICAgICAvL2N5LmdldCgnLml0ZW0tcGFnZV9fdGl0bGUnKS5zaG91bGQoJ25vdC5jb250YWluJywgdGhpcmRfdGl0bGUpO1xuXG4gIC8vICAgICBjeS5nZXQoJy5pdGVtLXBhZ2VfX3BhZ2luYXRpb24td2lkZ2V0cycpLmNvbnRhaW5zKCdhJywgJ05leHQnKS5jbGljaygpO1xuICAvLyAgICAgY3kuZ2V0KCcuaXRlbS1wYWdlX19wYWdpbmF0aW9uLXdpZGdldHMnKS5zaG91bGQoJ2NvbnRhaW4nLCAnMyBvZicpXG4gIC8vICAgICAvLyBOZXh0L1ByZXYgbGlua3MgYXJlIDxzcGFuPiB3aGVuIGRpc2FibGVkLCA8YT4gd2hlbiBhY3RpdmVcbiAgLy8gICAgIGN5LmdldCgnLml0ZW0tcGFnZV9fcGFnaW5hdGlvbi13aWRnZXRzJykuY29udGFpbnMoJ3NwYW4nLCAnUHJldicpLnNob3VsZCgnbm90LmV4aXN0JylcbiAgLy8gICAgIGN5LmdldCgnLml0ZW0tcGFnZV9fcGFnaW5hdGlvbi13aWRnZXRzJykuY29udGFpbnMoJ2EnLCAnUHJldicpLnNob3VsZCgnZXhpc3QnKVxuICAvLyAgICAgY3kuZ2V0KCcuaXRlbS1wYWdlX19wYWdpbmF0aW9uLXdpZGdldHMnKS5jb250YWlucygnc3BhbicsICdOZXh0Jykuc2hvdWxkKCdub3QuZXhpc3QnKVxuICAvLyAgICAgY3kuZ2V0KCcuaXRlbS1wYWdlX19wYWdpbmF0aW9uLXdpZGdldHMnKS5jb250YWlucygnYScsICdOZXh0Jykuc2hvdWxkKCdleGlzdCcpXG4gIC8vICAgICBjeS5nZXQoJy5pdGVtLXBhZ2VfX3RpdGxlJykuc2hvdWxkKCdjb250YWluJywgdGhpcmRfdGl0bGUpO1xuXG4gIC8vICAgICBjeS5nZXQoJy5pdGVtLXBhZ2VfX3BhZ2luYXRpb24td2lkZ2V0cycpLmNvbnRhaW5zKCdhJywgJ1ByZXYnKS5jbGljaygpO1xuICAvLyAgICAgY3kuZ2V0KCcuaXRlbS1wYWdlX19wYWdpbmF0aW9uLXdpZGdldHMnKS5zaG91bGQoJ2NvbnRhaW4nLCAnMiBvZicpXG4gIC8vICAgICAvLyBBZnRlciB0aGUgc29sciBpbWFnZSBnb3QgdXBkYXRlZCB0aGlyZCB0aXRsZSBhbmQgc2Vjb25kIHRpdGxlIGFyZSBzYW1lXG4gIC8vICAgICAvL2N5LmdldCgnLml0ZW0tcGFnZV9fdGl0bGUnKS5zaG91bGQoJ25vdC5jb250YWluJywgdGhpcmRfdGl0bGUpO1xuICAvLyAgIH0pXG4gIC8vIH0pO1xufSk7XG4iXSwibmFtZXMiOlsiZGVzY3JpYmUiLCJpdCIsImN5IiwidmlzaXQiLCJnZXQiLCJjb250YWlucyIsInBhcmVudCIsImVhY2giLCIkZWwiLCJpbmRleCIsIiRsaXN0IiwiY2hpbGRyZW4iLCJhdHRyIiwibG9nIiwic2hvdWxkIiwiZXEiLCJmaW5kIiwibGFzdCJdLCJzb3VyY2VSb290IjoiIn0=