describe('Work show pages', () => {
  it('Calendar of Feasts', () => {
    cy.visit('/catalog/qpvh6200zz-89112');
    cy.contains('h1', 'Manuscript No. 32: Calendar of Feasts 14th/15th Century');
    cy.percySnapshot();
  });

  it('Ṣālot ba᾽eneta Mā᾽esaromu la- Agān᾽ent', () => {
    cy.visit('/catalog/pnczp100zz-89112');
    cy.contains('h1', 'Ms. 51 Ṣālot ba᾽eneta Mā᾽esaromu la- Agān᾽ent');
    cy.percySnapshot();
  });

  it('John Binan and officers at the homicide crime scene of Louise Appier, Los Angeles, 1935', () => {
    cy.visit('/catalog/c8f45200zz-89112');
    cy.contains('h1', 'John Binan and officers at the homicide crime scene of Louise Appier, Los Angeles, 1935');
    cy.percySnapshot();
  });
});
