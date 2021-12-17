
describe('Work show pages', () => {
  it('Arganon (Praise) of Mary', () => {
    cy.visit('/catalog/ark:/21198/zz0009q5nq');
    cy.contains(
      'h1',
      'Ms. 35 Arganon'
    );
    cy.frameLoaded({
      url:
        'https://p-w-dl-viewer01.library.ucla.edu/#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz0009q5nq%2Fmanifest',
    });
   // TODO find the title of the manuscript insided nested iframes
    cy.frameLoaded('iframe#media-viewer-iframe').iframeCustom().find('iframe#universalviewer-iframe').iframeCustom();
    
    cy.percySnapshot();
  });
});
