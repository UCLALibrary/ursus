describe('Work show pages', () => {
  it('Fowler', () => {
    cy.visit('/catalog/25g0j200zz-89112');
    cy.contains('h1', 'fowler_a243_0009');
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
