describe('Prev/next Pagination', () => {
  beforeEach(() => {
    /* steps: 
    1. go to home page
    2. do empty search 
    */
    cy.visit('/');
    cy.get('#search').click();
    cy.contains('Catalog Results');
    cy.get('[aria-current="true"]').contains('1');
  });

  it('Pages proper on empty search and checks for prev link is disabled', () => {
    /* steps: 
   
    3. check if prev is disabled
    
    */
    /*<li class="pagination__page-item pagination__page-item--ursus disabled">
        <a rel="prev" onclick="return false;" class="pagination__page-link pagination__page-link--ursus" aria-label="Go to previous page" href="#">‹ Prev</a>
      </li>
      */
    cy.get('[aria-label="Go to previous page"]')
      .parent('.disabled')
      .should('have.length', 2)
      .each(($el, index, $list) => {
        if ($el.children('a').attr('onclick') == 'return false;') {
          cy.log('disabled');
        }
      });
  });

  it('On Empty search, On Next Page prev link is enabled ', () => {
    /*

    4. click on next 
    5. check if prev is enabled
    
    */
    cy.get('[aria-label="Go to next page"]')
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
  });

  it('On Empty search, when on last page, next page link is disabled', () => {
    /*
    6. when on the last page, then next is disabled
    */
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
    //.click();
    /*cy.get('[aria-label="Go to next page"]')
      .parent('.disabled')
      .should('have.length', 2);*/
  });
});
