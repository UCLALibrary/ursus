
describe('Facets', () => {
  it('Subject', () => {
    cy.visit('/');
    cy.contains('a', 'Subject').click({ force: true });
    cy.percySnapshot('Subject facet open');

    cy.contains('a', 'more').click({ force: true });
    cy.request('/catalog/facet/subject_sim').its('body').should('include', 'A-Z Sort');
    cy.contains('People')

    cy.contains('a', 'A-Z Sort').click({ force: true });
    cy.contains('14th Dynasty');
    cy.contains('a', 'Next').click({ force: true });
    cy.percySnapshot('Subject facet modal');
    cy.contains('4-H clubs').click({ force: true });

    cy.get('.filter-label-key', { timeout: 100000 }).contains('Subject');
    cy.get('.filter-label-value').contains('4-H clubs');
    cy.percySnapshot('Subject facet selected');
  });

  /*it('Resource Type + Language', () => {
    cy.visit('/');
    cy.contains('a', 'Resource Type').click();
    cy.contains('a', 'cartographic').click({ force: true });
    cy.get('[title="cartographic"]', { timeout: 100000 });
    cy.contains('a', 'Language').click();
    cy.contains('a', 'English').click({ force: true });
    cy.get('[title="English"]', { timeout: 100000 });
    cy.get(
      '.filter-human_readable_language_sim > .filter-group__label > .filter-label-key'
    ).contains('Language');
    cy.get(
      '.filter-human_readable_language_sim > .filter-group__label > .filter-label-value'
    ).contains('English');
    cy.get(
      '.filter-human_readable_resource_type_sim > .filter-group__label > .filter-label-key'
    ).contains('Resource Type');
    cy.get(
      '.filter-human_readable_resource_type_sim > .filter-group__label > .filter-label-value'
    ).contains('cartographic');
    cy.percySnapshot();
  });

  it('Genre + Language', () => {
    cy.visit('/');
    cy.contains('a', 'Genre').click();
    cy.contains('a', 'black-and-white photographs').click({ force: true });
    cy.get('[title="black-and-white photographs"]', { timeout: 100000 });
    cy.contains('a', 'Language').click();
    cy.contains('a', 'English').click({ force: true });
    cy.get('[title="English"]', { timeout: 100000 });
    cy.get(
      '.filter-genre_sim > .filter-group__label > .filter-label-key'
    ).contains('Genre');
    cy.get(
      '.filter-genre_sim > .filter-group__label > .filter-label-value'
    ).contains('black-and-white photographs');
    cy.get(
      '.filter-human_readable_language_sim > .filter-group__label > .filter-label-key'
    ).contains('Language');
    cy.get(
      '.filter-human_readable_language_sim > .filter-group__label > .filter-label-value'
    ).contains('English');
  });

  it('Start Over', () => {
    cy.visit('/catalog?f[genre_sim][]=Black-and-white+photographs');
    cy.get('[title="Black-and-white photographs"]');
    cy.contains('a', 'Start Over').click({ force: true });
    cy.get('.search-results-container', { timeout: 100000 }).should('not.contain', 'You searched for');
  });

  it('Names', () => {
    cy.visit('/');
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
    cy.visit('/');
    cy.contains('a', 'Date').click();
    cy.get('#range_year_isim_begin').clear().type('1935');
    cy.get('#range_year_isim_end').clear().type('1967');
    cy.get('.submit').click();
    cy.get('.filter-label-key').contains('Date');
    cy.get('.filter-label-value').contains('1935 to 1967');
    cy.percySnapshot();
  });

  it('Collection', () => {
    cy.visit('/');
    cy.contains('a', 'Collection').click({ force: true });
    cy.get(
      '#facet-member_of_collections_ssim > .facet-values > .more_facets > a'
    ).click({ force: true });
    cy.contains('a', 'Next').click({ force: true });
    cy.contains('a', 'Caro Minasian Collection of Armenian Material, circa 1600-1968').click({ force: true });
    cy.get('.filter-label-key', { timeout: 100000 }).contains('Collection');
    cy.get('.filter-label-value').contains('Caro Minasian Collection of Armenian Material, circa 1600-1968');
    cy.percySnapshot();
  });

  it('Genre', () => {
    cy.visit('/');
    cy.contains('a', 'Genre').click({ force: true });
    cy.get('#facet-genre_sim > .facet-values > .more_facets > a').click({
      force: true,
    });
    cy.contains('a', 'A-Z Sort').click({ force: true });
    cy.get('a[href*="Architectural+drawings"]').click({ force: true });
    cy.get('.filter-label-key', { timeout: 100000 }).contains('Genre');
    cy.get('.filter-label-value').contains('Architectural drawings');
    cy.percySnapshot();
  });*/
});
