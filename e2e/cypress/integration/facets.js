describe('Facets', () => {
  it('Subject', () => {
    cy.visit('/')
    cy.get('#facets').contains('Subject').click()
    cy.percySnapshot('Subject facet open')

    cy.get('.facet-field.blacklight-subject_sim').contains('more').click()

    cy.get('#blacklight-modal').contains('Sports')
    cy.percySnapshot('Subject facet modal')
    cy.get('#blacklight-modal').contains('A-Z Sort').click()

    cy.get('#blacklight-modal').contains('Abbots--Japan')
    cy.get('#blacklight-modal').contains('span', 'Prev').should('have.class', 'disabled')
    cy.get('#blacklight-modal').contains('Next').click({ force: true })

    cy.get('#blacklight-modal').contains('Academy Awards (Motion pictures)').click()

    cy.percySnapshot('Subject facet selected')
  })
})