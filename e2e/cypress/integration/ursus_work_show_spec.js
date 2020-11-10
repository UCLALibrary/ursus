describe('Work show pages', () => {
  it('Calendar of Feasts', () => {
    cy.visit('/catalog/qpvh6200zz-89112');
    cy.contains(
      'h1',
      'Manuscript No. 32: Calendar of Feasts 14th/15th Century'
    );
    cy.get('iframe').then(($iframe) => {
      const $body = $iframe.contents().find('body')});
    cy.percySnapshot();
  });
});