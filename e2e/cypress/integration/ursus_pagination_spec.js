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
    cy.get('[aria-label="Go to previous page"]')
      .parent('.disabled')
      .should('have.length', 2)
      .each(($el, index, $list) => {
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
    cy.get('[aria-current="true"]').should('have.length', 2).contains('2');
    cy.get('[aria-label="Go to previous page"]')
      .parent()
      .should('not.have.class', 'disabled');
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
    cy.get('ul.pagination__list-wrapper')
      .eq(0)
      .find('li')
      .last()
      .find('a')
      .then(function ($a) {
        // extract the fully qualified href property
        cy.log($a.prop('href'));
        const href = $a.prop('href');
        cy.log($a.text());

        // make an http request for this resource outside of the browser
        cy.request(href)
          // drill into the response body
          .its('body')
          // and assert that its contents have the <html> response
          .should(
            'include',
            ' <li class="pagination__page-item pagination__page-item--ursus disabled">\n        <a rel="next"'
          )
          .and(
            'include',
            '<span class="pagination__page-link pagination__page-link--ursus" aria-label="Current Page, Page ' +
              $a.text() +
              '" aria-current="true">' +
              $a.text() +
              '</span>'
          );
      });

    //Following code not working due to cypress not waiting longer.
    //cy.get('ul.pagination__list-wrapper').eq(0).find('li').last().find('a').click();
    /*cy.get('[aria-label="Go to next page"]')
      .parent('.disabled')
      .should('have.length', 2);*/
  });

  it('Prev/next in search results', () => {
    /* steps: 
    1. go to empty search 
    2. remember third item title
    3. click on first item, then click 'next' to 2nd and 3rd, 'prev' back to second
    4. at each stop, assert:
        - pagination control says '1/2/3 of ...'
        - title isn't equal to remembered 3rd title, except when it should be
        - 'Next'/'Prev' links are <a> tags, execpt on 1st item where 'Next' is a (inactive) span
    */
    cy.visit('/catalog?utf8=%E2%9C%93&q=&search_field=all_fields');
    cy.get('h3.document__list-title').eq(2).then(($title) => {
      let third_title = $title.text().replace(/^\s+/, '').replace(/\s+$/, '');

      cy.get('h3.document__list-title').eq(0).find('a').click();
      cy.get('.item-page__pagination-widgets').should('contain', '1 of')
      // Next/Prev links are <span> when disabled, <a> when active
      cy.get('.item-page__pagination-widgets').contains('span', 'Prev').should('exist')
      cy.get('.item-page__pagination-widgets').contains('a', 'Prev').should('not.exist')
      cy.get('.item-page__pagination-widgets').contains('span', 'Next').should('not.exist')
      cy.get('.item-page__pagination-widgets').contains('a', 'Next').should('exist')
      cy.get('.item-page__title').should('not.contain', third_title);

      cy.get('.item-page__pagination-widgets').contains('a', 'Next').click();
      cy.get('.item-page__pagination-widgets').should('contain', '2 of')
      // Next/Prev links are <span> when disabled, <a> when active
      cy.get('.item-page__pagination-widgets').contains('span', 'Prev').should('not.exist')
      cy.get('.item-page__pagination-widgets').contains('a', 'Prev').should('exist')
      cy.get('.item-page__pagination-widgets').contains('span', 'Next').should('not.exist')
      cy.get('.item-page__pagination-widgets').contains('a', 'Next').should('exist')
      cy.get('.item-page__title').should('not.contain', third_title);

      cy.get('.item-page__pagination-widgets').contains('a', 'Next').click();
      cy.get('.item-page__pagination-widgets').should('contain', '3 of')
      // Next/Prev links are <span> when disabled, <a> when active
      cy.get('.item-page__pagination-widgets').contains('span', 'Prev').should('not.exist')
      cy.get('.item-page__pagination-widgets').contains('a', 'Prev').should('exist')
      cy.get('.item-page__pagination-widgets').contains('span', 'Next').should('not.exist')
      cy.get('.item-page__pagination-widgets').contains('a', 'Next').should('exist')
      cy.get('.item-page__title').should('contain', third_title);

      cy.get('.item-page__pagination-widgets').contains('a', 'Prev').click();
      cy.get('.item-page__pagination-widgets').should('contain', '2 of')
      cy.get('.item-page__title').should('not.contain', third_title);
    })
  });
});
