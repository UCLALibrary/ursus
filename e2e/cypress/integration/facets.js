describe('Ursus Homepage', () => {
  it('Visits the Homepage, clicks on the Subject facet, clicks on more, clicks on A-Z Sort, clicks on next, clicks Academy Awards (Motion pictures) and verifies the page load', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('a', 'Subject').click({ force: true });
    cy.contains('a', 'more').click({ force: true });
    cy.contains('a', 'A-Z Sort').click({ force: true });
    cy.contains('a', 'Next').click({ force: true });
    cy.get(
      '.modal-footer > .facet-pagination > .modal-pagination > :nth-child(2) > .modal-pagination__page-link'
    ).click({ force: true });
    cy.get('a[href*="Academy"]').click({ force: true });
    cy.get('.filter-label-key').contains('Subject');
    cy.get('.filter-label-value').contains('Academy Awards (Motion pictures)');
    cy.percySnapshot();
  });
  it('Visits the Homepage, opens on the Resource Type facet, clicks on Cartographic, opens on the Language facet, clicks on English and verifies page load', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('a', 'Resource Type').click();
    cy.contains('a', 'cartographic').click({ force: true });
    cy.get('[title="cartographic"]');
    cy.contains('a', 'Language').click();
    cy.contains('a', 'English').click({ force: true });
    cy.get('[title="English"]');
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
  it('Visits the Homepage, opens on the Genre facet, clicks on black-and-white photographs, opens on the Language facet, clicks on English and verifies page load', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('a', 'Genre').click();
    cy.contains('a', 'black-and-white photographs').click({ force: true });
    cy.get('[title="black-and-white photographs"]');
    cy.contains('a', 'Language').click();
    cy.contains('a', 'English').click({ force: true });
    cy.get('[title="English"]');
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
    cy.percySnapshot();
  });
  it('Visits the Homepage, opens on the Genre facet, clicks on any link, clicks on Start Over and verifies page load', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('a', 'Genre').click();
    cy.contains('a', 'black-and-white photographs').click({ force: true });
    cy.get('[title="black-and-white photographs"]');
    cy.contains('a', 'Start Over').click({ force: true });
    cy.get('title').contains('UCLA Library Digital Collections Search Results');
    cy.percySnapshot();
  });
  it('Visits the Homepage, opens on the Locations facet, clicks on Los Angeles (Calif.), opens on the Namse facet, clicks on Tournament of Roses and verifies page load', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('a', 'Names').click();
    cy.contains('a', 'Tournament of Roses').click({ force: true });
    cy.get('[title="Tournament of Roses"]');
    cy.contains('a', 'Location').click();
    cy.contains('a', 'Los Angeles (Calif.)').click({ force: true });
    cy.get('[title="Los Angeles (Calif.)"]');
    cy.get(
      '.filter-location_sim > .filter-group__label > .filter-label-key'
    ).contains('Location');
    cy.get(
      '.filter-location_sim > .filter-group__label > .filter-label-value'
    ).contains('Los Angeles (Calif.)');
    cy.get(
      '.filter-named_subject_sim > .filter-group__label > .filter-label-key'
    ).contains('Names');
    cy.get(
      '.filter-named_subject_sim > .filter-group__label > .filter-label-value'
    ).contains('Tournament of Roses');
    cy.percySnapshot();
  });
  it('Visits the Homepage, opens on the Dates facet, enters a Starting Date, enters an ending date and verifies page load', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('a', 'Date').click();
    cy.get('#range_year_isim_begin').type(
      '{end}{backspace}{backspace}{backspace}{backspace}1935'
    );
    cy.get('#range_year_isim_end').type(
      '{end}{backspace}{backspace}{backspace}{backspace}1967'
    );
    cy.get('.submit').click();
    cy.get('.filter-label-key').contains('Date');
    cy.get('.filter-label-value').contains('1935 to 1967');
    cy.percySnapshot();
  });
  it('Visits the Homepage, clicks on the Collection facet, clicks on more, clicks on next, clicks Ethiopic Manuscripts and verifies the page load', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('a', 'Collection').click({ force: true });
    cy.get(
      '#facet-member_of_collections_ssim > .facet-values > .more_facets > a'
    ).click({ force: true });
    cy.contains('a', 'Next').click({ force: true });
    cy.get('a[href*="Ethiopic"]').click({ force: true });
    cy.get('.filter-label-key').contains('Collection');
    cy.get('.filter-label-value').contains('Ethiopic Manuscripts');
    cy.percySnapshot();
  });
  it('Visits the Homepage, clicks on the Genre facet, clicks on more, clicks on next, clicks Architectural drawings and verifies the page load', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('a', 'Genre').click({ force: true });
    cy.get('#facet-genre_sim > .facet-values > .more_facets > a').click({
      force: true,
    });
    cy.contains('a', 'A-Z Sort').click({ force: true });
    cy.get('a[href*="Architectural+drawings"]').click({ force: true });
    cy.get('.filter-label-key').contains('Genre');
    cy.get('.filter-label-value').contains('Architectural drawings');
    cy.percySnapshot();
  });
  it('Visits the Homepage, clicks on the Subject facet, clicks Landmarks and verifies the page load', () => {
    cy.visit('https://digital.library.ucla.edu');
    cy.contains('a', 'Subject').click({ force: true });
    cy.get('#facet-subject_sim > .facet-values > .more_facets > a').click({
      force: true,
    });
    ///cy.contains('a', 'A-Z Sort').click({ force: true });
    cy.get('a[href*="Landmarks"]').click({ force: true });
    cy.get('.filter-label-key').contains('Subject');
    cy.get('.filter-label-value').contains('Landmarks');
    cy.percySnapshot();
  });
});
