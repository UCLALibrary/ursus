describe('OAI-PMH Requests', () => {
  it('Identify Request page', () => {
    cy.request('/catalog/oai?verb=Identify').then((response) => {
      expect(response.status).to.eq(200)
    })
  });
  it('ListSets Request page', () => {
    cy.request('/catalog/oai?verb=ListSets',{ timeout: 100000 }).its('body').should('include', 'setSpec');
  });
  it('ListMetadataFormats Request page', () => {
    cy.request('/catalog/oai?verb=ListMetadataFormats',{ timeout: 100000 }).its('body').should('include', 'oai_dc');
  });
  it('ListRecords Request page', () => {
    cy.request('/catalog/oai?verb=ListRecords&metadataPrefix=oai_dc',{ timeout: 100000 }).its('body').should('include', '<ListRecords><record><header><identifier>oai:library.ucla.edu:');
  });
  it('ListIdentifiers Request page', () => {
    cy.request('/catalog/oai?verb=ListIdentifiers&metadataPrefix=oai_dc',{ timeout: 100000 }).its('body').should('include', '<ListIdentifiers><header><identifier>oai:library.ucla.edu:');
  });
})
