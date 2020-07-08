describe('Ursus Homepage', () => {
  it('Visits the Homepage', () => {
    cy.visit('/')
    cy.percySnapshot()
  })
})