describe('Data Layer tests', () => {
  it('Data Layer Loaded', () => {
    cy.visit('/catalog/ark:/21198/zz0026hvpq');
    cy.window().then((win)=>{
        assert.isDefined(win.dataLayer, 'window.dataLayer is defined');
        assert.equal(win.dataLayer[0].Title[0], 'Manuscript No. 32: Calendar of Feasts 14th/15th Century');
        assert.equal(win.dataLayer[0]['Item ARK'], 'ark:/21198/zz0026hvpq');
        assert.equal(win.dataLayer[0]['Type.genre'][0],'Manuscripts');
        assert.equal(win.dataLayer[0]['Type.genre'][1],'Illuminations');
    });
  });
});
